import Image from "next/image";
import Link from "next/link";
import { FALLBACK_IMAGE_URL, urlFor } from "@/lib/sanity";
import type { Formation } from "@/types";

interface FormationCardProps {
  formation: Formation;
  teacherPrefix: string;
  fallbackTeacherName: string;
  learnMoreLabel: string;
  teacherName?: string;
}

export default function FormationCard({
  formation,
  teacherPrefix,
  fallbackTeacherName,
  learnMoreLabel,
  teacherName,
}: FormationCardProps) {
  const formationImageUrl = formation.image
    ? urlFor(formation.image).width(600).height(320).fit("crop").url()
    : formation.externalImageUrl ?? FALLBACK_IMAGE_URL;
  const teacher = formation.teacher;

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl will-change-transform">
      <Image
        src={formationImageUrl}
        alt={formation.title}
        width={600}
        height={320}
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="h-48 w-full object-cover"
      />
      <div className="p-5">
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700 uppercase">
          {formation.category}
        </span>
        <h2 className="mt-3 text-xl font-bold text-gray-900">{formation.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm text-gray-500">{formation.description}</p>
        <div className="mt-4 border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-400">
            {teacherPrefix} · {teacherName ?? teacher?.name ?? fallbackTeacherName}
          </p>
          <Link
            href={`/formations/${formation.slug}`}
            className="mt-1 inline-block text-sm font-medium text-blue-700 hover:underline"
          >
            {learnMoreLabel} →
          </Link>
        </div>
      </div>
    </article>
  );
}
