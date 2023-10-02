import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./auth";
import { conversations } from "./conversation";

export const directMessages = pgTable("direct_message", {
  id: varchar("id", { length: 12 }).notNull().primaryKey(),
  content: text("content").notNull(),
  fileUrl: text("file_url"),
  ownerId: text("owner_id").notNull(),
  conversationId: varchar("conversation_id", { length: 12 }).notNull(),
  deleted: boolean("deleted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const directMessagesRelations = relations(
  directMessages,
  ({ one }) => ({
    owner: one(users, {
      fields: [directMessages.ownerId],
      references: [users.id],
    }),
    conversation: one(conversations, {
      fields: [directMessages.conversationId],
      references: [conversations.id],
    }),
  })
);
