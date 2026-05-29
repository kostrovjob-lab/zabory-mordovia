import Link from "next/link";
import { cities, services } from "@/lib/data";
import { SITE_NAME, telLink, smsLink, AVITO_URL, PHONE_DISPLAY, BUSINESS } from "@/lib/constants";

export default function Footer() {
  const footerServices = services.slice(0, 8);

  return (
    <footer className="bg-graphite text-white">
      <div className="container-main py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">{SITE_NAME}</h3>
            <p className="mb-4 text-sm text-gray-300">
              Установка заборов и ворот в Мордовии под ключ. Гарантия до 10 лет.
            </p>
            <a href={telLink()} className="mb-2 block text-accent hover:text-accent-light">
              {PHONE_DISPLAY}
            </a>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={smsLink()} className="btn-primary py-2 text-sm">
                Написать SMS
              </a>
              <a
                href={AVITO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-avito py-2 text-sm"
              >
                Написать на Авито
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Города
            </h3>
            <ul className="space-y-2">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${city.slug}/zabory-pod-klyuch`}
                    className="text-sm text-gray-300 hover:text-accent"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Услуги
            </h3>
            <ul className="space-y-2">
              {footerServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/saransk/${service.slug}`}
                    className="text-sm text-gray-300 hover:text-accent"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Контакты
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/kontakty" className="hover:text-accent">
                  Контакты
                </Link>
              </li>
              <li>{BUSINESS.region}</li>
              <li>{BUSINESS.hours}</li>
              <li>Бесплатный выезд замерщика</li>
              <li>Наличный и безналичный расчёт</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} {SITE_NAME}. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
