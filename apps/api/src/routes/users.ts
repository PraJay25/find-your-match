import { Router } from "express";
import { requireAuth } from "../middleware/auth";

export const router = Router();

router.get("/me", requireAuth, (req, res) => {
  const user = (req as any).user;
  res.json({ user });
});

