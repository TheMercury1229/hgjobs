"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { SignOutButton } from "@/features/users/components/AuthButtons";
import {
  ChevronsUpDownIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";

interface User {
  email: string;
  name: string;
  imageUrl: string;
}

export const SidebarUserButtonClient = (user: User) => {
  const { isMobile, setOpenMobile } = useSidebar();
  const { openUserProfile } = useClerk();
  return (
    <SidebarMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <UserInfo {...user} />
            <ChevronsUpDownIcon className="ml-auto group-data-[state=collapsed]:hidden" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={4}
          align="end"
          side={isMobile ? "bottom" : "right"}
          className="min-w-64 max-w-80"
        >
          <DropdownMenuLabel className="font-normal p-1">
            <UserInfo {...user} />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpenMobile(false);
              openUserProfile();
            }}
          >
            <UserIcon className="mr-1" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/user-settings/notifications">
              <SettingsIcon className="mr-1" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <SignOutButton>
            <DropdownMenuItem>
              <LogOutIcon className="mr-1" />
              Log Out
            </DropdownMenuItem>
          </SignOutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenu>
  );
};

export const UserInfo = (user: User) => {
  const nameInitials = user.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <Avatar className="rounded-lg size-8">
        <AvatarImage src={user.imageUrl} alt={user.name}></AvatarImage>
        <AvatarFallback className="uppercase bg-primary text-primary-foreground ">
          {nameInitials}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col flex-1 min-w-0 leading-tight group-data-[state=collapsed]:hidden">
        <span className="truncate text-sm font-semibold">{user.name}</span>
        <span className="truncate text-xs ">{user.email}</span>
      </div>
    </div>
  );
};
