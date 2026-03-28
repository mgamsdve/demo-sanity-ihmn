interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-blue-900 to-blue-700 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl leading-tight font-bold text-white md:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-blue-200">{subtitle}</p>
      </div>
    </section>
  );
}
