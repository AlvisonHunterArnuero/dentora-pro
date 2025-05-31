'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetchAPI } from '@/utils/api';

export async function loginAction(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const response = await fetchAPI('/auth/signin', 'POST', {
      email,
      password
    });

    if (!response) {
      redirect('/');
    }

    const cookie = await cookies();
    cookie.set('jwt_token', response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 1,
      path: '/',
      sameSite: 'lax'
    });

    redirect('/appointments');
  } catch (error) {
    console.error('Login failed:', error);
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('jwt_token');
  return { success: true };
}
