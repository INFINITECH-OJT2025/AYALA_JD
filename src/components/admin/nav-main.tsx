"use client";

import { usePathname } from "next/navigation";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname(); // ✅ Get the current page URL

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        Platform
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url; // ✅ Check if the page is active

          return (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Link href={item.url} className="flex items-center w-full gap-3">
                      {item.icon && <item.icon size={22} />}
                      <span className="text-[15px]">{item.title}</span>
                      {item.items && (
                        <ChevronRight
                          className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                        />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {item.items && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isSubActive = pathname === subItem.url;
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                                isSubActive
                                  ? "bg-blue-500 text-white shadow-sm"
                                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                              }`}
                            >
                              <Link href={subItem.url}>
                                <span className="text-[14px]">{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
