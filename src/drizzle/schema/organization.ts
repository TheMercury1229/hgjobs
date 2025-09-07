import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schemaHelper";
import { organizationUserSettings } from "@/drizzle/schema/organizationUserSettings";
import { jobListingTable } from "./jobListing";
import { relations } from "drizzle-orm";

// organization table
export const organizationTable = pgTable("organizations", {
  id: varchar().primaryKey(),
  name: varchar().notNull(),
  imageUrl: varchar(),
  createdAt,
  updatedAt,
});

export const organizationRelations = relations(
  organizationTable,
  ({ many }) => ({
    jobListings: many(jobListingTable),
    organizationUserSettings: many(organizationUserSettings),
  })
);
