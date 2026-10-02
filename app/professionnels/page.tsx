'use client';
import { Search, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api, money } from '@/lib/api';
import type { Professional } from '@/lib/types';
import { Rating } from '@/components/ui';

export default function ProfessionalsPage() { const [items, setItems] = useState<Professional[]>([]); const [q, setQ] = useState(''); useEffect(() => { api<Professional[]>(`/directory/professionals?q=${encodeURIComponent(q)}`).then(setItems); }, [q]); return <><section className="page-hero"><div className="container"><span className="eyebrow">Doomoo Care</span><h1>Bien entourés, à chaque étape.</h1><p>Trouvez un spécialiste vérifié et réservez un rendez-vous simplement.</p><div className="search-bar" style={{ maxWidth: 650, marginTop: 25 }}><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Pédiatre, sage-femme, orthophoniste…"/><button><Search/></button></div></div></section><section className="section"><div className="container cards-grid three">{items.map((pro) => <Link href={`/professionnels/${pro.slug}`} className="pro-card" key={pro.id}><img className="pro-avatar" src={pro.avatar} alt={pro.name}/><div className="verified"><ShieldCheck size={14}/>{pro.profession} vérifié</div><h3>{pro.name}</h3><p>{pro.bio}</p><p>{pro.experienceYears} ans d’expérience · {pro.district}</p><Rating value={pro.rating} count={pro.reviewCount}/><div className="detail-price" style={{ fontSize: 16 }}>{pro.services[0] ? `dès ${money(pro.services[0].price)}` : 'Sur demande'}</div><span className="button primary small">Voir les disponibilités</span></Link>)}</div></section></>; }
