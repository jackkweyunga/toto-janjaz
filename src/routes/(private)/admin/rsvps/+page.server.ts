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

    const _rsvps = await db.query.rsvps.findMany({
        with: {
            event: true,
            child: {
                with: {
                    parent: true
                }
            },
            transaction: true,
            parent: true
        }
    }).prepare("rsvps").execute();

    const _children = await db.query.children.findMany({
        with: {
            parent: true
        }
    }).prepare("children").execute();

    const data = {
        stats: {
            rsvps: {
                count: _rsvps.length
            },
            children: {
                count: _children.length
            }
        },
        rsvps: _rsvps,
    }

    console.log(data)

    return data
};

// export const actions = {
//
// } satisfies Actions;
