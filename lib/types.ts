export type Product = {
  id: string; slug: string; title: string; description: string; price: number; originalPrice?: number;
  condition: string; kind: string; location: string; images: string[]; featured: boolean; brand?: string;
  ageRange?: string; deliveryModes: string[]; category: { name: string; slug: string; color: string };
  seller: { id: string; firstName: string; lastName: string; verified: boolean; city: string };
  _count?: { favorites?: number; reviews?: number };
};
export type Category = { id: string; name: string; slug: string; icon: string; color: string; description?: string };
export type School = { id: string; slug: string; name: string; type: string; description: string; district: string; city: string; rating: number; reviewCount: number; priceFrom?: number; levels: string[]; facilities: string[]; languages: string[]; images: string[]; verified: boolean };
export type Professional = { id: string; slug: string; name: string; profession: string; bio: string; city: string; district?: string; experienceYears: number; languages: string[]; avatar?: string; verified: boolean; rating: number; reviewCount: number; services: { id: string; name: string; description: string; durationMinutes: number; price: number; mode: string }[] };
export type Article = { id: string; slug: string; title: string; excerpt: string; content: string; category: string; ageRange: string; imageUrl?: string; authorName: string; authorRole?: string; publishedAt: string };
export type EventItem = { id: string; slug: string; title: string; description: string; category: string; venue: string; city: string; startsAt: string; price: number; capacity?: number; imageUrl?: string; _count?: { registrations: number } };
export type SessionUser = { id: string; email: string; firstName: string; lastName: string; role: string; city: string; avatar?: string; verified: boolean };
