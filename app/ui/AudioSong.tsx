// 'use client';

// import { toast } from 'react-toastify';

export default function AudioSong({
  // src,
  isAvailable,
  id,
}: {
  // src: string;
  isAvailable: CheckSong;
  id: number;
}) {
  if (!isAvailable.success) {
    // TODO: 即使能播放, 也提示无版权, thunder client 提示有版权, 需要登录吗 本地开发时默认登录的???
    // toast.error(isAvailable.message);
    // return <></>;
  }
  return (
    <div className="flex justify-center items-center">
      {/* <audio controls src={src} title={src} /> */}
      <audio
        controls
        src={`https://music.163.com/song/media/outer/url?id=${id}.mp3`}
        // title={src}
      />
    </div>
  );
}
