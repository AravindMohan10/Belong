ALTER TABLE "club_memories" ADD COLUMN "review" text;--> statement-breakpoint
ALTER TABLE "club_memories" ADD COLUMN "reviewer_name" text;--> statement-breakpoint
ALTER TABLE "club_memories" ADD COLUMN "photo_urls" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
UPDATE "club_memories"
SET
  "review" = "excerpt",
  "reviewer_name" = 'Guest'
WHERE "review" IS NULL;--> statement-breakpoint
ALTER TABLE "club_memories" ALTER COLUMN "review" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "club_memories" ALTER COLUMN "reviewer_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "club_memories" DROP COLUMN "excerpt";
