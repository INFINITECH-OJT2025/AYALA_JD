import { AppSidebar } from "@/components/seller/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="p-6 flex justify-center w-screen min-h-[100vh] flex-1 rounded-xl bg-muted/50">
        {/* Sidebar */}
        <AppSidebar />
        
        {/* Main Content Area */}
        <SidebarInset className="flex flex-col flex-1">
          {/* Breadcrumbs & Sidebar Trigger */}
          <div className="flex items-center gap-2 p-4 border-b">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Manage Listing</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Dashboard Content Goes Here */}
          <div className="p-4 flex-1">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
