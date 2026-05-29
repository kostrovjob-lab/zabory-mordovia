import { telLink, smsLink, AVITO_URL, PHONE_DISPLAY } from "@/lib/constants";

interface CTAButtonsProps {
  variant?: "primary" | "mixed";
  className?: string;
  showCalculate?: boolean;
}

export default function CTAButtons({
  variant = "primary",
  className = "",
  showCalculate = false,
}: CTAButtonsProps) {
  const secondaryClass = variant === "primary" ? "btn-secondary" : "btn-outline";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={telLink()} className="btn-primary">
        <PhoneIcon />
        Позвонить
      </a>
      <a href={smsLink()} className={secondaryClass}>
        <SmsIcon />
        Написать SMS
      </a>
      <a
        href={AVITO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-avito"
      >
        <AvitoIcon />
        Написать на Авито
      </a>
      {showCalculate && (
        <a href="#calculator" className={secondaryClass}>
          Рассчитать стоимость
        </a>
      )}
    </div>
  );
}

export function PhoneLink({ className = "" }: { className?: string }) {
  return (
    <a href={telLink()} className={`font-semibold hover:text-accent ${className}`}>
      {PHONE_DISPLAY}
    </a>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function SmsIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function AvitoIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}
