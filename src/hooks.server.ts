import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { handle as handler } from "./auth";

const authorization: Handle = async ({ event, resolve }) => {
    if (event.url.pathname.startsWith('/account')) {
        const session = await event.locals.auth()
        if (!session) {
            const next = encodeURIComponent(event.url.pathname + event.url.search)
            throw redirect(303, `/login?next=${next}`)
        }
    }

    if (event.url.pathname === '/login') {
        const session = await event.locals.auth()
        if (session) {
            const next = event.url.searchParams.get('next') || '/account'
            throw redirect(303, next)
        }
    }

    return resolve(event)
}


export const handle = sequence(handler, authorization)
