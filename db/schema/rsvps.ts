import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { clubSessions } from "./club-sessions";
import { clubs } from "./clubs";
import { users } from "./users";

export type RsvpStatus = "confirmed" | "cancelled";

export const rsvps = pgTable(
  "rsvps",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    clubId: uuid("club_id")
      .notNull()
      .references(() => clubs.id, { onDelete: "cascade" }),
    sessionId: uuid("session_id")
      .notNull()
      .references(() => clubSessions.id, { onDelete: "cascade" }),
    status: text("status").notNull().$type<RsvpStatus>(),
    isFirstTimer: boolean("is_first_timer").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("rsvps_user_session_idx").on(table.userId, table.sessionId),
    index("rsvps_club_id_idx").on(table.clubId),
    index("rsvps_session_id_idx").on(table.sessionId),
    index("rsvps_user_id_idx").on(table.userId),
  ],
);
