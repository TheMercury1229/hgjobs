import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schemaHelper";
import { jobListingTable } from "@/drizzle/schema/jobListing";
import { userTable } from "@/drizzle/schema/user";

export const applicationStages = [
  "applied",
  "denied",
  "interested",
  "interviewed",
  "hired",
] as const;
export type ApplicationStage = (typeof applicationStages)[number];
export const applicationStageEnum = pgEnum(
  "job_listing_applications_stage",
  applicationStages
);

export const jobListingApplicationsTable = pgTable(
  "job_listing_applications",
  {
    jobListingId: uuid("job_listing_id")
      .references(() => jobListingTable.id, { onDelete: "cascade" })
      .notNull(),
    userId: varchar("user_id")
      .references(() => userTable.id, { onDelete: "cascade" })
      .notNull(),
    coverLetter: text("cover_letter"),
    rating: integer("rating"),
    stage: applicationStageEnum().notNull().default("applied"),
    createdAt,
    updatedAt,
  },
  (table) => [primaryKey({ columns: [table.jobListingId, table.userId] })]
);
