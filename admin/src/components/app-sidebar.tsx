"use client"

import * as React from "react"
import {
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Briefcase,
  Building2,
  Car,
  Cpu,
  FlaskConical,
  GalleryVerticalEnd,
  LayoutDashboard,
  PenTool,
  Settings2,
  Users,
  Zap,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
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
    name: "Admin User",
    email: "admin@elidz.co.za",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "ELIDZ Admin",
      logo: GalleryVerticalEnd,
      plan: "Science & Tech Park",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "User Management",
      url: "#",
      icon: Users,
      items: [
        {
          title: "All Users",
          url: "#",
        },
        {
          title: "Registrations",
          url: "#",
        },
        {
          title: "User Roles",
          url: "#",
        },
      ],
    },
    {
      title: "Opportunities",
      url: "#",
      icon: Briefcase,
      items: [
        {
          title: "View Opportunities",
          url: "#",
        },
        {
          title: "Post Opportunity",
          url: "#",
        },
        {
          title: "Funding Info",
          url: "#",
        },
      ],
    },
    {
      title: "Communication",
      url: "#",
      icon: Bell,
      items: [
        {
          title: "Send Alerts",
          url: "#",
        },
        {
          title: "Message Center",
          url: "#",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: BarChart3,
      items: [
        {
          title: "User Demographics",
          url: "#",
        },
        {
          title: "Product Line Visits",
          url: "#",
        },
        {
          title: "System Usage",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Security",
          url: "#",
        },
        {
          title: "Billing & Model",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Food & Water Lab",
      url: "#",
      icon: FlaskConical,
    },
    {
      name: "Design Centre",
      url: "#",
      icon: PenTool,
    },
    {
      name: "Digital Hub",
      url: "#",
      icon: Cpu,
    },
    {
      name: "Automotive & Mfg",
      url: "#",
      icon: Car,
    },
    {
      name: "Renewable Energy",
      url: "#",
      icon: Zap,
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

