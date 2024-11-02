import * as React from "react";
import {
  Command,
  Scan,
  Home,
  UserPlus,
  Settings2,
  ShoppingBag,
  CheckCheck,
  Users,
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
        url: route("admin.dashboard"),
        icon: Home,
      },
      {
        title: "Scan QrCode",
        url: route("admin.scan"),
        icon: Scan,
      },
      {
        title: "Create Users",
        url: route('users.new'), // Parent menu without specific route
        icon: UserPlus,
      },
      {
        title: "Products",
        url: route("product.list"), // Updated route for Settings
        icon: ShoppingBag,
      },
      {
        title: "Community Approve",
        url: route("admin.community"), // Updated route for Settings
        icon: CheckCheck,
      },
      {
        title: "Community",
        url: route("community"), // Updated route for Settings
        icon: Users,
      },
      {
        title: "Settings",
        url: route("admin.profile"), // Updated route for Settings
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
