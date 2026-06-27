import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { config } from "dotenv";

const AURORA_ENV_FILE = ".env.aurora";

export function getAuroraEnvPath(): string {
  return resolve(process.cwd(), AURORA_ENV_FILE);
}

export function auroraEnvFileExists(): boolean {
  return existsSync(getAuroraEnvPath());
}

/** Load `.env.aurora` when present. Local Docker `DATABASE_URL` in `.env.local` wins if set. */
export function loadAuroraEnv(options?: { override?: boolean }): boolean {
  const path = getAuroraEnvPath();

  if (!existsSync(path)) {
    return false;
  }

  config({ path, override: options?.override ?? false });
  return true;
}
