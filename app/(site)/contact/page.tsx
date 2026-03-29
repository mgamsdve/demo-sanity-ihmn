import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { getPageContact } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageContact();

  if (!pageData) {
    throw new Error("Page Contact document is missing in Sanity.");
  }

  return {
    title: pageData.seo.title,
    description: pageData.seo.description,
  };
}

export default async function ContactPage() {
  const pageData = await getPageContact();

  if (!pageData) {
    throw new Error("Page Contact document is missing in Sanity.");
  }

  const pageCopy = pageData;

  return (
    <div className="bg-[#f4f8fc]">
      <PageHeader
        title={pageCopy.headerTitle}
        subtitle={pageCopy.headerSubtitle}
      />

      <section className="mx-auto grid max-w-[1120px] grid-cols-1 gap-7 px-4 pt-12 pb-14 sm:px-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-7 shadow-[0_8px_24px_rgba(16,24,40,0.05)]">
          <h2 className="text-2xl font-semibold text-gray-900">{pageCopy.detailsTitle}</h2>

          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <path d="M12 21s6-4.8 6-10a6 6 0 1 0-12 0c0 5.2 6 10 6 10Z" />
                <circle cx="12" cy="11" r="2.3" />
              </svg>
              <p className="text-sm text-gray-600">{pageData.contactInfo.address}</p>
            </div>
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <rect x="3" y="5.5" width="18" height="13" rx="2" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              <p className="text-sm text-gray-600">{pageData.contactInfo.email}</p>
            </div>
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <path d="M7.6 3.8a1.8 1.8 0 0 1 2.1 1.1l.9 2.3a1.8 1.8 0 0 1-.4 1.9L8.8 10.4a13.2 13.2 0 0 0 4.8 4.8l1.3-1.4a1.8 1.8 0 0 1 1.9-.4l2.3.9a1.8 1.8 0 0 1 1.1 2.1l-.4 2a1.8 1.8 0 0 1-1.8 1.4C10.4 19.8 4.2 13.6 4.2 6a1.8 1.8 0 0 1 1.4-1.8l2-.4Z" />
              </svg>
              <p className="text-sm text-gray-600">{pageData.contactInfo.phone}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-7 shadow-[0_8px_24px_rgba(16,24,40,0.05)]">
          <h2 className="text-2xl font-semibold text-gray-900">{pageCopy.formTitle}</h2>
          <form className="mt-5">
            <label className="mt-0 block text-sm font-medium text-gray-700" htmlFor="name">
              {pageCopy.nameLabel}
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <label className="mt-4 block text-sm font-medium text-gray-700" htmlFor="email">
              {pageCopy.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <label className="mt-4 block text-sm font-medium text-gray-700" htmlFor="subject">
              {pageCopy.subjectLabel}
            </label>
            <input
              id="subject"
              type="text"
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <label className="mt-4 block text-sm font-medium text-gray-700" htmlFor="message">
              {pageCopy.messageLabel}
            </label>
            <textarea
              id="message"
              className="mt-1 h-32 w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <button
              type="button"
              className="mt-6 block w-full rounded bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
            >
              {pageCopy.submitLabel}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
