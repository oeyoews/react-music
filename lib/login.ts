import { createApiUrl } from './createApiUrl';
import { fetchData } from './fetchData';

export const getqrKey = async (): Promise<IQRCode> => {
  const url = createApiUrl('/login/qr/key', { timestamp: Date.now() });
  return await fetchData(url);
};

export const qrCreate = async (key: string): Promise<IQRCodeData> => {
  const url = createApiUrl('/login/qr/create', {
    key,
    qrimg: true,
    timestamp: Date.now(),
  });
  return await fetchData(url);
};

// export const qrCheck = async (key: string): Promise<IQRCodeData> => {
//   const url = createApiUrl('/login/qr/check', {
//     key,
//     timestamp: Date.now(),
//   });
//   return await fetchData(url);
// };

export const getQrStatus = async (): Promise<ILoginStatus> => {
  const url = createApiUrl('/login/status', { timestamp: Date.now() });
  return await fetchData(url);
};
