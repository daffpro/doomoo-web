'use client';
import { Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api, money, shortDate } from '@/lib/api';
import type { EventItem } from '@/lib/types';

export default function EventsPage(){const[items,setItems]=useState<EventItem[]>([]);useEffect(()=>{api<EventItem[]>('/content/events').then(setItems)},[]);return <><section className="page-hero"><div className="container"><span className="eyebrow">Doomoo Events</span><h1>Des moments à vivre ensemble.</h1><p>Ateliers, sorties, culture et activités pour faire grandir les souvenirs.</p></div></section><section className="section"><div className="container cards-grid three">{items.map(event=><Link href={`/evenements/${event.slug}`} className="event-card" key={event.id}><img src={event.imageUrl} alt={event.title}/><div className="card-body"><div className="card-label"><span>{event.category}</span><span><Calendar size={12}/> {shortDate(event.startsAt)}</span></div><h3>{event.title}</h3><p><MapPin size={13} style={{display:'inline'}}/> {event.venue}, {event.city}</p><strong style={{color:'#183B73'}}>{event.price?money(event.price):'Gratuit'}</strong></div></Link>)}</div></section></>}
