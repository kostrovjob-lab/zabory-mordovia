"use client";

import { useState } from "react";
import type { FAQItem } from "@/lib/data";

export default function FAQ({ items, title = "Частые вопросы" }: { items: FAQItem[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="container-main">
        <h2 className="section-title mb-8 text-center">{title}</h2>

        <div className="mx-auto max-w-3xl space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-graphite hover:bg-gray-50"
                aria-expanded={openIndex === i}
              >
                {item.question}
                <Chevron open={openIndex === i} />
              </button>
              {openIndex === i && (
                <div className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
