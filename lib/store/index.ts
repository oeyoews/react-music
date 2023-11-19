import { create } from 'zustand';

type Store = {
  cookie: string;
  userId: string;
  loginStatus: ILoginStatus;
  userInfo: IUserAccount;
  firstLoading: boolean;

  setCookie: (cookie: string) => void;
  setUserId: (userId: string) => void;
  setLoginStatus: (loginStatus: ILoginStatus) => void;
  setUserInfo: (userInfo: IUserAccount) => void;
  setFirstLoading: (firstLoading: boolean) => void;
};

const useStore = create<Store>((set) => ({
  cookie: '',
  userId: '',
  // @ts-ignore
  loginStatus: {},
  // @ts-ignore
  userInfo: {},
  firstLoading: false,

  setCookie: (cookie: string) => set({ cookie }),
  setUserId: (userId: string) => set({ userId }),
  setLoginStatus: (loginStatus: ILoginStatus) => set({ loginStatus }),
  setUserInfo: (userInfo) => set({ userInfo }),
  setFirstLoading: (firstLoading: boolean) => set({ firstLoading }),
}));

export default useStore;
