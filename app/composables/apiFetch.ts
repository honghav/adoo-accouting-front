export async function apiFetch(endpoint: string,method: string = 'GET', body?: any, token?: string, acceptLang: string = 'zh') {
  const config = useRuntimeConfig();

  const headers: HeadersInit = {
    Accept: 'application/json',
    'Accept-Language': acceptLang
  };

  if (token) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  return await $fetch(`${config.public.apiUrl}/${endpoint}`, {
    method: method as any,
    body: body,
    headers,
  });
}

export default apiFetch;