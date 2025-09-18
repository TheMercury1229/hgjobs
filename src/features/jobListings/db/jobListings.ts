import { db } from "@/drizzle/db";
import { jobListingTable, organizationRelations } from "@/drizzle/schema";
import { revalidateJobListingCache } from "@/features/jobListings/db/cache/jobListings";
import { eq } from "drizzle-orm";

export async function insertJobListingToDB(
  data: typeof jobListingTable.$inferInsert
) {
  const [newListing] = await db
    .insert(jobListingTable)
    .values(data)
    .onConflictDoNothing()
    .returning({
      id: jobListingTable.id,
      organizationId: jobListingTable.organizationId,
    });
  revalidateJobListingCache({
    id: newListing.id,
    orgId: newListing.organizationId,
  });
  return newListing;
}

export async function updateJobListingDb(
  id: string,
  jobListing: Partial<typeof jobListingTable.$inferInsert>
) {
  const [updatedListing] = await db
    .update(jobListingTable)
    .set(jobListing)
    .where(eq(jobListingTable.id, id))
    .returning({
      id: jobListingTable.id,
      orgId: jobListingTable.organizationId,
    });
  revalidateJobListingCache(updatedListing);
  return updatedListing;
}
