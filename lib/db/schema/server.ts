import { channels } from "./channel";
import { relations } from "drizzle-orm";
import { index, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { members } from "./member";

export const servers = pgTable(
  "server",
  {
    id: varchar("id", { length: 12 }).notNull().primaryKey(),
    name: text("name"),
    imageUrl: text("image_url"),
    inviteCode: varchar("invite_code", { length: 12 }).unique().notNull(),
    onwerId: text("owner_id").notNull(),
  },
  (table) => {
    return {
      onwerIdx: index("owner_idx").on(table.onwerId),
    };
  }
);

export const serversRelations = relations(servers, ({ one, many }) => ({
  owner: one(users, {
    fields: [servers.onwerId],
    references: [users.id],
  }),
  members: many(members),
  channels: many(channels),
}));
