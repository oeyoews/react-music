import { create } from 'zustand';
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
type Store = {
  cookie: string;
  userId: string;
  loginStatus: ILoginStatus;
  userInfo: IUserAccount;
  firstLoading: boolean;
  defaultSearchWord: string;
  player: 'default' | 'cloud';
  togglePlayer: () => void;

  setCookie: (cookie: string) => void;
  setUserId: (userId: string) => void;
  setLoginStatus: (loginStatus: ILoginStatus) => void;
  setUserInfo: (userInfo: IUserAccount) => void;
  setFirstLoading: (firstLoading: boolean) => void;
  setDefaultSearchWord: (searchWord: string) => void;
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
  }
}));

export const useMusicStore = createSelectorFunctions(useStoreBase);
