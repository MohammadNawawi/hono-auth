import { z } from "zod";

export const registerValidator = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .max(50, "Email must be less than 50 characters")
    .email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginValidator = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
