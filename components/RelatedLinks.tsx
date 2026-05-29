import Link from "next/link";
import type { City, Service } from "@/lib/data";
import { pagePath } from "@/lib/paths";

interface RelatedLinksProps {
  city: City;
  service: Service;
  relatedServices: Service[];
  otherCities: City[];
}

export default function RelatedLinks({
  city,
  service,
  relatedServices,
  otherCities,
}: RelatedLinksProps) {
  return (
    <section className="border-t border-gray-200 bg-gray-50 py-12">
      <div className="container-main">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-lg font-bold text-graphite">
              Похожие услуги в {city.nameIn}
            </h2>
            <ul className="space-y-2">
              {relatedServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={pagePath(city.slug, s.slug)}
                    className="text-sm text-gray-600 hover:text-accent"
                  >
                    {s.name} в {city.nameIn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-graphite">
              {service.name} в других городах
            </h2>
            <ul className="space-y-2">
              {otherCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={pagePath(c.slug, service.slug)}
                    className="text-sm text-gray-600 hover:text-accent"
                  >
                    {service.name} в {c.nameIn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
