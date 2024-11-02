import React from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/Dashboard/AdminSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import PageContainer from "@/Layouts/PageContainer";

export default function Layout({ header, children }: { header: React.ReactNode, children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main>
            <header className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={route('admin.dashboard')}>Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                    {header && (
                      <BreadcrumbPage>{header}</BreadcrumbPage>
                    )}
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="min-h-[100vh] flex-1 rounded-xl">
            <PageContainer>
              {children}
              </PageContainer>
            </div>
          </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
