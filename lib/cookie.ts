/**
 * cookie 写入后广播的自定义事件名。
 * 匿名登录、扫码登录、退出登录都通过 setCookie 写入，
 * 依赖 cookie 的组件监听这里就能同步刷新。
 */
export const COOKIE_EVENT = 'music:cookie-change';

/** 扫码登录后的账号 cookie。游客 cookie 没有 MUSIC_U。 */
export function isAccountCookie(cookie: string) {
  return /(?:^|;)\s*MUSIC_U=/.test(cookie);
}

export function readCookie() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('cookie') ?? '';
}

export function writeCookie(cookie: string) {
  localStorage.setItem('cookie', cookie);
  window.dispatchEvent(new Event(COOKIE_EVENT));
}

export function clearCookie() {
  localStorage.removeItem('cookie');
  window.dispatchEvent(new Event(COOKIE_EVENT));
}
