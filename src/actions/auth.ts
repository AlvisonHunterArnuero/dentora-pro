'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetchServerAPI } from './api.server';
import { SignInFormValues } from '@/app/components/Forms/Forms.types';

export async function loginAction({ email, password }: SignInFormValues) {
  try {
    const response = await fetchServerAPI<{ auth: boolean; token: string; user: { id: string; email: string; role?: string } }>(
      '/auth/signin',
      'POST',
      { email, password }
    );
    if (response.auth) {
        const cookie = await cookies();
        cookie.set('jwt_token', response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 1, // 1 day
        path: '/',
        sameSite: 'lax',
      });
      return { redirect: '/appointments', user: response.user };
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error) {
    console.error('Login failed:', error);
    return redirect(`/?error=${error instanceof Error ? error.message : 'login_failed'}`);
  }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('jwt_token');
    redirect('/');
}
