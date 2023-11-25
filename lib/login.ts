'use server';

import { customfetch as fetch } from './fetchData';

/**
 * 01: generate qr code key
 * 五分钟过期
 * cookie: 20天后不活跃可引导用户重新登录(maybe)
 */
export const getqrKey = async (): Promise<IQRCode> => {
  return await fetch({
    url: '/login/qr/key',
    params: { timestamp: Date.now() },
  });
};

/**
 * 02: generate qrcode image
 * @param key
 * @returns
 */
export const qrCreate = async (key: string): Promise<IQRCodeData> => {
  return await fetch({
    url: '/login/qr/create',
    params: {
      key,
      qrimg: true,
      timestamp: Date.now(),
    },
  });
};

/**
 * @description 03: check qrcode status
 * @param key
 * @returns
 */
export const qrCheck = async (key: string): Promise<CheckQrcode> => {
  return await fetch({
    url: '/login/qr/check',
    params: {
      key,
      timestamp: Date.now(),
    },
  });
};

/**
 * @description 04: check login status
 * @returns
 */
export const getLoginStatus = async (cookie: string): Promise<ILoginStatus> => {
  return await fetch({
    url: '/login/status',
    params: { timestamp: Date.now(), cookie },
  });
};

// cookie 永不过期
export const loginAnonymous = async (): Promise<ICookieAnonymous> => {
  return await fetch({
    url: '/register/anonimous',
    params: { timestamp: Date.now() },
  });
};

export const refreshLogin = async () => {
  return await fetch({
    url: '/login/refresh',
    params: { timestamp: Date.now() },
  });
};

// need login
export const getAccount = async (cookie: string): Promise<IUserAccount> => {
  return await fetch({
    url: '/user/account',
    params: { timestamp: Date.now(), cookie },
  });
};

// need login
export const getLevel = async (cookie: string): Promise<ILevel> => {
  return await fetch({
    url: '/user/level',
    params: { timestamp: Date.now(), cookie },
  });
};

// need login
export const getUserDetail = async (uid: Id) => {
  return await fetch({
    url: '/user/detail',
    params: { uid },
  });
};

export const logout = async (): Promise<any> => {
  return await fetch({
    url: '/logout',
  });
};

// /user/playlist?uid=32953014

export const getVipInfo = async (cookie: string): Promise<IVipInfo> => {
  return await fetch({
    url: '/vip/info',
  });
};

export const getVersion = async (): Promise<IVersion> => {
  return await fetch({
    url: '/inner/version',
  });
};
