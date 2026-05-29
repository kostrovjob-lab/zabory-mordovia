import type { Metadata } from "next";
import type { City, Service, FAQItem } from "./data";
import { cities } from "./data";
import { SITE_NAME, SITE_URL, PHONE_DISPLAY, AVITO_URL, BUSINESS } from "./constants";
import { generatePageContent } from "./content";

export function buildPageMetadata(city: City, service: Service): Metadata {
  const content = generatePageContent(city, service);
  const url = `${SITE_URL}/${city.slug}/${service.slug}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url,
      siteName: SITE_NAME,
      locale: "ru_RU",
      type: "website",
      images: [{ url: `${SITE_URL}${service.image}`, width: 1200, height: 630, alt: service.name }],
    },
    robots: { index: true, follow: true },
  };
}

export function homeMetadata(): Metadata {
  return {
    title: "Заборы под ключ в Мордовии — установка от 2 дней | Заборы Мордовия",
    description:
      "Установка заборов в Мордовии: профнастил, рабица, 3D, ворота, калитки. Гарантия 10 лет, бесплатный расчёт. Звоните: " + PHONE_DISPLAY,
    keywords: [
      "заборы мордовия",
      "забор под ключ саранск",
      "установка забора",
      "забор из профнастила",
      "откатные ворота",
      "забор цена",
    ],
    alternates: { canonical: SITE_URL },
    openGraph: {
      title: "Заборы под ключ в Мордовии",
      description: "Установка от 2 дней с гарантией до 10 лет. Работаем по всей Мордовии.",
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: "ru_RU",
      type: "website",
      images: [{ url: `${SITE_URL}/images/hero.jpg`, width: 1200, height: 630, alt: "Заборы в Мордовии" }],
    },
    robots: { index: true, follow: true },
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE_NAME,
    description: "Установка заборов и ворот в Мордовии под ключ",
    url: SITE_URL,
    telephone: PHONE_DISPLAY,
    priceRange: "₽₽",
    image: `${SITE_URL}/images/hero.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "20:00",
    },
    areaServed: cities.map((c) => ({
      "@type": "City",
      name: c.name,
    })),
    sameAs: [AVITO_URL],
  };
}

export function contactsMetadata(): Metadata {
  return {
    title: "Контакты — заказать забор в Мордовии",
    description: `Телефон ${PHONE_DISPLAY}. Заборы под ключ в Саранске и по всей Мордовии. Звоните, пишите SMS или на Авито.`,
    alternates: { canonical: `${SITE_URL}/kontakty` },
    robots: { index: true, follow: true },
  };
}

export function serviceSchema(city: City, service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} в ${city.nameIn}`,
    description: service.description,
    provider: { "@type": "LocalBusiness", name: SITE_NAME },
    areaServed: { "@type": "City", name: city.name },
    offers: {
      "@type": "Offer",
      price: service.priceFrom,
      priceCurrency: "RUB",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: service.priceFrom,
        priceCurrency: "RUB",
        unitText: service.unit,
      },
    },
  };
}

export function faqSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildBreadcrumbs(city: City, service: Service): BreadcrumbItem[] {
  return [
    { name: "Главная", url: SITE_URL },
    { name: city.name, url: `${SITE_URL}/${city.slug}/${service.slug}` },
    { name: service.name, url: `${SITE_URL}/${city.slug}/${service.slug}` },
  ];
}
