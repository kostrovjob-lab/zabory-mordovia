import CTAButtons from "@/components/CTAButtons";
import SchemaMarkup from "@/components/SchemaMarkup";
import { cities } from "@/lib/data";
import { contactsMetadata, localBusinessSchema } from "@/lib/seo";
import { SITE_NAME, PHONE_DISPLAY, BUSINESS, AVITO_URL, telLink } from "@/lib/constants";

export const metadata = contactsMetadata();

export default function ContactsPage() {
  return (
    <>
      <SchemaMarkup data={localBusinessSchema()} />

      <section className="bg-graphite py-16">
        <div className="container-main">
          <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">Контакты</h1>
          <p className="max-w-2xl text-lg text-gray-300">
            Закажите забор под ключ в {BUSINESS.region}. Бесплатный выезд замерщика и расчёт.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-main grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="section-title mb-6">{SITE_NAME}</h2>
            <dl className="space-y-4 text-gray-600">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-gray-400">Телефон</dt>
                <dd className="mt-1">
                  <a href={telLink()} className="text-xl font-bold text-graphite hover:text-accent">
                    {PHONE_DISPLAY}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-gray-400">Регион работы</dt>
                <dd className="mt-1">{BUSINESS.region}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-gray-400">График</dt>
                <dd className="mt-1">{BUSINESS.hours}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-gray-400">Авито</dt>
                <dd className="mt-1">
                  <a href={AVITO_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    Наше объявление на Авито
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-8">
              <CTAButtons />
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-graphite">Выезжаем в города</h2>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {cities.map((city) => (
                <li key={city.slug}>
                  <a
                    href={`/${city.slug}/zabory-pod-klyuch`}
                    className="block rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:border-accent hover:text-accent"
                  >
                    {city.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
