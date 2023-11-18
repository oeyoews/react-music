import React, { useRef, useEffect } from 'react';
import QRCode from 'qrcode';

interface CanvasQRCodeProps {
  value: string;
}

const CanvasQRCode: React.FC<CanvasQRCodeProps> = ({ value }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 生成二维码
    QRCode.toCanvas(canvas, value, { errorCorrectionLevel: 'H' }, (error) => {
      if (error) console.error(error);
      console.log('QR Code generated');
    });
  }, [value]);

  return <canvas ref={canvasRef} />;
};

export default CanvasQRCode;
