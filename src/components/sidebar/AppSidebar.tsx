import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebarClient } from "@/components/sidebar/AppSidebarClient";
import { SignedIn } from "@/services/clerk/components/SignInStatus";

export default function AppSidebar({
  content,
  footerButton,
  children,
}: {
  content: React.ReactNode;
  footerButton: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="overflow-y-hidden">
      <AppSidebarClient>
        <Sidebar collapsible="icon" className="overflow-hidden">
          <SidebarHeader className="flex-row items-center gap-2">
            <SidebarTrigger />
            <span className="text-xl text-nowrap">HG Jobs</span>
          </SidebarHeader>
          <SidebarContent>{content}</SidebarContent>
          <SidebarFooter>
            <SignedIn>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>{footerButton}</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SignedIn>
          </SidebarFooter>
        </Sidebar>
        <main>{children}</main>
      </AppSidebarClient>
    </SidebarProvider>
  );
}
