"use client";

import { Link, useLocation } from "@tanstack/react-router";

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
  useSidebar,
} from "@/components/ui/sidebar";
import { Icon } from "@/components/icon";
import { ICONS_ENUM } from "@rtqs/plugin-loader";
import { useEffect, useMemo } from "react";

type NavMainItem = {
  title: string;
  url: string;
  isActive?: boolean;
  items?: Omit<NavMainItem, "items">[];
  icon: ICONS_ENUM;
};

export function NavMain({
  label,
  items,
  ...props
}: {
  label?: string;
  items: NavMainItem[];
} & React.ComponentProps<typeof SidebarGroup>) {
  const location = useLocation();
  const pathname = location.pathname;
  const { setBreadcrumbs } = useSidebar();

  const activeItem = useMemo(() => {
    // if item is parent return the item
    let item = items.find((item) => pathname === item.url);
    if (item)
      return {
        ...item,
        parent: null,
      };

    // return subitem if it is active
    for (const item of items) {
      const activeSubItem = item.items?.find(
        (subItem) => pathname === subItem.url,
      );
      if (activeSubItem)
        return {
          ...activeSubItem,
          parent: {
            url: item.url,
            label: item.title,
          },
        };
    }
    return null;
  }, [items, pathname]);

  useEffect(() => {
    if (!activeItem) {
      setBreadcrumbs([{ title: "Dashboard", url: "/d" }]);
      return;
    }
    // No nested items: Dashboard > label (if present) > title
    setBreadcrumbs(
      label
        ? [
          { title: "Dashboard", url: "/d" },
          { title: label, url: activeItem.url },
          { title: activeItem.title, url: activeItem.url },
        ]
        : [
          { title: "Dashboard", url: "/d" },
          { title: activeItem.title, url: activeItem.url },
        ],
    );
  }, [activeItem, label]);

  return (
    <SidebarGroup {...props}>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu className="gap-1">
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            {item.items?.length ? (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={activeItem?.parent?.url === item.url}
                className="group/collapsible"
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="cursor-pointer"
                  >
                    <Icon name={item.icon} />
                    <span>{item.title}</span>
                    <Icon
                      name={ICONS_ENUM.CHEVRON_RIGHT}
                      className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          className="cursor-pointer"
                          isActive={activeItem?.url === item.url}
                        >
                          <Link
                            to={subItem.url as any}
                            target={
                              item.title === "Auth Pages" ||
                                item.title === "Errors"
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              item.title === "Auth Pages" ||
                                item.title === "Errors"
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="cursor-pointer"
                isActive={activeItem?.url === item.url}
              >
                <Link to={item.url as any}>
                  <Icon name={item.icon} />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
