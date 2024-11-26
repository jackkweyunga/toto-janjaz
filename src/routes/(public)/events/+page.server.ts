// src/routes/events/+page.server.ts
import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {

    try {

        // Get published events that haven't ended yet
        const publishedEvents = await db.query.events.findMany({
            where: (events, { and, eq, gte }) => and(
                eq(events.status, 'published'),
                // gte(events.endDate, new Date())
            ),
        });

        return {
            events: publishedEvents,
        };
    } catch (err) {
        console.error('Error loading events:', err);
        throw error(500, 'Failed to load events');
    }
};


