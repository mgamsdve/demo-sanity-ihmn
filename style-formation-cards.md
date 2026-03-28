# Style Formation Cards

Ce fichier rassemble les morceaux de code qui touchent directement ou indirectement les cards de formations affichées sur la page `/formations`.

## 1. Page `/formations`

[app/(site)/formations/page.tsx](app/(site)/formations/page.tsx)

```tsx
import type { Metadata } from "next";
import AnimatedGrid from "@/components/AnimatedGrid";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { client, urlFor } from "@/lib/sanity";
import { ALL_FORMATIONS_QUERY, PAGE_FORMATIONS_QUERY } from "@/lib/queries";
import type { Formation, PageFormations } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await client.fetch<PageFormations | null>(PAGE_FORMATIONS_QUERY);

  if (!pageData) {
    throw new Error("Page Formations document is missing in Sanity.");
  }

  return {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
  };
}

export default async function FormationsPage() {
  const [pageData, formationsData] = await Promise.all([
    client.fetch<PageFormations | null>(PAGE_FORMATIONS_QUERY),
    client.fetch<Formation[]>(ALL_FORMATIONS_QUERY),
  ]);

  if (!pageData) {
    throw new Error("Page Formations document is missing in Sanity.");
  }

  const pageCopy = pageData;

  return (
    <div className="bg-[#f4f8fc]">
      <PageHeader
        title={pageCopy.headerTitle}
        subtitle={pageCopy.headerSubtitle}
      />

      <section className="mx-auto max-w-[1120px] px-4 py-14 sm:px-6">
        <AnimatedGrid className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {formationsData.map((formation) => {
            const formationImageUrl = formation.image
              ? urlFor(formation.image).width(600).height(320).url()
              : formation.externalImageUrl ?? "";
            const teacher = formation.teacher;

            return (
              <article
                key={formation.slug}
                className="overflow-hidden rounded-2xl bg-white shadow-md transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-xl will-change-transform"
              >
                <Image
                  src={formationImageUrl}
                  alt={formation.title}
                  width={600}
                  height={320}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700 uppercase">
                    {formation.category}
                  </span>
                  <h2 className="mt-3 text-xl font-bold text-gray-900">{formation.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">{formation.description}</p>
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-400">
                      {pageCopy.teacherPrefix} · {teacher?.name ?? pageCopy.fallbackTeacherName}
                    </p>
                    <Link
                      href={`/formations/${formation.slug}`}
                      className="mt-1 inline-block text-sm font-medium text-blue-700 hover:underline"
                    >
                      {pageCopy.learnMoreLabel} →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </AnimatedGrid>
      </section>
    </div>
  );
}
```

## 2. Animation indirecte sur les cards

[components/AnimatedGrid.tsx](components/AnimatedGrid.tsx)

```tsx
import { Children } from "react";
import type { ReactNode } from "react";

export default function AnimatedGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <div
          style={{
            animationName: "fadeInUp",
            animationDuration: "0.5s",
            animationTimingFunction: "ease-out",
            animationFillMode: "both",
            animationDelay: `${i * 0.1}s`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
```

## 3. Styles globaux qui s'appliquent aux cards

[app/layout.tsx](app/layout.tsx)

```tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { client } from "@/lib/sanity";
import { SITE_CONFIG_QUERY } from "@/lib/queries";
import type { SiteConfig } from "@/types";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await client.fetch<SiteConfig | null>(SITE_CONFIG_QUERY);

  return {
    title: {
      default: siteConfig?.seoDefaultTitle ?? "Académie Lumière",
      template: siteConfig?.seoTitleTemplate ?? "%s | Académie Lumière",
    },
    description:
      siteConfig?.seoDefaultDescription ??
      "Site officiel de l'Académie Lumière : formations, équipe enseignante et vie scolaire.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={poppins.variable}>
      <body className="bg-[#f4f8fc] font-sans text-gray-900 antialiased">{children}</body>
    </html>
  );
}
```

