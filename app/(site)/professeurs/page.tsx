import type { Metadata } from "next";
import AnimatedGrid from "@/components/AnimatedGrid";
import PageHeader from "@/components/PageHeader";
import ProfesseurCard from "@/components/ProfesseurCard";
import { client } from "@/lib/sanity";
import { ALL_PROFESSEURS_QUERY, PAGE_PROFESSEURS_QUERY } from "@/lib/queries";
import type { PageProfesseurs, Professeur } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await client.withConfig({ stega: false }).fetch<PageProfesseurs | null>(PAGE_PROFESSEURS_QUERY);

  if (!pageData) {
    throw new Error("Page Professeurs document is missing in Sanity.");
  }

  return {
    title: pageData.seo.title,
    description: pageData.seo.description,
  };
}

export default async function ProfesseursPage() {
  const [pageData, professeursData] = await Promise.all([
    client.fetch<PageProfesseurs | null>(PAGE_PROFESSEURS_QUERY),
    client.fetch<Professeur[]>(ALL_PROFESSEURS_QUERY),
  ]);

  if (!pageData) {
    throw new Error("Page Professeurs document is missing in Sanity.");
  }

  const pageCopy = pageData;

  return (
    <div className="bg-[#f4f8fc]">
      <PageHeader
        title={pageCopy.headerTitle}
        subtitle={pageCopy.headerSubtitle}
      />

      <section className="mx-auto max-w-[1120px] px-4 py-14 sm:px-6">
        <AnimatedGrid className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 [&>div]:flex [&>div]:h-full [&>div>article]:h-full">
          {professeursData.map((professeur) => {
            const taught = professeur.formations.map((formation) => formation.title);

            return (
              <ProfesseurCard
                key={professeur.slug}
                professeur={professeur}
                formationTitles={taught}
                profileLabel={pageData.detail.profileLabel}
              />
            );
          })}
        </AnimatedGrid>
      </section>
    </div>
  );
}
