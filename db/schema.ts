import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const generations = pgTable("generations", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkUserId: text("clerk_user_id").notNull(),
  originalFileName: text("original_file_name"),
  sourceImage: text("source_image").notNull(),
  styleSlug: text("style_slug").notNull(),
  styleLabel: text("style_label").notNull(),
  model: text("model").notNull(),
  promptUser: text("prompt_user").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});


