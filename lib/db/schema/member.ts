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

export const memberRoleEnum = pgEnum("member_role", [
  "ADMIN",
  "MODERATOR",
  "GUEST",
]);

export const members = pgTable(
  "member",
  {
    id: varchar("id", { length: 12 }).notNull().primaryKey(),
    role: memberRoleEnum("role").notNull(),
    profileId: text("profile_id").notNull(),
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

export const membersRelations = relations(members, ({ one, many }) => ({
  profile: one(users, {
    fields: [members.profileId],
    references: [users.id],
  }),
  server: one(servers, {
    fields: [members.serverId],
    references: [servers.id],
  }),
}));
