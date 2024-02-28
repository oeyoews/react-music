'use client';

import { useEffect } from 'react';
import { loginAnonymous } from '~lib/login';

export const LoginAnonymous = () => {
  useEffect(() => {
    if (localStorage.getItem('cookie')) return;
    loginAnonymous()
      .then((res) => {
        localStorage.setItem('cookie', res.cookie);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  return null;
};
