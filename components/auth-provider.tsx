'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import type { SessionUser } from '@/lib/types';

type AuthContextValue = {
  user: SessionUser | null; loading: boolean;
  login(email: string, password: string): Promise<SessionUser>;
  register(data: Record<string, string>): Promise<SessionUser>;
  logout(): void;
};
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem('doomoo_token')) { setLoading(false); return; }
    api<SessionUser>('/auth/me').then(setUser).catch(() => localStorage.removeItem('doomoo_token')).finally(() => setLoading(false));
  }, []);
  const value = useMemo<AuthContextValue>(() => ({
    user, loading,
    async login(email, password) { const result = await api<{ user: SessionUser; accessToken: string }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }); localStorage.setItem('doomoo_token', result.accessToken); setUser(result.user); return result.user; },
    async register(data) { const result = await api<{ user: SessionUser; accessToken: string }>('/auth/register', { method: 'POST', body: JSON.stringify(data) }); localStorage.setItem('doomoo_token', result.accessToken); setUser(result.user); return result.user; },
    logout() { localStorage.removeItem('doomoo_token'); setUser(null); window.location.href = '/'; },
  }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error('AuthProvider manquant'); return value; }
