import { AppShell } from '~components/layout/AppShell';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}

// 外壳由根布局统一套用，避免 /dashboard 再包一层。
export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
