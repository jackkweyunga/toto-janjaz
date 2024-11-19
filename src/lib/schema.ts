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