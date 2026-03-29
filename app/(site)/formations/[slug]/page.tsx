import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllFormationSlugs,
  getFormationBySlug,
  getPageFormations,
} from "@/lib/data";
import { FALLBACK_IMAGE_URL, urlFor } from "@/lib/sanity";

interface FormationDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllFormationSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: FormationDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [pageData, formation] = await Promise.all([
    getPageFormations(),
    getFormationBySlug(slug),
  ]);

  if (!pageData) {
    throw new Error("Page Formations document is missing in Sanity.");
  }

  if (!formation) {
    return {
      title: pageData.seo.title,
      description: pageData.seo.description,
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
    getPageFormations(),
    getFormationBySlug(slug),
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
    ? urlFor(formation.image).width(900).height(450).fit("crop").url()
    : formation.externalImageUrl ?? FALLBACK_IMAGE_URL;
  const professeurImageUrl = professeur.image
    ? urlFor(professeur.image).width(128).height(128).fit("crop").url()
    : professeur.externalImageUrl ?? FALLBACK_IMAGE_URL;
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
              className="mt-4 h-[72px] w-[72px] rounded-full object-cover"
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
