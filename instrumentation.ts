import { loadAuroraEnv } from "@/lib/env/load-aurora-env";

export async function register() {
  if (!process.env.DATABASE_URL) {
    loadAuroraEnv();
  }
}
