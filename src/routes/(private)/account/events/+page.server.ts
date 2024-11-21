// src/routes/events/+page.server.ts
import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { events, rsvps, transactions } from '$lib/server/db/schema';
import { eq, and, gte } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth();
    if (!session?.user) {
        throw error(401, 'Please login to view events');
    }

    try {
        // Get published events that haven't ended yet
        const publishedEvents = await db.query.events.findMany({
            where: (events, { and, eq, gte }) => and(
                eq(events.status, 'published'),
                gte(events.endDate, new Date())
            ),
            with: {
                rsvps: {
                    with: {
                        child: true,
                        transaction: true
                    }
                }
            }
        });

        // Get user's children
        const userChildren = await db.query.children.findMany({
            where: (children, { eq }) => eq(children.parentId, session.user?.id as string)
        });

        // Enhance events with registration info
        const enhancedEvents = publishedEvents.map(event => ({
            ...event,
            spotsAvailable: event.maxParticipants ? event.maxParticipants - event.rsvps.filter(r =>
                r.status === 'confirmed'
            ).length : null,
            userRegistrations: event.rsvps.filter(r =>
                r.parentId === session.user?.id as string
            )
        }));

        return {
            events: enhancedEvents,
            children: userChildren
        };
    } catch (err) {
        console.error('Error loading events:', err);
        throw error(500, 'Failed to load events');
    }
};


