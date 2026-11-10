'use client';

import { useSyncExternalStore } from 'react';
import { COOKIE_EVENT } from '~lib/cookie';

function subscribe(onStoreChange: () => void) {
  window.addEventListener(COOKIE_EVENT, onStoreChange);
  window.addEventListener('storage', onStoreChange);
  return () => {
    window.removeEventListener(COOKIE_EVENT, onStoreChange);
    window.removeEventListener('storage', onStoreChange);
  };
}

function readStoredCookie() {
  return localStorage.getItem('cookie') ?? '';
}

/**
 * 读取 localStorage 里的登录 cookie。
 * 匿名登录是异步写入的，所以除了首次读取还要监听 COOKIE_EVENT。
 */
export function useCookie() {
  return useSyncExternalStore(subscribe, readStoredCookie, () => '');
}
