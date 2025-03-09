"use client"

import {
  ChevronRight,
  CreditCard,
  Frame,
  Images,
  Layers,
  Settings2,
  Sidebar,
  SquareTerminal,
  type LucideIcon,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: SquareTerminal,
  },
  {
    title: "Generate Image",
    url: "/image-generation",
    icon: Images, // ✅ Corrected from Image → Images (already imported)
  },
  {
    title: "My Models",
    url: "/models",
    icon: Frame,
  },
  {
    title: "Train Model",
    url: "/model-training",
    icon: Layers,
  },
  {
    title: "My Images",
    url: "/gallery",
    icon: Images,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/account-settings",
    icon: Settings2,
  },
]

export function NavMain() {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link href={item.url} passHref>
              <SidebarMenuButton
                tooltip={item.title}
                className={cn(
                  "rounded-none",
                  pathname === item.url ? "text-primary bg-primary/5" : "text-muted-foreground"
                )}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
