import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AnimatedSectionTitle from "@/components/AnimatedSectionTitle";
import FormationCard from "@/components/FormationCard";
import StatBar from "@/components/StatBar";
import { client, urlFor } from "@/lib/sanity";
import {
  ALL_FORMATIONS_QUERY,
  ALL_TEMOIGNAGES_QUERY,
  PAGE_ACCUEIL_QUERY,
} from "@/lib/queries";
import type { Formation, PageAccueil, Temoignage } from "@/types";

const introIcons = [
  <svg key="vision" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M1.5 12S5.5 5.5 12 5.5 22.5 12 22.5 12 18.5 18.5 12 18.5 1.5 12 1.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  <svg key="mission" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" />
  </svg>,
  <svg key="approach" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M9 18h6M10.5 21h3M12 2.5a6.5 6.5 0 0 0-4 11.6c.7.5 1 1.1 1 1.9h6c0-.8.3-1.4 1-1.9a6.5 6.5 0 0 0-4-11.6Z" />
  </svg>,
];

const reasonIcons = [
  <svg key="experts" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="m3 9 9-4 9 4-9 4-9-4Z" />
  </svg>,
  <svg key="pedagogy" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M4 4h16v10H4z" />
    <path d="M10 20h4" />
  </svg>,
  <svg key="hybrid" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M4 5h16v14H4z" />
    <path d="m8 9 4 3 4-3" />
  </svg>,
  <svg key="life" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
  </svg>,
  <svg key="paths" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M4 18h16" />
    <path d="M6 14h4M14 10h4M10 6h4" />
  </svg>,
  <svg key="results" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M4 19V5M4 19h16" />
    <path d="m7 14 4-4 3 3 4-5" />
  </svg>,
];

export async function generateMetadata(): Promise<Metadata> {
  const pageAccueil = await client.withConfig({ stega: false }).fetch<PageAccueil | null>(PAGE_ACCUEIL_QUERY);

  if (!pageAccueil) {
    throw new Error("Page Accueil document is missing in Sanity.");
  }

  return {
    title: pageAccueil.seo.title,
    description: pageAccueil.seo.description,
  };
}

