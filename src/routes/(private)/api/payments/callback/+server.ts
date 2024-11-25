import { paymentService } from "$lib/server/services/zenopay";
import {json} from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const data = await request.json();
        await paymentService.handleCallback(data);
        return new Response('OK', { status: 200 });
    } catch (err) {
        console.error('Callback processing error:', err);
        return new Response(
            err instanceof Error ? err.message : 'Callback processing failed',
            { status: 400 }
        );
    }
}