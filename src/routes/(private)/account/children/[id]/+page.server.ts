import {superValidate, message} from 'sveltekit-superforms';
import {addChildSchema} from "$lib/schema";
import {type Actions, fail} from '@sveltejs/kit';
import type {PageServerLoad} from "./$types";
import {getUserByEmail} from "$lib/server/db/actions";
import {z} from "zod";
import {zod} from "sveltekit-superforms/adapters";
import {db} from "$lib/server/db";
import {children, users} from "$lib/server/db/schema";
import {and, eq} from "drizzle-orm";


export const load: PageServerLoad = async ({request, locals, params}) => {
    const session = await locals?.auth();
    const user = await getUserByEmail(session?.user?.email!);
    const child_id = params.id

    const child = await db.query.children.findFirst({
        where: and(
            eq(children.id, child_id),
            eq(children.parentId, user?.id as any)
        )
    })

    if (!child) fail(404, { message: "Child does not exist"})

    const updateChildForm = await superValidate(
        child as any,
        zod(addChildSchema.merge(z.object({
            parentId: z.string().optional().default(user?.id as string),
            id: z.string()
        })))
    );

    const dietaryOptions = [
        'Vegetarian',
        'Vegan',
        'Halal',
        'Kosher',
        'Gluten-free',
        'Lactose-free'
    ];

    return {updateChildForm, dietaryOptions};

};

export const actions = {
    update: async ({request}) => {
        const addChildForm = await superValidate(request, zod(
            addChildSchema.merge(z.object({
                parentId: z.string().optional(),
                id: z.string()
            }))
        ));

        console.log("Edit Child form: ", addChildForm);

        const {id, ...rest} = addChildForm.data;

        await db.update(children).set({
            ...rest
        }).where(eq(children.id, id))

        if (!addChildForm.valid) return fail(400, {addChildForm});

        return message(addChildForm, {text: "Child edited successfully."});
    }
} satisfies Actions;
