import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProfesseurCard from "@/components/ProfesseurCard";
import StatBar from "@/components/StatBar";
import { client, urlFor } from "@/lib/sanity";
import {
  ALL_PROFESSEURS_QUERY,
  PAGE_A_PROPOS_QUERY,
  PAGE_ACCUEIL_QUERY,
  PAGE_PROFESSEURS_QUERY,
} from "@/lib/queries";
import type { PageAPropos, PageAccueil, PageProfesseurs, Professeur } from "@/types";

const valueIcons = [
  <svg
    key="excellence"
    className="h-5 w-5 text-white"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden
  >
    <path d="m12 3 2.5 5 5.5.8-4 4 .9 5.6-4.9-2.6-4.9 2.6.9-5.6-4-4 5.5-.8L12 3Z" />
  </svg>,
  <svg
    key="accompagnement"
    className="h-5 w-5 text-white"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden
  >
    <path d="M8.5 12.5 6 15a2 2 0 0 1-2.8-2.8l4.2-4.2a3 3 0 0 1 4.2 0l1.4 1.4" />
    <path d="m15.5 11.5 2.5-2.5a2 2 0 1 1 2.8 2.8l-4.2 4.2a3 3 0 0 1-4.2 0L11 14.6" />
  </svg>,
  <svg
    key="innovation"
    className="h-5 w-5 text-white"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden
  >
    <path d="M9 18h6M10.5 21h3M12 2.5a6.5 6.5 0 0 0-4 11.6c.7.5 1 1.1 1 1.9h6c0-.8.3-1.4 1-1.9a6.5 6.5 0 0 0-4-11.6Z" />
  </svg>,
];

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await client.withConfig({ stega: false }).fetch<PageAPropos | null>(PAGE_A_PROPOS_QUERY);

  if (!pageData) {
    throw new Error("Page À propos document is missing in Sanity.");
  }

  return {
    title: pageData.seo.title,
    description: pageData.seo.description,
  };
}

export default async function AboutPage() {
  const [pageData, homeData, professeursPage, professeursData] = await Promise.all([
    client.fetch<PageAPropos | null>(PAGE_A_PROPOS_QUERY),
    client.fetch<PageAccueil | null>(PAGE_ACCUEIL_QUERY),
    client.fetch<PageProfesseurs | null>(PAGE_PROFESSEURS_QUERY),
    client.fetch<Professeur[]>(ALL_PROFESSEURS_QUERY),
  ]);

  if (!pageData || !homeData || !professeursPage) {
    throw new Error("Required page documents are missing in Sanity.");
  }

  const pageCopy = pageData;
  const aboutImageUrl = pageCopy.missionSection.image
    ? urlFor(pageCopy.missionSection.image).width(900).height(650).fit("crop").url()
    : pageCopy.missionSection.externalImageUrl ?? "";

  return (
    <div className="bg-[#f4f8fc]">
      <PageHeader
        title={pageCopy.headerTitle}
        subtitle={pageCopy.headerSubtitle}
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-sm font-medium text-blue-700">{pageCopy.missionSection.label}</p>
            <h2 className="mt-2 text-3xl font-semibold text-gray-900 sm:text-4xl">{pageCopy.missionSection.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">{pageCopy.missionSection.body}</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">{pageCopy.missionSection.extraBody}</p>
            <Link
              href={pageCopy.missionSection.ctaHref}
              className="mt-6 inline-flex rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {pageCopy.missionSection.ctaLabel}
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg">
            <Image
              src={aboutImageUrl}
              alt={pageCopy.missionSection.imageAlt}
              width={900}
              height={650}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-blue-700 py-20">
        <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-4xl font-semibold text-white">{pageCopy.valuesSection.title}</h2>
            <p className="mt-2 text-sm text-blue-200">{pageCopy.valuesSection.subtitle}</p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {pageCopy.valuesSection.values.map((value, index) => (
              <article
                key={value._key}
                className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  {valueIcons[index]}
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{value.title}</h3>
                <p className="mt-2 text-sm text-blue-100">{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-4xl font-semibold text-blue-900">{pageCopy.teamSection.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{pageCopy.teamSection.subtitle}</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {professeursData.map((professeur) => {
              const taught = professeur.formations.map((formation) => formation.title);

              return (
                <ProfesseurCard
                  key={professeur.slug}
                  professeur={professeur}
                  formationTitles={taught}
                  profileLabel={professeursPage.detail.profileLabel}
                />
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={pageCopy.teamSection.ctaHref}
              className="inline-flex rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
            >
              {pageCopy.teamSection.ctaLabel} →
            </Link>
          </div>
        </div>
      </section>

      <StatBar stats={homeData.stats} />
    </div>
  );
}
