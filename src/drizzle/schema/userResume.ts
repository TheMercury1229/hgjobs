import { pgTable, varchar } from "drizzle-orm/pg-core";
import { userTable } from "@/drizzle/schema/user";
import { createdAt, updatedAt } from "@/drizzle/schemaHelper";
import { relations } from "drizzle-orm/relations";

export const userResumeTable = pgTable("user_resumes", {
  userId: varchar()
    .primaryKey()
    .references(() => userTable.id),
  resumeFileUrl: varchar().notNull(),
  resumeFileKey: varchar().notNull(),
  aiSummary: varchar(),
  createdAt,
  updatedAt,
});

export const userResumeRelations = relations(userResumeTable, ({ one }) => ({
  user: one(userTable),
}));
