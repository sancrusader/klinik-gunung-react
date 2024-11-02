import * as React from "react";
import {
  Command,
  UserRoundPen,
  Home,
  UserPlus,
  Settings2,
  FileText,
  MessageCirclePlus,
  Users,
  FileClock,
} from "lucide-react";
import { User } from "@/types";
import { NavMain } from "@/Components/Sidebar/nav-main";
import { NavUser } from "@/Components/Sidebar/nav-user";
import { TeamSwitcher } from "@/Components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/Components/ui/sidebar";
import { Link, usePage } from '@inertiajs/react';

interface Auth {
  user: User;
}

export function AppSidebar({ ...sidebarProps }: React.ComponentProps<typeof Sidebar>) {
  const { url, props } = usePage();
  const auth = props.auth as Auth; // Type assertion to Auth interface

  const isRouteActive = (routeUrl: string): boolean => {
    return url === routeUrl;
  };

  const data = {
    user: auth.user, // Use the user data from the auth props
    teams: [
      {
        name: "Klinik Gunung",
        logo: Command,
        plan: "Enterprise",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: route("paramedis.dashboard"),
        icon: Home,
      },
      {
        title: "Offline Screening",
        url: route("paramedis.screening.offline"),
        icon: MessageCirclePlus,
      },
      {
        title: "History Offline Screening",
        url: route('history.paramedis.screening'),
        icon: FileClock,
      },
      {
        title: "Online Screening",
        url: route("paramedis.screeningOnline"),
        icon: MessageCirclePlus,
      },
      {
        title: "Previous Report",
        url: route("daily.report"),
        icon: FileText,
      },
      {
        title: "My Report",
        url: route("paramedis.report"),
        icon: UserRoundPen,
      },
      {
        title: "Community",
        url: route("community"),
        icon: Users,
      },
      {
        title: "Settings",
        url: route("paramedis.profile"),
        icon: Settings2,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...sidebarProps}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain.map((item) => ({
            ...item,
            isActive: isRouteActive(item.url), // Determine if the route is active
            // Removed the items property since it's not being used
          }))}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} /> {/* Pass user data directly from auth */}
      </SidebarFooter>
      <SidebarRail />

    </Sidebar>
  );
}
