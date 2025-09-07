import { Suspense } from "react";
import {
  getCurrentOrganization,
  getCurrentUser,
} from "@/services/clerk/lib/getCurrentAuth";
import { LogOutIcon } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { SignOutButton } from "@/features/users/components/AuthButtons";
import { SidebarOrganizationButtonClient } from "@/features/organizations/components/SidebarOrganizationButtonClient";

export const SidebarOrganizationButton = () => {
  return (
    <Suspense>
      <SidebarOrganizationSuspense />
    </Suspense>
  );
};

async function SidebarOrganizationSuspense() {
  const [{ user }, { organization }] = await Promise.all([
    await getCurrentUser({ allData: true }),
    await getCurrentOrganization({ allData: true }),
  ]);
  // organizationData may have orgId and other properties, adjust as needed
  if (user == null || organization == null) {
    return (
      <SignOutButton>
        <SidebarMenuButton>
          <LogOutIcon />
          <span>Logout</span>
        </SidebarMenuButton>
      </SignOutButton>
    );
  }
  return (
    <SidebarOrganizationButtonClient user={user} organization={organization} />
  );
}
