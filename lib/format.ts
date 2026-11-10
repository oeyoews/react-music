/**
 * 播放量/点赞数等大数字的中文缩写展示。
 * 少于 1 万保留原数字，其余按万/亿保留一位小数。
 */
export function formatCount(count?: number | null) {
  if (!count || count < 0) return '0';
  if (count < 10000) return String(count);

  const unit = count < 100000000 ? 10000 : 100000000;
  const suffix = unit === 10000 ? '万' : '亿';
  const value = (count / unit).toFixed(1).replace(/\.0$/, '');
  return `${value}${suffix}`;
}

/**
 * 毫秒时长转 m:ss。
 */
export function formatDuration(ms?: number | null) {
  if (!ms || ms < 0) return '--:--';

  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

import { format, formatDistanceToNow, isToday } from 'date-fns';
import { zhCN } from 'date-fns/locale';

/**
 * 最近播放时间：当天 1 小时内相对时间，否则当天显示 HH:mm。
 */
export function formatPlayedTime(timestamp?: number | null) {
  if (!timestamp || timestamp <= 0) return '—';
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return '—';

  const diff = Date.now() - timestamp;
  if (diff >= 0 && diff < 60 * 60 * 1000) {
    return formatDistanceToNow(date, { addSuffix: true, locale: zhCN });
  }
  if (isToday(date)) {
    return format(date, 'HH:mm');
  }
  if (diff >= 0 && diff < 7 * 24 * 60 * 60 * 1000) {
    return formatDistanceToNow(date, { addSuffix: true, locale: zhCN });
  }
  return format(date, 'MM-dd HH:mm');
}

/**
 * 网易云图片支持 `?param=WxH` 缩略，能显著减少流量。
 * 非网易云域名原样返回。
 */
export function getImageUrl(url?: string | null, size?: number) {
  if (!url) return undefined;
  if (!size || !url.includes('music.126.net')) return url;
  return `${url}?param=${size}y${size}`;
}
