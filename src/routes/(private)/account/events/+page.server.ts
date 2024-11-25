// src/routes/events/+page.server.ts
import {error, fail} from '@sveltejs/kit';
import type {PageServerLoad} from './$types';
import {db} from '$lib/server/db';
import {events, rsvps, transactions} from '$lib/server/db/schema';
import {eq, and, gte} from 'drizzle-orm';
import {getUserByEmail} from "$lib/server/db/actions";
import {message} from "sveltekit-superforms";

export const load: PageServerLoad = async ({locals}) => {
    const session = await locals.auth();
    if (!session?.user) {
        throw error(401, 'Please login to view events');
    }

    const user = await getUserByEmail(session?.user?.email!);

    try {
        // Get published events that haven't ended yet
        const publishedEvents = await db.query.events.findMany({
            where: (events, {and, eq, gte}) => and(
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
            where: (children, {eq}) => eq(children.parentId, session.user?.id as string)
        });

        // Enhance events with registration info
        const enhancedEvents = publishedEvents.map(event => ({
            ...event,
            spotsAvailable: event.maxParticipants ? event.maxParticipants - event.rsvps.filter(r =>
                r.transaction?.status === 'completed'
            ).length : null,
            userRegistrations: event.rsvps.filter(r =>
                r.parentId === user?.id as string
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


export const actions = {

    cancelRegistration: async ({request, locals}) => {
        const session = await locals.auth();
        if (!session?.user) {
            return fail(401, {message: 'Unauthorized'});
        }

        const user = await getUserByEmail(session?.user?.email!);

        const formData = await request.formData();
        const rsvpId = formData.get('rsvpId')?.toString();

        if (!rsvpId) {
            return fail(400, {message: 'RSVP ID is required'});
        }

        try {
            // Verify RSVP belongs to user
            const existingRsvp = await db.query.rsvps.findFirst({
                where: (rsvps, {and, eq}) => and(
                    eq(rsvps.id, rsvpId),
                    eq(rsvps.parentId, user?.id as string)
                ),
                with: {
                    transaction: true
                }
            });

            if (!existingRsvp) {
                return fail(404, {message: 'Registration not found'});
            }

            if (existingRsvp.transaction) {
                await db.update(transactions)
                    .set({
                        status: 'cancelled',
                        updatedAt: new Date()
                    })
                    .where(eq(transactions.id, existingRsvp.transaction.id));
            }

            // Cancel the RSVP
            await db.delete(rsvps)
                .where(eq(rsvps.id, rsvpId));

            return {
                success: true,
            }


        } catch (err) {
            console.error('Error cancelling registration:', err);
            return fail(500, {message: 'Failed to cancel registration'});
        }
    }
}

