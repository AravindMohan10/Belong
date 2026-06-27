import { createRdsSigner } from "@/db/aws-credentials";

export type DatabaseConfig =
  | { mode: "url"; url: string }
  | {
      mode: "iam";
      host: string;
      user: string;
      database: string;
      port: number;
      region: string;
    };

export function getDatabaseConfig(): DatabaseConfig | null {
  if (process.env.DATABASE_URL) {
    return { mode: "url", url: process.env.DATABASE_URL };
  }

  if (process.env.DATABASE_IAM_AUTH === "true" && process.env.DATABASE_HOST) {
    return {
      mode: "iam",
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER ?? "postgres",
      database: process.env.DATABASE_NAME ?? "postgres",
      port: Number(process.env.DATABASE_PORT ?? 5432),
      region:
        process.env.AWS_REGION ??
        process.env.AWS_DEFAULT_REGION ??
        "us-east-2",
    };
  }

  return null;
}

export function isDatabaseConfigured(): boolean {
  return getDatabaseConfig() !== null;
}

export async function buildIamDatabaseUrl(): Promise<string> {
  const config = getDatabaseConfig();

  if (!config || config.mode !== "iam") {
    throw new Error(
      "IAM database URL requires DATABASE_IAM_AUTH=true and DATABASE_HOST.",
    );
  }

  const signer = createRdsSigner({
    hostname: config.host,
    port: config.port,
    username: config.user,
    region: config.region,
  });

  const token = await signer.getAuthToken();
  const encodedToken = encodeURIComponent(token);

  return `postgresql://${config.user}:${encodedToken}@${config.host}:${config.port}/${config.database}?sslmode=require`;
}
