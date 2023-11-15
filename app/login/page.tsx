'use client';

// Import necessary dependencies and API functions
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getqrKey, qrCheck, getQrStatus, qrCreate } from '~lib/login'; // Assuming you have these API functions.

const LoginPage = () => {
  const router = useRouter();
  const [qrimg, setQrImg] = useState('');
  const [loginStatus, setLoginStatus] = useState({});
  const [key, setKey] = useState('');

  useEffect(() => {
    const handleLogin = async () => {
      try {
        // Step 1: Get QR Code Key
        const qrkey = await getqrKey();
        const key = qrkey.data.unikey;
        setKey(key);

        // Step 2: Create QR Code
        const qrcreate = await qrCreate(key);
        const qrimg = qrcreate.data.qrimg;

        // Display QR Code to the user
        setQrImg(qrimg);

        // Step 3: Check QR Code Status
        let qrCodeChecked = false;
        while (!qrCodeChecked) {
          const checkResult = await qrCheck(key);
          if (checkResult.code === 800) {
            qrCodeChecked = true;
          } else if (checkResult.code === 803) {
            // QR Code has not been scanned yet
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
          } else {
            // Handle other status codes
            console.error('Unexpected QR Code check status:', checkResult);
            break;
          }
        }

        // Redirect or handle login status as needed
        if (loginStatus === 803) {
          router.push('/'); // Redirect to the dashboard after successful login
        } else {
          console.error('Login failed:', loginStatus);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };

    handleLogin();
    // Step 4: Get Login Status
    setInterval(async () => {
      const qrCodeChecked = await qrCheck(key);
      setLoginStatus(qrCodeChecked.code);
      console.log(JSON.stringify(qrCodeChecked));
    }, 30000);
  }, []);

  return (
    <div>
      {qrimg ? <img src={qrimg} alt="QR Code" /> : <p>Logging in...</p>}
    </div>
  );
};

export default LoginPage;
