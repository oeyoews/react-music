'use client';
import Image from 'next/image';

// Import necessary dependencies and API functions
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
  const [loginStatus, setLoginStatus] = useState<ILoginStatus>();
  const [cookie, setCookie] = useState(localStorage.getItem('cookie'));
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>();

  const router = useRouter();
  const handleLogin = async () => {
    // Step 1: Get QR Code Key
    const qrkey = await getqrKey();
    const key = qrkey.data.unikey;
    setKey(key);

    // Step 2: Create QR Code
    const qrcreate = await qrCreate(key);
    const qrimg = qrcreate.data.qrimg;

    // Display QR Code to the user
    setQrImg(qrimg);
    toast.info('请使用手机扫描二维码登录');
    // Step 3: Check QR Code Status
    // const checkResult = await qrCheck(key);
  };

  const checkQr = async (key: string) => {
    const checkResult = await qrCheck(key);
    if (checkResult.code === 803) {
      localStorage.setItem('cookie', checkResult.cookie);
      // localStorage.setItem('userData', )
      router.push('/');
      toast.success('登录成功');
    } else {
      toast.info(checkResult.message);
    }
  };

  const updateStatus = async () => {
    const loginStatus = await getLoginStatus();
    localStorage.setItem('userData', JSON.stringify(loginStatus.data));
    setLoginStatus(loginStatus);
  };

  useEffect(() => {
    !cookie && handleLogin();
    updateStatus();
    setLoading(false);
    getUserDetail(loginStatus?.data.account.id as Id).then((res) => {
      const userid = res.profile?.userId;
      setUserData(userid);
    });
  }, [cookie]);

  // setInterval(async () => {
  //   const qrCodeChecked = await qrCheck(key);
  //   // setLoginStatus(qrCodeChecked.code);
  // }, 60000);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        !cookie && <Image src={qrimg} alt="QR Code" width={256} height={256} />
      )}
      <div>userid: {userData}</div>
      <div>
        {loginStatus && (
          <div>
            <div>{loginStatus.data.account.userName}</div>
            <div>{loginStatus.data.account.id}</div>
          </div>
        )}
      </div>
      <div>
        <button
          className="bg-neutral-200 rounded-sm p-1"
          onClick={() => {
            updateStatus();
            checkQr(key);
          }}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
