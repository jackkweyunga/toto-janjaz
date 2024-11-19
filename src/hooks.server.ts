import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { handle as handler } from "./auth";

const authorization: Handle = async ({ event, resolve }) => {
    // Protect any routes under /account
    // console.log(event.url.pathname)
    if (event.url.pathname.startsWith('/account')) {
        const session = await event.locals.auth()
        if (!session) {
            throw redirect(303, '/login')
        }
    }

    // Redirect from login page if already signed in
    if (event.url.pathname === '/login') {
        const session = await event.locals.auth()
        if (session) {
            throw redirect(303, '/account')
        }
    }

    return resolve(event)
}


export const handle = sequence(handler, authorization)
