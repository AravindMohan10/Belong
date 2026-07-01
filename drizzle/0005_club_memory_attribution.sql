ALTER TABLE "club_memories" ADD COLUMN "session_id" uuid;--> statement-breakpoint
ALTER TABLE "club_memories" ADD COLUMN "user_id" uuid;--> statement-breakpoint
ALTER TABLE "club_memories" ADD CONSTRAINT "club_memories_session_id_club_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."club_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "club_memories" ADD CONSTRAINT "club_memories_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "club_memories_session_id_idx" ON "club_memories" USING btree ("session_id");--> statement-breakpoint
CREATE UNIQUE INDEX "club_memories_user_session_idx" ON "club_memories" USING btree ("user_id","session_id") WHERE "user_id" IS NOT NULL AND "session_id" IS NOT NULL;
