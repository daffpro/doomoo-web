'use client';
import Link from 'next/link';
import { Bell, Heart, Menu, MessageCircle, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from './auth-provider';

export function Brand({ compact = false }: { compact?: boolean }) { return <Link className={`brand ${compact ? 'compact' : ''}`} href="/"><img src="/doomoo-icon.png" alt=""/><span>doom<b>oo</b></span></Link>; }

const nav = [['Acheter', '/marketplace'], ['Vendre', '/vendre'], ['Écoles & crèches', '/ecoles'], ['Professionnels', '/professionnels'], ['Conseils', '/conseils'], ['Communauté', '/communaute']];
export function Header() {
  const { user } = useAuth(); const [open, setOpen] = useState(false);
  return <><div className="announcement">Livraison offerte dès 50 000 FCFA avec le code <b>BIENVENUE</b></div><header className="site-header"><div className="container header-inner"><Brand/><button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X/> : <Menu/>}</button><nav className={open ? 'open' : ''}>{nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</nav><div className="header-actions"><Link href="/recherche" aria-label="Rechercher"><Search/></Link><Link href="/compte/favoris" aria-label="Favoris"><Heart/></Link><Link href="/panier" aria-label="Panier"><ShoppingBag/></Link><Link className="account-link" href={user ? '/compte' : '/connexion'}><UserRound/><span>{user ? user.firstName : 'Se connecter'}</span></Link></div></div></header></>;
}

export function Footer() { return <footer className="site-footer"><div className="container footer-grid"><div><Brand/><p>Tout pour votre enfant,<br/>tout pour votre famille.</p><div className="socials"><span>in</span><span>f</span><span>◎</span></div></div><div><h4>Découvrir</h4><Link href="/marketplace">Marketplace</Link><Link href="/ecoles">Écoles & crèches</Link><Link href="/professionnels">Professionnels</Link><Link href="/evenements">Événements</Link></div><div><h4>Doomoo</h4><Link href="/a-propos">À propos</Link><Link href="/securite">Confiance & sécurité</Link><Link href="/devenir-vendeur">Devenir partenaire</Link><Link href="/contact">Nous contacter</Link></div><div><h4>Besoin d’aide ?</h4><Link href="/aide">Centre d’aide</Link><Link href="/conditions">Conditions générales</Link><Link href="/confidentialite">Confidentialité</Link><p>bonjour@doomoo.sn</p></div></div><div className="container footer-bottom"><span>© 2026 Doomoo. Fait avec soin à Dakar.</span><span>Français · Sénégal (FCFA)</span></div></footer>; }

export function MobileDock() { return <nav className="mobile-dock"><Link href="/"><span>⌂</span>Accueil</Link><Link href="/recherche"><Search/>Recherche</Link><Link className="sell" href="/vendre">+</Link><Link href="/messages"><MessageCircle/>Messages</Link><Link href="/compte"><UserRound/>Profil</Link></nav>; }
