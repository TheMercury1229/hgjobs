import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { userTable } from "@/drizzle/schema/user";
import { createdAt, updatedAt } from "@/drizzle/schemaHelper";

export const userNotificationSettings = pgTable("user_notification_settings", {
  userId: varchar()
    .primaryKey()
    .references(() => userTable.id),
  newJobEmailNotifications: boolean().notNull().default(false),
  aiPrompt: varchar(),
  createdAt,
  updatedAt,
});
