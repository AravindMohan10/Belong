CREATE TABLE "club_memories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"club_id" uuid NOT NULL,
	"session_title" text NOT NULL,
	"date_label" text NOT NULL,
	"excerpt" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "club_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"club_id" uuid NOT NULL,
	"title" text NOT NULL,
	"starts_at" timestamp with time zone NOT NULL,
	"location_area" text NOT NULL,
	"capacity" integer NOT NULL,
	"meeting_point" text NOT NULL,
	"exact_pin" text,
	"status" text NOT NULL,
	"warm_start_first_ten_minutes" jsonb NOT NULL,
	"warm_start_find_the_group" text NOT NULL,
	"warm_start_small_talk_line" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clubs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"tagline" text NOT NULL,
	"description" text NOT NULL,
	"cover_image_url" text NOT NULL,
	"ritual_label" text NOT NULL,
	"vibe" jsonb NOT NULL,
	"first_timer_promise" text NOT NULL,
	"what_to_expect" jsonb NOT NULL,
	"host_user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "clubs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "rsvps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"club_id" uuid NOT NULL,
	"session_id" uuid NOT NULL,
	"status" text NOT NULL,
	"is_first_timer" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "club_memories" ADD CONSTRAINT "club_memories_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "club_sessions" ADD CONSTRAINT "club_sessions_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clubs" ADD CONSTRAINT "clubs_host_user_id_users_id_fk" FOREIGN KEY ("host_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_session_id_club_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."club_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "club_memories_club_id_idx" ON "club_memories" USING btree ("club_id");--> statement-breakpoint
CREATE INDEX "club_sessions_club_id_idx" ON "club_sessions" USING btree ("club_id");--> statement-breakpoint
CREATE INDEX "club_sessions_starts_at_idx" ON "club_sessions" USING btree ("starts_at");--> statement-breakpoint
CREATE INDEX "club_sessions_status_idx" ON "club_sessions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "clubs_slug_idx" ON "clubs" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "clubs_host_user_id_idx" ON "clubs" USING btree ("host_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "rsvps_user_session_idx" ON "rsvps" USING btree ("user_id","session_id");--> statement-breakpoint
CREATE INDEX "rsvps_club_id_idx" ON "rsvps" USING btree ("club_id");--> statement-breakpoint
CREATE INDEX "rsvps_session_id_idx" ON "rsvps" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "rsvps_user_id_idx" ON "rsvps" USING btree ("user_id");