[app/(site)/layout.tsx](app/(site)/layout.tsx)

```tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/lib/sanity";
import {
  FOOTER_QUERY,
  NAVIGATION_QUERY,
  SITE_CONFIG_QUERY,
} from "@/lib/queries";
import type { FooterConfig, NavigationConfig, SiteConfig } from "@/types";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [siteData, navigation, footer] = await Promise.all([
    client.fetch<SiteConfig | null>(SITE_CONFIG_QUERY),
    client.fetch<NavigationConfig | null>(NAVIGATION_QUERY),
    client.fetch<FooterConfig | null>(FOOTER_QUERY),
  ]);

  if (!siteData || !navigation || !footer) {
    throw new Error("Required global documents are missing in Sanity.");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar schoolName={siteData.schoolName} navbar={navigation} />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer footer={footer} />
    </div>
  );
}
```

[app/globals.css](app/globals.css)

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-poppins);
}

html,
body {
  min-height: 100%;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.7s ease-out forwards;
}

.animate-fade-in-up-delay {
  animation: fade-in-up 0.7s ease-out 0.2s forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up-delay-2 {
  animation: fade-in-up 0.7s ease-out 0.4s forwards;
  opacity: 0;
}
```

## 4. Header de page qui encadre les cards

[components/PageHeader.tsx](components/PageHeader.tsx)

```tsx
interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-blue-900 to-blue-700 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl leading-tight font-bold text-white md:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-blue-200">{subtitle}</p>
      </div>
    </section>
  );
}
```

## 5. Composant de card réutilisable lié aux formations

[components/FormationCard.tsx](components/FormationCard.tsx)

```tsx
import Link from "next/link";
import type { Formation } from "@/types";

interface FormationCardProps {
  formation: Formation;
  showDuration?: boolean;
  showTeacher?: boolean;
  teacherName?: string;
  learnMoreLabel: string;
}

