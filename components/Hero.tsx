import CTAButtons from "./CTAButtons";
import { BULLETS } from "@/lib/constants";

interface HeroProps {
  title?: string;
  subtitle?: string;
  showBullets?: boolean;
}

export default function Hero({
  title = "Заборы под ключ в Мордовии",
  subtitle = "Установка от 2 дней с гарантией до 10 лет",
  showBullets = true,
}: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
        role="img"
        aria-label="Современный забор из профнастила"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-graphite-dark/95 via-graphite/85 to-graphite/60" />

      <div className="container-main relative z-10 py-20 md:py-28">
        <div className="max-w-2xl">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mb-8 text-lg text-gray-200 md:text-xl">{subtitle}</p>

          {showBullets && (
            <ul className="mb-8 space-y-2">
              {BULLETS.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2 text-gray-100">
                  <CheckIcon />
                  {bullet}
                </li>
              ))}
            </ul>
          )}

          <CTAButtons showCalculate />
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}
