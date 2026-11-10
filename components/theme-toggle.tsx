'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';

import { Button } from '~components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '~components/ui/dropdown-menu';

const options = [
  { value: 'light', label: '浅色', icon: SunIcon },
  { value: 'dark', label: '深色', icon: MoonIcon },
  { value: 'system', label: '跟随系统', icon: MonitorIcon }
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // 服务端不知道当前主题，挂载后再渲染图标，避免 hydration 不一致
  React.useEffect(() => setMounted(true), []);

  const current = options.find((item) => item.value === theme) ?? options[2];
  const Icon = mounted ? current.icon : MonitorIcon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="切换主题"
            title={`主题：${mounted ? current.label : '跟随系统'}`}
          >
            <Icon />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-36">
        {options.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => setTheme(item.value)}
          >
            <item.icon />
            {item.label}
            {mounted && theme === item.value ? (
              <span className="ml-auto text-xs text-muted-foreground">✓</span>
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
