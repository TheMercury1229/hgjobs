import { db } from "@/drizzle/db";
import { jobListingTable } from "@/drizzle/schema";
import { getJobListingOrganizationTag } from "@/features/jobListings/db/cache/jobListings";
import { getCurrentOrganization } from "@/services/clerk/lib/getCurrentAuth";
import { eq } from "drizzle-orm";
import { desc } from "drizzle-orm/sql/expressions/select";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function EmployerHomePage() {
  return (
    <Suspense>
      <SuspendedPage />
    </Suspense>
  );
}

async function SuspendedPage() {
  const { orgId } = await getCurrentOrganization({ allData: true });
  if (orgId == null) return null;
  const jobListing = await getMostRecentJobs(orgId);
  console.log("Most recent job listing:", jobListing);
  if (jobListing.length === undefined || jobListing.length === 0) {
    redirect("/employer/job-listing/new");
  } else {
    const id = jobListing[0].id;
    if (id == null) return null;
    redirect(`/employer/job-listing/${id}`);
  }
}

async function getMostRecentJobs(orgId: string) {
  "use cache";
  cacheTag(getJobListingOrganizationTag(orgId));
  return db
    .select({ id: jobListingTable.id })
    .from(jobListingTable)
    .where(eq(jobListingTable.organizationId, orgId))
    .orderBy(desc(jobListingTable.createdAt))
    .limit(1);
}
