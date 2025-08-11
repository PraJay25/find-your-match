import { z } from "zod";

export const HealthResponseSchema = z.object({ ok: z.boolean() });
export type HealthResponse = z.infer<typeof HealthResponseSchema>;

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({ token: z.string() });
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