export default function FormationCard({
  formation,
  showDuration = false,
  showTeacher = false,
  teacherName,
  learnMoreLabel,
}: FormationCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold tracking-wider text-blue-700 uppercase">
          {formation.category}
        </span>
        {showDuration ? <span className="text-xs font-medium text-gray-400">{formation.duration}</span> : null}
      </div>

      <h3 className="line-clamp-2 text-xl leading-snug font-bold text-gray-900">{formation.title}</h3>
      <p className="mt-2 flex-1 line-clamp-3 text-sm leading-relaxed text-gray-500">{formation.description}</p>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          {showTeacher && teacherName ? (
            <p className="flex items-center gap-1.5 text-xs text-gray-400">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <circle cx="12" cy="8" r="3.2" />
                <path d="M5 20a7 7 0 0 1 14 0" />
              </svg>
              <span>{teacherName}</span>
            </p>
          ) : (
            <span />
          )}
          <Link
            href={`/formations/${formation.slug}`}
            className="flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline"
          >
            {learnMoreLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
```

## 6. Requêtes qui alimentent les cards

[lib/queries.ts](lib/queries.ts)

```ts
export const PAGE_FORMATIONS_QUERY = `*[_type == "pageFormations" && _id == "pageFormations"][0]{
  metaTitle,
  metaDescription,
  headerTitle,
  headerSubtitle,
  teacherPrefix,
  fallbackTeacherName,
  learnMoreLabel,
  detail {
    notFoundTitle,
    notFoundDescription,
    breadcrumbHomeLabel,
    breadcrumbListLabel,
    durationPrefix,
    descriptionTitle,
    objectivesTitle,
    objectives,
    teacherSectionTitle,
    teacherProfileLabel,
    enrollLabel
  }
}`;

export const ALL_FORMATIONS_QUERY = `*[_type == "formation"] | order(_createdAt asc) {
  _id,
  title,
  "slug": slug.current,
  category,
  description,
  duration,
  objectives,
  image,
  externalImageUrl,
  "teacher": teacher->{
    name,
    "slug": slug.current,
    role,
    image,
    externalImageUrl
  }
}`;
```

## 7. Types utilisés par les cards

[types/index.ts](types/index.ts)

```ts
export interface PageFormations {
  metaTitle: string;
  metaDescription: string;
  headerTitle: string;
  headerSubtitle: string;
  teacherPrefix: string;
  fallbackTeacherName: string;
  learnMoreLabel: string;
  detail: {
    notFoundTitle: string;
    notFoundDescription: string;
    breadcrumbHomeLabel: string;
    breadcrumbListLabel: string;
    durationPrefix: string;
    descriptionTitle: string;
    objectivesTitle: string;
    objectives: string[];
    teacherSectionTitle: string;
    teacherProfileLabel: string;
    enrollLabel: string;
  };
}

export interface ProfesseurSummary extends SanityImageWithFallback {
  name: string;
  slug: string;
  role: string;
}

export interface Formation extends SanityImageWithFallback {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  duration: string;
  objectives?: string[];
  teacher: ProfesseurSummary;
}
```

## 8. Schémas Sanity qui définissent les champs de formation

[sanity/schemas/pageFormations.ts](sanity/schemas/pageFormations.ts)

```ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "pageFormations",
  title: "Page Formations",
  type: "document",
  fields: [
    defineField({ name: "metaTitle", title: "Meta title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "headerTitle", title: "Titre hero", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "headerSubtitle",
      title: "Sous-titre hero",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "teacherPrefix",
      title: "Préfixe enseignant",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fallbackTeacherName",
      title: "Fallback enseignant",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "learnMoreLabel",
      title: "Label En savoir plus",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "detail",
      title: "Détail formation",
      type: "object",
      fields: [
        defineField({ name: "notFoundTitle", title: "Titre introuvable", type: "string", validation: (rule) => rule.required() }),
        defineField({
          name: "notFoundDescription",
          title: "Description introuvable",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "breadcrumbHomeLabel",
          title: "Fil d'ariane accueil",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "breadcrumbListLabel",
          title: "Fil d'ariane liste",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "durationPrefix",
          title: "Préfixe durée",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "descriptionTitle",
          title: "Titre description",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "objectivesTitle",
          title: "Titre objectifs",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "objectives",
          title: "Objectifs",
          type: "array",
          of: [{ type: "string" }],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: "teacherSectionTitle",
          title: "Titre section enseignant",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "teacherProfileLabel",
          title: "Label voir profil",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "enrollLabel",
          title: "Label inscription",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
});
```

[sanity/schemas/formation.ts](sanity/schemas/formation.ts)

```ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "formation",
  title: "Formation",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: ["Secondaire", "Spécialisation"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Durée",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "objectives",
      title: "Objectifs pédagogiques",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "teacher",
      title: "Professeur",
      type: "reference",
      to: [{ type: "professeur" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "externalImageUrl",
      title: "Image externe (URL)",
      type: "string",
    }),
  ],
});
```

[sanity/schemas/index.ts](sanity/schemas/index.ts)

```ts
import siteConfig from "./siteConfig";
import formation from "./formation";
import professeur from "./professeur";
import temoignage from "./temoignage";
import pageAccueil from "./pageAccueil";
import pageFormations from "./pageFormations";
import pageProfesseurs from "./pageProfesseurs";
import pageAPropos from "./pageAPropos";
import pageContact from "./pageContact";
import navigation from "./navigation";
import footer from "./footer";

export const schemaTypes = [
  siteConfig,
  pageAccueil,
  pageFormations,
  pageProfesseurs,
  pageAPropos,
  pageContact,
  navigation,
  footer,
  formation,
  professeur,
  temoignage,
];
```

[sanity.config.ts](sanity.config.ts)

```ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "default",
  title: "Académie Lumière Studio",
  projectId: projectId ?? "missing-project-id",
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenu")
          .items([
            S.listItem()
              .title("Configuration globale")
              .child(S.document().schemaType("siteConfig").documentId("siteConfig")),
            S.listItem()
              .title("Navigation")
              .child(S.document().schemaType("navigation").documentId("navigation")),
            S.listItem()
              .title("Footer")
              .child(S.document().schemaType("footer").documentId("footer")),
            S.listItem()
              .title("Page Accueil")
              .child(S.document().schemaType("pageAccueil").documentId("pageAccueil")),
            S.listItem()
              .title("Page À propos")
              .child(S.document().schemaType("pageAPropos").documentId("pageAPropos")),
            S.listItem()
              .title("Page Formations")
              .child(S.document().schemaType("pageFormations").documentId("pageFormations")),
            S.listItem()
              .title("Page Professeurs")
              .child(S.document().schemaType("pageProfesseurs").documentId("pageProfesseurs")),
            S.listItem()
              .title("Page Contact")
              .child(S.document().schemaType("pageContact").documentId("pageContact")),
            S.divider(),
            S.documentTypeListItem("formation").title("Formations"),
            S.documentTypeListItem("professeur").title("Professeurs"),
            S.documentTypeListItem("temoignage").title("Témoignages"),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
```

## 9. Seed de contenu qui alimente les cards

[scripts/seed.ts](scripts/seed.ts)

```ts
const pageFormationsData = {
  metaTitle: "Nos formations",
  metaDescription:
    "Découvrez l'ensemble des programmes académiques de l'Académie Lumière.",
  headerTitle: "Nos formations",
  headerSubtitle:
    "Découvrez l'ensemble de nos programmes académiques et choisissez le parcours le plus adapté à votre projet.",
  teacherPrefix: "Enseignant",
  fallbackTeacherName: "Équipe pédagogique",
  learnMoreLabel: "En savoir plus",
  detail: {
    notFoundTitle: "Formation introuvable",
    notFoundDescription: "La formation demandée est introuvable.",
    breadcrumbHomeLabel: "Accueil",
    breadcrumbListLabel: "Formations",
    durationPrefix: "Durée",
    descriptionTitle: "Description",
    objectivesTitle: "Objectifs pédagogiques",
    objectives: [
      "Développer des compétences disciplinaires solides et durables.",
      "Renforcer l'autonomie, l'esprit critique et la créativité.",
      "Favoriser l'apprentissage collaboratif et l'ouverture culturelle.",
      "Préparer efficacement la poursuite d'études et l'insertion professionnelle.",
    ],
    teacherSectionTitle: "Enseignant responsable",
    teacherProfileLabel: "Voir le profil",
    enrollLabel: "S'inscrire à cette formation",
  },
};

const formationsData: FormationSeed[] = [
  {
    slug: "sciences-humaines",
    title: "Sciences Humaines",
    category: "Secondaire",
    description:
      "Un programme complet couvrant la philosophie, la sociologie et l'histoire contemporaine pour former des citoyens éclairés.",
    duration: "3 ans",
    objectives: [
      "Analyser des phénomènes sociaux, politiques et historiques avec méthode.",
      "Développer l'argumentation écrite et orale en français et en langues.",
      "Construire une pensée critique à partir de sources variées.",
      "Relier les enjeux contemporains aux repères historiques majeurs.",
    ],
    teacherSlug: "marie-lambert",
    imageUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600",
  },
  {
    slug: "sciences-exactes",
    title: "Sciences Exactes",
    category: "Secondaire",
    description:
      "Mathématiques, physique et chimie appliquées à travers des projets concrets et des expériences en laboratoire.",
    duration: "3 ans",
    objectives: [
      "Maîtriser les bases avancées en mathématiques, physique et chimie.",
      "Formuler des hypothèses puis valider par expérimentation.",
      "Interpréter des données scientifiques avec rigueur.",
      "Résoudre des problèmes complexes à l'aide d'outils numériques.",
    ],
    teacherSlug: "pierre-martin",
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
  },
  {
    slug: "arts-et-creation",
    title: "Arts & Création",
    category: "Spécialisation",
    description:
      "Développez votre créativité à travers les arts plastiques, le design graphique et la musique.",
    duration: "2 ans",
    objectives: [
      "Explorer plusieurs médiums artistiques et affiner son style personnel.",
      "Concevoir un projet créatif de l'idée au rendu final.",
      "Utiliser les fondamentaux du design visuel et de la composition.",
      "Présenter et défendre une démarche artistique argumentée.",
    ],
    teacherSlug: "sophie-dumont",
    imageUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600",
  },
  {
    slug: "informatique-et-technologie",
    title: "Informatique & Technologie",
    category: "Spécialisation",
    description:
      "Programmation, développement web et intelligence artificielle pour les passionnés du numérique et de l'innovation.",
    duration: "2 ans",
    objectives: [
      "Concevoir des applications web avec des bases solides en programmation.",
      "Structurer des projets logiciels en équipe avec versioning.",
      "Comprendre les principes clés de l'IA et de l'automatisation.",
      "Déployer et tester des solutions techniques orientées usage.",
    ],
    teacherSlug: "pierre-martin",
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
  },
  {
    slug: "langues-et-communication",
    title: "Langues & Communication",
    category: "Secondaire",
    description:
      "Maîtrisez le français, l'anglais et le néerlandais avec une approche communicative et culturelle moderne.",
    duration: "3 ans",
    objectives: [
      "Renforcer l'expression orale et écrite en contexte académique.",
      "Développer une communication interculturelle en plusieurs langues.",
      "Maîtriser les techniques de présentation et de prise de parole.",
      "Adapter son message selon le public et le canal de communication.",
    ],
    teacherSlug: "marie-lambert",
    imageUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
  },
  {
    slug: "economie-et-gestion",
    title: "Économie & Gestion",
    category: "Spécialisation",
    description:
      "Comptabilité, entrepreneuriat et gestion de projet pour les futurs managers et créateurs d'entreprise.",
    duration: "2 ans",
    objectives: [
      "Comprendre les fondamentaux de la gestion d'entreprise et de la finance.",
      "Élaborer un budget et suivre des indicateurs de performance.",
      "Piloter un mini-projet entrepreneurial de bout en bout.",
      "Analyser un marché et proposer une stratégie opérationnelle.",
    ],
    teacherSlug: "sophie-dumont",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600",
  },
];
```

## 10. Page détail de formation liée aux mêmes données

[app/(site)/formations/[slug]/page.tsx](app/(site)/formations/[slug]/page.tsx)

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client, urlFor } from "@/lib/sanity";
import {
  ALL_FORMATION_SLUGS_QUERY,
  FORMATION_BY_SLUG_QUERY,
  PAGE_FORMATIONS_QUERY,
} from "@/lib/queries";
import type { Formation, PageFormations } from "@/types";

interface FormationDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(ALL_FORMATION_SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: FormationDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [pageData, formation] = await Promise.all([
    client.fetch<PageFormations | null>(PAGE_FORMATIONS_QUERY),
    client.fetch<Formation | null>(FORMATION_BY_SLUG_QUERY, { slug }),
  ]);

  if (!pageData) {
    throw new Error("Page Formations document is missing in Sanity.");
  }

  if (!formation) {
    return {
      title: pageData.detail.notFoundTitle,
      description: pageData.detail.notFoundDescription,
    };
  }

  return {
    title: formation.title,
    description: formation.description,
  };
}

export default async function FormationDetailPage({ params }: FormationDetailPageProps) {
  const { slug } = await params;
  const [pageData, formation] = await Promise.all([
    client.fetch<PageFormations | null>(PAGE_FORMATIONS_QUERY),
    client.fetch<Formation | null>(FORMATION_BY_SLUG_QUERY, { slug }),
  ]);

  if (!pageData) {
    throw new Error("Page Formations document is missing in Sanity.");
  }

  if (!formation) {
    notFound();
  }

  const professeur = formation.teacher;

  if (!professeur) {
    notFound();
  }

  const formationImageUrl = formation.image
    ? urlFor(formation.image).width(900).height(450).url()
    : formation.externalImageUrl ?? "";
  const professeurImageUrl = professeur.image
    ? urlFor(professeur.image).width(128).height(128).url()
    : professeur.externalImageUrl ?? "";
  const pageCopy = pageData.detail;

  return (
    <div className="bg-[#f4f8fc]">
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm text-blue-300">
            <Link href="/" className="hover:text-white">
              {pageCopy.breadcrumbHomeLabel}
            </Link>
            {" / "}
            <Link href="/formations" className="hover:text-white">
              {pageCopy.breadcrumbListLabel}
            </Link>
            {" / "}
            <span>{formation.title}</span>
          </p>
          <span className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase">
            {formation.category}
          </span>
          <h1 className="text-4xl leading-tight font-bold text-white md:text-5xl">{formation.title}</h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-blue-200">
            <svg
              className="h-4 w-4 text-blue-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7.5v4.7l3.2 1.8" />
            </svg>
            <span>
              {pageCopy.durationPrefix} : {formation.duration}
            </span>
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1120px] grid-cols-1 gap-7 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-xl bg-white p-7 shadow-[0_8px_24px_rgba(16,24,40,0.05)]">
          <h2 className="text-2xl font-semibold text-gray-900">{pageCopy.descriptionTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">{formation.description}</p>

          <h3 className="mt-8 text-2xl font-semibold text-gray-900">{pageCopy.objectivesTitle}</h3>
          {formation.objectives && formation.objectives.length > 0 && (
            <ul className="mt-3 list-disc pl-5 space-y-2">
              {formation.objectives.map((obj, i) => (
                <li key={i} className="text-gray-600 text-sm">{obj}</li>
              ))}
            </ul>
          )}

          <div className="mt-6 overflow-hidden rounded-lg">
            <Image
              src={formationImageUrl}
              alt={formation.title}
              width={900}
              height={450}
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="h-64 w-full object-cover"
            />
          </div>
        </div>

        <aside className="sticky top-24 self-start">
          <div className="rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(16,24,40,0.05)]">
            <h3 className="text-xl font-semibold text-gray-900">{pageCopy.teacherSectionTitle}</h3>
            <Image
              src={professeurImageUrl}
              alt={professeur.name}
              width={72}
              height={72}
              sizes="72px"
              className="mt-4 h-18 w-18 rounded-full object-cover"
            />
            <p className="mt-3 font-semibold text-gray-900">{professeur.name}</p>
            <p className="text-sm text-gray-500">{professeur.role}</p>
            <Link href={`/professeurs/${professeur.slug}`} className="mt-2 block text-sm font-semibold text-blue-700 hover:underline">
              {pageCopy.teacherProfileLabel} →
            </Link>
            <Link
              href="/contact"
              className="mt-6 block w-full rounded bg-blue-700 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-900"
            >
              {pageCopy.enrollLabel}
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
```

## 11. Ce qui est vraiment utilisé sur `/formations`

- Directement: le JSX inline dans [app/(site)/formations/page.tsx](app/(site)/formations/page.tsx)
- Indirectement: [components/AnimatedGrid.tsx](components/AnimatedGrid.tsx) et [app/globals.css](app/globals.css)
- Données: [lib/queries.ts](lib/queries.ts), [types/index.ts](types/index.ts), [sanity/schemas/pageFormations.ts](sanity/schemas/pageFormations.ts), [sanity/schemas/formation.ts](sanity/schemas/formation.ts), [scripts/seed.ts](scripts/seed.ts)
- Réutilisable mais pas appelé sur cette page: [components/FormationCard.tsx](components/FormationCard.tsx)