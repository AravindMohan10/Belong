import { index, pgTable, real, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    role: text("role").notNull().$type<"guest" | "host">(),
    displayName: text("display_name").notNull(),
    bio: text("bio"),
    imageUrl: text("image_url"),
    hostClubSlug: text("host_club_slug"),
    city: text("city"),
    latitude: real("latitude"),
    longitude: real("longitude"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("users_role_idx").on(table.role),
    index("users_host_club_slug_idx").on(table.hostClubSlug),
  ],
);

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("sessions_user_id_idx").on(table.userId),
    index("sessions_expires_at_idx").on(table.expiresAt),
  ],
);
