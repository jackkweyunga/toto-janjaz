import type {PageServerLoad} from "./$types";
import {getUserByEmail} from "$lib/server/db/actions";
import {db} from "$lib/server/db";
import {children, rsvps, users} from "$lib/server/db/schema";
import {eq} from "drizzle-orm";


export const load: PageServerLoad = async ({request, locals}) => {

    const session = await locals?.auth();

    const user = await getUserByEmail(session?.user?.email!);

    const _rsvps = await db.query.rsvps.findMany({
        where: eq(rsvps.parentId, user?.id as string),
        with: {
            event: true,
            child: true,
            transaction: true
        }
    }).prepare("rsvps").execute();

    const _children = await db.query.children.findMany({
        where: eq(children.parentId, user?.id as string)
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
