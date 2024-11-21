import {
    pgTable, serial, boolean,
    timestamp,
    text,
    primaryKey,
    integer, varchar, pgEnum, decimal, jsonb
} from 'drizzle-orm/pg-core';
import {relations} from 'drizzle-orm';
import {createId} from '@paralleldrive/cuid2';


// Enums
export const userRoleEnum = pgEnum('user_role', ['parent', 'admin']);
export const eventStatusEnum = pgEnum("event_status", ['draft', 'published', 'archived'])
export const genderEnum = pgEnum('gender', ['male', 'female', 'other']);
export const relationshipEnum = pgEnum('relationship', ['parent', 'guardian', 'sibling', 'other']);
// Enums for transactions
export const transactionStatusEnum = pgEnum('transaction_status', [
    'pending',
    'processing',
    'completed',
    'failed',
    'refunded',
    'partially_refunded',
    'cancelled'
]);

export const transactionTypeEnum = pgEnum('transaction_type', [
    'payment',
    'refund',
    'credit',
    'adjustment'
]);

export const paymentMethodEnum = pgEnum('payment_method', [
    'credit_card',
    'debit_card',
    'bank_transfer',
    'cash',
    'check',
    'wallet',
    'other'
]);

export const currencyEnum = pgEnum('currency', ['USD', 'EUR', 'GBP', 'CAD', 'AUD']);

// Auth tables
export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => createId()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", {mode: "date"}),
    image: text("image"),
    role: userRoleEnum('role').default('parent').notNull(),
    is_admin: boolean("is_admin").default(false),
    phone: text("phone"),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, {onDelete: "cascade"}),
        type: text("type").$type<any>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
)

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, {onDelete: "cascade"}),
    expires: timestamp("expires", {mode: "date"}).notNull(),
})

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", {mode: "date"}).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    })
)

export const authenticators = pgTable(
    "authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        userId: text("userId")
            .notNull()
            .references(() => users.id, {onDelete: "cascade"}),
        providerAccountId: text("providerAccountId").notNull(),
        credentialPublicKey: text("credentialPublicKey").notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: text("credentialDeviceType").notNull(),
        credentialBackedUp: boolean("credentialBackedUp").notNull(),
        transports: text("transports"),
    },
    // (authenticator) => ({
    //     compositePK: primaryKey({
    //         columns: [authenticator.userId, authenticator.credentialID],
    //     }),
    // }
    // )
)


// Children table
export const children = pgTable('children', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    parentId: text('parent_id').notNull().references(() => users.id),
    fullName: varchar('full_name', {length: 255}).notNull(),
    nickname: varchar('nickname', {length: 100}),
    age: integer('age'),
    gender: genderEnum('gender'),
    allergies: text('allergies'),
    medicalConditions: text('medical_conditions'),
    dietaryRestrictions: text('dietary_restrictions').array(),
    medications: text('medications'),
    emergencyContact: varchar('emergency_contact', {length: 20}),
    relationship: relationshipEnum('relationship').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Events table
export const events = pgTable('events', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    name: varchar('name', {length: 255}).notNull(),
    status: eventStatusEnum('status').default('draft').notNull(),
    createdBy: text('created_by').notNull().references(() => users.id),
    description: text('description').notNull(),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date'),
    location: varchar('location', {length: 255}).notNull(),
    maxParticipants: integer('max_participants'),
    requiresPayment: boolean('requires_payment').default(false),
    price: integer('price'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});


// Transactions table
export const transactions = pgTable('transactions', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    // Basic transaction info
    amount: decimal('amount', {precision: 10, scale: 2}).notNull(),
    currency: currencyEnum('currency').default('USD').notNull(),
    status: transactionStatusEnum('status').default('pending').notNull(),
    type: transactionTypeEnum('type').default('payment').notNull(),

    // References
    userId: text('user_id')
        .notNull()
        .references(() => users.id),

    // Payment details
    paymentMethod: paymentMethodEnum('payment_method'),

    // Transaction metadata
    description: text('description'),
    metadata: jsonb('metadata').$type<Record<string, unknown>>(),

    // Timestamps
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    completedAt: timestamp('completed_at'),
});

// RSVPs table
export const rsvps = pgTable('rsvps', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    eventId: text('event_id').notNull().references(() => events.id),
    childId: text('child_id').notNull().references(() => children.id),
    parentId: text('parent_id').notNull().references(() => users.id),
    status: varchar('status', {length: 20}).notNull(),
    additionalInfo: text('additional_info'),
    transactionId: text('transaction_id').references(() => transactions.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const transactionsRelations = relations(transactions, ({one, many}) => ({
    user: one(users, {
        fields: [transactions.userId],
        references: [users.id],
    }),
}));

// Update RSVP table to reference transaction
export const rsvpsRelations = relations(rsvps, ({one}) => ({
    event: one(events, {
        fields: [rsvps.eventId],
        references: [events.id],
    }),
    child: one(children, {
        fields: [rsvps.childId],
        references: [children.id],
    }),
    parent: one(users, {
        fields: [rsvps.parentId],
        references: [users.id],
    }),
    transaction: one(transactions, {
        fields: [rsvps.transactionId],
        references: [transactions.id],
    }),
}));

// Relations
export const usersRelations = relations(users, ({many}) => ({
    children: many(children),
}));

export const childrenRelations = relations(children, ({one, many}) => ({
    parent: one(users, {
        fields: [children.parentId],
        references: [users.id],
    }),
    rsvps: many(rsvps),
}));

export const eventsRelations = relations(events, ({many}) => ({
    rsvps: many(rsvps),
}));


