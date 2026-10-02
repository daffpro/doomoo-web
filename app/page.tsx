'use client';
import Link from 'next/link';
import { Baby, BadgeCheck, BookOpen, BriefcaseMedical, Building2, HeartHandshake, PackageCheck, Recycle, ShieldCheck, ShoppingBag, Sparkles, UsersRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api, money, shortDate } from '@/lib/api';
import type { Article, Category, EventItem, Product, Professional, School } from '@/lib/types';
import { LoadingCards, ProductCard, Rating, SectionTitle } from '@/components/ui';

const quickLinks = [
  { title: 'Achetez', text: 'Neuf ou occasion', href: '/marketplace', icon: ShoppingBag, color: '#F36F8A', bg: '#fff0f3' },
  { title: 'Revendez', text: 'Donnez une seconde vie', href: '/vendre', icon: Recycle, color: '#2D9DA5', bg: '#eaf9f9' },
  { title: 'Trouvez', text: 'Écoles, crèches, pros', href: '/ecoles', icon: Building2, color: '#8A6BD1', bg: '#f2edff' },
  { title: 'Apprenez', text: 'Conseils adaptés', href: '/conseils', icon: BookOpen, color: '#76A765', bg: '#edf7ea' },
  { title: 'Partagez', text: 'Échangez entre parents', href: '/communaute', icon: UsersRound, color: '#F4A623', bg: '#fff8e8' },
  { title: 'Organisez', text: 'Votre quotidien familial', href: '/compte/calendrier', icon: HeartHandshake, color: '#183B73', bg: '#eef3fa' },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]); const [categories, setCategories] = useState<Category[]>([]); const [schools, setSchools] = useState<School[]>([]); const [pros, setPros] = useState<Professional[]>([]); const [articles, setArticles] = useState<Article[]>([]); const [events, setEvents] = useState<EventItem[]>([]); const [loading, setLoading] = useState(true);
  useEffect(() => { Promise.all([api<{ items: Product[] }>('/marketplace/products?featured=true&limit=4'), api<Category[]>('/marketplace/categories'), api<School[]>('/directory/schools'), api<Professional[]>('/directory/professionals'), api<Article[]>('/content/articles'), api<EventItem[]>('/content/events')]).then(([p, c, s, pr, a, e]) => { setProducts(p.items); setCategories(c); setSchools(s.slice(0, 3)); setPros(pr.slice(0, 3)); setArticles(a.slice(0, 3)); setEvents(e.slice(0, 3)); }).finally(() => setLoading(false)); }, []);
  return <>
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow">La famille, réunie au même endroit</span><h1>Grandir ensemble,<br/><em>simplement.</em></h1><p>Produits, écoles, professionnels, conseils et communauté : Doomoo accompagne chaque famille sénégalaise, de la grossesse jusqu’au collège.</p><div className="hero-actions"><Link href="/marketplace" className="button primary"><ShoppingBag size={18}/> Explorer la marketplace</Link><Link href="/a-propos" className="button secondary">Découvrir Doomoo</Link></div><div className="trust-row"><span><ShieldCheck/> Paiements sécurisés</span><span><BadgeCheck/> Profils vérifiés</span><span><PackageCheck/> Livraison suivie</span></div></div><div className="hero-visual"><div className="hero-dots"/><div className="hero-photo"><img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=88" alt="Une famille réunie"/></div><div className="floating-card top"><div className="bubble"><Baby/></div><div><strong>Conseils personnalisés</strong><small>Selon l’âge de vos enfants</small></div></div><div className="floating-card bottom"><div className="bubble"><Sparkles/></div><div><strong>12 000+ familles</strong><small>Une communauté de confiance</small></div></div></div></div></section>
    <div className="container quick-links">{quickLinks.map(({ title, text, href, icon: Icon, color, bg }) => <Link href={href} className="quick-card" key={title}><div className="quick-icon" style={{ color, background: bg }}><Icon/></div><h3>{title}</h3><p>{text}</p></Link>)}</div>

    <section className="section"><div className="container"><SectionTitle eyebrow="Tout pour eux" title="Explorez par univers" subtitle="Des milliers d’articles sélectionnés pour chaque étape de l’enfance." href="/marketplace"/>
      <div className="category-grid">{categories.slice(0, 10).map((category) => <Link href={`/marketplace?category=${category.slug}`} className="category-card" key={category.id}><div className="category-icon" style={{ background: category.color }}>{category.name.slice(0, 1)}</div><div><h3>{category.name}</h3><p>{category.description}</p></div></Link>)}</div>
    </div></section>

    <section className="section soft"><div className="container"><SectionTitle eyebrow="Marketplace" title="Nos coups de cœur" subtitle="Des trouvailles neuves et d’occasion, proches de chez vous." href="/marketplace"/>{loading ? <LoadingCards/> : <div className="cards-grid">{products.map((product) => <ProductCard product={product} key={product.id}/>)}</div>}</div></section>

    <section className="section peach"><div className="container"><div className="feature-banner"><div className="feature-copy"><span className="eyebrow" style={{ color: '#FFD9C7' }}>L’économie circulaire en famille</span><h2>Ils grandissent.<br/>Leurs affaires continuent.</h2><p>Vendez les articles devenus trop petits en quelques minutes et donnez-leur une seconde vie auprès d’une autre famille.</p><div><Link href="/vendre" className="button coral"><Recycle size={18}/> Publier une annonce</Link></div></div><img src="https://images.unsplash.com/photo-1602030028438-4cf153cbae9e?auto=format&fit=crop&w=1200&q=85" alt="Chambre d’enfant chaleureuse"/></div></div></section>

    <section className="section"><div className="container"><SectionTitle eyebrow="Près de chez vous" title="Écoles & crèches de confiance" subtitle="Comparez les établissements et trouvez le cadre qui correspond à votre enfant." href="/ecoles"/>
      <div className="cards-grid three">{schools.map((school) => <Link href={`/ecoles/${school.slug}`} className="school-card" key={school.id}><img src={school.images?.[0]} alt={school.name}/><div className="card-body"><div className="card-label"><span>{school.type}</span>{school.verified && <span>✓ Vérifiée</span>}</div><h3>{school.name}</h3><p>{school.district}, {school.city}</p><div style={{ display: 'flex', justifyContent: 'space-between' }}><Rating value={school.rating} count={school.reviewCount}/><strong style={{ color: '#183B73', fontSize: 12 }}>{school.priceFrom ? `dès ${money(school.priceFrom)}` : 'Sur demande'}</strong></div></div></Link>)}</div>
    </div></section>

    <section className="section soft"><div className="container"><SectionTitle eyebrow="Doomoo Care" title="Des professionnels à votre écoute" subtitle="Des spécialistes vérifiés pour accompagner toute la famille." href="/professionnels"/>
      <div className="cards-grid three">{pros.map((pro) => <Link href={`/professionnels/${pro.slug}`} className="pro-card" key={pro.id}><img className="pro-avatar" src={pro.avatar} alt={pro.name}/><div className="verified"><BriefcaseMedical size={14}/>{pro.profession}</div><h3>{pro.name}</h3><p>{pro.experienceYears} ans d’expérience · {pro.district}</p><Rating value={pro.rating} count={pro.reviewCount}/></Link>)}</div>
    </div></section>

    <section className="section"><div className="container"><SectionTitle eyebrow="À vos côtés" title="Les conseils du moment" subtitle="Des contenus clairs, locaux et adaptés à l’âge de vos enfants." href="/conseils"/>
      <div className="cards-grid three">{articles.map((article) => <Link href={`/conseils/${article.slug}`} className="article-card" key={article.id}><img src={article.imageUrl} alt={article.title}/><div className="card-body"><div className="card-label"><span>{article.category}</span><span>{article.ageRange}</span></div><h3>{article.title}</h3><p>{article.excerpt}</p><span className="text-link">Lire le conseil →</span></div></Link>)}</div>
    </div></section>

    {events.length > 0 && <section className="section soft"><div className="container"><SectionTitle eyebrow="Sortir en famille" title="Les prochains événements" href="/evenements"/><div className="cards-grid three">{events.map((event) => <Link href={`/evenements/${event.slug}`} className="event-card" key={event.id}><img src={event.imageUrl} alt={event.title}/><div className="card-body"><div className="card-label"><span>{event.category}</span><span>{shortDate(event.startsAt)}</span></div><h3>{event.title}</h3><p>{event.venue}, {event.city}</p><strong style={{ color: '#183B73' }}>{event.price ? money(event.price) : 'Gratuit'}</strong></div></Link>)}</div></div></section>}

    <section className="newsletter"><div className="container newsletter-card"><div><span className="eyebrow" style={{ color: '#FFD9C7' }}>La lettre des parents</span><h2>Un peu de douceur dans votre boîte mail.</h2><p>Conseils, bons plans et événements, deux fois par mois.</p></div><form className="newsletter-form" onSubmit={(e) => e.preventDefault()}><input type="email" placeholder="Votre adresse e-mail" aria-label="Votre adresse e-mail"/><button>S’inscrire</button></form></div></section>
  </>;
}
