// src/routes/events/+page.server.ts
import {error, fail} from '@sveltejs/kit';
import type {PageServerLoad} from './$types';
import {db} from '$lib/server/db';
import {getUserByEmail} from "$lib/server/db/actions";

export const load: PageServerLoad = async ({locals, params}) => {

    const session = await locals.auth();

    if (!session?.user) {
        throw error(401, 'Please login to view events');
    }

    const user = await getUserByEmail(session?.user?.email!);

    const transactionId = params.id;

    try {
        // Get transaction
        const transaction = await db.query.transactions.findFirst({
            where: (events, {and, eq, gte}) => and(
                eq(events.id, transactionId),
            ),
        });

        if (transaction === undefined) {
            return fail(404, {message: 'Event not found'});
        }

        return {
            transaction,
        };
    } catch (err) {
        console.error('Error loading transaction:', err);
        throw error(500, 'Failed to load transaction');
    }
};

