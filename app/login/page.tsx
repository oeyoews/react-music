'use client';

import Image from 'next/image';
import useStore from '~lib/store';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getqrKey,
  qrCheck,
  getLoginStatus,
  qrCreate,
  getUserDetail,
} from '~lib/login'; // Assuming you have these API functions.
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [qrimg, setQrImg] = useState('');
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(true);
  const statusStore = useStore();

  const router = useRouter();
  const handleLogin = async () => {
    const qrkey = await getqrKey();
    const key = qrkey.data.unikey;
    setKey(key);

    const qrcreate = await qrCreate(key);
    const qrimg = qrcreate.data.qrimg;

    setQrImg(qrimg);
    toast.info('请使用手机扫描二维码登录');
  };

  const checkQr = async (key: string) => {
    const checkResult = await qrCheck(key);
    if (checkResult.code === 803) {
      statusStore.setCookie(checkResult.cookie);
      localStorage.setItem('cookie', checkResult.cookie);
      router.push('/');
      toast.success('登录成功');
    } else {
      toast.info(checkResult.message);
    }
  };

  const updateStatus = async () => {
    const loginStatus = await getLoginStatus();
    statusStore.setLoginStatus(loginStatus);
  };

  useEffect(() => {
    !localStorage.cookie && handleLogin();
    updateStatus();
    setLoading(false);
  }, [statusStore.cookie]);

  const getUserIfno = async (id: Id) => {
    const userInfo = await getUserDetail(id);
    statusStore.setUserInfo(userInfo);
    localStorage.userData = JSON.stringify(userInfo);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        !localStorage.cookie && (
          <div>
            <img src={qrimg} alt="QR Code" width={256} height={256} />
            <button
              className="bg-neutral-200 rounded-sm p-1"
              onClick={() => {
                updateStatus();
                checkQr(key);
                getUserDetail(statusStore.loginStatus.data.account?.id);
              }}>
              Login
            </button>
          </div>
        )
      )}
      <div>
        {statusStore.loginStatus?.data !== undefined && (
          <div>id: {statusStore.loginStatus.data.account?.id}</div>
        )}
        {statusStore.userInfo.profile?.nickname && (
          <div>
            <div>{JSON.stringify(statusStore.userInfo.profile)}</div>
            <div>nickname: {statusStore.userInfo.profile?.nickname}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
