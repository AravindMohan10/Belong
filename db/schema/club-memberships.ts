import { index, integer, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { clubs } from "./clubs";
import { users } from "./users";

export type MembershipStatus = "active" | "cancelled";

export const clubMemberships = pgTable(
  "club_memberships",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    clubId: uuid("club_id")
      .notNull()
      .references(() => clubs.id, { onDelete: "cascade" }),
    status: text("status").notNull().$type<MembershipStatus>(),
    planLabel: text("plan_label").notNull(),
    priceCents: integer("price_cents").notNull(),
    memberSince: timestamp("member_since", { withTimezone: true })
      .defaultNow()
      .notNull(),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("club_memberships_user_club_idx").on(table.userId, table.clubId),
    index("club_memberships_club_id_idx").on(table.clubId),
    index("club_memberships_user_id_idx").on(table.userId),
    index("club_memberships_status_idx").on(table.status),
  ],
);
