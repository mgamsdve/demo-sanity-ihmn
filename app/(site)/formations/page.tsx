import type { Metadata } from "next";
import AnimatedGrid from "@/components/AnimatedGrid";
import FormationCard from "@/components/FormationCard";
import PageHeader from "@/components/PageHeader";
import { client } from "@/lib/sanity";
import { ALL_FORMATIONS_QUERY, PAGE_FORMATIONS_QUERY } from "@/lib/queries";
import type { Formation, PageFormations } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await client.withConfig({ stega: false }).fetch<PageFormations | null>(PAGE_FORMATIONS_QUERY);

  if (!pageData) {
    throw new Error("Page Formations document is missing in Sanity.");
  }

  return {
    title: pageData.seo.title,
    description: pageData.seo.description,
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
            return (
              <FormationCard
                key={formation.slug}
                formation={formation}
                teacherPrefix={pageCopy.teacherPrefix}
                fallbackTeacherName={pageCopy.fallbackTeacherName}
                learnMoreLabel={pageCopy.learnMoreLabel}
              />
            );
          })}
        </AnimatedGrid>
      </section>
    </div>
  );
}
