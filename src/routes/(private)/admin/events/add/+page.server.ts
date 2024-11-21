import {superValidate, message} from 'sveltekit-superforms';
import { type AddEventSchema, addEventSchema} from "$lib/schema";
import {type Actions, fail} from '@sveltejs/kit';
import type {PageServerLoad} from "./$types";
import {getUserByEmail} from "$lib/server/db/actions";
import {z} from "zod";
import {zod} from "sveltekit-superforms/adapters";
import {db} from "$lib/server/db";
import {children, events, users} from "$lib/server/db/schema";
import {eq} from "drizzle-orm";


export const load: PageServerLoad = async ({request, locals, params}) => {
    const session = await locals?.auth();
    const user = await getUserByEmail(session?.user?.email!);

    const addEventForm = await superValidate(
        zod(addEventSchema.merge(z.object({
            createdBy: z.string().default(user?.id as string)
        })))
    );

    const eventStates = [
        'draft',
        'published',
        'archived',
    ];

    return {addEventForm, eventStates};
};

export const actions = {
    register: async ({request}) => {
        const addEventForm = await superValidate(request, zod(addEventSchema));

        console.log("Add event form: ", addEventForm);

        if (!addEventForm.valid) return fail(400, {addEventForm});

        await db.insert(events).values({
            ...addEventForm.data
        })

        return message(addEventForm, "Event added successfully.");
    }
} satisfies Actions;
