'use client';

import useStore from '~lib/store';
import Image from 'next/image';

// TODO: 重构登录
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getLevel,
  getqrKey,
  qrCheck,
  getLoginStatus,
  qrCreate,
  logout,
  getAccount,
  loginAnonymous,
  getVipInfo,
  getVersion,
} from '~lib/login'; // Assuming you have these API functions.
import { toast } from 'react-hot-toast';
import { QRCodeSVG } from 'qrcode.react';

const LoginPage = () => {
  const [qrurl, setQrURL] = useState('');
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState(0);
  const [progress, setProgress] = useState(0);
  const [version, setVersion] = useState(0);
  const statusStore = useStore();

  const btnClass = 'bg-neutral-200 shadow p-2 rounded-sm font-bold';
  const handleLogout = () => {
    logout();
    statusStore.setCookie('');
    localStorage.removeItem('cookie');
    toast.success('退出登录成功');
    // router.push('/');
  };

  const router = useRouter();
  const handleLogin = async () => {
    const qrkey = await getqrKey();
    const key = qrkey.data.unikey;
    setKey(key);

    const qrcreate = await qrCreate(key);
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

  const handleLevel = () => {
    if (!statusStore.userInfo.account?.anonimousUser) {
      toast.loading('loading ...');
      getLevel(localStorage.cookie).then((res) => {
        setLevel(res.data.level);
        setProgress(res.data.progress);
      });
      // getVipInfo(localStorage.cookie).then((res) => {
      //   statusStore.setVipInfo(res.data);
      // });
      toast.dismiss();
    } else {
      toast('游客模式下无法查看会员信息');
    }
  };

  useEffect(() => {
    toast.loading('loading ...');
    getVersion().then((res) => {
      setVersion(res.data.version);
    });
    statusStore.setCookie(localStorage.cookie);
    if (!localStorage.cookie) {
      handleLogin();
    }
    updateStatus();
    setLoading(false);
    getUserIfno();
    handleLevel();
    toast.dismiss();
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
          <div className="">
            {/* <img src={qrimg} alt="QR Code" width={256} height={256} /> */}
            {/* // canvas 确实不如svg */}
            <div className="flex justify-center items-center">
              {qrurl && <QRCodeSVG value={qrurl} width={256} height={256} />}
            </div>
            <div className="space-x-2 flex justify-center mt-4">
              <button
                className={btnClass}
                onClick={() => {
                  updateStatus();
                  checkQr(key);
                }}>
                网易云账号扫码登录
              </button>
              <button
                className={btnClass}
                onClick={() => {
                  loginAnonymous().then((res) => {
                    statusStore.setCookie(res.cookie);
                    localStorage.setItem('cookie', res.cookie);
                    toast('游客登录成功');
                  });
                }}>
                游客登录
              </button>
            </div>
          </div>
        )
      )}
      {statusStore.userInfo?.profile && (
        <div className="flex space-x-2 justify-center my-4 flex-row">
          <div className="">
            <Image
              src={statusStore.userInfo.profile?.avatarUrl}
              width={52}
              height={52}
              className="rounded-full not-prose shadow-md"
              alt={statusStore.userInfo.profile?.nickname}
              title={statusStore.userInfo.profile.userId.toString()}
            />
          </div>
          <div>
            <div>{statusStore.userInfo?.profile?.nickname}</div>
            <div className="flex items-center space-x-2 w-48">
              <progress value={progress} max={1} id="om-progress" />
              <div>Lv.{level}</div>
            </div>
          </div>
        </div>
      )}
      {statusStore.cookie && (
        <div className="flex justify-center items-center">
          <button className={btnClass} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      <footer className="text-gray-400  text-sm text-right mt-4">
        网易云 API 版本号: {version}
      </footer>
    </div>
  );
};

export default LoginPage;
