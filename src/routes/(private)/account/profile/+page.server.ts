import {superValidate, message} from 'sveltekit-superforms';
import {updateUserSchema} from "$lib/schema";
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
    const userFields = {role: user?.role as any, is_admin: user?.is_admin as boolean, phone: user?.phone as string}

    const updateProfileForm = await superValidate(
        userFields,
        zod(updateUserSchema.merge(z.object({
            userId: z.string().default(user?.id as any)
        })))
    );

    return {updateProfileForm};
};

export const actions = {
    update: async ({request, locals}) => {
        const userForm = await superValidate(request, zod(updateUserSchema));

        console.log("Edit user form: ", userForm);

        if (!userForm.valid) return fail(400, {userForm});
        const {userId, ...rest} = userForm.data;
        await db.update(users).set({
            ...rest,
            role: rest?.role as any
        }).where(
            eq(users.id, userId)
        )

        return message(userForm, {text: "User edited successfully."});
    }
} satisfies Actions;
