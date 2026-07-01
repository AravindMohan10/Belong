import { index, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { clubs } from "./clubs";

export type ClubSessionStatus = "upcoming" | "past" | "cancelled";

export const clubSessions = pgTable(
  "club_sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clubId: uuid("club_id")
      .notNull()
      .references(() => clubs.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    locationArea: text("location_area").notNull(),
    capacity: integer("capacity").notNull(),
    meetingPoint: text("meeting_point").notNull(),
    exactPin: text("exact_pin"),
    status: text("status").notNull().$type<ClubSessionStatus>(),
    warmStartFirstTenMinutes: jsonb("warm_start_first_ten_minutes")
      .$type<string[]>()
      .notNull(),
    warmStartFindTheGroup: text("warm_start_find_the_group").notNull(),
    warmStartSmallTalkLine: text("warm_start_small_talk_line").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("club_sessions_club_id_idx").on(table.clubId),
    index("club_sessions_starts_at_idx").on(table.startsAt),
    index("club_sessions_status_idx").on(table.status),
  ],
);
