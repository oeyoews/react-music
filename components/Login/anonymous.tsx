'use client';

import { useEffect } from 'react';
import { loginAnonymous } from '~lib/login';
import { readCookie, writeCookie } from '~lib/cookie';

/**
 * 没有 cookie 时静默拿一个游客 cookie。
 * 写入后通过 COOKIE_EVENT 通知依赖登录态的组件刷新。
 */
export const LoginAnonymous = () => {
  useEffect(() => {
    if (readCookie()) return;

    let cancelled = false;
    loginAnonymous()
      .then((res) => {
        if (cancelled || !res?.cookie) return;
        if (readCookie()) return;
        writeCookie(res.cookie);
      })
      .catch((e) => {
        console.error(e);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
};
