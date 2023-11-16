'use client';

export default function AudioSong({ src }: { src: string }) {
  return <audio controls src={src} />;
}
