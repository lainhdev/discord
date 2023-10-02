import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./auth";
import { channels } from "./channel";

export const messages = pgTable(
  "message",
  {
    id: varchar("id", { length: 12 }).notNull().primaryKey(),
    content: text("content").notNull(),
    fileUrl: text("file_url"),
    ownerId: text("owner_id").notNull(),
    channelId: varchar("channel_id", { length: 12 }).notNull(),
    deleted: boolean("deleted").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at"),
  },
  (table) => {
    return {
      channelIdx: index("channel_idx").on(table.channelId),
    };
  }
);

export const messagesRelations = relations(messages, ({ one, many }) => ({
  owner: one(users, {
    fields: [messages.ownerId],
    references: [users.id],
  }),
  channel: one(channels, {
    fields: [messages.channelId],
    references: [channels.id],
  }),
}));
