import {db} from "$lib/server/db/index";
import {eq} from "drizzle-orm";
import {users} from "$lib/server/db/schema";


export async function getUserByEmail(email: string) {
    return await db.query.users.findFirst({
        where: eq(users.email, email!)
    }).prepare("user").execute()
}