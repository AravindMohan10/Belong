import { index, jsonb, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { clubSessions } from "./club-sessions";
import { clubs } from "./clubs";
import { users } from "./users";

export const clubMemories = pgTable(
  "club_memories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clubId: uuid("club_id")
      .notNull()
      .references(() => clubs.id, { onDelete: "cascade" }),
    sessionId: uuid("session_id").references(() => clubSessions.id, {
      onDelete: "cascade",
    }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    sessionTitle: text("session_title").notNull(),
    dateLabel: text("date_label").notNull(),
    review: text("review").notNull(),
    reviewerName: text("reviewer_name").notNull(),
    photoUrls: jsonb("photo_urls").$type<string[]>().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("club_memories_club_id_idx").on(table.clubId),
    index("club_memories_session_id_idx").on(table.sessionId),
    uniqueIndex("club_memories_user_session_idx")
      .on(table.userId, table.sessionId)
      .where(sql`${table.userId} IS NOT NULL AND ${table.sessionId} IS NOT NULL`),
  ],
);
