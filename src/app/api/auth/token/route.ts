import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { fetchServerAPI } from '@/actions/api.server';

export async function GET() {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get('jwt_token')?.value;
  if (!jwtToken) {
    return NextResponse.json(
      { isAuthenticated: false, user: null, message: 'No authentication token found' },
      { status: 401 }
    );
  }
  try {
    const data = await fetchServerAPI<{ auth: boolean; message: string }>(
      '/auth/isAuth',
      'GET'
    );
    if (data.auth) {
      return NextResponse.json(
        { isAuthenticated: true, user: { id: '', email: '' } },
        { status: 200 }
      );
    }
    throw new Error(data.message || 'Invalid token');
  } catch (error) {
    console.error('Error contacting /isAuth endpoint:', error);
    const response = NextResponse.json(
      {
        isAuthenticated: false,
        user: null,
        message: error instanceof Error ? error.message : 'Invalid or expired token',
      },
      { status: error instanceof Error && error.cause ? (error.cause as number) : 401 }
    );
    response.cookies.delete('jwt_token');
    return response;
  }
}
