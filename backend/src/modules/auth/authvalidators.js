// This file contains validation schemas for authentication-related operations using the Zod library.
import { z } from 'zod';

export const registerSchema = z.object({
    body: z.object({
        firstName: z.string().min(1, 'This field is required').trim(),
        lastName: z.string().min(1, 'This field is required').trim(),
        email: z.email('Invalid email address').toLowerCase().trim(),

        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must contain an uppercase letter")
            .regex(/[^a-zA-Z0-9]/, "Must contain a special character"),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.email('Invalid email address').toLowerCase().trim(),
        password: z.string().min(8, 'Password is required')
    })
});


export const forgotPasswordSchema = z.object({
    body: z.object({
        email: z.email('Invalid email address').toLowerCase().trim(),
    })
});

export const resetPasswordSchema = z.object({
    body: z.object({
        password: z.string().
            min(8, "Password must be at least 8 characters").
            regex(/[A-Z]/, "Must contain an uppercase letter").
            regex(/[0-9]/, "Must contain a number").
            regex(/[^a-zA-Z0-9]/, "Must contain a special character"),

        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    }),
    params: z.object({
        token: z.string().min(1, 'Reset token is required')
    })
});