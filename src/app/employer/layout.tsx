import AppSidebar from "@/components/sidebar/AppSidebar";
import { SidebarNavMenuGroup } from "@/components/sidebar/SidebarNavMenuGroup";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { SidebarOrganizationButton } from "@/features/organizations/components/SidebarOrganizationButton";
import { getCurrentOrganization } from "@/services/clerk/lib/getCurrentAuth";
import { ClipboardListIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <LayoutSuspense>{children}</LayoutSuspense>
    </Suspense>
  );
}

const LayoutSuspense = async ({ children }: { children: React.ReactNode }) => {
  const { orgId } = await getCurrentOrganization({ allData: true });
  if (orgId == null) return redirect("/organizations/select");
  console.log("orgId", orgId);
  return (
    <AppSidebar
      content={
        <>
          <SidebarGroup>
            <SidebarGroupLabel>Job Listing</SidebarGroupLabel>
            <SidebarGroupAction title="Create Job Listing" asChild>
              <Link href="/employer/job-listing/new">
                <PlusIcon />
                <span className="sr-only">Add Job Listing</span>
              </Link>
            </SidebarGroupAction>
          </SidebarGroup>
          <SidebarNavMenuGroup
            className="mt-auto"
            items={[
              {
                href: "/",
                icon: <ClipboardListIcon />,
                label: "Job Board",
              },
            ]}
          />
        </>
      }
      footerButton={<SidebarOrganizationButton />}
    >
      {children}
    </AppSidebar>
  );
};
