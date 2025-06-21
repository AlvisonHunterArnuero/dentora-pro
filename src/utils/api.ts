export type HttpMethods =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const fetchAPI = async (
  endpoint: string,
  method: HttpMethods,
  body?: object,
  headers: Record<string, string> = {}
) => {
  const url = `${baseURL}${endpoint}`;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
    credentials: "include",
  });

  if (!response) {
    throw new Error("Request failed", response);
  }

  return response.json();
};
