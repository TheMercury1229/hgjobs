import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schemaHelper";
import {
  jobListingApplicationsTable,
  organizationUserSettings,
  userNotificationSettings,
  userResumeTable,
} from "@/drizzle/schema";
import { relations } from "drizzle-orm";

// users table
export const userTable = pgTable("users", {
  id: varchar().primaryKey(),
  name: varchar().notNull(),
  imageUrl: varchar().notNull(),
  email: varchar().notNull().unique(),
  createdAt,
  updatedAt,
});

export const userRelations = relations(userTable, ({ many, one }) => ({
  notificationSettings: one(userNotificationSettings),
  resume: one(userResumeTable),
  organizationUserSettings: many(organizationUserSettings),
}));
