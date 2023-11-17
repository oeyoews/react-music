'use client';

import useStore from '~lib/store';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getqrKey,
  qrCheck,
  getLoginStatus,
  qrCreate,
  getUserDetail,
  logout,
} from '~lib/login'; // Assuming you have these API functions.
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [qrimg, setQrImg] = useState('');
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(true);
  const statusStore = useStore();
  const handleLogout = () => {
    logout();
    statusStore.setCookie('');
    localStorage.removeItem('cookie');
    toast.info('退出登录成功');
    router.push('/');
  };

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
    const loginStatus = await getLoginStatus(localStorage.cookie);
    statusStore.setLoginStatus(loginStatus);
  };

  useEffect(() => {
    !localStorage.cookie && handleLogin();
    updateStatus();
    setLoading(false);
  }, [statusStore.cookie]);

  const getUserIfno = async (id: Id) => {
    const userInfo = await getUserDetail(id, localStorage.cookie);
    statusStore.setUserInfo(userInfo);
    localStorage.userData = JSON.stringify(userInfo);
    console.log(JSON.stringify(userInfo));
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
                getUserIfno(statusStore.loginStatus.data.account.id);
              }}>
              Login
            </button>
          </div>
        )
      )}
      <button
        onClick={() => getUserIfno(statusStore.loginStatus.data.account.id)}
        className="bg-neutral-200 rounded-sm p-1">
        Get User info
      </button>
      {statusStore.userInfo?.profile && (
        <div className="flex items-center space-x-2">
          <Image
            src={statusStore.userInfo.profile?.avatarUrl}
            width={22}
            height={22}
            className="rounded-full not-prose"
            alt={statusStore.userInfo.profile?.nickname}
            title={statusStore.userInfo.profile.userId.toString()}
          />
          {statusStore.userInfo?.profile?.nickname}
        </div>
      )}
      <div>
        {statusStore.cookie && (
          <button className="bg-rose-200 rounded-sm p-1" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
