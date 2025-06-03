"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

import { getVendorMenuList } from "@/lib/menu-list";

export function NavMain() {
  const pathname = usePathname();
  const menulist = getVendorMenuList(pathname);

  return (
    <>
      {menulist.map((item, index) => (
        <SidebarGroup key={index}>
          {item.groupLabel && (
            <SidebarGroupLabel>{item.groupLabel}</SidebarGroupLabel>
          )}
          <SidebarMenu>
            {item.menus.length === 1
              ? item.menus.map((item, index) => (
                  <SidebarMenuButton
                    key={index}
                    tooltip={item.label}
                    asChild
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                ))
              : item.menus.map((item, index) => {
                  const hasSubmenu = item.submenus.length > 0;

                  if (!hasSubmenu) {
                    return (
                      <SidebarMenuButton
                        key={index}
                        tooltip={item.label}
                        asChild
                        isActive={pathname === item.href}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center gap-2"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    );
                  }

                  return (
                    <Collapsible
                      key={index}
                      asChild
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.label}
                            isActive={pathname === item.href}
                          >
                            <item.icon />
                            <span>{item.label}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.submenus.map((subItem, index) => (
                              <SidebarMenuSubItem key={index}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === subItem.href}
                                >
                                  <Link
                                    href={subItem.href}
                                    className="flex items-center gap-2"
                                  >
                                    <subItem.icon />
                                    <span>{subItem.label}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
