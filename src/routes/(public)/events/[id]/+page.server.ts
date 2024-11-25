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

    const eventId = params.id;

    try {
        // Get event
        const event = await db.query.events.findFirst({
            where: (events, {and, eq, gte}) => and(
                eq(events.status, 'published'),
                eq(events.id, eventId),
                gte(events.endDate, new Date())
            ),
            with: {
                rsvps: {
                    with: {
                        child: true,
                        transaction: true
                    },
                    where: (rsvps, {eq}) => eq(rsvps.parentId, session.user?.id as string)
                }
            }
        });

        if (event === undefined) {
            return fail(404, {message: 'Event not found'});
        }

        // Enhance events with registration info
        const enhancedEvent = {
            ...event,
            spotsAvailable: event.maxParticipants ? event.maxParticipants - event.rsvps.filter(r =>
                r.status === 'confirmed'
            ).length : null,
            userRegistrations: event.rsvps.filter(r =>
                r.parentId === session.user?.id as string
            )
        };

        return {
            event: enhancedEvent,
        };
    } catch (err) {
        console.error('Error loading events:', err);
        throw error(500, 'Failed to load events');
    }
};