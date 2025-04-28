const BASE_URL = "/backend/api";

interface RequestOptions {
  method?: string;
  headers?: HeadersInit;
  body?: any;
}

async function request(endpoint: string, options: RequestOptions = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
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
    let errorMessage = "Erro no Servidor";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (error) {}
    throw new Error(errorMessage);
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
