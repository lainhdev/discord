import { relations } from "drizzle-orm";
import {
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./auth";
import { servers } from "./server";
import { messages } from "./message";

export const channelTypeEnum = pgEnum("channel_type", [
  "TEXT",
  "AUDIO",
  "VIDEO",
]);

export const channels = pgTable(
  "channel",
  {
    id: varchar("id", { length: 12 }).notNull().primaryKey(),
    name: text("name").notNull(),
    type: channelTypeEnum("type").notNull(),
    ownerId: text("owner_id").notNull(),
    serverId: varchar("server_id", { length: 12 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at"),
  },
  (table) => {
    return {
      serverIdx: index("server_idx").on(table.serverId),
    };
  }
);

export const channelsRelations = relations(channels, ({ one, many }) => ({
  owner: one(users, {
    fields: [channels.ownerId],
    references: [users.id],
  }),
  server: one(servers, {
    fields: [channels.serverId],
    references: [servers.id],
  }),
  messages: many(messages),
}));
