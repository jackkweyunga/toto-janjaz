// src/routes/events/+page.server.ts
import {error, fail} from '@sveltejs/kit';
import type {PageServerLoad} from './$types';
import {db} from '$lib/server/db';
import {children, events, rsvps, transactions} from '$lib/server/db/schema';
import {eq, and, gte} from 'drizzle-orm';
import {getUserByEmail} from "$lib/server/db/actions";
import {addChildSchema, rsvpSchema} from "$lib/schema";
import {message, superValidate} from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";
import {z} from "zod";
import {createId} from "@paralleldrive/cuid2";
import { redirect } from '@sveltejs/kit';


export const load: PageServerLoad = async ({locals, params}) => {
    const session = await locals.auth();
    if (!session?.user) {
        throw error(401, 'Please login to view events');
    }

    const user = await getUserByEmail(session?.user?.email!);

    const eventId = params.id;

    const form = await superValidate(
        zod(rsvpSchema.merge(
            z.object({
                eventId: z.string().default(eventId),
            })
        ))
    );

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

        // Get user's children
        const userChildren = await db.query.children.findMany({
            where: (wherechildren, {eq}) => eq(children.parentId, user?.id as string)
        });

        console.log('User children:', userChildren);

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

        const dietaryOptions = [
            'Vegetarian',
            'Vegan',
            'Halal',
            'Kosher',
            'Gluten-free',
            'Lactose-free'
        ];

        const updatedAddChildSchema = addChildSchema.merge(z.object({
            parentId: z.string().optional().default(user?.id as string)
        }))

        const addChildForm = await superValidate(
            zod(updatedAddChildSchema)
        );

        return {
            rsvpForm: form,
            event: enhancedEvent,
            children: userChildren,
            addChildForm,
            dietaryOptions,
        };
    } catch (err) {
        console.error('Error loading events:', err);
        throw error(500, 'Failed to load events');
    }
};

export const actions = {
    register: async ({request}) => {
        const addChildForm = await superValidate(request, zod(addChildSchema));

        // console.log("Add Child form: ", addChildForm);

        if (!addChildForm.valid) return fail(400, {addChildForm});

        await db.insert(children).values({
            ...addChildForm.data
        })

        return message(addChildForm, {text: "Child added successfully."});
    },
    rsvp: async ({request, locals}) => {
        const session = await locals.auth();
        if (!session?.user) {
            return fail(401, {message: 'Unauthorized'});
        }

        const user = await getUserByEmail(session?.user?.email!);

        const form = await superValidate(
            request,
            zod(rsvpSchema.merge(
                z.object({
                    transactionId: z.string().optional()
                })
            ))
        );

        if (!form.valid) {
            console.log('Invalid form:', form);
            return message(form, {text: 'Invalid form'}, {
                status: 400
            })
        }

        const formData = form.data;

        const eventId = formData.eventId?.toString();
        const childrenIds = formData.childrenIds.map(id => id.toString());

        let transaction: any;

        try {

            // Get event details
            const event = await db.query.events.findFirst({
                where: (events, {eq}) => eq(events.id, eventId),
                with: {
                    rsvps: true
                }
            });

            if (!event) {
                console.log('Event not found');
                return message(form, 'Event not found', {
                    status: 404
                });
            }

            if (event.status !== 'published') {
                console.log('Event not published');
                return message(form, 'Event not published', {
                    status: 400
                });
            }

            // Check capacity
            const confirmedCount = event.rsvps.filter(r => r.status === 'confirmed').length;
            const availableSpots = event.maxParticipants ? event.maxParticipants - confirmedCount : null;

            if (availableSpots && childrenIds.length > availableSpots) {
                console.log('Not enough spots available');
                return message(form, 'Not enough spots available', {
                    status: 400
                })
            }

            // Start a transaction
            if (event.price && event.price > 0) {
                // Create transaction record
                const amt = (event.price || 0) * childrenIds.length
                transaction = await db.insert(transactions).values({
                    amount: parseFloat(amt.toFixed(2)).toString(),
                    userId: user?.id as string,
                    status: 'pending',
                    reference: createId(),
                    type: 'payment',
                    description: `Registration for ${event.name}`,
                    metadata: {
                        eventId,
                        childrenIds
                    }
                }).returning().then(rows => rows[0]);

                // Create RSVPs
                const rsvpPromises = childrenIds.map(childId =>
                    db.insert(rsvps).values({
                        eventId,
                        childId,
                        parentId: user?.id as string,
                        status: 'pending',
                        transactionId: transaction.id,
                    })
                );

                await Promise.all(rsvpPromises);

            } else {
                // Create RSVPs without transaction
                const rsvpPromises = childrenIds.map(childId =>
                    db.insert(rsvps).values({
                        eventId,
                        childId,
                        parentId: session.user?.id as string,
                        status: 'confirmed'
                    })
                );

                await Promise.all(rsvpPromises);
            }
        } catch (err) {
            console.error('Error registering for event:', err);
            return message(form, `Error registering for event: ${err}`, {
                status: 500
            });
        }

        redirect(307, `/account/pay/${transaction.id}`);

    },

    cancelRegistration: async ({request, locals}) => {
        const session = await locals.auth();
        if (!session?.user) {
            return fail(401, {message: 'Unauthorized'});
        }

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
                    eq(rsvps.parentId, session.user?.id as string)
                ),
                with: {
                    transaction: true
                }
            });

            if (!existingRsvp) {
                return fail(404, {message: 'Registration not found'});
            }

            return await db.transaction(async (tx) => {
                // If there's an associated transaction, handle it
                if (existingRsvp.transaction) {
                    await tx.update(transactions)
                        .set({
                            status: 'cancelled',
                            updatedAt: new Date()
                        })
                        .where(eq(transactions.id, existingRsvp.transaction.id));
                }

                // Cancel the RSVP
                await tx.delete(rsvps)
                    .where(eq(rsvps.id, rsvpId));

                return {success: true};
            });

        } catch (err) {
            console.error('Error cancelling registration:', err);
            return fail(500, {message: 'Failed to cancel registration'});
        }
    }
};
