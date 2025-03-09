import * as React from "react"
import {
  Sparkles,
  ChevronsUpDown,
  CreditCard,
  Frame,
  Images,
  Layers,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/server"
import { NavUser } from "./nav-user"

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "SquareTerminal", // ✅ Pass the icon name as a string
  },
  {
    title: "Generate Image",
    url: "/image-generation",
    icon: "Image",
  },
  {
    title: "My Models",
    url: "/models",
    icon: "Frame",
  },
  {
    title: "Train Model",
    url: "/model-training",
    icon: "Layers",
  },
  {
    title: "My Images",
    url: "/gallery",
    icon: "Images",
  },
  {
    title: "Billing",
    url: "/billing",
    icon: "CreditCard",
  },
  {
    title: "Settings",
    url: "/account-settings",
    icon: "Settings2",
  },
]
export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const supabase = createClient()

  if (!supabase || !supabase.auth) {
    console.error("⚠️ Supabase client not initialized properly")
    return null // Prevents rendering
  }

  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error("⚠️ Error fetching session:", error.message)
  }

  const user = {
    name: data?.session?.user?.user_metadata?.full_name ?? "Guest",
    email: data?.session?.user?.email ?? "No email",
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton size="lg">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Sparkles className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Picxel-AI</span>
            <span className="truncate text-xs">Pro</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
