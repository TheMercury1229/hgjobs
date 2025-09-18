import { db } from "@/drizzle/db";
import { organizationTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidateOrganizationCache } from "./cache/organization";
export async function insertOrganization(
  organization: typeof organizationTable.$inferInsert
) {
  await db.insert(organizationTable).values(organization).onConflictDoNothing();
  revalidateOrganizationCache(organization.id);
}

export async function updateOrganization(
  id: string,
  organization: Partial<typeof organizationTable.$inferInsert>
) {
  await db
    .update(organizationTable)
    .set(organization)
    .where(eq(organizationTable.id, id));
  revalidateOrganizationCache(id);
}

export async function deleteOrganization(id: string) {
  await db.delete(organizationTable).where(eq(organizationTable.id, id));
  revalidateOrganizationCache(id);
}
