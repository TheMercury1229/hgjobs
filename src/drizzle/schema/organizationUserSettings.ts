import {
  boolean,
  integer,
  primaryKey,
  pgTable,
  varchar,
} from "drizzle-orm/pg-core";
import { userTable } from "@/drizzle/schema/user";
import { organizationTable } from "@/drizzle/schema/organization";
import { createdAt, updatedAt } from "@/drizzle/schemaHelper";
import { relations } from "drizzle-orm";

export const organizationUserSettings = pgTable(
  "organization_user_settings",
  {
    userId: varchar()
      .notNull()
      .references(() => userTable.id),
    organizationId: varchar()
      .notNull()
      .references(() => organizationTable.id),
    newApplicationEmailNotifications: boolean().notNull().default(true),
    minimumRating: integer(),
    createdAt,
    updatedAt,
  },
  (table) => [primaryKey({ columns: [table.userId, table.organizationId] })]
);

export const organizationUserSettingsRelations = relations(
  organizationUserSettings,
  ({ one }) => ({
    user: one(userTable, {
      fields: [organizationUserSettings.userId],
      references: [userTable.id],
    }),
    organization: one(organizationTable, {
      fields: [organizationUserSettings.organizationId],
      references: [organizationTable.id],
    }),
  })
);
