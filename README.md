# Responsive Design Overhaul — Trap House Web

Rendre l'intégralité du site 100% responsive sur tous les écrans (mobile 320px → desktop 1920px+). Le projet utilise **Next.js + Tailwind CSS v4** avec des composants Framer Motion.

## Audit des problèmes identifiés

| Composant | Problème | Priorité |
|---|---|---|
| [globals.css](file:///c:/Users/user/Documents/trap-house-web/app/globals.css) | Pas de `viewport` meta explicite (Next.js l'ajoute), marquee speed OK | Faible |
| [HeroSection](file:///c:/Users/user/Documents/trap-house-web/components/HeroSection.tsx#10-71) | Textes `text-4xl` par défaut OK, mais manque de breakpoints `sm:` pour petits écrans | Moyenne |
| [VitrineSection](file:///c:/Users/user/Documents/trap-house-web/components/VitrineSection.tsx#108-149) | Carte stacked `h-[60vh]` trop petite sur mobile, texte `text-5xl` trop grand sur mobile | Haute |
| [ReseauxSection](file:///c:/Users/user/Documents/trap-house-web/components/ReseauxSection.tsx#7-73) | Marquee `text-[6rem]` → trop grand, carte Instagram bien responsive mais `h-40` fixe | Moyenne |
| [VIPSection](file:///c:/Users/user/Documents/trap-house-web/components/VIPSection.tsx#7-111) | Cartes `h-[550px]` fixe → overflow sur petits écrans, tracking trop large | Haute |
| [Navbar](file:///c:/Users/user/Documents/trap-house-web/components/Navbar.tsx#12-38) | `text-[9px]` déjà petit, `gap-6` OK, `py-8` trop haut sur mobile | Moyenne |
| [Footer](file:///c:/Users/user/Documents/trap-house-web/components/Footer.tsx#8-34) | Déjà responsive avec `flex-col md:flex-row` ✅ | Faible |
| [CustomCursor](file:///c:/Users/user/Documents/trap-house-web/components/CustomCursor.tsx#6-91) | Déjà masqué sur mobile via `hidden md:block` et `pointer: coarse` ✅ | Aucun |
| [TiltCard](file:///c:/Users/user/Documents/trap-house-web/components/TiltCard.tsx#8-90) | `h-[550px]` fixe, `max-w-[320px]` — pas utilisé actuellement | Faible |
| [NewsModal](file:///c:/Users/user/Documents/trap-house-web/components/NewsModal.tsx#9-87) | Layout split `flex-col md:flex-row` déjà en place ✅ | Faible |

## Proposed Changes

### Global — Base Responsive

#### [MODIFY] [globals.css](file:///c:/Users/user/Documents/trap-house-web/app/globals.css)

- Ajouter des utilitaires responsive dans `@layer base` pour `html` :
  - `font-size: 16px` (éviter le zoom iOS)
  - `-webkit-text-size-adjust: 100%`
- Ajouter une classe utilitaire `.section-padding` avec des valeurs responsive pour uniformiser les sections

---

### Mobile — Navbar

#### [MODIFY] [Navbar.tsx](file:///c:/Users/user/Documents/trap-house-web/components/Navbar.tsx)

- Réduire `py-8` → `py-4 md:py-8` (moins d'espace perdu en haut sur mobile)
- Ajouter `text-[8px] sm:text-[9px] md:text-xs` pour la typographie responsive

---

### Mobile — HeroSection

#### [MODIFY] [HeroSection.tsx](file:///c:/Users/user/Documents/trap-house-web/components/HeroSection.tsx)

- Textes chapitres : `text-2xl sm:text-4xl md:text-6xl` (plus petits sur mobiles < 640px)
- Texte final (description) : `text-base md:text-xl`, padding réduit `p-5 md:p-8`
- Indicateur "Swipe Down" : `bottom-8 md:bottom-12`

---

### Mobile — VitrineSection

#### [MODIFY] [VitrineSection.tsx](file:///c:/Users/user/Documents/trap-house-web/components/VitrineSection.tsx)

- Zone de texte gauche : `text-3xl sm:text-5xl md:text-7xl lg:text-8xl` pour le titre
- Carte stack : `h-[50vh] sm:h-[60vh] xl:h-[75vh]` pour s'adapter aux petits écrans
- Contenu de carte : `text-3xl sm:text-5xl md:text-6xl` pour le volume
- Padding carte : `p-5 sm:p-8 md:p-12`
- Ajuster `mt-20 xl:mt-0` → `mt-12 sm:mt-20 xl:mt-0`

---

### Mobile — ReseauxSection

#### [MODIFY] [ReseauxSection.tsx](file:///c:/Users/user/Documents/trap-house-web/components/ReseauxSection.tsx)

- Marquee text : `text-[3rem] sm:text-[6rem] md:text-[10rem]` pour éviter les textes énormes sur mobile
- Titre : `text-3xl sm:text-4xl md:text-7xl`
- Carte Instagram : `h-32 sm:h-40` et icônes/textes responsive
- Instagram text : `text-xl sm:text-2xl md:text-3xl`

---

### Mobile — VIPSection

#### [MODIFY] [VIPSection.tsx](file:///c:/Users/user/Documents/trap-house-web/components/VIPSection.tsx)

- Hauteur des cartes : `h-auto min-h-[400px] sm:min-h-[450px] md:h-[550px]` (auto sur mobile)
- Titre principal : déjà `text-4xl md:text-6xl lg:text-7xl` ✅
- Padding section : `py-20 md:py-32 lg:py-48`
- Boutons CTA : `px-6 sm:px-10` et `text-[10px] sm:text-[11px]`
- Tracking sur titres cartes : `tracking-wider` sur mobile, `md:tracking-widest` sur desktop
- Corner decorations : `top-4 left-4 sm:top-8 sm:left-8` pour les coins décoratifs

---

### Mobile — NewsModal (composant futur)

#### [MODIFY] [NewsModal.tsx](file:///c:/Users/user/Documents/trap-house-web/components/NewsModal.tsx)

- Ajustements mineurs : titre `text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
- Le layout split est déjà responsive ✅

---

### Mobile — TiltCard (composant futur)

#### [MODIFY] [TiltCard.tsx](file:///c:/Users/user/Documents/trap-house-web/components/TiltCard.tsx)

- Hauteur : `h-[450px] sm:h-[550px]`
- Max-width : `max-w-[280px] sm:max-w-[320px]`

---

### Desktop — Optimisations grands écrans

#### [MODIFY] [VitrineSection.tsx](file:///c:/Users/user/Documents/trap-house-web/components/VitrineSection.tsx)
- Ajouter `2xl:px-[12vw]` pour les très grands écrans

#### [MODIFY] [VIPSection.tsx](file:///c:/Users/user/Documents/trap-house-web/components/VIPSection.tsx)
- Le `max-w-7xl` est déjà un bon containeur pour desktop ✅

## Verification Plan

### Browser Testing (via l'outil browser)

Vérification visuelle sur 3 viewports clés :
1. **Mobile** (375×812) — Ouvrir `localhost:3000`, vérifier chaque section pour : pas de débordement horizontal, textes lisibles, cartes non coupées
2. **Tablette** (768×1024) — Même vérification
3. **Desktop** (1440×900) — Même vérification, vérifier que les grands écrans restent bien proportionnés

### Manual Verification
- L'utilisateur teste sur son mobile via l'accès réseau local (déjà configuré avec `--host` dans le `dev` script)
- Vérifier l'absence de scrollbar horizontale sur tous les viewports
