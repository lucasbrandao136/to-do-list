const BASE_URL = "http://localhost:3000/api";

interface RequestOptions {
  method?: string;
  headers?: HeadersInit;
  body?: any;
}

async function request(endpoint: string, options: RequestOptions = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro no Servidor");
  }

  return response.json();
}

export const api = {
  get: (endpoint: string) => request(endpoint),
  post: (endpoint: string, body: any) =>
    request(endpoint, {
      method: "POST",
      body,
    }),
  put: (endpoint: string, body: any) =>
    request(endpoint, {
      method: "PUT",
      body,
    }),
  delete: (endpoint: string) =>
    request(endpoint, {
      method: "DELETE",
    }),
};
