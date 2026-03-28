# Prompt — Académie Lumière · Next.js 15 Frontend

## Role

You are a senior Next.js 15 frontend developer with deep expertise in App Router architecture, React Server Components, TypeScript strict mode, and Tailwind CSS v4. You write clean, production-grade, pixel-accurate code. You never truncate files. Every file you produce is complete and immediately runnable.

---

## Context

You are building **"Académie Lumière"** — a fictional French private school website used as a CMS demo. The site is multi-page, fully in French, and data-driven by local JSON files (Sanity CMS integration comes later — do not add Sanity). All content is in French.

**Tech stack:**
- Next.js 15, App Router, TypeScript strict mode
- Tailwind CSS v4 (utility-first, no CSS modules, no inline styles)
- `next/image` for all images (Unsplash URLs)
- No UI libraries (no Shadcn, MUI, Radix, etc.)
- Data from `/data/*.json` files imported directly in Server Components

---

## Design System

### Color Palette

```
Primary blue:       #1D4ED8   (Tailwind: blue-700)
Primary blue dark:  #1E3A8A   (Tailwind: blue-900)  — used for hover states
Accent blue light:  #DBEAFE   (Tailwind: blue-100)  — used for tag backgrounds
Text primary:       #111827   (Tailwind: gray-900)
Text secondary:     #6B7280   (Tailwind: gray-500)
Text muted:         #9CA3AF   (Tailwind: gray-400)
Background white:   #FFFFFF
Background light:   #F9FAFB   (Tailwind: gray-50)   — alternating sections
Border:             #E5E7EB   (Tailwind: gray-200)
White:              #FFFFFF
Overlay dark:       rgba(0, 0, 0, 0.55)             — used on hero image
```

### Typography

```
Font family: Inter (loaded via next/font/google)
Apply to <html> via className

Heading XL  : font-bold, text-4xl md:text-5xl lg:text-6xl, text-gray-900, leading-tight
Heading L   : font-bold, text-3xl md:text-4xl, text-gray-900, leading-tight
Heading M   : font-semibold, text-2xl, text-gray-900
Heading S   : font-semibold, text-xl, text-gray-900
Body large  : text-lg, text-gray-600, leading-relaxed
Body normal : text-base, text-gray-600, leading-relaxed
Body small  : text-sm, text-gray-500
Label/tag   : text-xs font-semibold uppercase tracking-wider
```

### Spacing & Layout

```
Max content width : max-w-7xl mx-auto
Section padding   : py-16 lg:py-24
Inner padding     : px-4 sm:px-6 lg:px-8
Card gap          : gap-6 or gap-8
Grid columns      : grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
```

### Buttons

```
PRIMARY BUTTON
  Background : bg-blue-700
  Text       : text-white font-semibold text-sm
  Padding    : px-6 py-3
  Border     : rounded-md
  Hover      : hover:bg-blue-900 transition-colors
  Example    : "S'inscrire", "Découvrir nos formations"

SECONDARY BUTTON (outline)
  Background : bg-transparent
  Border     : border-2 border-white
  Text       : text-white font-semibold text-sm
  Padding    : px-6 py-3
  Border     : rounded-md
  Hover      : hover:bg-white hover:text-blue-700 transition-colors
  Example    : "Explorer le campus"

TEXT LINK WITH ARROW
  Text  : text-blue-700 font-medium text-sm
  After : → (arrow character or chevron icon)
  Hover : hover:underline
  Example: "En savoir plus →"
```

### Section Title Pattern

Every section uses the same title pattern:
```
- Small blue separator bar: w-12 h-1 bg-blue-700 mb-4 (centered or left-aligned depending on section)
- Section title: Heading L or Heading M
- Optional subtitle: Body large, text-gray-500, max-w-2xl
- Centered titles: text-center with mx-auto on subtitle
- Left-aligned titles: text-left
```

---

## Page-by-Page Design Specification

### SHARED: Navbar

**Layout:**
- Fixed at top, full width, white background, bottom border border-gray-200
- Height: h-16
- Inner container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8, flex items-center justify-between

