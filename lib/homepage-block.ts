import type { Route } from 'next';

export type NormalizedItemKind =
  | 'playlist'
  | 'song'
  | 'album'
  | 'mv'
  | 'topic'
  | 'comment'
  | 'external'
  | 'dragon_ball'
  | 'unsupported';

export type NormalizedItem = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  playCount?: number;
  href?: string;
  external?: boolean;
  kind: NormalizedItemKind;
  labels?: string[];
  desc?: string;
  songId?: number;
  resourceType?: string;
};

export type NormalizedBlock = {
  key: string;
  showType: string;
  title: string;
  items: NormalizedItem[];
};

function textOf(ui?: Partial<ResourceUIElement> | null): {
  title: string;
  subtitle: string;
  image?: string;
  labels?: string[];
} {
  if (!ui) {
    return { title: '', subtitle: '' };
  }
  const title =
    ui.mainTitle?.title || ui.mainTitle?.titleDesc || ui.subTitle?.title || '';
  const subtitle = ui.subTitle?.title || '';
  const image = ui.image?.imageUrl;
  const labels = ui.labelTexts?.filter(Boolean);
  return { title, subtitle, image, labels };
}

/**
 * 将 orpheus / http 动作翻译为站内路由。
 */
export function translateAction(action?: string | null): {
  href?: string;
  external?: boolean;
} {
  if (!action) return {};

  if (action.startsWith('http://') || action.startsWith('https://')) {
    return { href: action, external: true };
  }

  if (!action.startsWith('orpheus://')) return {};

  const path = action.replace('orpheus://', '');

  if (path.startsWith('songrcmd')) {
    return { href: '/login' };
  }
  if (path.startsWith('privatefm')) {
    return { href: '/' };
  }
  if (path.startsWith('playlistCollection')) {
    return { href: '/search' };
  }

  const playlistMatch = path.match(/playlist\/(\d+)/);
  if (playlistMatch) {
    return { href: `/playlist/${playlistMatch[1]}` };
  }

  const songMatch = path.match(/song\/(\d+)/);
  if (songMatch) {
    return { href: `/song?id=${songMatch[1]}` };
  }

  const albumMatch = path.match(/album\/(\d+)/);
  if (albumMatch) {
    return { href: `/album/${albumMatch[1]}` };
  }

  const mvMatch = path.match(/mv\/(\d+)/);
  if (mvMatch) {
    return { href: `/mv/${mvMatch[1]}` };
  }

  return {};
}

function kindFromResourceType(type?: string): NormalizedItemKind {
  switch (type) {
    case 'list':
      return 'playlist';
    case 'song':
      return 'song';
    case 'album':
    case 'digitalAlbum':
      return 'album';
    case 'MV':
      return 'mv';
    case 'event_topic':
      return 'topic';
    case 'dragon_ball':
      return 'dragon_ball';
    case 'orpheus':
      return 'comment';
    default:
      return 'unsupported';
  }
}

function playCountFromExt(ext: Record<string, unknown> | undefined) {
  if (!ext) return undefined;
  const count = ext.playCount;
  return typeof count === 'number' ? count : undefined;
}

