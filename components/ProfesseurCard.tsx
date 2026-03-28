import Image from "next/image";
import Link from "next/link";
import type { Professeur } from "@/types";
import { urlFor } from "@/lib/sanity";

interface ProfesseurCardProps {
  professeur: Professeur;
  formationTitles: string[];
  profileLabel: string;
}

export default function ProfesseurCard({
  professeur,
  formationTitles,
  profileLabel,
}: ProfesseurCardProps) {
  const professeurImageUrl = professeur.image
    ? urlFor(professeur.image).width(400).height(400).fit("crop").url()
    : professeur.externalImageUrl ?? "";

  return (
    <article className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl will-change-transform">
      <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full ring-4 ring-blue-100">
        <Image
          src={professeurImageUrl}
          alt={professeur.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <h3 className="text-lg font-bold text-gray-900">{professeur.name}</h3>
      <p className="mt-1 text-sm leading-snug font-medium text-blue-700">{professeur.role}</p>

      <p className="mt-4 w-full line-clamp-3 text-left text-sm leading-relaxed text-gray-500">
        {professeur.bio}
      </p>

      <div className="mt-4 w-full border-t border-gray-100 pt-4">
        <div className="flex flex-wrap justify-center gap-2">
          {formationTitles.map((title) => (
            <span
              key={title}
              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
            >
              {title}
            </span>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link
            href={`/professeurs/${professeur.slug}`}
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            {profileLabel} →
          </Link>
        </div>
      </div>
    </article>
  );
}