**Left side:**
- School name as plain text: "Académie Lumière"
- Font: font-bold text-xl text-gray-900
- No logo, no icon

**Center (desktop only, hidden on mobile):**
- Horizontal nav links: About, Formations, Académique, Vie scolaire, Contact
- Each link: text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors
- Links spaced with gap-8

**Right side:**
- CTA button "S'inscrire" — PRIMARY BUTTON style (blue filled)
- On mobile: hamburger icon (☰) button, blue-700 color

**Mobile menu (when hamburger is open):**
- Drops down below navbar, white background, shadow-md
- Stacked links: same links as desktop, each py-3 px-4 border-b border-gray-100
- "S'inscrire" button at the bottom, full width

**Implementation:** `use client` component, useState for mobile menu toggle.

---

### SHARED: Footer

**Layout:**
- Background: bg-gray-900 (dark charcoal)
- Full width, padding py-12 px-4 sm:px-6 lg:px-8
- Inner: max-w-7xl mx-auto

**Top section — 4-column grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8):**

Column 1 — School identity:
- School name: font-bold text-white text-lg
- Small paragraph (2-3 lines) describing the school mission: text-sm text-gray-400 mt-2
- Social icons row: Facebook, Twitter, Instagram, LinkedIn — simple SVG icons, text-gray-400 hover:text-white, gap-3, mt-4

Column 2 — "Mon Compte":
- Heading: "Mon Compte", font-semibold text-white text-sm uppercase tracking-wider mb-3
- Links: Connexion, Programmes, Comptes Société, Payer les frais
- Each: text-sm text-gray-400 hover:text-white block py-1

Column 3 — "À propos de nous":
- Heading: "À Propos", font-semibold text-white text-sm uppercase tracking-wider mb-3
- Links: Informations, Ressources, Nos Résultats, Rencontrer l'équipe
- Each: text-sm text-gray-400 hover:text-white block py-1

Column 4 — "Support":
- Heading: "Support", font-semibold text-white text-sm uppercase tracking-wider mb-3
- Links: Contact
- Each: text-sm text-gray-400 hover:text-white block py-1

**Bottom bar:**
- Border top: border-t border-gray-700 mt-8 pt-6
- Text centered: "© 2025 Académie Lumière. Tous droits réservés."
- text-sm text-gray-500 text-center

---

### PAGE: Homepage (`/`)

The homepage has exactly 9 sections in this order:

#### SECTION 1 — Hero

**Layout:**
- Full viewport width, min-h-[560px] lg:min-h-[640px]
- Position: relative
- Background: Unsplash classroom image `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600`
- Dark overlay: absolute inset-0, bg-black/55 (rgba overlay)
- Content sits above overlay: relative z-10

**Content (left-aligned, bottom-heavy):**
- Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8, flex flex-col justify-end pb-16 h-full min-h-[560px]
- Headline: "Plus de 12 000 étudiants nous font confiance"
  - Font: font-bold, text-4xl md:text-5xl lg:text-6xl
  - Color: text-white
  - Max width: max-w-2xl
  - Line breaks: "Plus de 12 000 étudiants" / "nous font confiance"
- Subtitle: "Chaque jour est une nouvelle opportunité d'apprendre, de grandir et de réussir."
  - Font: text-lg text-white/80
  - mt-4, max-w-xl
- CTA row: flex gap-4 mt-8
  - Button 1: PRIMARY "Découvrir nos formations" → /formations
  - Button 2: SECONDARY outline white "Explorer le campus" → /a-propos

#### SECTION 2 — Vision / Mission / Approach (3 cards)

**Layout:**
- Background: white
- Padding: py-16
- Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Grid: grid grid-cols-1 md:grid-cols-3 gap-8

**Each card:**
- Background: white, rounded-lg, shadow-sm, border border-gray-100
- Padding: p-6
- Content top-to-bottom:
  1. Icon in a circle: w-12 h-12, bg-blue-100, rounded-full, flex items-center justify-center, blue SVG icon inside (eye icon for Vision, target icon for Mission, lightbulb icon for Approach)
  2. Title: font-semibold text-lg text-gray-900 mt-4
  3. Description: text-sm text-gray-500 mt-2 leading-relaxed

