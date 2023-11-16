'use client';

export default function AudioSong({ src }: { src: string }) {
  return (
    <div className="flex justify-center items-center">
      <audio controls src={src} />
    </div>
  );
}
