import { defineQuery } from "next-sanity";

export const SITE_CONFIG_QUERY = defineQuery(/* groq */ `*[_id == "siteConfig"][0]{
  schoolName,
  seoDefaultTitle,
  seoTitleTemplate,
  seoDefaultDescription
}`);

export const NAVIGATION_QUERY = defineQuery(/* groq */ `*[_id == "navigation"][0]{
  brandName,
  links[]{
    _key,
    label,
    href
  },
  cta
}`);

export const FOOTER_QUERY = defineQuery(/* groq */ `*[_id == "footer"][0]{
  brandName,
  description,
  socialLinks[]{
    _key,
    label,
    href
  },
  columns[]{
    _key,
    title,
    links[]{
      _key,
      label,
      href
    }
  },
  copyrightText
}`);

export const PAGE_ACCUEIL_QUERY = defineQuery(/* groq */ `*[_id == "pageAccueil"][0]{
  "seo": {
    "title": coalesce(seo.title, metaTitle),
    "description": coalesce(seo.description, metaDescription)
  },
  hero{
    headline,
    subheadline,
    ctaPrimary,
    ctaSecondary,
    image{
      asset->{
        _id,
        url
      },
      hotspot,
      crop
    },
    externalImageUrl
  },
  stats[]{
    _key,
    value,
    label
  },
  introCards[]{
    _key,
    title,
    body
  },
  aboutSection{
    title,
    highlightWord,
    body,
    image{
      asset->{
        _id,
        url
      },
      hotspot,
      crop
    },
    externalImageUrl,
    ctaLabel,
    ctaHref,
    badge,
    titlePrefix,
    titleHighlight,
    titleSuffix,
    imageAlt
  },
  facilitiesSection{
    title,
    subtitle,
    facilities[]{
      _key,
      label,
      image{
        asset->{
          _id,
          url
        },
        hotspot,
        crop
      },
      externalImageUrl,
      alt
    }
  },
  whyChooseUsSection{
    titleLine1,
    titleLine2,
    intro,
    image{
      asset->{
        _id,
        url
      },
      hotspot,
      crop
    },
    externalImageUrl,
    imageAlt,
    reasons[]{
      _key,
      title,
      description
    }
  },
  programmesSection{
    title,
    subtitle,
    ctaLabel,
    ctaHref,
    teacherPrefix,
    fallbackTeacherName,
    learnMoreLabel
  },
  gallerySection{
    title,
    subtitle,
    images[]{
      _key,
      image{
        asset->{
          _id,
          url
        },
        hotspot,
        crop
      },
      externalImageUrl,
      alt
    }
  },
  testimonialsSection{
    title,
    subtitle
  },
  newsletterSection{
    title,
    subtitle,
    inputPlaceholder,
    buttonLabel,
    image{
      asset->{
        _id,
        url
      },
      hotspot,
      crop
    },
    externalImageUrl,
    imageAlt
  }
}`);

export const PAGE_A_PROPOS_QUERY = defineQuery(/* groq */ `*[_id == "pageAPropos"][0]{
  "seo": {
    "title": coalesce(seo.title, metaTitle),
    "description": coalesce(seo.description, metaDescription)
  },
  headerTitle,
  headerSubtitle,
  missionSection{
    label,
    title,
    body,
    extraBody,
    image{
      asset->{
        _id,
        url
      },
      hotspot,
      crop
    },
    externalImageUrl,
    ctaLabel,
    ctaHref,
    imageAlt
  },
  valuesSection{
    title,
    subtitle,
    values[]{
      _key,
      title,
      body
    }
  },
  teamSection{
    title,
    subtitle,
    ctaLabel,
    ctaHref
  }
}`);

export const PAGE_FORMATIONS_QUERY = defineQuery(/* groq */ `*[_id == "pageFormations"][0]{
  "seo": {
    "title": coalesce(seo.title, metaTitle),
    "description": coalesce(seo.description, metaDescription)
  },
  headerTitle,
  headerSubtitle,
  teacherPrefix,
  fallbackTeacherName,
  learnMoreLabel,
  detail{
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
}`);

