import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";
import crypto from "node:crypto";

loadEnvConfig(process.cwd());

type FormationSeed = {
  slug: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  objectives: string[];
  teacherSlug: string;
  imageUrl: string;
};

type ProfesseurSeed = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
};

type TemoignageSeed = {
  quote: string;
  name: string;
  role: string;
  imageUrl: string;
};

const withKey = <T extends Record<string, unknown>>(item: T) => ({
  _key: crypto.randomUUID(),
  ...item,
});

const globalConfig = {
  schoolName: "Académie Lumière",
  seoDefaultTitle: "Académie Lumière",
  seoTitleTemplate: "%s | Académie Lumière",
  seoDefaultDescription:
    "Site officiel de l'Académie Lumière : formations, équipe enseignante et vie scolaire.",
};

const navigationData = {
  brandName: "Académie Lumière",
  links: [
    withKey({ label: "À propos", href: "/a-propos" }),
    withKey({ label: "Formations", href: "/formations" }),
    withKey({ label: "Professeurs", href: "/professeurs" }),
    withKey({ label: "Contact", href: "/contact" }),
  ],
  cta: { label: "S'inscrire", href: "/contact" },
};

const footerData = {
  brandName: "Académie Lumière",
  description:
    "Nous accompagnons chaque élève vers la réussite avec une pédagogie moderne, humaine et tournée vers l'avenir.",
  socialLinks: [
    withKey({ label: "Facebook", href: "#" }),
    withKey({ label: "Twitter", href: "#" }),
    withKey({ label: "LinkedIn", href: "#" }),
    withKey({ label: "Instagram", href: "#" }),
  ],
  columns: [
    withKey({
      title: "Mon Compte",
      links: [
        withKey({ label: "Connexion", href: "#" }),
        withKey({ label: "Programmes", href: "/formations" }),
        withKey({ label: "Comptes Société", href: "#" }),
        withKey({ label: "Payer les frais", href: "#" }),
      ],
    }),
    withKey({
      title: "À Propos",
      links: [
        withKey({ label: "Informations", href: "/a-propos" }),
        withKey({ label: "Ressources", href: "#" }),
        withKey({ label: "Nos Résultats", href: "#" }),
        withKey({ label: "Rencontrer l'équipe", href: "/professeurs" }),
      ],
    }),
    withKey({
      title: "Support",
      links: [withKey({ label: "Contactez-nous", href: "/contact" })],
    }),
  ],
  copyrightText: "© 2025 Académie Lumière | Tous droits réservés.",
};

