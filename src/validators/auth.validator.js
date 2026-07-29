const { z } = require("zod");

const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(72, "Password must not exceed 72 characters"),
});

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .transform((email) => email.toLowerCase()),
  password: z.string().min(1, "Password is required"),
});

module.exports = { signupSchema, loginSchema };