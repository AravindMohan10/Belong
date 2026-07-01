ALTER TABLE "clubs" ADD COLUMN "voice" jsonb;--> statement-breakpoint
UPDATE "clubs"
SET "voice" = '{
  "ritualTitle": "The ritual",
  "promiseEyebrow": "First-timer promise",
  "promiseHeadline": "Someone saved you a seat.",
  "expectEyebrow": "What to expect",
  "expectHeadline": "The rhythm of the night",
  "memoriesEyebrow": "Memories",
  "memoriesHeadline": "Nights that brought people back",
  "hostEyebrow": "Your host"
}'::jsonb
WHERE "voice" IS NULL;--> statement-breakpoint
ALTER TABLE "clubs" ALTER COLUMN "voice" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "clubs" DROP COLUMN "personas";
