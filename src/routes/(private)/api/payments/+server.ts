import { json } from '@sveltejs/kit';
import { paymentService, paymentSchema } from '$lib/server/services/zenopay';
import {getUserByEmail} from "$lib/server/db/actions";
import {db} from "$lib/server/db";
import {transactions} from "$lib/server/db/schema";
import {createId} from "@paralleldrive/cuid2";
import {z} from "zod";

export async function POST({ request, locals }) {
    // Ensure user is authenticated
    const session = await locals.auth();
    if (!session?.user) {
        return new Response('Unauthorized', { status: 401 });
    }

    const user  = await getUserByEmail(session?.user?.email!);
    if (!user) {
        return new Response('Unauthorized', { status: 401 });
    }
    try {
        const data = paymentSchema.parse(await request.json());

        if (data.transactionId) {
            // Check transaction status
            const result = await paymentService.initiatePayment(data, data.transactionId);
            return json(result);
        }

        const transaction = (await db.insert(transactions).values({
            amount: data.amount.toString(),
            status: 'pending',
            type: 'payment',
            userId: user.id,
            reference: createId(),
        }).returning().execute())[0]

        const result = await paymentService.initiatePayment(data, transaction.id);
        return json(result);
    } catch (err) {
        console.error('Payment initiation error:', err);
        return json({ error: 'Payment initiation error', message: String(err) }, { status: 500 });
    }
}