import {superValidate, message} from 'sveltekit-superforms';
import {addChildSchema} from "$lib/schema";
import {type Actions, fail} from '@sveltejs/kit';
import type {PageServerLoad} from "./$types";
import {getUserByEmail} from "$lib/server/db/actions";
import {z} from "zod";
import {zod} from "sveltekit-superforms/adapters";
import {db} from "$lib/server/db";
import {children, users} from "$lib/server/db/schema";
import {eq} from "drizzle-orm";


export const load: PageServerLoad = async ({request, locals}) => {
    const session = await locals?.auth();
    const user = await getUserByEmail(session?.user?.email!);

    const updatedAddChildSchema = addChildSchema.merge(z.object({
        parentId: z.string().optional().default(user?.id as string)
    }))

    const addChildForm = await superValidate(
        zod(updatedAddChildSchema)
    );

    const updateChildForm = await superValidate(
        zod(updatedAddChildSchema)
    );

    const dietaryOptions = [
        'Vegetarian',
        'Vegan',
        'Halal',
        'Kosher',
        'Gluten-free',
        'Lactose-free'
    ];

    const _children = await db.query.children.findMany({
        where: eq(children.parentId, user?.id as string)
    }).prepare("children").execute();

    return {addChildForm, dietaryOptions, children: _children};
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
    edit: async ({request}) => {
        const addChildForm = await superValidate(request, zod(addChildSchema));

        console.log("Edit Child form: ", addChildForm);

        if (!addChildForm.valid) return fail(400, {addChildForm});

        return message(addChildForm, {text: "Child edited successfully."});
    }
} satisfies Actions;