export const PAGE_PROFESSEURS_QUERY = defineQuery(/* groq */ `*[_id == "pageProfesseurs"][0]{
  "seo": {
    "title": coalesce(seo.title, metaTitle),
    "description": coalesce(seo.description, metaDescription)
  },
  headerTitle,
  headerSubtitle,
  detail{
    notFoundTitle,
    notFoundDescription,
    taughtFormationsTitle,
    teacherPrefix,
    learnMoreLabel,
    profileLabel
  }
}`);

export const PAGE_CONTACT_QUERY = defineQuery(/* groq */ `*[_id == "pageContact"][0]{
  "seo": {
    "title": coalesce(seo.title, metaTitle),
    "description": coalesce(seo.description, metaDescription)
  },
  headerTitle,
  headerSubtitle,
  detailsTitle,
  formTitle,
  nameLabel,
  emailLabel,
  subjectLabel,
  messageLabel,
  submitLabel,
  contactInfo
}`);

export const ALL_FORMATIONS_QUERY = defineQuery(/* groq */ `*[_type == "formation"] | order(_createdAt asc){
  _id,
  title,
  "slug": slug.current,
  category,
  description,
  duration,
  objectives,
  image{
    asset->{
      _id,
      url
    },
    hotspot,
    crop
  },
  externalImageUrl,
  "teacher": teacher->{
    _id,
    name,
    "slug": slug.current,
    role,
    image{
      asset->{
        _id,
        url
      },
      hotspot,
      crop
    },
    externalImageUrl
  }
}`);

export const FORMATION_BY_SLUG_QUERY = defineQuery(/* groq */ `*[_type == "formation" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  category,
  description,
  duration,
  objectives,
  image{
    asset->{
      _id,
      url
    },
    hotspot,
    crop
  },
  externalImageUrl,
  "teacher": teacher->{
    _id,
    name,
    "slug": slug.current,
    role,
    bio,
    image{
      asset->{
        _id,
        url
      },
      hotspot,
      crop
    },
    externalImageUrl
  }
}`);

export const ALL_FORMATION_SLUGS_QUERY = defineQuery(/* groq */ `*[_type == "formation" && defined(slug.current)]{
  "slug": slug.current
}`);

export const ALL_PROFESSEURS_QUERY = defineQuery(/* groq */ `*[_type == "professeur"] | order(_createdAt asc){
  _id,
  name,
  "slug": slug.current,
  role,
  bio,
  image{
    asset->{
      _id,
      url
    },
    hotspot,
    crop
  },
  externalImageUrl,
  "formations": *[_type == "formation" && teacher._ref == ^._id]{
    _id,
    "slug": slug.current,
    title,
    category
  }
}`);

export const PROFESSEUR_BY_SLUG_QUERY = defineQuery(/* groq */ `*[_type == "professeur" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  role,
  bio,
  image{
    asset->{
      _id,
      url
    },
    hotspot,
    crop
  },
  externalImageUrl,
  "formations": *[_type == "formation" && teacher._ref == ^._id]{
    _id,
    title,
    "slug": slug.current,
    category,
    description,
    duration,
    objectives,
    image{
      asset->{
        _id,
        url
      },
      hotspot,
      crop
    },
    externalImageUrl,
    "teacher": {
      "_id": ^._id,
      "name": ^.name,
      "slug": ^.slug.current,
      "role": ^.role,
      "image": ^.image,
      "externalImageUrl": ^.externalImageUrl
    }
  }
}`);

export const ALL_PROFESSEUR_SLUGS_QUERY = defineQuery(/* groq */ `*[_type == "professeur" && defined(slug.current)]{
  "slug": slug.current
}`);

export const ALL_TEMOIGNAGES_QUERY = defineQuery(/* groq */ `*[_type == "temoignage"] | order(_createdAt asc){
  _id,
  quote,
  name,
  role,
  image{
    asset->{
      _id,
      url
    },
    hotspot,
    crop
  },
  externalImageUrl
}`);
