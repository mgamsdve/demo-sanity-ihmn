import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface HeroCTA {
  label: string;
  href: string;
}

export interface Stat {
  _key: string;
  value: string;
  label: string;
}

export interface SanityImageWithFallback {
  image?: SanityImageSource;
  externalImageUrl?: string;
}

export interface LinkItem {
  _key?: string;
  label: string;
  href: string;
}

export interface SocialLink extends LinkItem {}

export interface FooterColumn {
  _key: string;
  title: string;
  links: LinkItem[];
}

export interface IntroCard {
  _key: string;
  title: string;
  body: string;
}

export interface Facility extends SanityImageWithFallback {
  _key: string;
  label: string;
  alt: string;
}

export interface GalleryImage extends SanityImageWithFallback {
  _key: string;
  alt: string;
}

export interface Reason {
  _key: string;
  title: string;
  description: string;
}

export interface SiteConfig {
  schoolName: string;
  seoDefaultTitle: string;
  seoTitleTemplate: string;
  seoDefaultDescription: string;
}

export interface NavigationConfig {
  brandName: string;
  links: LinkItem[];
  cta: LinkItem;
}

export interface FooterConfig {
  brandName: string;
  description: string;
  socialLinks: SocialLink[];
  columns: FooterColumn[];
  copyrightText: string;
}

export interface SeoFields {
  title: string;
  description: string;
}

export interface PageAccueil {
  seo: SeoFields;
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: HeroCTA;
    ctaSecondary: HeroCTA;
  } & SanityImageWithFallback;
  stats: Stat[];
  introCards: IntroCard[];
  aboutSection: {
    body: string;
    ctaLabel: string;
    ctaHref: string;
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    imageAlt: string;
  } & SanityImageWithFallback;
  facilitiesSection: {
    title: string;
    subtitle: string;
    facilities: Facility[];
  };
  whyChooseUsSection: {
    titleLine1: string;
    titleLine2: string;
    intro: string;
    imageAlt: string;
    reasons: Reason[];
  } & SanityImageWithFallback;
  programmesSection: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
    teacherPrefix: string;
    fallbackTeacherName: string;
    learnMoreLabel: string;
  };
  gallerySection: {
    title: string;
    subtitle: string;
    images: GalleryImage[];
  };
  testimonialsSection: {
    title: string;
    subtitle: string;
  };
  newsletterSection: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    buttonLabel: string;
    imageAlt: string;
  } & SanityImageWithFallback;
}

export interface PageAPropos {
  seo: SeoFields;
  headerTitle: string;
  headerSubtitle: string;
  missionSection: {
    label: string;
    title: string;
    body: string;
    extraBody: string;
    ctaLabel: string;
    ctaHref: string;
    imageAlt: string;
  } & SanityImageWithFallback;
  valuesSection: {
    title: string;
    subtitle: string;
    values: Array<{
      _key: string;
      title: string;
      body: string;
    }>;
  };
  teamSection: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
  };
}

export interface PageFormations {
  seo: SeoFields;
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

export interface PageProfesseurs {
  seo: SeoFields;
  headerTitle: string;
  headerSubtitle: string;
  detail: {
    notFoundTitle: string;
    notFoundDescription: string;
    taughtFormationsTitle: string;
    teacherPrefix: string;
    learnMoreLabel: string;
    profileLabel: string;
  };
}

export interface PageContact {
  seo: SeoFields;
  headerTitle: string;
  headerSubtitle: string;
  detailsTitle: string;
  formTitle: string;
  nameLabel: string;
  emailLabel: string;
  subjectLabel: string;
  messageLabel: string;
  submitLabel: string;
  contactInfo: {
    address: string;
    email: string;
    phone: string;
  };
}

export interface ProfesseurSummary extends SanityImageWithFallback {
  _id: string;
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

export interface FormationSummary {
  _id: string;
  title: string;
  slug: string;
  category: string;
}

export interface Professeur extends SanityImageWithFallback {
  _id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  formations: FormationSummary[];
}

export interface ProfesseurDetail extends SanityImageWithFallback {
  _id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  formations: Formation[];
}

export interface Temoignage extends SanityImageWithFallback {
  _id: string;
  quote: string;
  name: string;
  role: string;
}
