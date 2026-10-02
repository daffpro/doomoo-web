import type { Metadata } from 'next';
import { AuthProvider } from '@/components/auth-provider';
import { Footer, Header, MobileDock } from '@/components/site-shell';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Doomoo — Tout pour votre famille', template: '%s · Doomoo' },
  description: 'La plateforme des parents au Sénégal : marketplace, écoles, professionnels, conseils et communauté.',
  icons: { icon: '/doomoo-icon.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body><AuthProvider><Header/><main>{children}</main><Footer/><MobileDock/></AuthProvider></body></html>;
}
