"use client";

import { useState } from "react";
import Image from "next/image";
import type { Temoignage } from "@/types";
import { urlFor } from "@/lib/sanity";

interface TestimonialSliderProps {
  temoignages: Temoignage[];
  prevLabel: string;
  nextLabel: string;
}

export default function TestimonialSlider({ temoignages, prevLabel, nextLabel }: TestimonialSliderProps) {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((current) =>
      current === 0 ? temoignages.length - 1 : current - 1,
    );
  };

  const next = () => {
    setIndex((current) =>
      current === temoignages.length - 1 ? 0 : current + 1,
    );
  };

  const temoignage = temoignages[index];
  const temoignageImageUrl = temoignage.image
    ? urlFor(temoignage.image).width(80).height(80).fit("crop").url()
    : temoignage.externalImageUrl ?? "";

  return (
    <div className="rounded-xl bg-gray-50 p-6">
      <p className="text-5xl font-serif leading-none text-blue-200">&ldquo;</p>
      <p className="mt-2 text-sm italic leading-relaxed text-gray-600">{temoignage.quote}</p>
      <div className="mt-4 flex items-center gap-3">
        <Image
          src={temoignageImageUrl}
          alt={temoignage.name}
          width={40}
          height={40}
          sizes="40px"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">{temoignage.name}</p>
          <p className="text-xs text-gray-400">{temoignage.role}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={prev}
          className="rounded-md border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600"
        >
          {prevLabel}
        </button>
        <button
          type="button"
          onClick={next}
          className="rounded-md bg-blue-700 px-3 py-2 text-xs font-semibold text-white"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
