import { index, integer, jsonb, pgTable, real, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import type { ClubVoice } from "@/lib/types/club";

export const clubs = pgTable(
  "clubs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    tagline: text("tagline").notNull(),
    description: text("description").notNull(),
    coverImageUrl: text("cover_image_url").notNull(),
    ritualLabel: text("ritual_label").notNull(),
    vibe: jsonb("vibe").$type<string[]>().notNull(),
    firstTimerPromise: text("first_timer_promise").notNull(),
    whatToExpect: jsonb("what_to_expect").$type<string[]>().notNull(),
    city: text("city").notNull(),
    neighborhood: text("neighborhood").notNull(),
    latitude: real("latitude").notNull(),
    longitude: real("longitude").notNull(),
    voice: jsonb("voice").$type<ClubVoice>().notNull(),
    membershipPriceCents: integer("membership_price_cents").notNull().default(1200),
    hostUserId: uuid("host_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("clubs_slug_idx").on(table.slug),
    index("clubs_host_user_id_idx").on(table.hostUserId),
    index("clubs_city_idx").on(table.city),
  ],
);
