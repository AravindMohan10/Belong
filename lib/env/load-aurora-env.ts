import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const AURORA_ENV_FILE = ".env.aurora";

export function getAuroraEnvPath(): string {
  return resolve(process.cwd(), AURORA_ENV_FILE);
}

export function auroraEnvFileExists(): boolean {
  return existsSync(getAuroraEnvPath());
}

function parseEnvValue(raw: string): string {
  const trimmed = raw.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

/** Load `.env.aurora` when present. Local Docker `DATABASE_URL` in `.env.local` wins if set. */
export function loadAuroraEnv(options?: { override?: boolean }): boolean {
  const path = getAuroraEnvPath();

  if (!existsSync(path)) {
    return false;
  }

  const override = options?.override ?? false;
  const content = readFileSync(path, "utf8");

  for (const line of content.split("\n")) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separator = trimmed.indexOf("=");

    if (separator === -1) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();
    const value = parseEnvValue(trimmed.slice(separator + 1));

    if (!override && process.env[key] !== undefined) {
      continue;
    }

    process.env[key] = value;
  }

  return true;
}
