import { Signer } from "@aws-sdk/rds-signer";

export function getAwsCredentials() {
  const accessKeyId = stripEnvValue(process.env.AWS_ACCESS_KEY_ID);
  const secretAccessKey = stripEnvValue(process.env.AWS_SECRET_ACCESS_KEY);

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      "Missing AWS credentials. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.",
    );
  }

  return { accessKeyId, secretAccessKey };
}

function stripEnvValue(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

export function createRdsSigner(input: {
  hostname: string;
  port: number;
  username: string;
  region: string;
}): Signer {
  return new Signer({
    hostname: input.hostname,
    port: input.port,
    username: input.username,
    region: input.region,
    credentials: getAwsCredentials(),
  });
}
