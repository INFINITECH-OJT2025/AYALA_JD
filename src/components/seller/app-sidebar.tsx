"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/seller/nav-main"
import { NavProjects } from "@/components/seller/nav-projects"
import { NavUser } from "@/components/seller/nav-user"
import { TeamSwitcher } from "@/components/seller/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Seller",
    email: "m@example.com",
    avatar: "",
  },
  teams: [
    {
      name: "AYALA",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Infinitech",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/seller/dashboard", // New top-level dashboard page
      icon: SquareTerminal,
      isActive: false, // Set Dashboard as the active page
      items : [
        {
          title: "Listings Trend",
          url: "#",
        },
        {
          title: "User Engagement",
          url: "#",
        },
        {
          title: "Popular Searches",
          url: "#",
        },
        {
          title: "Top Listings",
          url: "#",
        },
      ]
    },
    {
      title: "Manage Listings",
      url: "/seller/managelistings/mylistings", // Keep the default route for Overview
      icon: SquareTerminal,
      isActive: true, // Not active by default
      items: [
        {
          title: "My Listings",
          url: "/seller/managelistings/mylistings", // Directly links to the page
        },
      ],
    },
    {
      title: "Messages and Inquiries",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Buyers Inquiries",
          url: "#",
        },
        {
          title: "Chat Support",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
