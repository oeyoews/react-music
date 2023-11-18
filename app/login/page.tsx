'use client';

import useStore from '~lib/store';
import Image from 'next/image';

// TODO: 重构登录
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getqrKey,
  qrCheck,
  getLoginStatus,
  qrCreate,
  logout,
  getAccount,
  loginAnonymous,
} from '~lib/login'; // Assuming you have these API functions.
import { toast } from 'react-hot-toast';
import { QRCodeSVG } from 'qrcode.react';

const LoginPage = () => {
  const [qrurl, setQrURL] = useState('');
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(true);
  const statusStore = useStore();
  const handleLogout = () => {
    logout();
    statusStore.setCookie('');
    localStorage.removeItem('cookie');
    toast.success('退出登录成功');
    router.push('/');
  };

  const router = useRouter();
  const handleLogin = async () => {
    const qrkey = await getqrKey();
    const key = qrkey.data.unikey;
    setKey(key);

    const qrcreate = await qrCreate(key);
    const qrimg = qrcreate.data.qrimg;
    const qrurl = qrcreate.data.qrurl;

    // setQrImg(qrimg);
    setQrURL(qrurl);
    toast('请使用手机扫描二维码登录');
  };

  const checkQr = async (key: string) => {
    const checkResult = await qrCheck(key);
    if (checkResult.code === 803) {
      statusStore.setCookie(checkResult.cookie);
      localStorage.setItem('cookie', checkResult.cookie);
      router.push('/');
      toast.success('登录成功');
    } else {
      toast(checkResult.message);
    }
  };

  const updateStatus = async () => {
    const loginStatus = await getLoginStatus(localStorage.cookie);
    statusStore.setLoginStatus(loginStatus);
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!localStorage.cookie) {
      handleLogin();
      loginAnonymous().then((res) => {
        statusStore.setCookie(res.cookie);
        localStorage.setItem('cookie', res.cookie);
      });
    }
    updateStatus();
    setLoading(false);
    getUserIfno();
  }, [statusStore.cookie]);

  const getUserIfno = async () => {
    const userInfo = await getAccount(localStorage.cookie);
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
            {/* <img src={qrimg} alt="QR Code" width={256} height={256} /> */}
            {/* // canvas 确实不如svg */}
            {qrurl && <QRCodeSVG value={qrurl} width={256} height={256} />}
            <button
              className="bg-neutral-200 rounded-sm p-1 my-2"
              onClick={() => {
                updateStatus();
                checkQr(key);
              }}>
              Login
            </button>
          </div>
        )
      )}
      {statusStore.userInfo?.profile && (
        <div className="flex items-center space-x-2">
          <Image
            src={statusStore.userInfo.profile?.avatarUrl}
            width={48}
            height={48}
            className="rounded-full not-prose shadow-sm"
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
