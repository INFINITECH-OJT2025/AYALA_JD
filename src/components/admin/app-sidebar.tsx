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

import { NavMain } from "@/components/admin/nav-main"
import { NavProjects } from "@/app/admin/overview/nav-projects"
import { NavUser } from "@/components/admin/nav-user"
import { TeamSwitcher } from "@/components/admin/team-switcher"
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
    name: "shadcn",
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
      url: "/admin/dashboard", // New top-level dashboard page
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
      title: "Overview",
      url: "/admin/overview/listed-properties", // Keep the default route for Overview
      icon: SquareTerminal,
      isActive: true, // Not active by default
      items: [
        {
          title: "Listed Properties",
          url: "/admin/overview/listed-properties", // Directly links to the page
        },
        {
          title: "Pending Approvals",
          url: "/admin/overview/pending-approvals",
        },
        {
          title: "Total Users",
          url: "/admin/overview/total-users",
        },
        {
          title: "Inquiries Received",
          url: "/admin/overview/inquiries-received",
        },
        {
          title: "Job Applications",
          url: "/admin/overview/job-applications",
        },
        {
          title: "Recent Transactions",
          url: "/admin/overview/recent-transactions",
        },
      ],
    },
    {
      title: "Activity Log",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "New Properties",
          url: "#",
        },
        {
          title: "User Signups",
          url: "#",
        },
        {
          title: "Inquiries & Responses",
          url: "#",
        },
        {
          title: "Job Applications",
          url: "#",
        },
      ],
    },
    {
      title: "Quick Actions",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Approve/Deny Properties",
          url: "#",
        },
        {
          title: "Post Announcement/Blog",
          url: "#",
        },
        {
          title: "Manage Roles & Permissions",
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
