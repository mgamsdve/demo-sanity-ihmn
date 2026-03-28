"use client";

import Link from "next/link";
import { useState } from "react";
import type { NavigationConfig } from "@/types";

interface SocialLinkItem {
  label: string;
  href: string;
}

interface NavbarProps {
  schoolName: string;
  navbar: NavigationConfig;
  socialLinks?: SocialLinkItem[];
}

export default function Navbar({ schoolName, navbar, socialLinks }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-280 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-900 text-white">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <path d="M12 3v18M4 12h16" />
                <path d="M7.5 7.5c2 2 2 7 0 9M16.5 7.5c-2 2-2 7 0 9" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-900 sm:text-base">
              {schoolName || navbar.brandName}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navbar.links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-sm font-medium text-gray-600 transition-colors hover:text-blue-700 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-700 after:content-[''] after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href={navbar.cta.href}
              className="inline-flex items-center gap-1 rounded bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
            >
              {navbar.cta.label}
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="m9 6 6 6-6 6" />
              </svg>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="text-blue-700 lg:hidden"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              {isMenuOpen ? (
                <path d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-60 bg-white transition-transform duration-300 ease-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex h-full w-full flex-col overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-900 text-white">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden
                >
                  <path d="M12 3v18M4 12h16" />
                  <path d="M7.5 7.5c2 2 2 7 0 9M16.5 7.5c-2 2-2 7 0 9" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-900 sm:text-base">
                {schoolName || navbar.brandName}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Fermer le menu"
              className="text-gray-900"
            >
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <nav className="mt-12 flex flex-1 flex-col">
            <div className="space-y-6">
              {navbar.links.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between text-[1.375rem] font-medium leading-none text-gray-900 transition-opacity duration-200 hover:text-blue-700 hover:opacity-80"
                  style={{
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? "translateY(0)" : "translateY(10px)",
                    transitionDelay: isMenuOpen ? `${120 + index * 70}ms` : "0ms",
                    transitionProperty: "opacity, transform, color",
                    transitionDuration: "300ms",
                    transitionTimingFunction: "ease-out",
                  }}
                >
                  <span>{item.label}</span>
                  <svg
                    className="h-6 w-6 shrink-0 text-gray-900"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden
                  >
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </Link>
              ))}
            </div>

            <div
              className="mt-12"
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? "translateY(0)" : "translateY(10px)",
                transitionDelay: isMenuOpen ? `${120 + navbar.links.length * 70}ms` : "0ms",
                transitionProperty: "opacity, transform",
                transitionDuration: "300ms",
                transitionTimingFunction: "ease-out",
              }}
            >
              <Link
                href={navbar.cta.href}
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
              >
                {navbar.cta.label}
              </Link>
            </div>

            {socialLinks && socialLinks.length > 0 ? (
              <div className="mt-auto pt-8">
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-500">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      className="transition-colors hover:text-blue-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {social.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </nav>
        </div>
      </div>
    </>
  );
}
