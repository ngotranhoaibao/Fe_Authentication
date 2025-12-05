import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {IconLayoutDashboard,IconUsers,IconFileInvoice } from "@tabler/icons-react";

const items = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: IconLayoutDashboard,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: IconFileInvoice,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: IconUsers,
  },
];


export default function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="flex flex-col h-full">
      <SidebarContent>
        <SidebarGroup>
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">ProjectFlow</h1>
            </div>

            <button
              data-slot="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 size-9 lg:hidden"
              aria-label="close sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x w-5 h-5"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>

          <SidebarGroupContent className="flex-1 overflow-y-auto p-4 space-y-2">
            <SidebarMenu>
              {items.map((item) => {
                const active = item.path === location.pathname;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                          active
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-secondary"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
