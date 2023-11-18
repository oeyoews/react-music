import { Route } from 'next';
export const getRoute = (banner: Banner): Route => {
  const { targetId, targetType, url } = banner;
  switch (targetType) {
    case 1:
      // 歌曲页
      return `/song/${targetId}`;
    case 10:
      // 专辑页
      return `/album/${targetId}`;
    case 1000:
      // 歌单页
      return `/playlist/${targetId}`;
    case 1004:
      // MV页
      return `/video/${targetId}`;
    case 3000:
      // 站外链接
      return url as string;
    default:
      return '';
  }
};
