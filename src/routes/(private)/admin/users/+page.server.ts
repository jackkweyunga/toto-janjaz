import {superValidate, message} from 'sveltekit-superforms';
import {addChildSchema} from "$lib/schema";
import {type Actions, fail} from '@sveltejs/kit';
import type {PageServerLoad} from "./$types";
import {getUserByEmail} from "$lib/server/db/actions";
import {z} from "zod";
import {zod} from "sveltekit-superforms/adapters";
import {db} from "$lib/server/db";
import {children, rsvps, users} from "$lib/server/db/schema";
import {eq} from "drizzle-orm";


export const load: PageServerLoad = async ({request, locals}) => {

    const session = await locals?.auth();

    const user = await getUserByEmail(session?.user?.email!);

    const _users = await db.query.users.findMany({
        with: {

        }
    }).prepare("users").execute();

    const data = {
        stats: {
            users: {
                count: _users.length,
            },
        },
        users: _users,
    }

    console.log(data)

    return data

};

// export const actions = {
//
// } satisfies Actions;
