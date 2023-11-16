'use server';

import { fetchData as fetch } from './fetchData';

/**
 * generate qr code key
 */
export const getqrKey = async (): Promise<IQRCode> => {
  return await fetch({
    url: '/login/qr/key',
    params: { timestamp: Date.now() },
  });
};

/**
 * generate qrcode image
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
 * check qrcode status
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
    options: { method: 'post' },
  });
};

/**
 * check login status
 * @returns
 */
export const getLoginStatus = async (): Promise<ILoginStatus> => {
  return await fetch({
    url: '/login/status',
    params: { timestamp: Date.now() },
  });
};

/**
 * login with anonymous
 * @returns
 */
export const loginAnonymous = async (): Promise<any> => {
  return await fetch({
    url: '/login/qr/code',
    params: { timestamp: Date.now() },
  });
};

export const refreshLogin = async () => {
  return await fetch({
    url: '/login/refresh',
    params: { timestamp: Date.now() },
  });
};
