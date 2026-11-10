'use client';

import { useMusicStore } from '~lib/store';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getqrKey,
  qrCheck,
  getLoginStatus,
  qrCreate,
  logout,
  getAccount,
  loginAnonymous
} from '~lib/login';
import { toast } from 'react-hot-toast';
import { QRCodeSVG } from 'qrcode.react';
import { clearCookie, readCookie, writeCookie } from '~lib/cookie';

const isAccountCookie = (cookie: string) => /(?:^|;)\s*MUSIC_U=/.test(cookie);

const LoggedIn = ({ onLogout }: { onLogout: () => void }) => {
  const loginStatus = useMusicStore.use.loginStatus();
  const userInfo = useMusicStore.use.userInfo();
  const nickname = userInfo?.profile?.nickname ?? '已登录';
  const avatar = userInfo?.profile?.avatarUrl;
  const anonymousUser = loginStatus?.data?.account?.anonimousUser;

  return (
    <div className="not-prose flex flex-col items-center gap-3 rounded-2xl bg-card p-8 ring-1 ring-foreground/10">
      {avatar ? (
        <Image
          unoptimized
          src={avatar}
          alt={nickname}
          width={80}
          height={80}
          className="size-20 rounded-full object-cover shadow-lg"
        />
      ) : (
        <div className="size-20 rounded-full bg-muted animate-pulse" />
      )}
      <div className="text-lg font-semibold">{nickname}</div>
      <p className="text-sm text-muted-foreground">
        {anonymousUser
          ? '当前是游客登录，退出后可以扫码登录网易云账号。'
          : '登录态已就绪，回到首页即可看到每日推荐。'}
      </p>
      <button
        className="mt-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
        onClick={async () => {
          await logout();
          clearCookie();
          onLogout();
        }}
      >
        退出登录
      </button>
    </div>
  );
};

const LoginPage = () => {
  const [qrurl, setQrURL] = useState('');
  const [hint, setHint] = useState('正在生成二维码');
  const [loading, setLoading] = useState(true);
  const [hasCookie, setHasCookie] = useState(false);
  const [qrEpoch, setQrEpoch] = useState(0);
  const setCookie = useMusicStore.use.setCookie();
  const setLoginStatus = useMusicStore.use.setLoginStatus();
  const setUserInfo = useMusicStore.use.setUserInfo();

  const btnClass = 'bg-muted shadow p-2 rounded-sm font-bold';

  const router = useRouter();

  useEffect(() => {
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let confirmed = false;

    const schedule = (fn: () => void, ms: number) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (!stopped) fn();
      }, ms);
    };

    const finishLogin = async (cookie: string) => {
      setCookie(cookie);
      writeCookie(cookie);
      const [loginStatus, userInfo] = await Promise.all([
        getLoginStatus(cookie),
        getAccount(cookie)
      ]);
      if (stopped) return;
      if (loginStatus) setLoginStatus(loginStatus);
      if (userInfo) {
        setUserInfo(userInfo);
        localStorage.userData = JSON.stringify(userInfo);
      }
      toast.success('登录成功');
      router.push('/');
    };

    const poll = async (unikey: string) => {
      const result = await qrCheck(unikey);
      if (stopped) return;

      const code = result?.code;
      const cookie = typeof result?.cookie === 'string' ? result.cookie : '';

      if (code === 803 || code === 200) {
        if (cookie.includes('MUSIC_U')) {
          await finishLogin(cookie);
          return;
        }
        if (code === 803) setHint('已确认，正在同步登录状态');
      } else if (code === 800) {
        setHint('二维码已过期，正在刷新');
        confirmed = false;
        void issue();
        return;
      }
      if (code === 802) {
        setHint('扫码成功，请在手机上确认登录');
        if (!confirmed) {
          confirmed = true;
          toast('扫码成功，请在手机上确认');
        }
      } else if (code === 801) {
        confirmed = false;
        setHint('请使用网易云音乐 App 扫码');
      }

      schedule(() => {
        void poll(unikey);
      }, 2000);
    };

    const issue = async () => {
      setHint('正在生成二维码');
      setQrURL('');
      const qrkey = await getqrKey();
      if (stopped) return;
      const unikey = qrkey?.data?.unikey;
      if (!unikey) {
        setHint('二维码生成失败，正在重试');
        schedule(() => {
          void issue();
        }, 3000);
        return;
      }

      const created = await qrCreate(unikey);
      if (stopped) return;
      const url = created?.data?.qrurl;
      if (!url) {
        setHint('二维码生成失败，正在重试');
        schedule(() => {
          void issue();
        }, 3000);
        return;
      }

      setQrURL(url);
      setHint('请使用网易云音乐 App 扫码');
      confirmed = false;
      void poll(unikey);
    };

    const boot = async () => {
      const cookie = readCookie();
      setCookie(cookie);
      if (cookie && isAccountCookie(cookie)) {
        setHasCookie(true);
        const [loginStatus, userInfo] = await Promise.all([
          getLoginStatus(cookie),
          getAccount(cookie)
        ]);
        if (stopped) return;
        if (loginStatus) setLoginStatus(loginStatus);
        if (userInfo) {
          setUserInfo(userInfo);
          localStorage.userData = JSON.stringify(userInfo);
        }
        setLoading(false);
        return;
      }

      setHasCookie(false);
      setLoading(false);
      void issue();
    };

    void boot();

    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
    };
  }, [qrEpoch, router, setCookie, setLoginStatus, setUserInfo]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      {loading ? (
        <div className="flex justify-center">
          <div className="size-64 animate-pulse rounded-xl bg-muted" />
        </div>
      ) : hasCookie ? (
        <LoggedIn
          onLogout={() => {
            setHasCookie(false);
            setCookie('');
            setUserInfo({} as IUserAccount);
            setLoginStatus({} as ILoginStatus);
            localStorage.removeItem('userData');
            toast('已退出登录');
            setQrEpoch((epoch) => epoch + 1);
          }}
        />
      ) : (
        <div>
          <div className="flex justify-center items-center">
            {qrurl ? (
              <QRCodeSVG value={qrurl} width={256} height={256} />
            ) : (
              <div className="w-64 h-64 shadow-sm animate-pulse bg-muted"></div>
            )}
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {hint}
          </p>
          <div className="space-x-2 flex justify-center mt-4">
            <button
              className={btnClass}
              onClick={() => {
                const existing = readCookie();
                if (existing) {
                  setCookie(existing);
                  toast('当前是游客登录');
                  router.push('/');
                  return;
                }
                loginAnonymous().then((res) => {
                  if (!res?.cookie) {
                    toast.error('游客登录失败');
                    return;
                  }
                  if (readCookie()) return;
                  setCookie(res.cookie);
                  writeCookie(res.cookie);
                  toast.success('游客登录成功');
                  router.push('/');
                });
              }}
            >
              游客登录
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