**Card 1 — Notre Vision:**
- Icon: eye SVG
- Title: "Notre Vision"
- Description: "Former des esprits curieux, créatifs et engagés pour construire une société meilleure."

**Card 2 — Notre Mission:**
- Icon: target/bullseye SVG
- Title: "Notre Mission"
- Description: "Offrir un enseignement de qualité, accessible et ancré dans les réalités du monde actuel."

**Card 3 — Notre Approche:**
- Icon: lightbulb SVG
- Title: "Notre Approche"
- Description: "Allier tradition académique et innovation pédagogique pour préparer chaque élève à l'avenir."

#### SECTION 3 — Stats Bar

**Layout:**
- Background: bg-blue-700 (solid blue band)
- Padding: py-10
- Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Inner: grid grid-cols-2 lg:grid-cols-4 gap-8

**Each stat (4 total):**
- Centered: text-center
- Big number: font-bold text-4xl text-white
- Label below: text-sm text-blue-200 mt-1 uppercase tracking-wide
- Divider between items (desktop only): border-r border-blue-500 on first 3 items

**Stats data:**
1. "20+" / "Années d'excellence"
2. "12 000+" / "Étudiants inscrits"
3. "80+" / "Enseignants experts"
4. "96%" / "Taux de réussite"

#### SECTION 4 — About (À propos)

**Layout:**
- Background: bg-gray-50
- Padding: py-16 lg:py-24
- Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Inner: grid grid-cols-1 lg:grid-cols-2 gap-12 items-center

**Left side — Image:**
- Unsplash: `https://images.unsplash.com/photo-1562774053-701939374585?w=800`
- Rounded: rounded-2xl overflow-hidden
- Aspect: aspect-[4/3] or fixed height h-[400px]
- Object-fit: object-cover w-full h-full

**Right side — Text:**
- Small label above title: "À Propos de Nous" — text-blue-700 font-semibold text-sm uppercase tracking-wider
- Blue underline bar: w-12 h-1 bg-blue-700 mt-1 mb-4
- Title: "Former les leaders de demain"
  - font-bold text-3xl md:text-4xl text-gray-900
  - The word "leaders" is highlighted in blue-700 (wrap in `<span className="text-blue-700">`)
- Body paragraph: text-base text-gray-600 leading-relaxed mt-4, 3-4 sentences about the school
- CTA link: "En savoir plus →" — text-blue-700 font-semibold hover:underline mt-6 inline-block → /a-propos

#### SECTION 5 — Facilities (Nos Installations)

**Layout:**
- Background: white
- Padding: py-16 lg:py-24
- Section title block (centered):
  - Blue bar: w-12 h-1 bg-blue-700 mx-auto mb-4
  - Title: "Nos Installations" — font-bold text-3xl text-gray-900 text-center
  - Subtitle: "Des infrastructures modernes pour un apprentissage optimal" — text-gray-500 text-center mt-2
- Image grid: mt-10, grid grid-cols-2 md:grid-cols-3 gap-4

**Each facility card (6 total, 2 rows of 3):**
- Position: relative
- Rounded: rounded-xl overflow-hidden
- Height: h-48 or h-52
- Background image: Unsplash relevant photo, object-cover w-full h-full
- Overlay: absolute inset-0 bg-gradient-to-t from-black/70 to-transparent
- Label: absolute bottom-3 left-3, text-white font-semibold text-sm

**Facility cards content:**
1. Photo: `https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400` — Label: "Salles de Classe"
2. Photo: `https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400` — Label: "Bibliothèque"
3. Photo: `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400` — Label: "Salle de Sport"
4. Photo: `https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400` — Label: "Sciences & Labo"
5. Photo: `https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400` — Label: "Atelier d'Art"
6. Photo: `https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=400` — Label: "Cafétéria"

#### SECTION 6 — Why Choose Us (Pourquoi nous choisir)

