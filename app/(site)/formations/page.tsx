import type { Metadata } from "next";
import AnimatedGrid from "@/components/AnimatedGrid";
import FormationCard from "@/components/FormationCard";
import PageHeader from "@/components/PageHeader";
import { getAllFormations, getPageFormations } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageFormations();

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
    getPageFormations(),
    getAllFormations(),
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
