'use client';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { NavSidebar } from '~components/layout/NavSidebar';
import { TopBar } from '~components/layout/TopBar';
import { PlayerBar } from '~components/Player/PlayerBar';
import { NowPlayingView } from '~components/Player/NowPlayingView';
import { LoginAnonymous } from '~components/Login/anonymous';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      defaultOpen
      style={
        {
          '--sidebar-width': '15.5rem'
        } as React.CSSProperties
      }
    >
      <LoginAnonymous />
      <NavSidebar />
      <SidebarInset className="min-h-svh bg-background">
        <TopBar />
        <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-6 pb-[calc(var(--player-bar-height)+1.5rem)] md:px-6">
          {children}
        </main>
        <NowPlayingView />
        <PlayerBar />
      </SidebarInset>
    </SidebarProvider>
  );
}
