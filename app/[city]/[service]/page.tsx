import { notFound } from "next/navigation";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTAButtons from "@/components/CTAButtons";
import Calculator from "@/components/Calculator";
import FAQ from "@/components/FAQ";
import RelatedLinks from "@/components/RelatedLinks";
import SchemaMarkup from "@/components/SchemaMarkup";
import {
  getAllPages,
  getCity,
  getService,
  getRelatedServices,
  getOtherCities,
  generatePageFAQ,
} from "@/lib/data";
import { generatePageContent } from "@/lib/content";
import {
  buildPageMetadata,
  buildBreadcrumbs,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import { formatPrice } from "@/lib/constants";
import { withBase } from "@/lib/paths";

interface PageProps {
  params: Promise<{ city: string; service: string }>;
}

export async function generateStaticParams() {
  return getAllPages();
}

export async function generateMetadata({ params }: PageProps) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city || !service) return {};
  return buildPageMetadata(city, service);
}

export default async function ServicePage({ params }: PageProps) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);

  if (!city || !service) notFound();

  const content = generatePageContent(city, service);
  const faq = generatePageFAQ(city, service);
  const relatedServices = getRelatedServices(service.slug);
  const otherCities = getOtherCities(city.slug);
  const breadcrumbs = buildBreadcrumbs(city, service);

  return (
    <>
      <SchemaMarkup
        data={[
          serviceSchema(city, service),
          faqSchema(faq),
          breadcrumbSchema(breadcrumbs),
        ]}
      />

      <article>
        <div className="relative bg-graphite py-16 md:py-20">
          <div className="container-main">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: city.name, href: `/${city.slug}/zabory-pod-klyuch` },
                { label: service.name },
              ]}
            />
            <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {content.h1}
            </h1>
            <p className="mb-6 max-w-2xl text-lg text-gray-300">{content.intro}</p>
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-accent">
                от {formatPrice(service.priceFrom)} ₽
              </span>
              <span className="text-gray-400">/ {service.unit}</span>
            </div>
            <CTAButtons showCalculate />
          </div>
        </div>

        <div className="container-main py-12">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="relative mb-8 h-64 overflow-hidden rounded-2xl md:h-80">
                <Image
                  src={withBase(service.image)}
                  alt={`${service.name} в ${city.nameIn}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>

              {content.blocks.map((block, i) => (
                <section key={i} className="mb-8">
                  <h2 className="mb-3 text-xl font-bold text-graphite">{block.title}</h2>
                  {block.paragraphs.map((p, j) => (
                    <p key={j} className="mb-3 leading-relaxed text-gray-600">
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-4 font-bold text-graphite">Заказать в {city.nameIn}</h3>
                <ul className="mb-4 space-y-2 text-sm text-gray-600">
                  <li>✓ Бесплатный выезд замерщика</li>
                  <li>✓ Доставка за {city.deliveryDays} дн.</li>
                  <li>✓ Гарантия до 10 лет</li>
                  <li>✓ Договор и смета</li>
                </ul>
                <CTAButtons className="flex-col [&>a]:w-full" />
              </div>

              <div className="rounded-2xl border border-gray-200 p-6">
                <h3 className="mb-3 font-bold text-graphite">О городе</h3>
                <p className="text-sm text-gray-600">
                  {city.name} — {city.region}, население {city.population}.
                  {city.localFeature.charAt(0).toUpperCase() + city.localFeature.slice(1)}.
                </p>
              </div>
            </aside>
          </div>
        </div>

        <Calculator />
        <FAQ items={faq} title={`Вопросы о ${service.name.toLowerCase()} в ${city.nameIn}`} />
        <RelatedLinks
          city={city}
          service={service}
          relatedServices={relatedServices}
          otherCities={otherCities}
        />
      </article>
    </>
  );
}
