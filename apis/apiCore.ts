export const apiCore = async <T = any>(
  endpoint: string,
  requestBody: Record<string, unknown> | FormData = {},
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "POST",
  token?: string
): Promise<T> => {

  const isFormData = requestBody instanceof FormData;

  const headers: HeadersInit = {
    ...(token && { Authorization: `Token ${token}` }),
    ...(method !== "GET" && !isFormData ? { "Content-Type": "application/json" } : {}),
  };

  const options: RequestInit = {
    method,
    headers,
  };

  // No body for GET
  if (method !== "GET") {
    options.body = isFormData ? requestBody : JSON.stringify(requestBody);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
    options
  );

  const data = await res.json().catch(() => null);
  return data as T;
};
