import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebarClient } from "@/app/AppSidebarClient";
import Link from "next/link";
import { LogInIcon } from "lucide-react";

export default function Home() {
  return (
    <SidebarProvider className="overflow-y-hidden">
      <AppSidebarClient>
        <Sidebar collapsible="icon" className="overflow-hidden">
          <SidebarHeader className="flex-row items-center gap-2">
            <SidebarTrigger />
            <span className="text-xl text-nowrap">HG Jobs</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>Hello</SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main>hello</main>
      </AppSidebarClient>
    </SidebarProvider>
  );
}