function itemFromResource(
  resource: Resource,
  creative?: Creative
): NormalizedItem | null {
  const ui = resource.uiElement ?? creative?.uiElement;
  const { title, subtitle, image, labels } = textOf(ui);
  const action = resource.action || creative?.action;
  const route = translateAction(action);
  const ext = resource.resourceExtInfo as Record<string, unknown> | undefined;
  const id = resource.resourceId || creative?.creativeId;
  if (!id) return null;

  const kind = kindFromResourceType(resource.resourceType as string);
  const songId =
    kind === 'song' || kind === 'comment'
      ? Number(resource.resourceId)
      : (ext?.songData as SongData | undefined)?.id;

  const finalTitle =
    title ||
    (ext?.songData as SongData | undefined)?.name ||
    resource.name ||
    '';

  if (!finalTitle && !image) return null;

  let href = route.href;
  if (!href && kind === 'song' && resource.resourceId) {
    href = `/song?id=${resource.resourceId}`;
  }
  if (!href && kind === 'playlist' && resource.resourceId) {
    href = `/playlist/${resource.resourceId}`;
  }
  if (!href && kind === 'album' && resource.resourceId) {
    href = `/album/${resource.resourceId}`;
  }
  if (!href && kind === 'mv' && resource.resourceId) {
    href = `/mv/${resource.resourceId}`;
  }
  const commentSong = ext?.songData as SongData | undefined;
  if (!href && kind === 'comment' && commentSong?.id) {
    href = `/song?id=${commentSong.id}`;
  }

  const desc = ui?.mainTitle?.titleDesc;

  return {
    id: String(id),
    title: finalTitle,
    subtitle,
    image,
    playCount: playCountFromExt(ext),
    href,
    external: route.external,
    kind,
    labels,
    desc,
    songId: Number.isFinite(songId) ? songId : undefined,
    resourceType: resource.resourceType as string
  };
}

function itemsFromCreative(creative: Creative): NormalizedItem[] {
  if (
    creative.resources?.length &&
    creative.resources[0]?.resourceType === 'dragon_ball'
  ) {
    return creative.resources
      .map((r) => itemFromResource(r, creative))
      .filter((item): item is NormalizedItem => Boolean(item))
      .map((item) => ({
        ...item,
        title: item.title || '推荐',
        kind: 'dragon_ball' as const
      }));
  }

  const item = itemFromCreative(creative);
  return item ? [item] : [];
}

function itemFromCreative(creative: Creative): NormalizedItem | null {
  if (creative.resources?.length) {
    const items = creative.resources
      .map((r) => itemFromResource(r, creative))
      .filter(Boolean) as NormalizedItem[];
    if (items.length === 1) return items[0];
    if (items.length > 1) {
      return {
        ...items[0],
        id: creative.creativeId || items[0].id
      };
    }
  }

  const { title, subtitle, image, labels } = textOf(creative.uiElement);
  const route = translateAction(creative.action);
  if (!title && !image) return null;

  return {
    id: creative.creativeId || title,
    title: title || '推荐',
    subtitle,
    image,
    href: route.href,
    external: route.external,
    kind: 'unsupported',
    labels
  };
}

export function normalizeHomepageBlocks(
  blocks: Block[] | null
): NormalizedBlock[] {
  if (!blocks?.length) return [];

  return blocks
    .map((block) => {
      const title = block.uiElement?.subTitle?.title || '';
      const items = (block.creatives ?? []).flatMap((creative) =>
        itemsFromCreative(creative)
      );

      return {
        key: block.blockCode,
        showType: block.showType,
        title,
        items
      };
    })
    .filter(
      (block) => block.items.length > 0 || block.key === 'HOMEPAGE_BANNER'
    );
}

export function blockTitleFallback(key: string, showType: string) {
  const map: Record<string, string> = {
    HOMEPAGE_BLOCK_PLAYLIST_RCMD: '推荐歌单',
    HOMEPAGE_BLOCK_STYLE_RCMD: '为你定制精选歌曲',
    HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG: '新歌新碟',
    HOMEPAGE_BLOCK_HOT_TOPIC: '热门话题',
    HOMEPAGE_MUSIC_CALENDAR: '音乐日历',
    HOMEPAGE_BLOCK_MGC_PLAYLIST: '雷达歌单',
    HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST: '专属场景歌单',
    HOMEPAGE_BLOCK_VIDEO_PLAYLIST: '视频合辑',
    HOMEPAGE_BLOCK_NEW_HOT_COMMENT: '热评歌曲',
    HOMEPAGE_BLOCK_YUNCUN_PRODUCED: '云村出品',
    HOMEPAGE_VOICELIST_RCMD: '播客推荐',
    HOMEPAGE_PODCAST24: '广播'
  };
  return map[key] || showType;
}

export type AppRoute = Route;
