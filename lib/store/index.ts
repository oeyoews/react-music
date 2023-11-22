import { create } from 'zustand';

type Store = {
  cookie: string;
  userId: string;
  loginStatus: ILoginStatus;
  userInfo: IUserAccount;
  firstLoading: boolean;
  searchWord: string;
  focusedTab: string;

  setCookie: (cookie: string) => void;
  setUserId: (userId: string) => void;
  setLoginStatus: (loginStatus: ILoginStatus) => void;
  setUserInfo: (userInfo: IUserAccount) => void;
  setFirstLoading: (firstLoading: boolean) => void;
  setSearchWord: (searchWord: string) => void;
  setFocusedTab: (tab: string) => void;
};

const useStore = create<Store>((set) => ({
  cookie: '',
  userId: '',
  // @ts-ignore
  loginStatus: {},
  // @ts-ignore
  userInfo: {},
  firstLoading: true,
  searchWord: '',
  focusedTab: '/', // 初始值为空

  setCookie: (cookie: string) => set({ cookie }),
  setUserId: (userId: string) => set({ userId }),
  setLoginStatus: (loginStatus: ILoginStatus) => set({ loginStatus }),
  setUserInfo: (userInfo) => set({ userInfo }),
  setFirstLoading: (firstLoading: boolean) => set({ firstLoading }),
  setSearchWord: (searchWord: string) => set({ searchWord }),
  setFocusedTab: (tab: string) => set({ focusedTab: tab }),
}));

export default useStore;
