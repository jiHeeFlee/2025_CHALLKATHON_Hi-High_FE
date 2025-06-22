'use client';

import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (
  name: string,
  value: any,
  options?: Record<string, any>
): void => {
  cookies.set(name, value, { path: '/', ...options });
};

export const getCookie = (name: string): any => {
  return cookies.get(name);
};

export const removeCookie = (name: string): void => {
  cookies.remove(name, { path: '/' });
};
