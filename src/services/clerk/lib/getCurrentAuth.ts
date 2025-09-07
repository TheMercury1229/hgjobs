import { db } from "@/drizzle/db";
import { organizationTable, userTable } from "@/drizzle/schema";
import { getOrganizationIdTag } from "@/features/organizations/db/cache/organization";
import { getUserIdTag } from "@/features/users/db/cache/users";
import { auth } from "@clerk/nextjs/server";
import { eq, or } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export const getCurrentUser = async ({ allData = false }) => {
  const { userId, sessionId, getToken } = await auth();

  return {
    userId,
    user: allData && userId != null ? await getUser(userId) : undefined,
  };
};

async function getUser(userId: string) {
  "use cache";
  cacheTag(getUserIdTag(userId));
  const result = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, userId));
  return result[0];
}

export const getCurrentOrganization = async ({ allData = false }) => {
  const { orgId } = await auth();

  return {
    orgId,
    organization:
      allData && orgId != null ? await getOrganization(orgId) : undefined,
  };
};

async function getOrganization(orgId: string) {
  "use cache";
  cacheTag(getOrganizationIdTag(orgId));
  const result = await db
    .select()
    .from(organizationTable)
    .where(eq(organizationTable.id, orgId));
  return result[0];
}
