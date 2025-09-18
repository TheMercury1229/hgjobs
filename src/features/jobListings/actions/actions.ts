"use server";

import z from "zod";
import { jobListingSchema } from "./schemas";
import { getCurrentOrganization } from "@/services/clerk/lib/getCurrentAuth";
import { insertJobListingToDB, updateJobListingDb } from "../db/jobListings";
import { redirect } from "next/navigation";
import { getJobListingIdTag } from "../db/cache/jobListings";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { db } from "@/drizzle/db";
import { jobListingTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export const createJobListing = async (
  unsafeData: z.infer<typeof jobListingSchema>
) => {
  const { orgId } = await getCurrentOrganization({ allData: true });
  if (orgId == null) {
    return {
      error: true,
      message: "You must be in an organization to create a job listing",
    };
  }

  const { success, data } = jobListingSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true,
      message: "There was a problem with creation of your job listing",
    };
  }

  const jobListing = await insertJobListingToDB({
    ...data,
    organizationId: orgId,
    status: "draft",
  });
  redirect(`/employer/job-listing/${jobListing.id}`);
};

export const updateJobListing = async (
  id: string,
  unsafeData: z.infer<typeof jobListingSchema>
) => {
  const { orgId } = await getCurrentOrganization({ allData: true });
  if (orgId == null) {
    return {
      error: true,
      message: "You must be in an organization to create a job listing",
    };
  }

  const { success, data } = jobListingSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true,
      message: "There was a problem with creation of your job listing",
    };
  }

  const jobListing = await getJobListing(id, orgId);
  if (jobListing == null) {
    return {
      error: true,
      message: "Job listing not found",
    };
  }
  const updatedJobListing = await updateJobListingDb(jobListing.id, data);
  redirect(`/employer/job-listing/${jobListing.id}`);
};

async function getJobListing(jobListingId: string, orgId: string) {
  "use cache";
  cacheTag(getJobListingIdTag(jobListingId));
  return db
    .select()
    .from(jobListingTable)
    .where(
      and(
        eq(jobListingTable.id, jobListingId),
        eq(jobListingTable.organizationId, orgId)
      )
    )
    .then((res) => res[0] || null); // return null if not found
}
