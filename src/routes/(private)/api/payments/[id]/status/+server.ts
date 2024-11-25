import { paymentService } from "$lib/server/services/zenopay";
import {json} from "@sveltejs/kit";
import {getUserByEmail} from "$lib/server/db/actions";

export async function GET({ params, locals }) {
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
        const result = await paymentService.checkStatus(params.id, user.id);
        return json(result);
    } catch (err) {
        console.error('Status check error:', err);
        return new Response(
            err instanceof Error ? err.message : 'Status check failed',
            { status: 400 }
        );
    }
}