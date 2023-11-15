'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getqrKey, qrCheck, getQrStatus, qrCreate } from '~lib/login'; // Assuming you have these API functions.

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      try {
        // Step 1: Get QR Code Key
        const qrkey = await getqrKey();
        const key = qrkey.data.unikey;

        // Step 2: Create QR Code
        const qrcreate = await qrCreate(key);
        const qrimg = qrcreate.data.qrimg;

        // Display QR Code to the user or do something with qrimg

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

        // Step 4: Get Login Status
        const loginStatus = await getQrStatus();

        // Redirect or handle login status as needed
        if (loginStatus.data.code === 200) {
          router.push('/'); // Redirect to the dashboard after successful login
        } else {
          console.error('Login failed:', loginStatus);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };

    handleLogin();
  }, [router]);

  return (
    <div>
      <p>Logging in...</p>
    </div>
  );
};

export default LoginPage;
