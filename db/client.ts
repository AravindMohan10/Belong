import { createRdsSigner } from "@/db/aws-credentials";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, type PoolConfig } from "pg";
import { getDatabaseConfig } from "@/db/config";
import * as schema from "./schema";

let pool: Pool | null = null;
let poolExpiresAt = 0;

export { isDatabaseConfigured } from "@/db/config";

function poolOptionsFromUrl(databaseUrl: string): PoolConfig {
  const isProduction = process.env.NODE_ENV === "production";
  const needsSsl =
    isProduction ||
    databaseUrl.includes("sslmode=require") ||
    databaseUrl.includes("ssl=true");

  return {
    connectionString: databaseUrl,
    max: isProduction ? 1 : 10,
    idleTimeoutMillis: isProduction ? 5_000 : 30_000,
    connectionTimeoutMillis: 15_000,
    ...(needsSsl ? { ssl: { rejectUnauthorized: false } } : {}),
  };
}

async function poolOptionsFromIam(): Promise<PoolConfig> {
  const config = getDatabaseConfig();

  if (!config || config.mode !== "iam") {
    throw new Error("IAM pool options require IAM database configuration.");
  }

  const signer = createRdsSigner({
    hostname: config.host,
    port: config.port,
    username: config.user,
    region: config.region,
  });

  const token = await signer.getAuthToken();
  poolExpiresAt = Date.now() + 14 * 60 * 1000;

  const isProduction = process.env.NODE_ENV === "production";

  return {
    host: config.host,
    port: config.port,
    user: config.user,
    password: token,
    database: config.database,
    max: isProduction ? 1 : 5,
    idleTimeoutMillis: isProduction ? 5_000 : 30_000,
    connectionTimeoutMillis: 15_000,
    maxLifetimeSeconds: 600,
    ssl: { rejectUnauthorized: false },
  };
}

function isAuthError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();
  return message.includes("pam authentication failed") || message.includes("28p01");
}

async function createPool(): Promise<Pool> {
  const config = getDatabaseConfig();

  if (!config) {
    throw new Error(
      "Database is not configured. See docs/database-setup.md or docs/deploy-production.md.",
    );
  }

  const nextPool =
    config.mode === "url"
      ? new Pool(poolOptionsFromUrl(config.url))
      : new Pool(await poolOptionsFromIam());

  await nextPool.query("SELECT 1");
  return nextPool;
}

function isIamPoolStale(): boolean {
  const config = getDatabaseConfig();
  return config?.mode === "iam" && pool !== null && Date.now() >= poolExpiresAt;
}

async function resetPool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export async function getDb() {
  if (!pool || isIamPoolStale()) {
    await resetPool();
    pool = await createPool();
  }

  return drizzle(pool, { schema });
}

export async function withDbRetry<T>(
  run: (db: Awaited<ReturnType<typeof getDb>>) => Promise<T>,
): Promise<T> {
  try {
    return await run(await getDb());
  } catch (error) {
    if (!isAuthError(error)) {
      throw error;
    }

    await resetPool();
    pool = await createPool();
    return run(await getDb());
  }
}
