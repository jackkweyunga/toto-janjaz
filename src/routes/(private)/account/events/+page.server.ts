import type {PageServerLoad} from "./$types";
import {getUserByEmail} from "$lib/server/db/actions";
import {db} from "$lib/server/db";
import {events} from "$lib/server/db/schema";
import {eq} from "drizzle-orm";

export const load: PageServerLoad = async ({request, locals}) => {
    const session = await locals?.auth();
    const user = await getUserByEmail(session?.user?.email!);

    const _events = await db.query.events.findMany({
        where: eq(events.createdBy, user?.id as string)
    }).prepare("events").execute();

    return { events: _events };
};
