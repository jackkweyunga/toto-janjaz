import type { LayoutServerLoad } from "./$types"
import {getUserByEmail} from "$lib/server/db/actions";

export const load: LayoutServerLoad = async (event) => {
    const session = await event.locals.auth()
    const user = await getUserByEmail(session?.user?.email!)
    return {
        session,
        user
    }

}

