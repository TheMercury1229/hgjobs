import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "@/drizzle/schemaHelper";
import { organizationTable } from "@/drizzle/schema/organization";
import { relations } from "drizzle-orm";
import { jobListingApplicationsTable } from "@/drizzle/schema/jobListingApplications";
// wage intervals
export const wageIntervals = ["hourly", "yearly"] as const;
export type WageInterval = (typeof wageIntervals)[number];
export const wageIntervalEnum = pgEnum(
  "job_listing_wage_interval",
  wageIntervals
);
// location requirements
export const locationRequirement = ["in-office", "hybrid", "remote"] as const;
export type locationRequirement = (typeof locationRequirement)[number];
export const locationRequirementEnum = pgEnum(
  "job_listing_location_requirement",
  locationRequirement
);
// experience levels
export const experienceLevel = ["junior", "mid-level", "senior"] as const;
export type experienceLevel = (typeof experienceLevel)[number];
export const experienceLevelEnum = pgEnum(
  "job_listing_experience_level",
  experienceLevel
);
// job listing statuses
export const jobListingStatues = ["draft", "public", "delisted"] as const;
export type jobListingStatues = (typeof jobListingStatues)[number];
export const jobListingStatusEnum = pgEnum(
  "job_listing_status",
  jobListingStatues
);
// job listing types
export const jobListingTypes = [
  "internship",
  "part-time",
  "full-time",
] as const;
export type jobListingTypes = (typeof jobListingTypes)[number];
export const jobListingTypeEnum = pgEnum("job_listing_type", jobListingTypes);

export const jobListingTable = pgTable(
  "job_listings",
  {
    id,
    organizationId: varchar()
      .references(() => organizationTable.id, { onDelete: "cascade" })
      .notNull(),
    title: varchar().notNull(),
    description: text().notNull(),
    wage: integer(),
    wageInterval: wageIntervalEnum(),
    stateAbbrevation: varchar(),
    city: varchar(),
    isFeatured: boolean().default(false).notNull(),
    locationRequirement: locationRequirementEnum().notNull(),
    experienceLevel: experienceLevelEnum().notNull(),
    status: jobListingStatusEnum().default("draft").notNull(),
    type: jobListingTypeEnum().notNull(),
    postedAt: timestamp({ withTimezone: true }),
    createdAt,
    updatedAt,
  },
  (table) => [index().on(table.stateAbbrevation)]
);
// indexes

export const jobListingRefrences = relations(
  jobListingTable,
  ({ one, many }) => ({
    organization: one(organizationTable, {
      fields: [jobListingTable.organizationId],
      references: [organizationTable.id],
    }),
    applications: many(jobListingApplicationsTable),
  })
);
