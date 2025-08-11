import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

const LoginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

export const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);
    // Demo user; replace with DB lookup
    const demo = { id: "1", email: "demo@example.com", passwordHash: await bcrypt.hash("password", 10) };
    if (email !== demo.email) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, demo.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ sub: demo.id, email: demo.email }, env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

