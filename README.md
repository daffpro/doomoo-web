# doomoo-web

Site Next.js 15 de DOOMOO : pages publiques, marketplace, écoles, professionnels, conseils, événements, communauté, authentification, compte familial et espace professionnel.

## Démarrage

```bash
npm install
npm run dev
```

Créer `.env.local` à partir de `.env.example`. L’API attendue par défaut est `http://localhost:4000/api/v1`.

```bash
npm run check
npm run build
```

Le build produit une application Next.js `standalone`, directement exploitable par le `Dockerfile`.

## Routes principales

- `/marketplace`, `/produits/[slug]`, `/panier`, `/vendre` ;
- `/ecoles`, `/ecoles/[slug]`, `/ecoles/comparer` ;
- `/professionnels`, `/professionnels/[slug]` ;
- `/conseils`, `/evenements`, `/communaute` ;
- `/compte` et ses sections ;
- `/pro` et ses sections métier.
