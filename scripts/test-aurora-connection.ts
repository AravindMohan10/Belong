import { DescribeDBClustersCommand, RDSClient } from "@aws-sdk/client-rds";
import { GetCallerIdentityCommand, STSClient } from "@aws-sdk/client-sts";
import pg from "pg";
import { createRdsSigner } from "@/db/aws-credentials";
import { getAwsCredentials } from "@/db/aws-credentials";
import { getDatabaseConfig } from "@/db/config";
import { loadAuroraEnv } from "@/lib/env/load-aurora-env";

async function printIamDiagnostics(region: string, dbUser: string) {
  const credentials = getAwsCredentials();
  const sts = new STSClient({ region, credentials });
  const identity = await sts.send(new GetCallerIdentityCommand({}));

  console.log("AWS caller:", identity.Arn);
  console.log("Account ID:", identity.Account);

  try {
    const rds = new RDSClient({ region, credentials });
    const clusters = await rds.send(
      new DescribeDBClustersCommand({
        DBClusterIdentifier: "database-1",
      }),
    );
    const cluster = clusters.DBClusters?.[0];

    if (cluster?.DbClusterResourceId) {
      const resourceArn = `arn:aws:rds-db:${region}:${identity.Account}:dbuser:${cluster.DbClusterResourceId}/${dbUser}`;
      console.log("Cluster resource ID:", cluster.DbClusterResourceId);
      console.log("IAM policy Resource should be exactly:");
      console.log(resourceArn);
      console.log("IAM auth enabled on cluster:", cluster.IAMDatabaseAuthenticationEnabled);
    }
  } catch (error) {
    console.log(
      "Could not describe cluster (add rds:DescribeDBClusters to belong-vercel, or run in CloudShell):",
      error instanceof Error ? error.message : error,
    );
    console.log(
      "CloudShell: aws rds describe-db-clusters --db-cluster-identifier database-1 --region us-east-2 --query 'DBClusters[0].DbClusterResourceId' --output text",
    );
  }
}

async function main() {
  loadAuroraEnv({ override: true });
  const config = getDatabaseConfig();

  if (!config || config.mode !== "iam") {
    throw new Error("IAM config required in .env.aurora");
  }

  console.log("Database host:", config.host);
  console.log("Database user:", config.user);
  await printIamDiagnostics(config.region, config.user);

  const signer = createRdsSigner({
    hostname: config.host,
    port: config.port,
    username: config.user,
    region: config.region,
  });
  const token = await signer.getAuthToken();
  console.log("IAM auth token generated (length):", token.length);

  const pool = new pg.Pool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: token,
    database: config.database,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15_000,
  });

  try {
    const result = await pool.query("SELECT 1 AS ok");
    console.log("Connected:", result.rows);
  } catch (error) {
    console.error("\nConnection failed.");
    if (error instanceof Error && error.message.includes("PAM authentication failed")) {
      console.error(`
This usually means the IAM policy on belong-vercel is wrong.

Fix:
1. IAM → Policies → belong-aurora-connect → Edit JSON
2. Set Resource to the ARN printed above (cluster-XXXX, not database-1)
3. Save, wait 1 minute, run: npm run db:test:aurora

Also test in CloudShell (uses your console login, not belong-vercel keys):
  export RDSHOST="${config.host}"
  psql "host=$RDSHOST port=5432 dbname=postgres user=postgres sslmode=require password=$(aws rds generate-db-auth-token --hostname $RDSHOST --port 5432 --username postgres --region ${config.region})"
`);
    }
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
