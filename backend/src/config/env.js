import { z } from "zod";

const envSchema = z.object({


  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().default("5000").transform(Number),
  CLIENT_URL: z.string().url("CLIENT_URL must be a valid URL"),


  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),

  JWT_ACCESS_SECRET: z
    .string()
    .min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),
});
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(" Invalid environment variables:\n");

  // Format each error clearly — field name + what's wrong
  parsed.error.errors.forEach((err) => {
    console.error(`   • ${err.path.join(".")}: ${err.message}`);
  });

  console.error("\n   Fix the above in your .env file and restart.\n");
  process.exit(1); // hard stop — app must not run with broken config
}

export const env = parsed.data;