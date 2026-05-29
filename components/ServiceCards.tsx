import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/data";
import { formatPrice } from "@/lib/constants";
import { withBase } from "@/lib/paths";

interface ServiceCardsProps {
  services: Service[];
  citySlug?: string;
}

export default function ServiceCards({ services, citySlug = "saransk" }: ServiceCardsProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="container-main">
        <h2 className="section-title mb-2 text-center">Наши услуги</h2>
        <p className="mb-10 text-center text-gray-600">
          Заборы, ворота и монтаж — всё под ключ с гарантией
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src={withBase(service.image)}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-lg font-bold text-graphite">{service.name}</h3>
                <p className="mb-3 text-sm text-gray-600 line-clamp-2">{service.description}</p>
                <p className="mb-4 text-lg font-semibold text-accent">
                  от {formatPrice(service.priceFrom)} ₽/{service.unit}
                </p>
                <Link
                  href={`/${citySlug}/${service.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-graphite hover:text-accent"
                >
                  Подробнее
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
