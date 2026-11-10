'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HouseIcon, MusicIcon, UserIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import SidebarSearchMusic from '@/components/SidebarSearchMusic';

const nav = [
  { title: '音乐推荐', url: '/', icon: HouseIcon },
  { title: '用户信息', url: '/login', icon: UserIcon }
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <MusicIcon className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">在线音乐</span>
                <span>Beta</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1">
            {nav.map((item) => {
              const active =
                item.url === '/'
                  ? pathname === '/'
                  : pathname === item.url ||
                    pathname.startsWith(`${item.url}/`);

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={active}
                    render={<Link href={item.url} />}
                  >
                    <item.icon />
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarSearchMusic />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
