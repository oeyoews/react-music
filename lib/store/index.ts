import { create } from 'zustand';
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';

export type QueueSong = {
  id: number;
  name: string;
  artist?: string;
  cover?: string;
  duration?: number;
};

type Store = {
  cookie: string;
  userId: string;
  loginStatus: ILoginStatus;
  userInfo: IUserAccount;
  firstLoading: boolean;
  defaultSearchWord: string;
  player: 'default' | 'cloud';
  togglePlayer: () => void;

  queue: QueueSong[];
  currentIndex: number;
  isPlaying: boolean;
  loop: 'none' | 'one' | 'all';
  volume: number;
  progress: number;
  duration: number;
  nowPlayingOpen: boolean;
  seekId: number;
  seekTime: number;

  setCookie: (cookie: string) => void;
  setUserId: (userId: string) => void;
  setLoginStatus: (loginStatus: ILoginStatus) => void;
  setUserInfo: (userInfo: IUserAccount) => void;
  setFirstLoading: (firstLoading: boolean) => void;
  setDefaultSearchWord: (searchWord: string) => void;
  setQueue: (queue: QueueSong[], index?: number) => void;
  playSong: (song: QueueSong, queue?: QueueSong[]) => void;
  setCurrentIndex: (index: number) => void;
  next: () => void;
  prev: () => void;
  togglePlay: () => void;
  setIsPlaying: (playing: boolean) => void;
  setLoop: (loop: 'none' | 'one' | 'all') => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  setNowPlayingOpen: (open: boolean) => void;
  seekTo: (time: number) => void;
  playAt: (index: number) => void;
  clearQueue: () => void;
};

const useStoreBase = create<Store>((set, get) => ({
  cookie: '',
  userId: '',
  // @ts-ignore
  loginStatus: {},
  // @ts-ignore
  userInfo: {},
  firstLoading: true,
  defaultSearchWord: '',
  player: 'default',

  queue: [],
  currentIndex: -1,
  isPlaying: false,
  loop: 'all',
  volume: 0.8,
  progress: 0,
  duration: 0,
  nowPlayingOpen: false,
  seekId: 0,
  seekTime: 0,

  setCookie: (cookie: string) => set({ cookie }),
  setUserId: (userId: string) => set({ userId }),
  setLoginStatus: (loginStatus: ILoginStatus) => set({ loginStatus }),
  setUserInfo: (userInfo) => set({ userInfo }),
  setFirstLoading: (firstLoading: boolean) => set({ firstLoading }),
  setDefaultSearchWord: (defaultSearchWord: string) =>
    set({ defaultSearchWord }),
  togglePlayer: () => {
    const player = get().player;
    if (player === 'cloud') {
      set({ player: 'default' });
    } else {
      set({ player: 'cloud' });
    }
  },

  setQueue: (queue, index = 0) =>
    set({
      queue,
      currentIndex: queue.length ? Math.min(index, queue.length - 1) : -1,
      progress: 0,
      duration: 0
    }),

  playSong: (song, queue) => {
    const base = queue?.length ? [...queue] : [...get().queue];
    const found = base.findIndex((s) => s.id === song.id);
    const nextQueue =
      found >= 0 ? base : queue?.length ? base : [...base, song];

    set({
      queue: nextQueue,
      currentIndex: found >= 0 ? found : nextQueue.length - 1,
      isPlaying: true,
      progress: 0
    });
  },

  setCurrentIndex: (index) => set({ currentIndex: index, progress: 0 }),

  next: () => {
    const { queue, currentIndex, loop } = get();
    if (!queue.length) return;

    if (loop === 'one') {
      set({ progress: 0, isPlaying: true });
      return;
    }

    const nextIndex =
      currentIndex + 1 >= queue.length
        ? loop === 'all'
          ? 0
          : currentIndex
        : currentIndex + 1;

    set({ currentIndex: nextIndex, progress: 0, isPlaying: true });
  },

  prev: () => {
    const { queue, currentIndex, loop } = get();
    if (!queue.length) return;

    const prevIndex =
      currentIndex - 1 < 0
        ? loop === 'all'
          ? queue.length - 1
          : 0
        : currentIndex - 1;

    set({ currentIndex: prevIndex, progress: 0, isPlaying: true });
  },

  togglePlay: () => set({ isPlaying: !get().isPlaying }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setLoop: (loop) => set({ loop }),
  setVolume: (volume) => set({ volume: Math.min(1, Math.max(0, volume)) }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
  setNowPlayingOpen: (nowPlayingOpen) => set({ nowPlayingOpen }),
  seekTo: (time) => {
    const next = Math.max(0, time);
    set({
      progress: next,
      seekTime: next,
      seekId: get().seekId + 1,
      isPlaying: true
    });
  },
  playAt: (index) => {
    const { queue } = get();
    if (!queue[index]) return;
    set({ currentIndex: index, progress: 0, isPlaying: true });
  },
  clearQueue: () =>
    set({
      queue: [],
      currentIndex: -1,
      isPlaying: false,
      progress: 0,
      duration: 0
    })
}));

export const useMusicStore = createSelectorFunctions(useStoreBase);
