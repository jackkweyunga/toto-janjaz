import {superValidate, message} from 'sveltekit-superforms';
import {type AddEventSchema, addEventSchema} from "$lib/schema";
import {type Actions, fail} from '@sveltejs/kit';
import type {PageServerLoad} from "./$types";
import {getUserByEmail} from "$lib/server/db/actions";
import {z} from "zod";
import {zod} from "sveltekit-superforms/adapters";
import {db} from "$lib/server/db";
import {events} from "$lib/server/db/schema";
import {eq} from "drizzle-orm";


export const load: PageServerLoad = async ({request, locals, params}) => {
    const session = await locals?.auth();
    const user = await getUserByEmail(session?.user?.email!);
    const event_id = params.id;

    const event = await db.query.events.findFirst({
        where: eq(events.id, event_id)
    })

    if (event === undefined) {
        fail(404, {message: "Event not found"})
    }

    const editEventForm = await superValidate(
        event,
        zod(addEventSchema.merge(z.object({
            id: z.string().default(event?.id as string)
        })))
    );

    const eventStates = [
        'draft',
        'published',
        'archived',
    ];

    return {editEventForm, eventStates};
};

export const actions = {
    edit: async ({request}) => {
        const addEventForm = await superValidate(request, zod(addEventSchema.merge(z.object({
            id: z.string()
        }))));

        console.log("Edit event form: ", addEventForm);

        if (!addEventForm.valid) return fail(400, {addEventForm});

        const {id, ...rest} = addEventForm.data;

        await db.update(events).set({
            ...rest
        }).where(eq(events.id, id))

        return message(addEventForm, {text: "Event edited successfully."});
    }
} satisfies Actions;
