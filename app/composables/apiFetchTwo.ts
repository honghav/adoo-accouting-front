import { useI18n } from 'vue-i18n';

export async function apiFetchTwo(endpoint: string, body?: any, token?: string) {
  const config = useRuntimeConfig();
const { locale } = useI18n();

  const headers: HeadersInit = {
    Accept: 'application/json',
    'Accept-Language': locale.value as string 
  };

  if (token) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  console.log('Lang',locale.value);
  return await $fetch(`${config.public.baseUrlTwo}/${endpoint}`, {
    method: "POST",
    body: body,
    headers,
  });
}

export default apiFetchTwo;