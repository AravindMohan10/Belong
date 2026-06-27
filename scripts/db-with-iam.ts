import { spawnSync } from "node:child_process";
import { auroraEnvFileExists, loadAuroraEnv } from "@/lib/env/load-aurora-env";

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: tsx scripts/db-with-iam.ts <command> [args...]");
    process.exit(1);
  }

  if (!auroraEnvFileExists()) {
    console.error(
      "Missing .env.aurora — run: cp env.aurora.example .env.aurora and add your AWS keys.",
    );
    process.exit(1);
  }

  loadAuroraEnv({ override: true });

  const { buildIamDatabaseUrl } = await import("@/db/config");
  process.env.DATABASE_URL = await buildIamDatabaseUrl();

  const result = spawnSync(args[0], args.slice(1), {
    stdio: "inherit",
    env: process.env,
    shell: false,
  });

  process.exit(result.status ?? 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
