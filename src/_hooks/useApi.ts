'use client';
import { useState, useCallback } from 'react';
import { HttpMethods } from '@/actions/api.server';

export function useApi<T = unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWithAuth = useCallback(
    async (
      endpoint: string,
      method: HttpMethods,
      body?: object,
      headers?: Record<string, string>
    ): Promise<T> => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const response = await fetch(endpoint, {
          method,
          headers: { 'Content-Type': 'application/json', ...headers },
          body: body ? JSON.stringify(body) : undefined,
          credentials: 'include',
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || `Request failed with status ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'API request failed';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { fetchWithAuth, data, error, loading, reset: () => { setData(null); setError(null); } };
}