**Layout:**
- Background: bg-gray-50
- Padding: py-16 lg:py-24
- Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Inner: grid grid-cols-1 lg:grid-cols-2 gap-16 items-center

**Left side — Text content:**
- Title (2 lines, left-aligned):
  - Line 1: "Pourquoi nous choisir ?" — font-bold text-3xl text-gray-900
  - Line 2: "Ce qui nous rend différents" — font-bold text-3xl text-blue-700
- Blue bar: w-12 h-1 bg-blue-700 mt-3 mb-6
- Icon grid of 6 features: grid grid-cols-2 gap-6 mt-4
  - Each feature: flex gap-3 items-start
    - Icon: w-8 h-8 text-blue-700 flex-shrink-0 (simple SVG)
    - Text block:
      - Feature name: font-semibold text-sm text-gray-900
      - Description: text-xs text-gray-500 mt-0.5

  Feature 1: GraduationCap icon — "Enseignement Expérimenté" / "Des professeurs diplômés et passionnés"
  Feature 2: Users icon — "Pédagogie Interactive" / "Cours dynamiques et participation active"
  Feature 3: BookOpen icon — "Apprentissage en Ligne" / "Accès aux ressources 24h/24"
  Feature 4: Globe icon — "Activités Parascolaires" / "Sport, art, clubs et voyages"
  Feature 5: Award icon — "Riche Programme" / "Plus de 1 000 ressources pédagogiques"
  Feature 6: TrendingUp icon — "Taux de Réussite" / "96% de réussite aux examens"

**Right side — Image:**
- Unsplash: `https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700`
- rounded-2xl overflow-hidden h-[420px] object-cover w-full

#### SECTION 7 — Academic Programmes (Nos Formations)

**Layout:**
- Background: white
- Padding: py-16 lg:py-24
- Section title block (centered):
  - Blue bar: w-12 h-1 bg-blue-700 mx-auto mb-4
  - Title: "Nos Formations Académiques" — font-bold text-3xl text-gray-900 text-center
  - Subtitle: "Des programmes adaptés aux besoins de chaque élève, à chaque étape de son parcours." — text-gray-500 text-center mt-2 max-w-2xl mx-auto
- Cards: mt-10, grid grid-cols-1 md:grid-cols-3 gap-6

**Each formation card (show first 3 formations from JSON):**
- Background: white
- Border: border border-gray-200 rounded-xl
- Padding: p-6
- Hover: hover:shadow-md hover:border-blue-200 transition-all
- Content:
  1. Category tag: inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide
  2. Title: font-bold text-xl text-gray-900 mt-3
  3. Description: text-sm text-gray-500 mt-2 leading-relaxed line-clamp-3
  4. Divider: border-t border-gray-100 mt-4 pt-4
  5. "En savoir plus →" link: text-blue-700 text-sm font-medium hover:underline → /formations/[slug]

**Below cards:**
- Centered "Voir toutes les formations" link button: mt-10 text-center
- Style: inline-flex items-center gap-2 border border-blue-700 text-blue-700 px-6 py-3 rounded-md font-medium hover:bg-blue-700 hover:text-white transition-colors → /formations

#### SECTION 8 — Gallery (Galerie)

**Layout:**
- Background: bg-gray-50
- Padding: py-16 lg:py-24
- Section title block (left-aligned or centered — use centered):
  - Title: "Galerie de l'École"
  - Subtitle: "La vie à l'Académie Lumière — sports, événements et quotidien"
- Photo grid: mt-10, grid grid-cols-2 md:grid-cols-3 gap-4

**6 gallery photos (varying aspect ratios for visual interest):**
1. `https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600` — aspect-square
2. `https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600` — aspect-[4/3]
3. `https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600` — aspect-square
4. `https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600` — aspect-[4/3]
5. `https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600` — aspect-square
6. `https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600` — aspect-[4/3]

Each: rounded-xl overflow-hidden, img w-full h-full object-cover

#### SECTION 9 — Testimonials (Témoignages)

