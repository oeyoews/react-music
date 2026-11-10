'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import {
  Disc3Icon,
  Music2Icon,
  SearchIcon,
  SparklesIcon,
  TrendingUpIcon,
  UserIcon
} from 'lucide-react';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Spinner } from '@/components/ui/spinner';
import {
  searchDefault,
  searchHot,
  searchHotDetail,
  searchSuggest
} from '~lib/search';
import { toQueueSong } from '~lib/playlist-queue';
import { useMusicStore } from '~lib/store';

function defaultKeywordFromApi(data: ISearchDefault | null | undefined) {
  const word = data?.data?.showKeyword?.split(' ')[0] ?? '';
  if (word.length < 2) {
    return '';
  }
  return word;
}

function hotWordsFromSimple(
  data: { result?: { hots?: { first: string }[] } } | null
) {
  return (
    data?.result?.hots?.map((item) => ({
      searchWord: item.first,
      content: ''
    })) ?? []
  );
}

export default function SidebarSearchMusic() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const router = useRouter();
  const playSong = useMusicStore.use.playSong();

  const { data: defaultData } = useSWR('/search/default', searchDefault, {
    revalidateOnFocus: false
  });

  const { data: hotDetail, isLoading: hotDetailLoading } = useSWRImmutable(
    '/search/hot/detail',
    searchHotDetail
  );

  const needHotFallback = !hotDetail?.data?.length;
  const { data: hotSimple, isLoading: hotSimpleLoading } = useSWRImmutable(
    needHotFallback ? '/search/hot' : null,
    searchHot
  );

  const trimmed = query.trim();
  const { data: suggestData, isLoading: suggestLoading } = useSWR(
    open && trimmed.length >= 1 ? ['search/suggest', trimmed] : null,
    () => searchSuggest(trimmed)
  );

  const fallbackKeyword = defaultKeywordFromApi(defaultData ?? undefined);
  const placeholder = fallbackKeyword
    ? `搜索：${fallbackKeyword}`
    : '搜索歌曲、歌手、专辑…';

  const hotList = React.useMemo(() => {
    if (hotDetail?.data?.length) {
      return hotDetail.data;
    }
    return hotWordsFromSimple(hotSimple);
  }, [hotDetail, hotSimple]);

  const hotLoading = hotDetailLoading || (needHotFallback && hotSimpleLoading);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const closeAndReset = () => {
    setOpen(false);
    setQuery('');
  };

  const goSearch = (word: string) => {
    if (!word) {
      return;
    }
    closeAndReset();
    router.push(`/search?searchWord=${encodeURIComponent(word)}`);
  };

  const goSong = (song: {
    id: number;
    name: string;
    artists?: { name?: string }[];
    album?: { picUrl?: string };
  }) => {
    closeAndReset();
    playSong(toQueueSong(song));
  };

  const goArtist = (id: number) => {
    closeAndReset();
    router.push(`/artist/${id}`);
  };

  const goAlbum = (id: number) => {
    closeAndReset();
    router.push(`/album/${id}`);
  };

  const submitSearch = () => {
    goSearch(trimmed || fallbackKeyword);
  };

  const suggest = suggestData?.result;
  const showIdle = !trimmed;
  const hasSuggest =
    Boolean(suggest?.songs?.length) ||
    Boolean(suggest?.artists?.length) ||
    Boolean(suggest?.albums?.length);
  const showIdleEmpty =
    showIdle && !hotLoading && hotList.length === 0 && !fallbackKeyword;

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton
          type="button"
          onClick={() => setOpen(true)}
          className="w-full"
        >
          <SearchIcon />
          <span>音乐搜索</span>
          <kbd className="pointer-events-none ml-auto hidden h-5 items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 select-none sm:inline-flex">
            Ctrl+K
          </kbd>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <CommandDialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) {
            setQuery('');
          }
        }}
        title="音乐搜索"
        description="搜索歌曲、歌手、专辑或查看热搜"
        className="sm:max-w-xl"
        showCloseButton
      >
        <Command shouldFilter={false} filter={() => 1} loop>
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder={placeholder}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                submitSearch();
              }
            }}
          />
          <CommandList className="max-h-80">
            {showIdleEmpty ? (
              <CommandEmpty>暂无推荐，请输入关键词搜索</CommandEmpty>
            ) : null}

            {trimmed && !suggestLoading && !hasSuggest ? (
              <CommandEmpty>无匹配结果</CommandEmpty>
            ) : null}

            {showIdle && fallbackKeyword ? (
              <CommandGroup heading="猜你想搜">
                <CommandItem
                  keywords={[fallbackKeyword]}
                  value={`guess-${fallbackKeyword}`}
                  onSelect={() => goSearch(fallbackKeyword)}
                >
                  <SparklesIcon />
                  <span className="truncate">{fallbackKeyword}</span>
                </CommandItem>
              </CommandGroup>
            ) : null}

            {showIdle ? (
              <CommandGroup heading="热搜">
                {hotLoading ? (
                  <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                    <Spinner />
                    加载热搜中…
                  </div>
                ) : (
                  hotList.map((item, index) => (
                    <CommandItem
                      key={`${item.searchWord}-${index}`}
                      keywords={[item.searchWord, item.content ?? '']}
                      value={`hot-${index}-${item.searchWord}`}
                      onSelect={() => goSearch(item.searchWord)}
                    >
                      <TrendingUpIcon />
                      <span className="truncate">{item.searchWord}</span>
                      {item.content ? (
                        <span className="text-muted-foreground ml-2 truncate text-xs">
                          {item.content}
                        </span>
                      ) : null}
                    </CommandItem>
                  ))
                )}
              </CommandGroup>
            ) : null}

            {trimmed && suggestLoading ? (
              <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                <Spinner />
                搜索中…
              </div>
            ) : null}

            {trimmed && suggest?.songs && suggest.songs.length > 0 ? (
              <CommandGroup heading="歌曲">
                {suggest.songs.map((song) => (
                  <CommandItem
                    key={`song-${song.id}`}
                    keywords={[song.name, song.artists?.[0]?.name ?? '']}
                    value={`song-${song.id}-${song.name}`}
                    onSelect={() => goSong(song)}
                  >
                    <Music2Icon />
                    <span className="truncate">
                      {song.name}
                      {song.artists?.[0]?.name ? (
                        <span className="text-muted-foreground">
                          {' '}
                          — {song.artists[0].name}
                        </span>
                      ) : null}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null}

            {trimmed && suggest?.artists && suggest.artists.length > 0 ? (
              <>
                <CommandSeparator />
                <CommandGroup heading="歌手">
                  {suggest.artists.map((artist) => (
                    <CommandItem
                      key={`artist-${artist.id}`}
                      keywords={[artist.name]}
                      value={`artist-${artist.id}-${artist.name}`}
                      onSelect={() => goArtist(artist.id)}
                    >
                      <UserIcon />
                      <span className="truncate">{artist.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            ) : null}

            {trimmed && suggest?.albums && suggest.albums.length > 0 ? (
              <>
                <CommandSeparator />
                <CommandGroup heading="专辑">
                  {suggest.albums.map((album) => (
                    <CommandItem
                      key={`album-${album.id}`}
                      keywords={[album.name, album.artist?.name ?? '']}
                      value={`album-${album.id}-${album.name}`}
                      onSelect={() => goAlbum(album.id)}
                    >
                      <Disc3Icon />
                      <span className="truncate">
                        {album.name}
                        {album.artist?.name ? (
                          <span className="text-muted-foreground">
                            {' '}
                            — {album.artist.name}
                          </span>
                        ) : null}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            ) : null}

            {trimmed ? (
              <>
                <CommandSeparator />
                <CommandGroup heading="查看全部">
                  <CommandItem
                    keywords={[trimmed]}
                    value={`search-all-${trimmed}`}
                    onSelect={() => goSearch(trimmed)}
                  >
                    <SearchIcon />
                    搜索「{trimmed}」
                  </CommandItem>
                </CommandGroup>
              </>
            ) : null}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