const pageAccueilData = {
  seo: {
    title: "Accueil",
    description:
      "Bienvenue à l'Académie Lumière, établissement privé d'excellence en Belgique.",
  },
  hero: {
    headline: "Plus de 12 000 étudiants\nnous font confiance",
    subheadline:
      "Chaque jour est une nouvelle opportunité d'apprendre, de grandir et de réussir.",
    ctaPrimary: { label: "Découvrir nos formations", href: "/formations" },
    ctaSecondary: { label: "Explorer le campus", href: "/a-propos" },
    externalImageUrl:
      "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  stats: [
    withKey({ value: "20+", label: "Années d'excellence" }),
    withKey({ value: "12 000+", label: "Étudiants inscrits" }),
    withKey({ value: "80+", label: "Enseignants experts" }),
    withKey({ value: "96%", label: "Taux de réussite" }),
  ],
  introCards: [
    withKey({
      title: "Notre Vision",
      body: "Former des citoyens engagés, créatifs et responsables.",
    }),
    withKey({
      title: "Notre Mission",
      body: "Proposer une éducation de qualité pour révéler chaque talent.",
    }),
    withKey({
      title: "Notre Approche",
      body: "Allier innovation pédagogique et excellence académique.",
    }),
  ],
  aboutSection: {
    title: "Former les leaders de demain",
    highlightWord: "leaders",
    body: "L'Académie Lumière est un établissement d'enseignement privé fondé en 2004. Notre mission est d'offrir une éducation d'excellence, inclusive et tournée vers l'avenir, en combinant rigueur académique et épanouissement personnel. Nous croyons que chaque élève possède un potentiel unique qu'il nous appartient de révéler.",
    externalImageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
    ctaLabel: "En savoir plus",
    ctaHref: "/a-propos",
    badge: "À propos de nous",
    titlePrefix: "Construire les",
    titleHighlight: "leaders",
    titleSuffix: "de demain",
    imageAlt: "Bâtiment de l'école",
  },
  facilitiesSection: {
    title: "Nos installations",
    subtitle:
      "Des infrastructures modernes pour un environnement d'apprentissage stimulant.",
    facilities: [
      withKey({
        label: "Salles de Classe",
        externalImageUrl:
          "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600",
        alt: "Salles de Classe",
      }),
      withKey({
        label: "Bibliothèque",
        externalImageUrl:
          "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600",
        alt: "Bibliothèque",
      }),
      withKey({
        label: "Salle de Sport",
        externalImageUrl:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
        alt: "Salle de Sport",
      }),
      withKey({
        label: "Laboratoire",
        externalImageUrl:
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600",
        alt: "Laboratoire",
      }),
      withKey({
        label: "Atelier d'Art",
        externalImageUrl:
          "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600",
        alt: "Atelier d'Art",
      }),
      withKey({
        label: "Cafétéria",
        externalImageUrl:
          "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600",
        alt: "Cafétéria",
      }),
    ],
  },
  whyChooseUsSection: {
    titleLine1: "Pourquoi nous choisir ?",
    titleLine2: "Ce qui nous rend différents",
    intro:
      "Nous combinons tradition et innovation afin de former des élèves prêts à relever les défis de demain.",
    externalImageUrl:
      "https://images.unsplash.com/photo-1560264280-88b68371db39?w=900",
    imageAlt: "Enseignant en classe",
    reasons: [
      withKey({
        title: "Enseignants experts",
        description: "Passionnés et à l'écoute de chaque élève.",
      }),
      withKey({
        title: "Pédagogie moderne",
        description: "Méthodes actives et projets collaboratifs.",
      }),
      withKey({
        title: "Cours hybrides",
        description: "Ressources en présentiel et à distance.",
      }),
      withKey({
        title: "Vie scolaire riche",
        description: "Clubs, sports, arts et sorties culturelles.",
      }),
      withKey({
        title: "Parcours personnalisés",
        description: "Suivi individualisé et accompagnement continu.",
      }),
      withKey({
        title: "Résultats solides",
        description: "Excellente progression académique annuelle.",
      }),
    ],
  },
  programmesSection: {
    title: "Nos formations académiques",
    subtitle: "Des programmes adaptés à chaque étape du parcours éducatif.",
    ctaLabel: "Voir toutes les formations",
    ctaHref: "/formations",
    teacherPrefix: "Enseignant",
    fallbackTeacherName: "Équipe pédagogique",
    learnMoreLabel: "En savoir plus",
  },
  gallerySection: {
    title: "Galerie de l'école",
    subtitle: "Vie scolaire, activités et événements à l'Académie Lumière.",
    images: [
      withKey({
        externalImageUrl:
          "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=700",
        alt: "Photo galerie 1",
      }),
      withKey({
        externalImageUrl:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700",
        alt: "Photo galerie 2",
      }),
      withKey({
        externalImageUrl:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700",
        alt: "Photo galerie 3",
      }),
      withKey({
        externalImageUrl:
          "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=700",
        alt: "Photo galerie 4",
      }),
      withKey({
        externalImageUrl:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=700",
        alt: "Photo galerie 5",
      }),
      withKey({
        externalImageUrl:
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600",
        alt: "Photo galerie 6",
      }),
    ],
  },
  testimonialsSection: {
    title: "Témoignages",
    subtitle: "Témoignages des élèves, parents et anciens étudiants.",
  },
  newsletterSection: {
    title: "Restez informé de nos actualités",
    subtitle: "Inscrivez-vous à notre newsletter hebdomadaire.",
    inputPlaceholder: "Votre adresse email",
    buttonLabel: "S'abonner",
    externalImageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600",
    imageAlt: "Étudiants pour la newsletter",
  },
};

