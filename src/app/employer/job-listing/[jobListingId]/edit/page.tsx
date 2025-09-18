import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { jobListingTable } from "@/drizzle/schema";
import { JobListingForm } from "@/features/jobListings/components/JobListingForm";
import { getJobListingIdTag } from "@/features/jobListings/db/cache/jobListings";
import { getCurrentOrganization } from "@/services/clerk/lib/getCurrentAuth";
import { and, eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ jobListingId: string }>;
};
export default function EditJobListing(props: Props) {
  return (
    <div className="max-w-5xl w-full mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Edit Job Listing</h1>
      <p className="text-muted-foreground mb-6">
        This does not post the listing yet.It just saves a draft.
      </p>
      <Card className="w-full">
        <CardContent>
          <Suspense>
            <SuspendedPage {...props} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

const SuspendedPage = async ({ params }: Props) => {
  const { jobListingId } = await params;
  const { orgId } = await getCurrentOrganization({ allData: true });
  if (orgId == null) return notFound();
  const jobListing = await getJobListing(jobListingId, orgId);
  if (jobListing == null) return notFound();

  return <JobListingForm jobListing={jobListing} />;
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