export default async function HomePage() {
  const [homeData, formationsData, temoignagesData] = await Promise.all([
    client.fetch<PageAccueil | null>(PAGE_ACCUEIL_QUERY),
    client.fetch<Formation[]>(ALL_FORMATIONS_QUERY),
    client.fetch<Temoignage[]>(ALL_TEMOIGNAGES_QUERY),
  ]);

  if (!homeData) {
    throw new Error("Page Accueil document is missing in Sanity.");
  }

  const homeCopy = homeData;
  const heroImageUrl = homeCopy.hero.image
    ? urlFor(homeCopy.hero.image).width(1600).height(1000).fit("crop").url()
    : homeCopy.hero.externalImageUrl ?? "";

  const aboutImageUrl = homeCopy.aboutSection.image
    ? urlFor(homeCopy.aboutSection.image).width(900).height(620).fit("crop").url()
    : homeCopy.aboutSection.externalImageUrl ?? "";
  const whyChooseImageUrl = homeCopy.whyChooseUsSection.image
    ? urlFor(homeCopy.whyChooseUsSection.image).width(900).height(500).fit("crop").url()
    : homeCopy.whyChooseUsSection.externalImageUrl ?? "";
  const newsletterImageUrl = homeCopy.newsletterSection.image
    ? urlFor(homeCopy.newsletterSection.image).width(1600).height(420).fit("crop").url()
    : homeCopy.newsletterSection.externalImageUrl ?? "";
  const facilityImageUrl = (index: number, width: number, height: number) => {
    const facility = homeCopy.facilitiesSection.facilities[index];
    return facility?.image
      ? urlFor(facility.image).width(width).height(height).fit("crop").url()
      : facility?.externalImageUrl ?? "";
  };
  const galleryImageUrl = (index: number, width: number, height: number) => {
    const item = homeCopy.gallerySection.images[index];
    return item?.image
      ? urlFor(item.image).width(width).height(height).fit("crop").url()
      : item?.externalImageUrl ?? "";
  };

  const [line1, line2] = homeCopy.hero.headline.split("\n");

  return (
    <div className="bg-[#f4f8fc]">
      <section className="relative w-full overflow-hidden">
        <div className="relative min-h-[85vh]">
          <Image
            src={heroImageUrl}
            alt={homeCopy.hero.headline}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="absolute inset-0 z-10 flex flex-col justify-end">
            <div className="mx-auto w-full max-w-7xl px-8 pb-20 lg:px-16">
              <h1 className="max-w-2xl text-5xl font-extrabold leading-tight text-white animate-fade-in-up lg:text-7xl">
                {line1}
                <br />
                {line2}
              </h1>
              <p className="mt-4 max-w-md text-sm text-white/90 animate-fade-in-up-delay sm:text-base">
                {homeCopy.hero.subheadline}
              </p>
              <div className="mt-7 flex flex-wrap gap-3 animate-fade-in-up-delay-2">
                <Link
                  href={homeCopy.hero.ctaPrimary.href}
                  className="rounded bg-blue-700 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-900 lg:px-8 lg:py-4 lg:text-base"
                >
                  {homeCopy.hero.ctaPrimary.label}
                </Link>
                <Link
                  href={homeCopy.hero.ctaSecondary.href}
                  className="rounded bg-white px-4 py-2.5 text-xs font-semibold text-gray-800 transition-colors hover:bg-gray-100 lg:px-8 lg:py-4 lg:text-base"
                >
                  {homeCopy.hero.ctaSecondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 pt-8 pb-12 sm:px-6">
        <AnimatedSectionTitle>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {homeCopy.introCards.map((item, index) => (
            <article
              key={item._key}
              className="rounded-xl border border-[#dbe6f0] bg-white px-6 py-7 shadow-[0_8px_20px_rgba(16,24,40,0.06)]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                {introIcons[index]}
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">{item.title}</h2>
              <div className="mt-3 h-0.5 w-10 bg-gray-300" />
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.body}</p>
            </article>
          ))}
          </div>
        </AnimatedSectionTitle>
      </section>

      <StatBar stats={homeCopy.stats} />

      <section className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="overflow-hidden rounded-lg">
              <Image
                src={aboutImageUrl}
                alt={homeCopy.aboutSection.imageAlt}
                width={900}
              height={620}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <AnimatedSectionTitle>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium text-blue-700">{homeCopy.aboutSection.badge}</p>
              <h2 className="mt-2 text-4xl font-semibold leading-tight text-gray-900">
                {homeCopy.aboutSection.titlePrefix} <span className="text-blue-700">{homeCopy.aboutSection.titleHighlight}</span> {homeCopy.aboutSection.titleSuffix}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">{homeCopy.aboutSection.body}</p>
              <Link href={homeCopy.aboutSection.ctaHref} className="mt-6 inline-flex w-fit rounded border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
                {homeCopy.aboutSection.ctaLabel}
              </Link>
            </div>
          </AnimatedSectionTitle>
        </div>
      </section>

      <section className="bg-[#eaf2f9] py-16">
        <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
          <AnimatedSectionTitle>
            <div className="text-center">
              <h2 className="text-4xl font-semibold text-blue-900">{homeCopy.facilitiesSection.title}</h2>
              <p className="mt-2 text-sm text-gray-600">
                {homeCopy.facilitiesSection.subtitle}
              </p>
            </div>
          </AnimatedSectionTitle>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
            <article className="group relative row-span-2 min-h-[320px] overflow-hidden rounded-2xl">
              <Image
                src={facilityImageUrl(0, 600, 900)}
                alt={homeCopy.facilitiesSection.facilities[0]?.alt ?? homeCopy.facilitiesSection.facilities[0]?.label ?? ""}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <p className="absolute bottom-3 left-3 text-sm font-semibold text-white">{homeCopy.facilitiesSection.facilities[0]?.label}</p>
            </article>

            {homeCopy.facilitiesSection.facilities.slice(1, 5).map((facility) => (
              <article key={facility._key} className="group relative h-[150px] overflow-hidden rounded-2xl">
                <Image
                  src={facility.image ? urlFor(facility.image).width(600).height(300).fit("crop").url() : facility.externalImageUrl ?? ""}
                  alt={facility.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <p className="absolute bottom-3 left-3 text-sm font-semibold text-white">{facility.label}</p>
              </article>
            ))}

            <article className="group relative col-span-2 h-[150px] overflow-hidden rounded-2xl lg:col-span-3">
              <Image
                src={facilityImageUrl(5, 1200, 300)}
                alt={homeCopy.facilitiesSection.facilities[5]?.alt ?? homeCopy.facilitiesSection.facilities[5]?.label ?? ""}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <p className="absolute bottom-3 left-3 text-sm font-semibold text-white">{homeCopy.facilitiesSection.facilities[5]?.label}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-9 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <AnimatedSectionTitle>
              <div>
                <h2 className="text-4xl font-semibold leading-tight text-gray-900">
                   {homeCopy.whyChooseUsSection.titleLine1}
                   <br />
                   {homeCopy.whyChooseUsSection.titleLine2}
                 </h2>
               </div>
             </AnimatedSectionTitle>
             <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {homeCopy.whyChooseUsSection.reasons.map((reason, index) => (
                <div key={reason._key} className="flex gap-3">
                  <div className="mt-0.5 text-blue-700">{reasonIcons[index]}</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{reason.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
             <p className="text-sm leading-relaxed text-gray-600">
               {homeCopy.whyChooseUsSection.intro}
             </p>
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src={whyChooseImageUrl}
                 alt={homeCopy.whyChooseUsSection.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eaf2f9] py-16">
        <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
          <AnimatedSectionTitle>
            <div className="text-center">
              <h2 className="text-4xl font-semibold text-blue-900">{homeCopy.programmesSection.title}</h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600">
                {homeCopy.programmesSection.subtitle}
              </p>
            </div>
          </AnimatedSectionTitle>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {formationsData.slice(0, 3).map((formation) => {
              return (
                <FormationCard
                  key={formation.slug}
                  formation={formation}
                  teacherPrefix={homeCopy.programmesSection.teacherPrefix}
                  fallbackTeacherName={homeCopy.programmesSection.fallbackTeacherName}
                  learnMoreLabel={homeCopy.programmesSection.learnMoreLabel}
                />
              );
            })}
          </div>
          <div className="text-center">
            <Link
              href={homeCopy.programmesSection.ctaHref}
              className="mt-10 inline-block rounded-lg border border-blue-700 px-6 py-3 font-medium text-blue-700 transition-colors hover:bg-blue-700 hover:text-white"
            >
              {homeCopy.programmesSection.ctaLabel} →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
        <AnimatedSectionTitle>
          <div className="text-center">
               <h2 className="text-4xl font-semibold text-blue-900">{homeCopy.gallerySection.title}</h2>
               <p className="mt-2 text-sm text-gray-600">{homeCopy.gallerySection.subtitle}</p>
            </div>
          </AnimatedSectionTitle>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="group relative h-[260px] overflow-hidden rounded-2xl md:col-span-2">
            <Image src={galleryImageUrl(0, 1200, 700)} alt={homeCopy.gallerySection.images[0]?.alt ?? ""} fill sizes="(min-width: 768px) 66vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          </div>
          <div className="group relative h-[260px] overflow-hidden rounded-2xl">
            <Image src={galleryImageUrl(1, 600, 700)} alt={homeCopy.gallerySection.images[1]?.alt ?? ""} fill sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          </div>
          <div className="group relative h-[260px] overflow-hidden rounded-2xl">
            <Image src={galleryImageUrl(2, 600, 700)} alt={homeCopy.gallerySection.images[2]?.alt ?? ""} fill sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          </div>
          <div className="group relative h-[260px] overflow-hidden rounded-2xl">
            <Image src={galleryImageUrl(3, 600, 700)} alt={homeCopy.gallerySection.images[3]?.alt ?? ""} fill sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          </div>
          <div className="group relative h-[260px] overflow-hidden rounded-2xl md:col-span-2 lg:h-[260px]">
            <Image src={galleryImageUrl(4, 1200, 700)} alt={homeCopy.gallerySection.images[4]?.alt ?? ""} fill sizes="(min-width: 768px) 66vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          </div>
          <div className="group relative h-[260px] overflow-hidden rounded-2xl">
            <Image src={galleryImageUrl(5, 600, 700)} alt={homeCopy.gallerySection.images[5]?.alt ?? ""} fill sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          </div>
        </div>
      </section>

      <section className="bg-[#eaf2f9] py-16">
        <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
          <AnimatedSectionTitle>
            <div className="text-center">
              <h2 className="text-4xl font-semibold text-blue-900">{homeCopy.testimonialsSection.title}</h2>
              <p className="mt-2 text-sm text-gray-600">
                {homeCopy.testimonialsSection.subtitle}
              </p>
            </div>
          </AnimatedSectionTitle>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {temoignagesData.map((temoignage) => {
              const temoignageImageUrl = temoignage.image
                ? urlFor(temoignage.image).width(80).height(80).fit("crop").url()
                : temoignage.externalImageUrl ?? "";

              return (
                <article key={temoignage._id} className="rounded-xl border border-[#dbe6f0] bg-white p-6 shadow-[0_8px_20px_rgba(16,24,40,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl will-change-transform">
                  <p className="text-sm italic leading-relaxed text-gray-600">&ldquo;{temoignage.quote}&rdquo;</p>
                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{temoignage.name}</p>
                      <p className="text-xs text-gray-500">{temoignage.role}</p>
                    </div>
                    <Image
                      src={temoignageImageUrl}
                      alt={temoignage.name}
                      width={44}
                      height={44}
                      sizes="44px"
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 py-14 sm:px-6">
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src={newsletterImageUrl}
            alt={homeCopy.newsletterSection.imageAlt}
            width={1600}
            height={420}
            sizes="(min-width: 1120px) 1120px, 100vw"
            className="h-48 w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
             <h3 className="text-center text-xl font-semibold text-white">{homeCopy.newsletterSection.title}</h3>
             <p className="mt-1 text-center text-sm text-white/80">{homeCopy.newsletterSection.subtitle}</p>
             <form className="mt-5 flex w-full max-w-lg overflow-hidden rounded-full bg-white p-1 shadow-lg">
               <input
                 type="email"
                 placeholder={homeCopy.newsletterSection.inputPlaceholder}
                 className="flex-1 bg-transparent px-4 text-sm text-gray-800 outline-none"
               />
               <button
                 type="button"
                 className="rounded-full bg-blue-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
               >
                 {homeCopy.newsletterSection.buttonLabel}
               </button>
             </form>
          </div>
        </div>
      </section>
    </div>
  );
}
