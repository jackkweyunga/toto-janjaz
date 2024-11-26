import * as z from "zod";

const tanzaniaRegex = /^0[6-9][0-9]{8}$/;
export const MAX_AGE = 17;
export const MIN_AGE = 7;

export const addChildSchema = z.object({
    fullName: z.string({
        required_error: "Please enter a name."
    }).min(2, {
        message: "Name must be at least 2 characters.",
    }),
    nickname: z.string().optional().nullable(),
    relationship: z.enum(['parent', 'guardian', 'sibling'], {
        required_error: "Please select a relationship."
    }),
    age: z.number().int().min(MIN_AGE).max(MAX_AGE).default(MIN_AGE),
    gender: z.enum(['male', 'female', 'other'], {
        required_error: "Please select a gender."
    }),
    allergies: z.enum(['yes', 'no']),
    medicalConditions: z.string().optional(),
    dietaryRestrictions: z.array(z.string()),
    medications: z.string().optional(),
    emergencyContact: z.string().regex(tanzaniaRegex, {
        message: "Please enter a valid phone number."
    }),
    parentId: z.string({
        required_error: "Parent ID is required."
    }),
});

export type AddChildSchema = typeof addChildSchema;


export const updateUserSchema = z.object({
    phone: z.string().nullable(),
    role: z.string({
        required_error: "Please provide the role"
    }).default("parent"),
    is_admin: z.boolean().default(false),
    userId: z.string()
})

export type UpdateUserSchema = typeof updateUserSchema;


export const addEventSchema = z.object({
    name: z.string({
        required_error: "Event name is required"
    }).min(5, {
        message: "Name should have more than 5 characters"
    }),
    status: z.enum(["draft", "archived", "published"]).default("draft"),
    description: z.string({
        required_error: "Event description is required"
    }).min(10, {
        message: "Description should have more that 10 characters"
    }),
    createdBy: z.string({
        required_error: "Created by is required"
    }),
    price: z.number().nullable(),
    startDate: z.date({
        required_error: "Start date is required"
    }).refine(x => x > new Date(), "Start date must be in the future"),
    endDate: z.date().nullable(),
    location: z.string({
        required_error: "Location is required"
    }).min(5, { message: "Location should have more that 5 characters"}),
    maxParticipants: z.number().min(1, { message: "Can not have less than 1 participant"}).nullable()
})

export type AddEventSchema = typeof addEventSchema

export const rsvpSchema = z.object({
    eventId: z.string().min(1, "Event ID is required"),
    childrenIds: z.array(z.string()).min(1, "Please select at least one child"),
    participation_permission: z.boolean()
        .refine(val => val, "You must agree to the participation permission"),
    media_permission: z.boolean()
        .refine(val => val, "You must agree to the media permission"),
    payment_currency: z.enum(["TZS", "USD"]).default("TZS"),
    payment_amount: z.number().default(0),
    payment_method: z.enum(["mobile", "bank"]).default("mobile"),
});

export type RsvpSchema = typeof rsvpSchema;




