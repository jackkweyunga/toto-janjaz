
import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/sveltekit/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import {db} from "$lib/server/db";
import {verificationTokens, accounts, users, sessions} from "$lib/server/db/schema";

export const { handle, signIn, signOut } = SvelteKitAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    providers: [Google],
}) 