const pageAProposData = {
  seo: {
    title: "À propos",
    description:
      "Découvrez l'histoire, les valeurs et le projet éducatif de l'Académie Lumière.",
  },
  headerTitle: "À propos de l'Académie",
  headerSubtitle:
    "Une école tournée vers l'avenir, ancrée dans l'excellence et l'épanouissement de chaque élève.",
  missionSection: {
    label: "Notre mission",
    title: "Former les leaders de demain",
    body: "L'Académie Lumière est un établissement d'enseignement privé fondé en 2004. Notre mission est d'offrir une éducation d'excellence, inclusive et tournée vers l'avenir, en combinant rigueur académique et épanouissement personnel. Nous croyons que chaque élève possède un potentiel unique qu'il nous appartient de révéler.",
    extraBody:
      "Nous valorisons autant la réussite académique que l'épanouissement personnel. Chaque élève est encouragé à développer ses talents, sa confiance et son sens des responsabilités à travers des parcours adaptés, un suivi régulier et des activités variées.",
    ctaLabel: "Découvrir nos formations",
    ctaHref: "/formations",
    externalImageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
    imageAlt: "Élèves de l'Académie Lumière",
  },
  valuesSection: {
    title: "Nos valeurs",
    subtitle: "Les principes qui guident notre projet éducatif au quotidien.",
    values: [
      withKey({
        title: "Excellence académique",
        body: "Nous cultivons une exigence bienveillante pour permettre à chaque élève d'atteindre son plein potentiel.",
      }),
      withKey({
        title: "Accompagnement humain",
        body: "Une relation de confiance entre élèves, familles et équipe pédagogique pour grandir ensemble.",
      }),
      withKey({
        title: "Innovation pédagogique",
        body: "Des méthodes actives, des outils numériques et des projets concrets pour apprendre autrement.",
      }),
    ],
  },
  teamSection: {
    title: "Notre équipe pédagogique",
    subtitle: "Des enseignants engagés, experts dans leurs disciplines.",
    ctaLabel: "Voir toute l'équipe",
    ctaHref: "/professeurs",
  },
};

