import type { LayoutServerLoad } from "./$types"
import {getUserByEmail} from "$lib/server/db/actions";
import {redirect} from "@sveltejs/kit";

export const load: LayoutServerLoad = async (event) => {
    const session = await event.locals.auth()
    const user = await getUserByEmail(session?.user?.email!)

    if (!user?.is_admin) {
        return redirect(303, '/account')
    }

    return {
        session,
        user
    }

}

