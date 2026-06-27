import { Signer } from "@aws-sdk/rds-signer";

export function getAwsCredentials() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY?.trim();

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      "Missing AWS credentials. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in .env.aurora. Quote the secret if it contains / or +.",
    );
  }

  return { accessKeyId, secretAccessKey };
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
