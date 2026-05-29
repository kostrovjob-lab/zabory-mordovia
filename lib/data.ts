import citiesData from "@/data/cities.json";
import servicesData from "@/data/services.json";
import faqData from "@/data/faq.json";

export interface City {
  slug: string;
  name: string;
  nameIn: string;
  nameFrom: string;
  region: string;
  population: string;
  deliveryDays: string;
  localFeature: string;
}

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  priceFrom: number;
  unit: string;
  description: string;
  image: string;
  keywords: string[];
  category: "fence" | "gate" | "service";
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PageParams {
  city: string;
  service: string;
}

export const cities: City[] = citiesData as City[];
export const services: Service[] = servicesData as Service[];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllPages(): PageParams[] {
  const pages: PageParams[] = [];
  for (const city of cities) {
    for (const service of services) {
      pages.push({ city: city.slug, service: service.slug });
    }
  }
  return pages;
}

export function getRelatedServices(currentSlug: string, limit = 4): Service[] {
  const current = getService(currentSlug);
  if (!current) return services.slice(0, limit);
  const same = services.filter(
    (s) => s.slug !== currentSlug && s.category === current.category
  );
  const other = services.filter(
    (s) => s.slug !== currentSlug && s.category !== current.category
  );
  return [...same, ...other].slice(0, limit);
}

export function getOtherCities(currentSlug: string, limit = 5): City[] {
  return cities.filter((c) => c.slug !== currentSlug).slice(0, limit);
}

export function getHomeServices(): Service[] {
  const slugs = [
    "zabor-iz-profnastila",
    "zabor-iz-rabicy",
    "3d-zabor",
    "otkatnye-vorota",
    "raspashnye-vorota",
    "kalitki",
  ];
  return slugs
    .map((slug) => getService(slug))
    .filter((s): s is Service => s !== undefined);
}

export function generatePageFAQ(city: City, service: Service): FAQItem[] {
  const vars: Record<string, string> = {
    city: city.nameIn,
    service: service.name.toLowerCase(),
    priceFrom: service.priceFrom.toLocaleString("ru-RU"),
    unit: service.unit,
    phone: "+7 (927) 180-06-39",
    deliveryDays: city.deliveryDays,
    localFeature: city.localFeature,
    price20m: (service.priceFrom * 20).toLocaleString("ru-RU"),
  };

  return faqData.templates.slice(0, 6).map((t) => ({
    question: replaceVars(t.question, vars),
    answer: replaceVars(t.answer, vars),
  }));
}

export function getHomeFAQ(): FAQItem[] {
  return faqData.homeQuestions;
}

function replaceVars(text: string, vars: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}

export function getPageCount(): number {
  return cities.length * services.length;
}
