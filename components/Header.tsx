import Link from "next/link";
import { SITE_NAME, telLink, PHONE_DISPLAY } from "@/lib/constants";
import { pagePath } from "@/lib/paths";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="container-main flex h-16 items-center justify-between md:h-18">
        <Link href={pagePath()} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-graphite">
            <FenceIcon />
          </div>
          <span className="text-lg font-bold text-graphite">{SITE_NAME}</span>
        </Link>

        <div className="flex items-center gap-3 md:gap-4">
          <a
            href={telLink()}
            className="hidden text-sm font-semibold text-graphite hover:text-accent sm:block md:text-base"
          >
            {PHONE_DISPLAY}
          </a>
          <a href={telLink()} className="btn-primary py-2 text-sm md:py-3 md:text-base">
            <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Позвонить
          </a>
        </div>
      </div>
    </header>
  );
}

function FenceIcon() {
  return (
    <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 4h2v16H2V4zm4 0h2v16H6V4zm4 0h2v16h-2V4zm4 0h2v16h-2V4zm4 0h2v16h-2V4zm4 0h2v16h-2V4z" />
    </svg>
  );
}
