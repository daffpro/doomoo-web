const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export class ApiError extends Error { constructor(message: string, public status: number) { super(message); } }

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('doomoo_token') : null;
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
    cache: 'no-store',
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({ message: 'Une erreur est survenue.' }));
    throw new ApiError(payload.message || 'Une erreur est survenue.', response.status);
  }
  return response.status === 204 ? (undefined as T) : response.json();
}

export const money = (value: number) => new Intl.NumberFormat('fr-SN').format(value) + ' FCFA';
export const shortDate = (value: string) => new Intl.DateTimeFormat('fr-SN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
