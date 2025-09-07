"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppSidebarClient({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <header className="flex flex-col w-full">
        <nav className="p-2 border-b flex items-center gap-1">
          <SidebarTrigger />
          <span className="text-xl text-nowrap">HG Jobs</span>
        </nav>
        <div className="flex-1 flex">{children}</div>
      </header>
    );
  }
  return <>{children}</>;
}
