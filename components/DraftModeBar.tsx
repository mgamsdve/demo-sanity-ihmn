'use client'

import Link from "next/link";

export default function DraftModeBar() {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex items-center gap-3 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-lg">
      <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
      Mode prévisualisation actif
      <Link
        href="/api/draft-mode/disable"
        className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-900 hover:bg-gray-100"
      >
        Quitter
      </Link>
    </div>
  );
}
