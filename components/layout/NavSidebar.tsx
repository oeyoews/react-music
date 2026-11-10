'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  CompassIcon,
  FlameIcon,
  HeartIcon,
  Music2Icon,
  PodcastIcon,
  RadioIcon,
  SparklesIcon,
  StarIcon,
  UserRoundIcon
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import SidebarSearchMusic from '@/components/SidebarSearchMusic';
import { useMusicStore } from '~lib/store';
import { useUserPlaylists } from '~lib/hooks';
import { cn } from '~lib/utils';

const activeNavClass =
  'rounded-lg bg-[var(--brand)] text-white hover:bg-[var(--brand)] hover:text-white data-active:bg-[var(--brand)] data-active:text-white [&_svg]:text-white';

const discoverNav = [
  { title: '推荐', url: '/', icon: Music2Icon },
  { title: '精选', url: '/?section=featured', icon: SparklesIcon },
  { title: '播客', url: '/search?searchWord=播客', icon: PodcastIcon },
  { title: '漫游', url: '/search?searchWord=漫游', icon: RadioIcon },
  { title: '关注', url: '/search?searchWord=关注', icon: StarIcon }
];

const myMusicNav = [
  { title: '我喜欢的音乐', url: '/login', icon: HeartIcon, requireLogin: true },
  { title: '最近播放', url: '/recent', icon: FlameIcon },
  { title: '我的播客', url: '/login', icon: PodcastIcon, requireLogin: true },
  { title: '我的收藏', url: '/login', icon: CompassIcon, requireLogin: true }
];

const LIKED_PLAYLIST_TYPE = 5;

const discoverUrls = discoverNav.map((item) => item.url);
const myMusicUrls = myMusicNav.map((item) => item.url);

function queryMatches(query: string, search: string) {
  const expected = new URLSearchParams(query);
  const actual = new URLSearchParams(search);
  for (const [key, value] of expected) {
    if (actual.get(key) !== value) return false;
  }
  return true;
}

function isItemActive(
  pathname: string,
  search: string,
  url: string,
  urls: string[]
) {
  const [path, query = ''] = url.split('?');
  const onPath =
    path === '/'
      ? pathname === '/'
      : pathname === path || pathname.startsWith(`${path}/`);

  if (!onPath) return false;
  if (query) return pathname === path && queryMatches(query, search);

  return !urls.some((sibling) => {
    if (sibling === url) return false;
    const [siblingPath, siblingQuery = ''] = sibling.split('?');
    return (
      siblingPath === path &&
      Boolean(siblingQuery) &&
      pathname === siblingPath &&
      queryMatches(siblingQuery, search)
    );
  });
}

export function NavSidebar() {
  return (
    <Suspense fallback={<NavSidebarView search="" />}>
      <NavSidebarWithSearch />
    </Suspense>
  );
}

function NavSidebarWithSearch() {
  const searchParams = useSearchParams();
  return <NavSidebarView search={searchParams.toString()} />;
}

function NavSidebarView({ search }: { search: string }) {
  const pathname = usePathname();
  const userInfo = useMusicStore.use.userInfo();
  const uid = userInfo?.profile?.userId;
  const { data: playlistData } = useUserPlaylists(uid);
  const allPlaylists = playlistData?.playlists ?? [];
  const liked = allPlaylists.find(
    (playlist) => playlist.specialType === LIKED_PLAYLIST_TYPE
  );
  const playlists = allPlaylists
    .filter((playlist) => playlist.id !== liked?.id)
    .slice(0, 6);
  const likedPending = Boolean(uid) && playlistData == null;
  const likedUrl = liked
    ? `/playlist/${liked.id}`
    : likedPending
      ? null
      : '/login';

  return (
    <Sidebar variant="sidebar" className="border-r border-border/60">
      <SidebarHeader className="px-4 py-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--brand)] text-white">
            <Music2Icon className="size-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold">在线音乐</span>
            <span className="text-xs text-muted-foreground">Beta</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>发现</SidebarGroupLabel>
          <SidebarMenu>
            {discoverNav.map((item) => {
              const active = isItemActive(
                pathname,
                search,
                item.url,
                discoverUrls
              );
              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    isActive={active}
                    className={cn(active && activeNavClass)}
                    render={<Link href={item.url} />}
                  >
                    <item.icon className="size-4" />
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>我的音乐</SidebarGroupLabel>
          <SidebarMenu>
            {myMusicNav.map((item) => {
              const url = item.title === '我喜欢的音乐' ? likedUrl : item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    disabled={!url}
                    isActive={
                      url
                        ? isItemActive(pathname, search, url, myMusicUrls)
                        : false
                    }
                    render={url ? <Link href={url} /> : undefined}
                  >
                    <item.icon className="size-4" />
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>创建的歌单</SidebarGroupLabel>
          <SidebarMenu>
            {!uid ? (
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/login" />}>
                  <UserRoundIcon className="size-4" />
                  登录后查看
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : playlists.length === 0 ? (
              <SidebarMenuItem>
                <span className="px-2 text-xs text-muted-foreground">
                  暂无歌单
                </span>
              </SidebarMenuItem>
            ) : (
              playlists.map((playlist) => (
                <SidebarMenuItem key={playlist.id}>
                  <SidebarMenuButton
                    isActive={pathname === `/playlist/${playlist.id}`}
                    render={<Link href={`/playlist/${playlist.id}`} />}
                    className="h-9"
                  >
                    <span
                      className={cn(
                        'size-6 shrink-0 rounded bg-muted bg-cover bg-center'
                      )}
                      style={{
                        backgroundImage: playlist.coverImgUrl
                          ? `url(${playlist.coverImgUrl})`
                          : undefined
                      }}
                    />
                    <span className="truncate text-sm">{playlist.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            )}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarSearchMusic />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
