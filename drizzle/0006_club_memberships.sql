CREATE TABLE "club_memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"club_id" uuid NOT NULL,
	"status" text NOT NULL,
	"plan_label" text NOT NULL,
	"price_cents" integer NOT NULL,
	"member_since" timestamp with time zone DEFAULT now() NOT NULL,
	"cancelled_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "club_memberships" ADD CONSTRAINT "club_memberships_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "club_memberships" ADD CONSTRAINT "club_memberships_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "club_memberships_user_club_idx" ON "club_memberships" USING btree ("user_id","club_id");--> statement-breakpoint
CREATE INDEX "club_memberships_club_id_idx" ON "club_memberships" USING btree ("club_id");--> statement-breakpoint
CREATE INDEX "club_memberships_user_id_idx" ON "club_memberships" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "club_memberships_status_idx" ON "club_memberships" USING btree ("status");--> statement-breakpoint
ALTER TABLE "clubs" ADD COLUMN "membership_price_cents" integer DEFAULT 1200 NOT NULL;
