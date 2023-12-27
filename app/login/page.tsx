'use client';

import { useMusicStore } from '~lib/store';
import Image from 'next/image';

// TODO: 重构登录
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getqrKey,
  qrCheck,
  getLoginStatus,
  qrCreate,
  logout,
  getAccount,
  loginAnonymous
} from '~lib/login'; // Assuming you have these API functions.
import { toast } from 'react-hot-toast';
import { QRCodeSVG } from 'qrcode.react';

// TODO: 改成swr
const LoginPage = () => {
  const [qrurl, setQrURL] = useState('');
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(true);
  const setCookie = useMusicStore.use.setCookie();
  const setLoginStatus = useMusicStore.use.setLoginStatus();
  const setUserInfo = useMusicStore.use.setUserInfo();

  const btnClass = 'bg-neutral-200 shadow p-2 rounded-sm font-bold';

  const router = useRouter();

  const checkQr = async (key: string) => {
    const checkResult = await qrCheck(key);
    if (checkResult.code === 803) {
      setCookie(checkResult.cookie);
      localStorage.setItem('cookie', checkResult.cookie);
      router.push('/');
      toast.success('登录成功');
    } else {
      toast(checkResult.message);
    }
  };

  const updateStatus = async () => {
    const loginStatus = await getLoginStatus(localStorage.cookie);
    setLoginStatus(loginStatus);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await getAccount(localStorage.cookie);
      setUserInfo(userInfo);
      localStorage.userData = JSON.stringify(userInfo);
    };
    const handleLogin = async () => {
      const qrkey = await getqrKey();
      const key = qrkey.data.unikey;
      setKey(key);

      const qrcreate = await qrCreate(key);
      const qrurl = qrcreate.data.qrurl;
      setQrURL(qrurl);

      toast.promise(qrCreate(key), {
        loading: '生成QRCode ...',
        success: '请使用手机扫描二维码登录',
        error: 'QRCode 生成失败'
      });
    };

    setCookie(localStorage.cookie);

    if (!localStorage.cookie) {
      handleLogin();
    }

    updateStatus();
    setLoading(false);
    getUserInfo();
  }, []);

  return (
    <div className="">
      {loading ? (
        <></>
      ) : (
        !localStorage.cookie && (
          <div className="">
            {/* <img src={qrimg} alt="QR Code" width={256} height={256} /> */}
            {/* // canvas 确实不如svg */}
            <div className="flex justify-center items-center">
              {qrurl ? (
                <QRCodeSVG value={qrurl} width={256} height={256} />
              ) : (
                <div className="w-64 h-64 shadow-sm animate-pulse bg-neutral-200/80"></div>
              )}
            </div>
            <div className="space-x-2 flex justify-center mt-4">
              <button
                className={btnClass}
                onClick={() => {
                  updateStatus();
                  checkQr(key);
                }}
              >
                网易云账号扫码登录
              </button>
              <button
                className={btnClass}
                onClick={() => {
                  loginAnonymous().then((res) => {
                    setCookie(res.cookie);
                    localStorage.setItem('cookie', res.cookie);
                    toast('游客登录成功');
                  });
                }}
              >
                游客登录
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default LoginPage;
