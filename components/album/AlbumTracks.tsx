'use client';

import { toQueueSong } from '~lib/playlist-queue';
import { useMusicStore } from '~lib/store';

type AlbumSong = {
  id: number;
  name: string;
  artists?: { name?: string }[];
  ar?: { name?: string }[];
  album?: { picUrl?: string };
  al?: { picUrl?: string };
};

export default function AlbumTracks({
  songs,
  cover
}: {
  songs: AlbumSong[];
  cover?: string;
}) {
  const playSong = useMusicStore.use.playSong();
  const queue = songs.map((song) => toQueueSong(song, cover));

  return (
    <ol className="columns-1 md:columns-2">
      {queue.map((song) => (
        <li key={song.id}>
          <button
            type="button"
            className="hover:text-[var(--brand)]"
            onClick={() => playSong(song, queue)}
          >
            {song.name}
          </button>
        </li>
      ))}
    </ol>
  );
}
