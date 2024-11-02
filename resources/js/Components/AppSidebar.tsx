import * as React from "react";
import {
  Users,
  Command,
  MessageCirclePlus,
  Home,
  Settings2,
  BriefcaseMedical,
  LaptopMinimal,
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
  user: User; // Menyatakan bahwa `user` harus sesuai dengan interface `User`
}

export function AppSidebar({ ...sidebarProps }: React.ComponentProps<typeof Sidebar>) {
  const { url, props } = usePage();
  const auth = props.auth as Auth; // Penegasan tipe (type assertion) ke interface Auth

  // Fungsi untuk memeriksa apakah URL saat ini aktif
  const isRouteActive = (routeUrl: string): boolean => {
    return url === routeUrl;
  };

  // Data yang digunakan dalam Sidebar
  const data = {
    user: auth.user, // Mengambil data user dari props auth
    teams: [
      {
        name: "Klinik Gunung", // Nama tim
        logo: Command, // Icon/logo tim
        plan: "Enterprise", // Plan tim
      },
    ],
    navMain: [
      {
        title: "Dashboard", // Nama menu
        url: route("dashboard"), // URL dari menu
        icon: Home, // Icon menu
      },
      {
        title: "Screening Now", // Nama menu
        url: route("history.screening.offline"), // URL menu
        icon: MessageCirclePlus, // Icon menu
      },
      {
        title: "Screening Online", // Nama menu
        url: route('screening.online'), // URL menu
        icon: LaptopMinimal, // Icon menu
      },
      {
        title: "Appointments", // Nama menu
        url: route('patient.appointments.list'), // URL menu
        icon: BriefcaseMedical, // Icon menu
      },
      {
        title: "Community", // Nama menu
        url: route('community'), // URL menu
        icon: Users, // Icon menu
      },
      {
        title: "Settings", // Nama menu
        url: route("patient.profile"), // URL menu
        icon: Settings2, // Icon menu
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
        {/* Menampilkan data pengguna di bagian footer */}
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
