import Link from "next/link";
import type { FooterConfig } from "@/types";

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-gray-700 transition-colors hover:text-blue-700">{children}</span>
  );
}

const socialIcons: Record<string, React.ReactNode> = {
  Facebook: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.4 0-4 1.5-4 4.2v2.4H7.5v3.2h2.8V21h3.2Z" />
    </svg>
  ),
  Twitter: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21 6.5c-.6.3-1.3.4-2 .5.7-.4 1.2-1.1 1.5-1.9-.7.4-1.4.7-2.2.9A3.5 3.5 0 0 0 12.4 9c0 .3 0 .6.1.8-2.9-.1-5.4-1.6-7.2-3.8-.3.5-.5 1.1-.5 1.8 0 1.2.6 2.3 1.6 3-.6 0-1.2-.2-1.7-.4v.1c0 1.7 1.2 3.1 2.8 3.4-.3.1-.6.1-.9.1-.2 0-.4 0-.7-.1.4 1.4 1.8 2.4 3.4 2.4A7.1 7.1 0 0 1 4 18.1a10 10 0 0 0 5.4 1.6c6.5 0 10.1-5.4 10.1-10.1v-.5c.7-.5 1.2-1.1 1.6-1.8Z" />
    </svg>
  ),
  LinkedIn: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.2 8.3a1.9 1.9 0 1 1 0-3.7 1.9 1.9 0 0 1 0 3.7ZM4.5 9.8h3.4V20H4.5V9.8Zm5.5 0h3.3v1.4h.1c.5-.9 1.6-1.8 3.2-1.8 3.5 0 4.1 2.3 4.1 5.2V20h-3.4v-4.7c0-1.1 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V20H10V9.8Z" />
    </svg>
  ),
  Instagram: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7.8 3h8.4A4.8 4.8 0 0 1 21 7.8v8.4a4.8 4.8 0 0 1-4.8 4.8H7.8A4.8 4.8 0 0 1 3 16.2V7.8A4.8 4.8 0 0 1 7.8 3Zm0 1.8A3 3 0 0 0 4.8 7.8v8.4a3 3 0 0 0 3 3h8.4a3 3 0 0 0 3-3V7.8a3 3 0 0 0-3-3H7.8Zm8.9 1.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7.8A4.2 4.2 0 1 1 7.8 12 4.2 4.2 0 0 1 12 7.8Zm0 1.8a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Z" />
    </svg>
  ),
};

interface FooterProps {
  footer: FooterConfig;
}

export default function Footer({ footer }: FooterProps) {
  return (
    <footer className="border-t border-[#dbe6f0] bg-[#ecf3f9] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-[1120px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M12 3v18M4 12h16" />
                  <path d="M7.5 7.5c2 2 2 7 0 9M16.5 7.5c-2 2-2 7 0 9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{footer.brandName}</h3>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-600">{footer.description}</p>
            <div className="mt-5 flex items-center gap-4">
              {footer.socialLinks.map((social) => (
                <Link key={social.label} href={social.href} aria-label={social.label}>
                  <SocialIcon>{socialIcons[social.label] ?? socialIcons.Facebook}</SocialIcon>
                </Link>
              ))}
            </div>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-3 text-sm font-semibold text-gray-900">{column.title}</h4>
              {column.links.map((link) => (
                <Link key={`${column.title}-${link.label}`} href={link.href} className="block py-1 text-sm text-gray-600 hover:text-blue-700">
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-[#d3dfeb] pt-4">
          <Link href="/studio" className="text-xs text-gray-400 hover:text-blue-700 transition-colors">
            Studio ↗
          </Link>
          <p className="text-xs text-gray-600">{footer.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
