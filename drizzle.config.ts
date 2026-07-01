import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "drizzle-kit";

function loadEnvFile(filename: string): void {
  const filePath = path.join(process.cwd(), filename);

  if (!existsSync(filePath)) {
    return;
  }

  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separator = trimmed.indexOf("=");

    if (separator === -1) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();

    if (process.env[key] !== undefined) {
      continue;
    }

    process.env[key] = trimmed.slice(separator + 1).trim();
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
