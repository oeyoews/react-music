export type LrcLine = {
  time: number;
  text: string;
};

const TAG_PATTERN = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/g;

function tagToSeconds(min: string, sec: string, frac?: string) {
  const base = Number(min) * 60 + Number(sec);
  if (!frac) return base;
  const divisor = frac.length >= 3 ? 1000 : 100;
  return base + Number(frac) / divisor;
}

/**
 * 解析 LRC 文本为带时间戳的行（秒）。
 */
export function parseLrc(raw?: string | null): LrcLine[] {
  if (!raw?.trim()) return [];

  const lines: LrcLine[] = [];

  for (const row of raw.split('\n')) {
    const trimmed = row.trim();
    if (!trimmed) continue;

    const tags = [...trimmed.matchAll(TAG_PATTERN)];
    if (tags.length === 0) continue;

    const text = trimmed.replace(TAG_PATTERN, '').trim();
    if (!text) continue;

    for (const tag of tags) {
      lines.push({
        time: tagToSeconds(tag[1], tag[2], tag[3]),
        text
      });
    }
  }

  lines.sort((a, b) => a.time - b.time);
  return lines;
}

/**
 * 根据当前播放秒数返回应高亮的歌词行下标。
 */
export function activeLrcIndex(lines: LrcLine[], currentTime: number) {
  if (!lines.length) return -1;

  let active = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].time <= currentTime + 0.2) active = i;
    else break;
  }
  return active;
}
