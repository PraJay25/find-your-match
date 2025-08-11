import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";
import { app } from "./app";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(3000)
});

const env = EnvSchema.parse(process.env);

app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on :${env.PORT}`);
});

