'use client';
import { fetchAPI, HTTPMethod } from './api';

export const clientFetchAPI = async (
  endpoint: string,
  method: HTTPMethod,
  body?: object,
  customHeaders: Record<string, string> = {}
) => {
  const response = await fetch('/api/auth/token', { credentials: 'include' });
  if (!response.ok) throw new Error('No token available');
  const { token } = await response.json();
  const headers = {
    ...(token && { 'x-access-token': token }),
    ...customHeaders,
  };
  return fetchAPI(endpoint, method, body, headers);
};
