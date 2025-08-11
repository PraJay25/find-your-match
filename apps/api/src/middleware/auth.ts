import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const requireAuth: RequestHandler = (req, res, next) => {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    (req as any).user = jwt.verify(token, env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

