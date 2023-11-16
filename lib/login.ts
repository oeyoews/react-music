'use server';
import { createApiUrl } from './createApiUrl';
import { fetchData } from './fetchData';

/**
 * generate qr code key
 */
export const getqrKey = async (): Promise<IQRCode> => {
  const url = createApiUrl('/login/qr/key', { timestamp: Date.now() });
  return await fetchData(url);
};

/**
 * generate qrcode image
 * @param key
 * @returns
 */
export const qrCreate = async (key: string): Promise<IQRCodeData> => {
  const url = createApiUrl('/login/qr/create', {
    key,
    qrimg: true,
    timestamp: Date.now(),
  });
  return await fetchData(url);
};

/**
 * check qrcode status
 * @param key
 * @returns
 */
export const qrCheck = async (key: string): Promise<CheckQrcode> => {
  const url = createApiUrl('/login/qr/check', {
    key,
    timestamp: Date.now(),
  });
  return await fetchData(url, { method: 'post' });
};

/**
 * check login status
 * @returns
 */
export const getQrStatus = async (): Promise<ILoginStatus> => {
  const url = createApiUrl('/login/status', { timestamp: Date.now() });
  return await fetchData(url);
};

/**
 * login with anonymous
 * @returns
 */
export const loginAnonymous = async (): Promise<any> => {
  const url = createApiUrl('/register/anonymous', { timestamp: Date.now() });
  return await fetchData(url);
};

export const refreshLogin = async () => {
  const url = createApiUrl('/login/refresh', { timestamp: Date.now() });
  return await fetchData(url);
};
