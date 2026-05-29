"use client";

import { useState } from "react";
import CTAButtons from "./CTAButtons";
import { formatPrice } from "@/lib/constants";

const FENCE_TYPES = [
  { id: "rabitsa", label: "Рабица", pricePerMeter: 1200 },
  { id: "profnastil", label: "Профнастил", pricePerMeter: 1800 },
  { id: "3d", label: "3D забор", pricePerMeter: 2200 },
  { id: "metal", label: "Металл", pricePerMeter: 2000 },
  { id: "pod-klyuch", label: "Под ключ", pricePerMeter: 2500 },
];

const HEIGHTS = [
  { id: "1.5", label: "1,5 м", multiplier: 1 },
  { id: "1.8", label: "1,8 м", multiplier: 1.15 },
  { id: "2.0", label: "2,0 м", multiplier: 1.3 },
  { id: "2.5", label: "2,5 м", multiplier: 1.5 },
];

export default function Calculator() {
  const [length, setLength] = useState(30);
  const [height, setHeight] = useState("1.8");
  const [fenceType, setFenceType] = useState("profnastil");
  const [needsGate, setNeedsGate] = useState(false);
  const [needsDemolition, setNeedsDemolition] = useState(false);
  const [calculated, setCalculated] = useState<number | null>(null);

  function calculate() {
    const type = FENCE_TYPES.find((t) => t.id === fenceType)!;
    const h = HEIGHTS.find((ht) => ht.id === height)!;
    let total = length * type.pricePerMeter * h.multiplier;
    if (needsGate) total += 35000;
    if (needsDemolition) total += length * 300;
    setCalculated(Math.round(total));
  }

  return (
    <section id="calculator" className="bg-gray-50 py-16 md:py-20">
      <div className="container-main">
        <h2 className="section-title mb-2 text-center">Калькулятор стоимости</h2>
        <p className="mb-8 text-center text-gray-600">
          Рассчитайте примерную стоимость забора за 30 секунд
        </p>

        <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-lg md:p-8">
          <div className="space-y-5">
            <div>
              <label htmlFor="length" className="mb-1 block text-sm font-medium text-graphite">
                Длина забора (метров)
              </label>
              <input
                id="length"
                type="number"
                min={5}
                max={500}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="height" className="mb-1 block text-sm font-medium text-graphite">
                Высота
              </label>
              <select
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                {HEIGHTS.map((h) => (
                  <option key={h.id} value={h.id}>{h.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="type" className="mb-1 block text-sm font-medium text-graphite">
                Тип забора
              </label>
              <select
                id="type"
                value={fenceType}
                onChange={(e) => setFenceType(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                {FENCE_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={needsGate}
                  onChange={(e) => setNeedsGate(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                />
                <span className="text-sm text-graphite">Нужны ворота</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={needsDemolition}
                  onChange={(e) => setNeedsDemolition(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                />
                <span className="text-sm text-graphite">Нужен демонтаж</span>
              </label>
            </div>

            <button onClick={calculate} className="btn-primary w-full">
              Рассчитать стоимость
            </button>

            {calculated !== null && (
              <div className="rounded-xl bg-graphite p-6 text-center">
                <p className="text-sm text-gray-300">Примерная стоимость:</p>
                <p className="mt-1 text-3xl font-bold text-accent">
                  {formatPrice(calculated)} ₽
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  Точную смету рассчитаем после бесплатного замера
                </p>
                <CTAButtons className="mt-4 justify-center" variant="mixed" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
