import type { Metadata } from "next";
import FormationCard from "@/components/FormationCard";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getAllProfesseurSlugs,
  getPageProfesseurs,
  getProfesseurBySlug,
} from "@/lib/data";
import { FALLBACK_IMAGE_URL, urlFor } from "@/lib/sanity";

interface ProfesseurDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProfesseurSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProfesseurDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [pageData, professeur] = await Promise.all([
    getPageProfesseurs(),
    getProfesseurBySlug(slug),
  ]);

  if (!pageData) {
    throw new Error("Page Professeurs document is missing in Sanity.");
  }

  if (!professeur) {
    return {
      title: pageData.seo.title,
      description: pageData.seo.description,
    };
  }

  return {
    title: professeur.name,
    description: professeur.bio,
  };
}

export default async function ProfesseurDetailPage({
  params,
}: ProfesseurDetailPageProps) {
  const { slug } = await params;
  const [pageData, professeur] = await Promise.all([
    getPageProfesseurs(),
    getProfesseurBySlug(slug),
  ]);

  if (!pageData) {
    throw new Error("Page Professeurs document is missing in Sanity.");
  }

  if (!professeur) {
    notFound();
  }

  const formations = professeur.formations;
  const pageCopy = pageData.detail;
  const professeurImageUrl = professeur.image
    ? urlFor(professeur.image).width(128).height(128).fit("crop").url()
    : professeur.externalImageUrl ?? FALLBACK_IMAGE_URL;

  return (
    <div className="bg-[#f4f8fc]">
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            <div className="relative h-32 w-32 flex-shrink-0">
            <Image
              src={professeurImageUrl}
              alt={professeur.name}
              width={128}
              height={128}
              sizes="128px"
                className="h-32 w-32 rounded-full object-cover ring-4 ring-white/30"
            />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">{professeur.name}</h1>
              <p className="mt-1 text-lg font-medium text-blue-400">{professeur.role}</p>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-300">
                {professeur.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">{pageCopy.taughtFormationsTitle}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {formations.map((formation) => {
              return (
                <FormationCard
                  key={formation.slug}
                  formation={formation}
                  teacherPrefix={pageCopy.teacherPrefix}
                  fallbackTeacherName={professeur.name}
                  teacherName={professeur.name}
                  learnMoreLabel={pageCopy.learnMoreLabel}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
