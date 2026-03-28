import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio | Académie Lumière",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
