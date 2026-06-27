# Deploy Belong to Vercel + Aurora PostgreSQL

Local Docker stays the same for day-to-day dev. Production uses Aurora.

## Two Aurora connectivity modes

| Setup | Auth | Vercel env |
|-------|------|------------|
| **Classic VPC + public access** | Master password in `DATABASE_URL` | `DATABASE_URL` only |
| **Internet Access Gateway (IAG)** | **IAM only** — password auth is blocked by AWS | `DATABASE_IAM_AUTH` + AWS keys (see below) |

If your cluster shows **Internet access gateway: Enabled**, you **must** use IAM auth. Password login will fail with `PAM authentication failed`.

---

## Checklist

- [ ] Aurora PostgreSQL cluster **Available**
- [ ] Inbound **5432** allowed (if using VPC security group)
- [ ] Migrations + seed applied to Aurora
- [ ] Vercel env vars set → redeploy
- [ ] `/enter` shows Alex / Mara personas
- [ ] Sign in as Mara → host **Tonight** view loads

---

## Path A — Internet Access Gateway (your `database-1` cluster)

### 1. Create an IAM user for Belong

IAM → **Users** → **Create user** → e.g. `belong-vercel`

Attach an inline policy (replace `ACCOUNT_ID` and `CLUSTER_RESOURCE_ID`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "rds-db:connect",
      "Resource": "arn:aws:rds-db:us-east-2:ACCOUNT_ID:dbuser:CLUSTER_RESOURCE_ID/postgres"
    }
  ]
}
```

Find **CLUSTER_RESOURCE_ID** on the RDS cluster page → **Configuration** → **Resource ID** (looks like `cluster-ABCDEFGHIJKL`, not `database-1`).

Create **Access keys** for this user. Save `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

### 2. Test connection (CloudShell or your Mac with `aws configure`)

```bash
export RDSHOST="database-1.cluster-cjymewgyahkl.us-east-2.rds.amazonaws.com"

psql "host=$RDSHOST port=5432 dbname=postgres user=postgres sslmode=require password=$(aws rds generate-db-auth-token --hostname $RDSHOST --port 5432 --username postgres --region us-east-2)"
```

You should get a `postgres=>` prompt.

### 3. Migrate and seed (your Mac, with AWS credentials)

```bash
cp env.aurora.example .env.aurora
# Edit .env.aurora — add AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

npm run db:migrate:iam
npm run db:seed:iam
```

### 4. Vercel environment variables

Add for **Production** and **Preview** (do **not** set `DATABASE_URL` for IAG):

| Name | Value |
|------|-------|
| `DATABASE_IAM_AUTH` | `true` |
| `DATABASE_HOST` | `database-1.cluster-cjymewgyahkl.us-east-2.rds.amazonaws.com` |
| `DATABASE_USER` | `postgres` |
| `DATABASE_NAME` | `postgres` |
| `AWS_REGION` | `us-east-2` |
| `AWS_ACCESS_KEY_ID` | from IAM user |
| `AWS_SECRET_ACCESS_KEY` | from IAM user |

Deploy → open `/enter`.

---

## Path B — Classic Aurora (password auth)

Use this for **new** clusters **without** Internet Access Gateway.

1. [RDS → Create database](https://console.aws.amazon.com/rds/home#create-database:) → Aurora PostgreSQL
2. **Self managed** master password (no IAG / use standard VPC + **Public access: Yes**)
3. Security group: inbound PostgreSQL **5432** from `0.0.0.0/0`
4. Connection string:

```text
postgresql://USER:PASSWORD@CLUSTER.region.rds.amazonaws.com:5432/postgres?sslmode=require
```

5. Migrate:

```bash
export DATABASE_URL='postgresql://...'
npm run db:migrate
npm run db:seed
```

6. Vercel: set `DATABASE_URL` only.

---

## Hackathon submission assets

1. **AWS Console** — Aurora cluster (Available, engine, endpoint)
2. **Vercel** — env vars (redact secrets)
3. **Architecture diagram** — User → Vercel → Aurora PostgreSQL (IAM auth if IAG)
4. **Demo video** — landing → club → `/enter` → host view
5. **Text** — “Amazon Aurora PostgreSQL via Drizzle ORM”

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `PAM authentication failed` | IAG cluster — use IAM token, not password |
| `IAM DB authentication required when Internet Access Gateway is enabled` | Cannot disable IAM on IAG; use Path A |
| `connect ETIMEDOUT` | Security group / public access |
| `/enter` shows setup instructions | Missing `DATABASE_IAM_AUTH` + host or `DATABASE_URL` in Vercel |
| `rds-db:connect` denied | Fix IAM policy resource ID and username |
| Auth 500 after deploy | Run `db:migrate:iam` and `db:seed:iam` |

Local dev (unchanged):

```bash
docker compose up -d
# .env.local → DATABASE_URL=postgresql://belong:belong@localhost:5432/belong
npm run db:migrate && npm run db:seed
npm run dev
```
