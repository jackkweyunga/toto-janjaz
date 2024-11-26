// src/routes/events/+page.server.ts
import {error, fail} from '@sveltejs/kit';
import type {PageServerLoad} from './$types';
import {db} from '$lib/server/db';
import {getUserByEmail} from "$lib/server/db/actions";

export const load: PageServerLoad = async ({locals, params}) => {

    const eventId = params.id;

    try {
        // Get event
        const event = await db.query.events.findFirst({
            where: (events, {and, eq, gte}) => and(
                eq(events.status, 'published'),
                eq(events.id, eventId),
                // gte(events.endDate, new Date())
            ),
        });

        if (event === undefined) {
            return fail(404, {message: 'Event not found'});
        }

        return {
            event,
        };
    } catch (err) {
        console.error('Error loading events:', err);
        throw error(500, 'Failed to load events');
    }
};