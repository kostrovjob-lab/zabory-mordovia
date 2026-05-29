import Link from "next/link";
import { cities } from "@/lib/data";

export default function CitiesGrid() {
  return (
    <section className="border-t border-gray-200 bg-white py-16 md:py-20">
      <div className="container-main">
        <h2 className="section-title mb-2 text-center">Работаем по всей Мордовии</h2>
        <p className="mb-10 text-center text-gray-600">
          Установка заборов и ворот во всех городах республики
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}/zabory-pod-klyuch`}
              className="rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-medium text-graphite transition-colors hover:border-accent hover:text-accent"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
