import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get('jwt_token')?.value;

  if (!jwtToken) {
    return NextResponse.json(
      {
        isAuthenticated: false,
        user: null,
        message: 'No authentication token found'
      },
      { status: 401 }
    );
  }

  try {
    const isAuthResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/isAuth`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': jwtToken
        },
        credentials: 'include'
      }
    );

    if (isAuthResponse.ok) {
      const userData = await isAuthResponse.json();
      return NextResponse.json(
        {
          isAuthenticated: true,
          user: userData
        },
        { status: 200 }
      );
    } else {
      const errorData = await isAuthResponse.json();
      console.error(
        'API /isAuth failed:',
        errorData.message || isAuthResponse.statusText
      );

      const response = NextResponse.json(
        {
          isAuthenticated: false,
          user: null,
          message: 'Invalid or expired token'
        },
        { status: 401 }
      );
      response.cookies.delete('jwt_token');
      return response;
    }
  } catch (error) {
    console.error('Error contacting /isAuth endpoint:', error);

    const response = NextResponse.json(
      {
        isAuthenticated: false,
        user: null,
        message: 'Server error during authentication check'
      },
      { status: 500 }
    );

    response.cookies.delete('jwt_token');
    return response;
  }
}