**Layout:**
- Background: white
- Padding: py-16 lg:py-24
- Section title (centered):
  - Title: "Témoignages"
  - Subtitle: "Ce que disent nos élèves, parents et anciens étudiants"
- Testimonial display: mt-10, grid grid-cols-1 md:grid-cols-3 gap-8

**Each testimonial card:**
- Background: bg-gray-50 rounded-xl p-6
- Large quote mark: text-5xl text-blue-200 font-serif leading-none mb-2 (the " character)
- Quote text: text-gray-600 text-sm leading-relaxed italic
- Divider: mt-4
- Author photo: w-10 h-10 rounded-full object-cover (Unsplash person photo)
- Author name: font-semibold text-sm text-gray-900
- Author role: text-xs text-gray-400

Use Unsplash person photos for testimonial avatars:
- `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80`
- `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80`
- `https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80`

#### SECTION 10 — Newsletter

**Layout:**
- Background: Unsplash subtle image with dark overlay OR bg-blue-700 solid
- Use: bg-blue-700 (simpler, cleaner)
- Padding: py-16
- Content: centered, max-w-xl mx-auto text-center

**Content:**
- Title: "Restez informé de nos actualités" — font-bold text-3xl text-white
- Subtitle: "Inscrivez-vous à notre newsletter et ne manquez aucune nouveauté." — text-blue-200 mt-2
- Input + button row: flex gap-2 mt-8 max-w-md mx-auto
  - Input: flex-1 px-4 py-3 rounded-l-md text-gray-900 text-sm outline-none (type="email", placeholder="Votre adresse email")
  - Button: bg-gray-900 text-white px-6 py-3 rounded-r-md font-semibold text-sm hover:bg-gray-700

---

### PAGE: Formations listing (`/formations`)

**Layout:**
- Page header section:
  - bg-blue-700, py-16
  - Title: "Nos Formations" — font-bold text-4xl text-white text-center
  - Subtitle: "Découvrez l'ensemble de nos programmes académiques" — text-blue-200 text-center mt-2

- Content section:
  - bg-gray-50, py-16
  - Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
  - Grid: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

**Each FormationCard:**
- Same design as homepage section 7 cards
- Add: teacher name below divider (small line: "Enseignant · [teacher name]", text-xs text-gray-400)
- Add: duration badge next to category: bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded

---

### PAGE: Formation detail (`/formations/[slug]`)

**Layout:**
- Hero banner: bg-blue-900, py-20
  - Breadcrumb: "Accueil / Formations / [title]" — text-blue-300 text-sm
  - Category tag: bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs uppercase font-semibold
  - Title: font-bold text-4xl text-white mt-3
  - Duration: text-blue-200 text-sm mt-2 (clock icon + "Durée : X ans")

- Content: max-w-4xl mx-auto px-4 py-16, grid grid-cols-1 lg:grid-cols-3 gap-12

  Left column (lg:col-span-2):
  - Section "Description": Heading S + body paragraph from JSON
  - Section "Objectifs": bullet list of 4 fake objectives (text-gray-600, list-disc pl-5, space-y-2)
  - Formation image: rounded-xl, w-full h-64 object-cover mt-6

  Right column (sidebar):
  - Card: bg-gray-50 rounded-xl p-6 border border-gray-200
  - "Enseignant responsable" — Heading S
  - Teacher photo: w-16 h-16 rounded-full object-cover
  - Teacher name: font-semibold text-gray-900 mt-3
  - Teacher role: text-sm text-gray-500
  - Link: "Voir le profil →" text-blue-700 text-sm mt-2 → /professeurs/[teacherSlug]
  - CTA button: "S'inscrire à cette formation" — PRIMARY BUTTON, full width, mt-6

---

### PAGE: Professeurs listing (`/professeurs`)

**Layout:**
- Same page header pattern as /formations but title: "Notre Équipe Enseignante"
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8

**Each ProfesseurCard:**
- Background: white, rounded-2xl, shadow-sm, border border-gray-100
- Padding: p-6
- Content:
  - Photo: w-24 h-24 rounded-full object-cover mx-auto (centered)
  - Name: font-bold text-lg text-gray-900 text-center mt-4
  - Role: text-sm text-blue-700 text-center
  - Bio: text-sm text-gray-500 text-center mt-3 line-clamp-3
  - Divider: border-t border-gray-100 mt-4 pt-4
  - List of formation titles this teacher teaches: flex flex-wrap gap-2 justify-center
    - Each: bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full
  - "Voir le profil →" link: text-blue-700 text-sm font-medium mt-4 text-center → /professeurs/[slug]

---

### PAGE: Professeur detail (`/professeurs/[slug]`)

**Layout:**
- Hero: bg-gray-900, py-20
  - Inner: max-w-4xl mx-auto px-4, flex gap-8 items-center
  - Photo: w-32 h-32 rounded-full object-cover border-4 border-white
  - Right: name (font-bold text-4xl text-white), role (text-blue-400 mt-1), bio excerpt (text-gray-400 mt-3 max-w-lg)

- Content: max-w-4xl mx-auto px-4 py-16
  - Section "Biographie complète": Heading M + full bio text
  - Section "Formations enseignées": Heading M + grid grid-cols-1 md:grid-cols-2 gap-4 mt-6
    - Each formation: FormationCard (simplified version)

---

### PAGE: À propos (`/a-propos`)

**Sections:**
1. Hero banner: bg-blue-700, py-20, title "À Propos de Nous", subtitle
2. Mission section: 2-col grid (text left, image right) — same pattern as homepage About section
3. Values section: 3 cards (same Vision/Mission/Approach pattern but with school-specific values)
4. Team preview: "Notre Équipe" — grid of ProfesseurCards (all 3 teachers), CTA → /professeurs
5. Stats bar: same as homepage stats bar (reuse StatBar component)

---

### PAGE: Contact (`/contact`)

**Layout:**
- Page header: bg-blue-700, py-16, title "Contactez-nous"
- Content: max-w-5xl mx-auto px-4 py-16, grid grid-cols-1 lg:grid-cols-2 gap-16

**Left — Info block:**
- "Nos coordonnées" — Heading M
- 3 info rows (icon + text):
  - MapPin icon: address from site.json
  - Mail icon: email from site.json
  - Phone icon: phone from site.json
- Each row: flex gap-3 items-start mt-4, icon text-blue-700 w-5 h-5, text text-gray-600 text-sm

**Right — Form (UI only, no submit logic):**
- Card: bg-gray-50 rounded-2xl p-8 border border-gray-200
- Fields:
  - "Votre nom" — full width input
  - "Votre email" — full width input
  - "Sujet" — full width input
  - "Message" — textarea h-32
  - Submit: PRIMARY BUTTON "Envoyer le message" full width
- Input styles: w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white mt-1
- Label styles: text-sm font-medium text-gray-700 block mt-4

---

## Data Files

### `/data/site.json`
```json
{
  "schoolName": "Académie Lumière",
  "hero": {
    "headline": "Plus de 12 000 étudiants\nnous font confiance",
    "subheadline": "Chaque jour est une nouvelle opportunité d'apprendre, de grandir et de réussir.",
    "ctaPrimary": { "label": "Découvrir nos formations", "href": "/formations" },
    "ctaSecondary": { "label": "Explorer le campus", "href": "/a-propos" },
    "imageUrl": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600"
  },
  "stats": [
    { "value": "20+", "label": "Années d'excellence" },
    { "value": "12 000+", "label": "Étudiants inscrits" },
    { "value": "80+", "label": "Enseignants experts" },
    { "value": "96%", "label": "Taux de réussite" }
  ],
  "about": {
    "title": "Former les leaders de demain",
    "highlightWord": "leaders",
    "body": "L'Académie Lumière est un établissement d'enseignement privé fondé en 2004. Notre mission est d'offrir une éducation d'excellence, inclusive et tournée vers l'avenir, en combinant rigueur académique et épanouissement personnel. Nous croyons que chaque élève possède un potentiel unique qu'il nous appartient de révéler.",
    "imageUrl": "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
    "ctaLabel": "En savoir plus",
    "ctaHref": "/a-propos"
  },
  "contact": {
    "address": "12 Avenue de l'Éducation, 1000 Bruxelles, Belgique",
    "email": "contact@academie-lumiere.be",
    "phone": "+32 2 123 45 67"
  },
  "newsletter": {
    "title": "Restez informé de nos actualités",
    "subtitle": "Inscrivez-vous à notre newsletter et ne manquez aucune nouveauté."
  }
}
```

### `/data/formations.json`
```json
[
  {
    "slug": "sciences-humaines",
    "title": "Sciences Humaines",
    "category": "Secondaire",
    "description": "Un programme complet couvrant la philosophie, la sociologie et l'histoire contemporaine pour former des citoyens éclairés.",
    "duration": "3 ans",
    "teacherSlug": "marie-lambert",
    "imageUrl": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600"
  },
  {
    "slug": "sciences-exactes",
    "title": "Sciences Exactes",
    "category": "Secondaire",
    "description": "Mathématiques, physique et chimie appliquées à travers des projets concrets et des expériences en laboratoire.",
    "duration": "3 ans",
    "teacherSlug": "pierre-martin",
    "imageUrl": "https://images.unsplash.com/photo-1532094349884-543559d09c05?w=600"
  },
  {
    "slug": "arts-et-creation",
    "title": "Arts & Création",
    "category": "Spécialisation",
    "description": "Développez votre créativité à travers les arts plastiques, le design graphique et la musique.",
    "duration": "2 ans",
    "teacherSlug": "sophie-dumont",
    "imageUrl": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600"
  },
  {
    "slug": "informatique-et-technologie",
    "title": "Informatique & Technologie",
    "category": "Spécialisation",
    "description": "Programmation, développement web et intelligence artificielle pour les passionnés du numérique et de l'innovation.",
    "duration": "2 ans",
    "teacherSlug": "pierre-martin",
    "imageUrl": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600"
  },
  {
    "slug": "langues-et-communication",
    "title": "Langues & Communication",
    "category": "Secondaire",
    "description": "Maîtrisez le français, l'anglais et le néerlandais avec une approche communicative et culturelle moderne.",
    "duration": "3 ans",
    "teacherSlug": "marie-lambert",
    "imageUrl": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600"
  },
  {
    "slug": "economie-et-gestion",
    "title": "Économie & Gestion",
    "category": "Spécialisation",
    "description": "Comptabilité, entrepreneuriat et gestion de projet pour les futurs managers et créateurs d'entreprise.",
    "duration": "2 ans",
    "teacherSlug": "sophie-dumont",
    "imageUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600"
  }
]
```

### `/data/professeurs.json`
```json
[
  {
    "slug": "marie-lambert",
    "name": "Marie Lambert",
    "role": "Professeure · Sciences Humaines & Langues",
    "bio": "Docteure en sciences de l'éducation, Marie enseigne depuis 15 ans avec une approche centrée sur l'esprit critique et l'ouverture culturelle. Elle a publié plusieurs articles sur la pédagogie active.",
    "imageUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
  },
  {
    "slug": "pierre-martin",
    "name": "Pierre Martin",
    "role": "Professeur · Sciences & Informatique",
    "bio": "Ingénieur de formation reconverti dans l'enseignement, Pierre apporte une vision concrète et appliquée des disciplines scientifiques et techniques. Passionné de robotique et d'IA.",
    "imageUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
  },
  {
    "slug": "sophie-dumont",
    "name": "Sophie Dumont",
    "role": "Professeure · Arts & Économie",
    "bio": "Artiste pluridisciplinaire et ancienne consultante en stratégie, Sophie allie sensibilité créative et rigueur analytique dans ses enseignements. Elle anime également des ateliers parascolaires.",
    "imageUrl": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
  }
]
```

### `/data/temoignages.json`
```json
[
  {
    "quote": "L'Académie Lumière m'a donné les outils pour réussir mes études supérieures avec confiance et méthode.",
    "name": "Camille Rousseau",
    "role": "Ancienne étudiante, promotion 2022",
    "imageUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80"
  },
  {
    "quote": "Une école qui place vraiment l'élève au centre, avec des enseignants passionnés et toujours disponibles.",
    "name": "Thomas Lefèvre",
    "role": "Parent d'élève",
    "imageUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80"
  },
  {
    "quote": "La filière Informatique m'a permis de décrocher un stage dans une startup bruxelloise dès ma première année de bachelier.",
    "name": "Yasmine El Amrani",
    "role": "Ancienne étudiante, promotion 2023",
    "imageUrl": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80"
  }
]
```

---

## Architecture Constraints

### File Structure
```
academie-lumiere/
├── app/
│   ├── layout.tsx                    ← root layout, Navbar + Footer
│   ├── page.tsx                      ← Homepage
│   ├── formations/
│   │   ├── page.tsx                  ← listing
│   │   └── [slug]/
│   │       └── page.tsx              ← detail
│   ├── professeurs/
│   │   ├── page.tsx                  ← listing
│   │   └── [slug]/
│   │       └── page.tsx              ← detail
│   ├── a-propos/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── Navbar.tsx                    ← 'use client' (mobile menu)
│   ├── Footer.tsx                    ← Server Component
│   ├── FormationCard.tsx             ← Server Component
│   ├── ProfesseurCard.tsx            ← Server Component
│   ├── StatBar.tsx                   ← Server Component
│   └── TestimonialSlider.tsx         ← 'use client' (if carousel needed)
├── data/
│   ├── site.json
│   ├── formations.json
│   ├── professeurs.json
│   └── temoignages.json
├── types/
│   └── index.ts                      ← all TypeScript interfaces
└── next.config.ts
```

### TypeScript Interfaces (`/types/index.ts`)
```typescript
export interface HeroCTA { label: string; href: string }
export interface Stat { value: string; label: string }
export interface AboutSection { title: string; highlightWord: string; body: string; imageUrl: string; ctaLabel: string; ctaHref: string }
export interface ContactInfo { address: string; email: string; phone: string }
export interface SiteData { schoolName: string; hero: { headline: string; subheadline: string; ctaPrimary: HeroCTA; ctaSecondary: HeroCTA; imageUrl: string }; stats: Stat[]; about: AboutSection; contact: ContactInfo; newsletter: { title: string; subtitle: string } }
export interface Formation { slug: string; title: string; category: string; description: string; duration: string; teacherSlug: string; imageUrl: string }
export interface Professeur { slug: string; name: string; role: string; bio: string; imageUrl: string }
export interface Temoignage { quote: string; name: string; role: string; imageUrl: string }
```

### Next.js Rules
- **All pages are async Server Components** — they import JSON directly, no fetch()
- **`use client`** only on: Navbar.tsx (hamburger menu state), contact form (if using useState), TestimonialSlider if animated
- **`generateStaticParams()`** required on `/formations/[slug]` and `/professeurs/[slug]`
- **`generateMetadata()`** required on every page, using data from JSON
- **`notFound()`** from `next/navigation` called when slug has no match in JSON
- **`next/image`** used for ALL images — never `<img>` tags. Add to next.config.ts:
  ```ts
  images: { remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }] }
  ```
- No `any` TypeScript types
- No external component libraries

---

## Output Instructions

build the nextjs15 app directly


## Quality Checklist (self-verify before delivering)

- [ ] Every `[slug]` route has `generateStaticParams()` and `generateMetadata()`
- [ ] `notFound()` called when slug has no JSON match
- [ ] All images use `next/image` with `width`, `height`, and `sizes` props
- [ ] Unsplash domain added to `next.config.ts` remotePatterns
- [ ] No `<img>` tags anywhere
- [ ] No `any` TypeScript types
- [ ] Navbar has working hamburger menu on mobile (useState)
- [ ] Homepage has all 10 sections in correct order
- [ ] All text content is in French
- [ ] Color #1D4ED8 (blue-700) used consistently for primary accents
- [ ] No external UI libraries imported
- [ ] JSON data is imported, not fetched
- [ ] All files are complete — no truncation
