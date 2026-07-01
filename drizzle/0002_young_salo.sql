ALTER TABLE "clubs" ADD COLUMN "city" text;--> statement-breakpoint
ALTER TABLE "clubs" ADD COLUMN "neighborhood" text;--> statement-breakpoint
ALTER TABLE "clubs" ADD COLUMN "latitude" real;--> statement-breakpoint
ALTER TABLE "clubs" ADD COLUMN "longitude" real;--> statement-breakpoint
ALTER TABLE "clubs" ADD COLUMN "personas" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
UPDATE "clubs"
SET
  "city" = 'Brooklyn, NY',
  "neighborhood" = 'Local',
  "latitude" = 40.6782,
  "longitude" = -73.9442,
  "personas" = '[]'::jsonb
WHERE "city" IS NULL;--> statement-breakpoint
ALTER TABLE "clubs" ALTER COLUMN "city" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "clubs" ALTER COLUMN "neighborhood" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "clubs" ALTER COLUMN "latitude" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "clubs" ALTER COLUMN "longitude" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "clubs" ALTER COLUMN "personas" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "city" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "latitude" real;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "longitude" real;--> statement-breakpoint
CREATE INDEX "clubs_city_idx" ON "clubs" USING btree ("city");
