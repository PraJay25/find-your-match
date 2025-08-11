import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import pino from "pino";
import pinoHttp from "pino-http";
import { errorHandler } from "./middleware/error";
import { router as health } from "./routes/health";
import { router as auth } from "./routes/auth";
import { router as users } from "./routes/users";

const logger = pino();
export const app = express();

app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(compression());
app.use(express.json());
app.use(rateLimit({ windowMs: 60_000, max: 120 }));

app.use("/health", health);
// Friendly landing page for root
app.get("/", (_req, res) => {
  res.type("html").send(`<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>FindYourMatch API</title>
      <style>
        body { font-family: -apple-system, system-ui, Segoe UI, Roboto, sans-serif; padding: 2rem; }
        a { color: #2563eb; text-decoration: none; }
      </style>
    </head>
    <body>
      <h1>FindYourMatch API</h1>
      <p>The API is running. This backend serves JSON for the mobile app.</p>
      <ul>
        <li><a href="/health">Health</a></li>
        <li><code>POST /auth/login</code> with { email, password } (demo user: demo@example.com / password)</li>
        <li><code>GET /users/me</code> with Authorization: Bearer &lt;token&gt;</li>
      </ul>
    </body>
  </html>`);
});
app.use("/auth", auth);
app.use("/users", users);

app.use(errorHandler);

