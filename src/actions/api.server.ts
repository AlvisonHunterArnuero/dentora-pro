'use server';
import { cookies } from 'next/headers';

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
const baseURL = process.env.NEXT_PUBLIC_API_URL || '<http://localhost:8000>';

export async function fetchServerAPI<T = unknown>(
    endpoint: string,
    method: HttpMethods,
    body?: object,
    headers: Record<string, string> = {}
): Promise<T> {
    const cookie = await cookies();
    const token = cookie.get('jwt_token')?.value;
    if (!token && !endpoint.startsWith('/auth/')) {
        throw new Error('Unauthorized', { cause: 401 });
    }
    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'x-access-token': token }),
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
            cache: 'no-store',
            credentials: 'include',
        });
        if (!response.ok) {
            const error = await response.json().catch(() => null);
            throw new Error(error?.message || `Request failed with status ${response.status}`, { cause: response.status });
        }
        return await response.json();
    } catch (error) {
        console.error('Server API error:', error);
        throw error;
    }
}