const pageFormationsData = {
  seo: {
    title: "Nos formations",
    description:
      "Découvrez l'ensemble des programmes académiques de l'Académie Lumière.",
  },
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

const pageProfesseursData = {
  seo: {
    title: "Nos professeurs",
    description: "Rencontrez les professeurs de l'Académie Lumière.",
  },
  headerTitle: "Notre équipe enseignante",
  headerSubtitle:
    "Des enseignants experts engagés pour la réussite, la confiance et l'épanouissement de chaque élève.",
  detail: {
    notFoundTitle: "Professeur introuvable",
    notFoundDescription: "Le professeur demandé est introuvable.",
    taughtFormationsTitle: "Formations enseignées",
    teacherPrefix: "Enseignant",
    learnMoreLabel: "En savoir plus",
    profileLabel: "Voir le profil",
  },
};

const pageContactData = {
  seo: {
    title: "Contact",
    description:
      "Contactez l'Académie Lumière pour toute information complémentaire.",
  },
  headerTitle: "Contactez-nous",
  headerSubtitle:
    "Notre équipe est à votre écoute pour répondre à toutes vos questions sur l'admission et les formations.",
  detailsTitle: "Nos coordonnées",
  formTitle: "Écrivez-nous",
  nameLabel: "Votre nom",
  emailLabel: "Votre email",
  subjectLabel: "Sujet",
  messageLabel: "Message",
  submitLabel: "Envoyer le message",
  contactInfo: {
    address: "12 Avenue de l'Éducation, 1000 Bruxelles, Belgique",
    email: "contact@academie-lumiere.be",
    phone: "+32 2 123 45 67",
  },
};

const professeursData: ProfesseurSeed[] = [
  {
    slug: "marie-lambert",
    name: "Marie Lambert",
    role: "Professeure · Sciences Humaines & Langues",
    bio: "Docteure en sciences de l'éducation, Marie enseigne depuis 15 ans avec une approche centrée sur l'esprit critique et l'ouverture culturelle. Elle a publié plusieurs articles sur la pédagogie active.",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  },
  {
    slug: "pierre-martin",
    name: "Pierre Martin",
    role: "Professeur · Sciences & Informatique",
    bio: "Ingénieur de formation reconverti dans l'enseignement, Pierre apporte une vision concrète et appliquée des disciplines scientifiques et techniques. Passionné de robotique et d'IA.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
  {
    slug: "sophie-dumont",
    name: "Sophie Dumont",
    role: "Professeure · Arts & Économie",
    bio: "Artiste pluridisciplinaire et ancienne consultante en stratégie, Sophie allie sensibilité créative et rigueur analytique dans ses enseignements. Elle anime également des ateliers parascolaires.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
  },
];

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

const temoignagesData: TemoignageSeed[] = [
  {
    quote:
      "L'Académie Lumière m'a donné les outils pour réussir mes études supérieures avec confiance et méthode.",
    name: "Camille Rousseau",
    role: "Ancienne étudiante, promotion 2022",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80",
  },
  {
    quote:
      "Une école qui place vraiment l'élève au centre, avec des enseignants passionnés et toujours disponibles.",
    name: "Thomas Lefèvre",
    role: "Parent d'élève",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80",
  },
  {
    quote:
      "La filière Informatique m'a permis de décrocher un stage dans une startup bruxelloise dès ma première année de bachelier.",
    name: "Yasmine El Amrani",
    role: "Ancienne étudiante, promotion 2023",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80",
  },
];

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
}

if (!token) {
  throw new Error("Missing SANITY_API_TOKEN");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

async function seedSingletonDocuments() {
  await client.delete("siteConfig").catch(() => {});
  await client.delete("navigation").catch(() => {});
  await client.delete("footer").catch(() => {});
  await client.delete("pageAccueil").catch(() => {});
  await client.delete("pageAPropos").catch(() => {});
  await client.delete("pageFormations").catch(() => {});
  await client.delete("pageProfesseurs").catch(() => {});
  await client.delete("pageContact").catch(() => {});
  await client.createOrReplace({
    _id: "siteConfig",
    _type: "siteConfig",
    ...globalConfig,
  });
  console.log("✓ siteConfig created/updated");

  await client.createOrReplace({
    _id: "navigation",
    _type: "navigation",
    ...navigationData,
  });
  console.log("✓ navigation created/updated");

  await client.createOrReplace({
    _id: "footer",
    _type: "footer",
    ...footerData,
  });
  console.log("✓ footer created/updated");

  await client.createOrReplace({
    _id: "pageAccueil",
    _type: "pageAccueil",
    ...pageAccueilData,
  });
  console.log("✓ pageAccueil created/updated");

  await client.createOrReplace({
    _id: "pageAPropos",
    _type: "pageAPropos",
    ...pageAProposData,
  });
  console.log("✓ pageAPropos created/updated");

  await client.createOrReplace({
    _id: "pageFormations",
    _type: "pageFormations",
    ...pageFormationsData,
  });
  console.log("✓ pageFormations created/updated");

  await client.createOrReplace({
    _id: "pageProfesseurs",
    _type: "pageProfesseurs",
    ...pageProfesseursData,
  });
  console.log("✓ pageProfesseurs created/updated");

  await client.createOrReplace({
    _id: "pageContact",
    _type: "pageContact",
    ...pageContactData,
  });
  console.log("✓ pageContact created/updated");
}

async function migrateLegacySeoFields() {
  const legacySeoByDocument: Record<
    "pageAccueil" | "pageAPropos" | "pageFormations" | "pageProfesseurs" | "pageContact",
    { title: string; description: string }
  > = {
    pageAccueil: {
      title: "Accueil | Académie Lumière",
      description: "Bienvenue à l'Académie Lumière, établissement privé d'excellence en Belgique.",
    },
    pageAPropos: {
      title: "À propos | Académie Lumière",
      description: "Découvrez l'histoire, les valeurs et le projet éducatif de l'Académie Lumière.",
    },
    pageFormations: {
      title: "Nos formations | Académie Lumière",
      description: "Découvrez l'ensemble des programmes académiques de l'Académie Lumière.",
    },
    pageProfesseurs: {
      title: "Nos professeurs | Académie Lumière",
      description: "Rencontrez les professeurs de l'Académie Lumière.",
    },
    pageContact: {
      title: "Contact | Académie Lumière",
      description: "Contactez l'Académie Lumière pour toute information complémentaire.",
    },
  };

  for (const [documentId, seo] of Object.entries(legacySeoByDocument)) {
    await client
      .patch(documentId)
      .set({ seo })
      .unset(["metaTitle", "metaDescription"])
      .commit();

    console.log(`✓ ${documentId} legacy SEO fields migrated`);
  }
}

async function fixPageAccueilTitle() {
  await client.patch("pageAccueil").set({ title: "Page Accueil" }).commit();
  console.log("✓ pageAccueil title fixed");
}

async function seedProfesseurs(professeurs: ProfesseurSeed[]) {
  const idBySlug = new Map<string, string>();

  for (const professeur of professeurs) {
    const doc = await client.createOrReplace({
      _id: `professeur-${professeur.slug}`,
      _type: "professeur",
      name: professeur.name,
      slug: { _type: "slug", current: professeur.slug },
      role: professeur.role,
      bio: professeur.bio,
      externalImageUrl: professeur.imageUrl,
    });
    idBySlug.set(professeur.slug, doc._id);
    console.log(`✓ professeur ${professeur.slug} created/updated`);
  }

  return idBySlug;
}

async function seedFormations(
  formations: FormationSeed[],
  professeurIds: Map<string, string>,
) {
  for (const formation of formations) {
    const teacherId = professeurIds.get(formation.teacherSlug);
    if (!teacherId) {
      console.error(
        `✗ formation ${formation.slug} skipped (missing teacher: ${formation.teacherSlug})`,
      );
      continue;
    }

    await client.createOrReplace({
      _id: `formation-${formation.slug}`,
      _type: "formation",
      title: formation.title,
      slug: { _type: "slug", current: formation.slug },
      category: formation.category,
      description: formation.description,
      duration: formation.duration,
      teacher: { _type: "reference", _ref: teacherId },
      externalImageUrl: formation.imageUrl,
    });
    await client
      .patch(`formation-${formation.slug}`)
      .set({ objectives: formation.objectives })
      .commit();
    console.log(`✓ formation ${formation.slug} created/updated`);
  }
}

async function seedTemoignages(temoignages: TemoignageSeed[]) {
  for (const [index, temoignage] of temoignages.entries()) {
    await client.createOrReplace({
      _id: `temoignage-${index + 1}`,
      _type: "temoignage",
      quote: temoignage.quote,
      name: temoignage.name,
      role: temoignage.role,
      externalImageUrl: temoignage.imageUrl,
    });
    console.log(`✓ temoignage ${index + 1} created/updated`);
  }
}

async function run() {
  await seedSingletonDocuments();
  await migrateLegacySeoFields();
  await fixPageAccueilTitle();
  const professeurIds = await seedProfesseurs(professeursData);
  await seedFormations(formationsData, professeurIds);
  await seedTemoignages(temoignagesData);
  console.log("✅ Seed completed");
}

run().catch((error: unknown) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
