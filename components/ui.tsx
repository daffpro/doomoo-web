'use client';
import Link from 'next/link';
import { Heart, MapPin, ShieldCheck, Star } from 'lucide-react';
import { useState } from 'react';
import { api, money } from '@/lib/api';
import type { Product } from '@/lib/types';

export function SectionTitle({ eyebrow, title, subtitle, href, action = 'Tout voir' }: { eyebrow?: string; title: string; subtitle?: string; href?: string; action?: string }) {
  return <div className="section-title"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{href && <Link className="text-link" href={href}>{action} <span>→</span></Link>}</div>;
}

export function ProductCard({ product }: { product: Product }) {
  const [favorite, setFavorite] = useState(false);
  async function toggle(e: React.MouseEvent) { e.preventDefault(); try { const result = await api<{ favorite: boolean }>(`/marketplace/products/${product.id}/favorite`, { method: 'POST' }); setFavorite(result.favorite); } catch { window.location.href = '/connexion'; } }
  return <Link href={`/produits/${product.slug}`} className="product-card">
    <div className="product-image"><img src={product.images?.[0]} alt={product.title}/><span className={`product-kind ${product.kind.toLowerCase()}`}>{product.kind === 'C2C' ? 'Occasion' : product.kind === 'DONATION' ? 'Don' : 'Neuf'}</span><button aria-label="Ajouter aux favoris" className={`heart-button ${favorite ? 'active' : ''}`} onClick={toggle}><Heart size={19} fill={favorite ? 'currentColor' : 'none'}/></button></div>
    <div className="product-info"><div className="product-meta"><span>{product.category?.name}</span><span><MapPin size={13}/>{product.location.split(',')[0]}</span></div><h3>{product.title}</h3><div className="seller-line">{product.seller?.verified && <ShieldCheck size={15}/>}<span>{product.seller?.firstName} {product.seller?.lastName}</span></div><div className="price-row"><strong>{money(product.price)}</strong>{product.originalPrice && <del>{money(product.originalPrice)}</del>}</div></div>
  </Link>;
}

export function Rating({ value, count }: { value: number; count?: number }) { return <span className="rating"><Star size={15} fill="currentColor"/> {value.toFixed(1)} {count !== undefined && <small>({count} avis)</small>}</span>; }

export function StatusBadge({ value }: { value: string }) { const label: Record<string, string> = { PAID: 'Payée', CONFIRMED: 'Confirmée', PREPARING: 'En préparation', SHIPPED: 'En livraison', DELIVERED: 'Livrée', COMPLETED: 'Terminée', PENDING_PAYMENT: 'Paiement en attente', PUBLISHED: 'Publiée', ACTIVE: 'Actif', OPEN: 'Ouvert', PENDING: 'En attente' }; return <span className={`status status-${value.toLowerCase()}`}>{label[value] || value.replaceAll('_', ' ')}</span>; }

export function LoadingCards({ count = 4 }: { count?: number }) { return <div className="cards-grid">{Array.from({ length: count }, (_, index) => <div className="skeleton-card" key={index}><span/><i/><i/></div>)}</div>; }
export function EmptyState({ title, text, action, href }: { title: string; text: string; action?: string; href?: string }) { return <div className="empty-state"><div>♡</div><h3>{title}</h3><p>{text}</p>{action && href && <Link href={href} className="button primary">{action}</Link>}</div>; }
