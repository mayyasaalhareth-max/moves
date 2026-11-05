export const API_URL = (
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api'
).replace(/\/$/, '');

type ApiResult<T> = {
  data: T;
  error?: string;
};

export async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, init);
  } catch {
    throw new Error(
      `تعذر الاتصال بالخادم. تحقق من تشغيله وإعداد EXPO_PUBLIC_API_URL (${API_URL}).`,
    );
  }

  let result: ApiResult<T>;
  try {
    result = (await response.json()) as ApiResult<T>;
  } catch {
    throw new Error('أرسل الخادم استجابة غير صالحة.');
  }

  if (!response.ok) {
    throw new Error(result.error || 'تعذر إكمال الطلب.');
  }
  if (!('data' in result)) {
    throw new Error('لم تتضمن استجابة الخادم البيانات المطلوبة.');
  }

  return result.data;
}

export function jsonBody(body: unknown): Pick<RequestInit, 'headers' | 'body'> {
  return {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}
