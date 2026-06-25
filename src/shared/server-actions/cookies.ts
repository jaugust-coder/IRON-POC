'use server';
import { APP_ENV } from '@shared/domain/env-variables';
import { cookies } from 'next/headers';
import { LOCALHOST_ENVIRONMENT_TYPE } from '@purplelab/services-ui/environments';

export async function deleteCookie(key: string) {
  const cookieStore = await cookies();
  if (!cookieStore.has(key)) return;

  cookieStore.delete(key);
}

export async function setHttpOnlyCookie(key: string, value: string) {
  await deleteCookie(key);

  const cookieStore = await cookies();

  cookieStore.set(key, value, {
    path: '/',
    httpOnly: true,
    secure: APP_ENV !== LOCALHOST_ENVIRONMENT_TYPE,
    sameSite: 'lax',
    priority: 'medium'
  });
}

export async function getCookie(key: string) {
  const cookieStore = await cookies();

  return cookieStore.get(key)?.value;
}
