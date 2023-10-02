import { relations } from "drizzle-orm";
import { index, pgTable, unique, varchar } from "drizzle-orm/pg-core";
import { members } from "./member";
import { directMessages } from "./direct-message";

export const conversations = pgTable(
  "conversation",
  {
    id: varchar("id", { length: 12 }).notNull().primaryKey(),
    memberOneId: varchar("member_one_id", { length: 12 }).notNull(),
    memberTwoId: varchar("member_two_id", { length: 12 }).notNull(),
  },
  (table) => {
    return {
      unq: unique().on(table.memberOneId, table.memberTwoId),
      memberTwoIdx: index("member_two_idx").on(table.memberTwoId),
    };
  }
);

export const conversationsRelations = relations(
  conversations,
  ({ one, many }) => ({
    memberOne: one(members, {
      fields: [conversations.memberOneId],
      references: [members.id],
    }),
    memberTwo: one(members, {
      fields: [conversations.memberTwoId],
      references: [members.id],
    }),
    directMessages: many(directMessages),
  })
);
