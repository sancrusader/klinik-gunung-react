import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Users,
  Home,
  Activity,
  Settings2,
  UserPen,
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
        url: route("manager.dashboard"),
        icon: Home,
      },
      {
        title: "Report",
        url: route("report.manager"),
        icon: UserPen,
      },
      {
        title: "Activity Screening",
        url: route('screening.manager'), // Parent menu without specific route
        icon:  Activity,
      },
      {
        title: "Shift",
        url: route('manager.shiff'),
        icon: BookOpen,
      },
      {
        title: "Community",
        url: route('community'),
        icon: Users,
      },
      {
        title: "Settings",
        url: route("manager.profile"),
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
            isActive: isRouteActive(item.url),
          }))}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />

    </Sidebar>
  );
}
