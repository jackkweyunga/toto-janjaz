// src/lib/server/payment.ts
import {undefined, z} from "zod"; // Assuming you're using Zod for validation
import { error } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { db } from "../db";
import { transactions } from "../db/schema";
import { eq } from "drizzle-orm";

// Validation schemas
export const paymentSchema = z.object({
    amount: z.number().positive(),
    phone: z.string().min(10),
    email: z.string().email(),
    name: z.string().min(1),
    metadata: z.record(z.any()).optional(),
    transactionId: z.string().optional()
});

export type PaymentRequest = z.infer<typeof paymentSchema>;

interface ZenoPayConfig {
    apiKey: string;
    secretKey: string;
    accountId: string;
}

interface OrderStatusRequest {
    check_status: number;
    order_id: string;
    api_key: string;
    secret_key: string;
}

interface OrderStatusResponse {
    status: string;
    payment_status?: string;
    order_id?: string;
    message: string;
}

interface OrderCallbackBody {
    order_id: string;
    payment_status: string;
}

interface OrderResponse {
    status: string;
    message: string;
    order_id: string;
}

export class ServerPaymentService {

    private readonly config: ZenoPayConfig;
    private readonly API_URL = "https://api.zeno.africa";

    constructor() {

        // Load config from environment variables
        this.config = {
            apiKey: env.ZENO_PAY_API_KEY,
            secretKey: env.ZENO_PAY_SECRET_KEY,
            accountId: env.ZENO_PAY_ACCOUNT_ID
        };

        // Validate config
        if (!this.config.apiKey || !this.config.secretKey || !this.config.accountId) {
            throw new Error("Missing payment gateway configuration");
        }
    }

    private formatPhone(phone: string): string {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.startsWith('0')
            ? `255${cleaned.slice(1)}`
            : cleaned;
    }

    private async makeRequest(endpoint: string, data: Record<string, any>) {
        try {
            const response = await fetch(`${this.API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    ...data,
                    api_key: this.config.apiKey,
                    secret_key: this.config.secretKey,
                    account_id: this.config.accountId,
                }),
            });

            if (!response.ok) {
                throw error(response.status, {
                    message: `Payment gateway error: ${response.statusText}`
                });
            }

            return await response.json();
        } catch (err) {
            console.error('Payment gateway error:', err);
            throw error(500, {
                message: 'Payment service temporarily unavailable'
            });
        }
    }

    async initiatePayment(data: PaymentRequest, transactionId: string) {
        // Validate request data
        console.log("data: ", data)
        const validated = paymentSchema.parse(data);
        console.log("validated: ", validated)

        const transaction = await db.query.transactions.findFirst({
            where: eq(transactions.id, transactionId)
        });

        if (!transaction) {
            throw error(404, { message: 'Transaction not found' });
        }

        try {
            // Call payment gateway
            const response = await this.makeRequest('', {
                create_order: 1,
                buyer_name: validated.name,
                buyer_phone: this.formatPhone(validated.phone),
                buyer_email: validated.email,
                amount: validated.amount.toString()
            });

            if (response.status !== 'success') {
                throw error(400, {
                    message: response.message || 'Payment initiation failed'
                });
            }

            // Update transaction with payment gateway reference
            await db
                .update(transactions)
                .set({
                    reference: response.order_id,
                    metadata: {
                        ...transaction.metadata,
                        gateway_response: response
                    }
                })
                .where(eq(transactions.id, transaction.id));

            return {
                status: 'success',
                transactionId: transaction.id,
                reference: response.order_id,
                message: response.message
            };
        } catch (err) {
            // Update transaction as failed
            await db
                .update(transactions)
                .set({
                    status: 'failed',
                    metadata: {
                        ...transaction.metadata,
                        error: err instanceof Error ? err.message : 'Unknown error'
                    }
                })
                .where(eq(transactions.id, transaction.id));

            throw err;
        }
    }

    async checkStatus(transactionId: string, userId: string) {
        // Fetch transaction
        const transaction = await db
            .query.transactions.findFirst({
                where: eq(transactions.id, transactionId)
            });

        if (!transaction) {
            throw error(404, { message: 'Transaction not found' });
        }

        if (transaction.userId !== userId) {
            throw error(403, { message: 'Unauthorized' });
        }

        try {
            const response: OrderStatusResponse = await this.makeRequest('/order-status', {
                check_status: 1,
                order_id: transaction.reference
            });

            const completed = response.payment_status === 'COMPLETED';

            // Update transaction status
            await db
                .update(transactions)
                .set({
                    status: completed ? 'completed' : response.payment_status?.toLowerCase() as any,
                    metadata: {
                        ...transaction.metadata,
                        status_check: response
                    },
                    completedAt: completed ? new Date() : null,
                    updatedAt: new Date()
                })
                .where(eq(transactions.id, transaction.id));

            return {
                status: response.payment_status,
                message: response.message,
                transactionId: transaction.id,
                amount: transaction.amount
            };
        } catch (err) {
            console.error('Status check failed:', err);
            throw err;
        }
    }

    async handleCallback(data: OrderCallbackBody) {
        const transaction = await db
            .query.transactions.findFirst({
                where: eq(transactions.reference, data.order_id)
            });

        if (!transaction) {
            throw error(404, { message: 'Transaction not found' });
        }

        const completed = data.payment_status === 'COMPLETED';

        await db
            .update(transactions)
            .set({
                metadata: {
                    ...transaction.metadata,
                    callback_data: data,
                },
                updatedAt: new Date(),
                status: completed ? 'completed' : data.payment_status?.toLowerCase() as any,
                completedAt: completed ? new Date() : null
            })
            .where(eq(transactions.id, transaction.id));

        return { status: 'success', message: 'Callback handled' };
    }
}

// Create singleton instance
export const paymentService = new ServerPaymentService();