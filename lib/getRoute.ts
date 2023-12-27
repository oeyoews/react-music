import { Route } from 'next';

enum TargetType {
  song = 1,
  album = 10,
  playlist = 1000,
  mv = 1004,
  external = 3000
}

export const getRoute = (banner: Banner) => {
  const { targetId, targetType, url } = banner;
  const targetMap: Record<number, Route> = {
    [TargetType.song]: `/song?id=${targetId}`,
    [TargetType.album]: `/album/${targetId}`,
    [TargetType.playlist]: `/playlist/${targetId}`,
    [TargetType.mv]: '#', // TODO: coming
    [TargetType.external]: url as string
  };

  return targetMap[targetType];
};
