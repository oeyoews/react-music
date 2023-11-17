import { create } from 'zustand';

type Store = {
  cookie: string;
  userId: string;
  loginStatus: ILoginStatus;
  userInfo: IUserDetail;

  setCookie: (cookie: string) => void;
  setUserId: (userId: string) => void;
  setLoginStatus: (loginStatus: ILoginStatus) => void;
  setUserInfo: (userInfo: IUserDetail) => void;
};

const useStore = create<Store>((set) => ({
  cookie: '',
  userId: '',
  // @ts-ignore
  loginStatus: {},
  // @ts-ignore
  userInfo: {},

  setCookie: (cookie: string) => set({ cookie }),
  setUserId: (userId: string) => set({ userId }),
  setLoginStatus: (loginStatus: ILoginStatus) => set({ loginStatus }),
  setUserInfo: (userInfo) => set({ userInfo }),
}));

export default useStore;
