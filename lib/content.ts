import type { City, Service } from "./data";
import { PHONE_DISPLAY } from "./constants";

const introVariants = [
  "Компания «Заборы Мордовия» выполняет {service} в {city} и прилегающих районах. Мы знаем местные особенности и предлагаем решения, проверенные на сотнях объектов.",
  "Нужен надёжный забор в {city}? Мы специализируемся на {service} и работаем по всей республике. Местная бригада — наше преимущество перед «общероссийскими» подрядчиками.",
  "Заказать {service} в {city} можно с бесплатным выездом замерщика. Мы — местная бригада с опытом более 8 лет. Сами закупаем материалы и сдаём объект под ключ.",
  "Установка {service} в {city} — одно из основных направлений нашей работы. Работаем с частными домами, дачами и коммерческими объектами. Гарантия до 10 лет.",
];

const bodyBlocks = [
  {
    title: "Стоимость и расчёт",
    paragraphs: [
      "Цена {service} в {city} начинается от {priceFrom} ₽ за {unit}. На итоговую сумму влияют длина ограждения, высота секций, тип грунта и необходимость бетонирования столбов.",
      "Мы предлагаем бесплатный предварительный расчёт: позвоните по номеру {phone} или отправьте SMS — ответим в течение 15 минут. Выезд замерщика в {city} также бесплатный.",
    ],
  },
  {
    title: "Монтаж и сроки",
    paragraphs: [
      "Монтаж {service} в {city} занимает от 2 до 5 рабочих дней. Доставка материалов — {deliveryDays} день после подтверждения заказа.",
      "Работаем без субподряда: бригада из 3–4 человек, собственный инструмент и транспорт. Все этапы — от разметки до уборки территории — включены в стоимость.",
    ],
  },
  {
    title: "Материалы и качество",
    paragraphs: [
      "Для {service} используем сертифицированные материалы: профлист с полимерным покрытием, столбы 60×60 мм, анкерное крепление. Покрытие устойчиво к морозам и ультрафиолету.",
      "На все работы даём гарантию до 10 лет. Договор фиксирует сроки, стоимость и перечень работ. Оплата — наличными или по безналу, возможна поэтапная схема.",
    ],
  },
  {
    title: "Почему выбирают нас в {city}",
    paragraphs: [
      "Местная бригада знает специфику {city}: типы грунта, ветровую нагрузку, особенности частного сектора. Не нужно ждать «московскую» бригаду — мы рядом.",
      "Сами закупаем и доставляем материалы, что экономит ваше время и исключает наценки посредников. {population} жителей {cityFrom} уже доверили нам установку ограждений.",
    ],
  },
];

const seoIntents = [
  "цена",
  "стоимость",
  "под ключ",
  "монтаж",
  "установка",
  "заказать",
];

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number, index: number): T {
  return arr[(seed + index) % arr.length];
}

function replaceAll(text: string, vars: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}

export interface PageContent {
  h1: string;
  intro: string;
  blocks: { title: string; paragraphs: string[] }[];
  metaTitle: string;
  metaDescription: string;
}

export function generatePageContent(city: City, service: Service): PageContent {
  const seed = hash(`${city.slug}-${service.slug}`);
  const intent = pick(seoIntents, seed, 0);
  const intent2 = pick(seoIntents, seed, 2);

  const vars: Record<string, string> = {
    city: city.nameIn,
    cityName: city.name,
    cityFrom: city.nameFrom,
    service: service.name.toLowerCase(),
    serviceName: service.name,
    priceFrom: service.priceFrom.toLocaleString("ru-RU"),
    unit: service.unit,
    phone: PHONE_DISPLAY,
    deliveryDays: city.deliveryDays,
    population: city.population,
    intent,
    intent2,
    keyword: service.keywords[seed % service.keywords.length],
  };

  const h1 = `${service.name} в ${city.nameIn} — ${intent} и ${intent2}`;

  const intro = replaceAll(pick(introVariants, seed, 0), vars);

  const blocks = bodyBlocks.map((block, i) => ({
    title: replaceAll(block.title, vars),
    paragraphs: block.paragraphs.map((p) => replaceAll(p, vars)),
  }));

  // Rotate block order for uniqueness
  const rotated = [...blocks.slice(seed % blocks.length), ...blocks.slice(0, seed % blocks.length)];

  const metaTitle = `${service.name} в ${city.nameIn} — от ${service.priceFrom.toLocaleString("ru-RU")} ₽ | Заборы Мордовия`;
  const metaDescription = `${service.name} в ${city.nameIn}: ${intent}, ${intent2}, гарантия 10 лет. От ${service.priceFrom.toLocaleString("ru-RU")} ₽/${service.unit}. Бесплатный расчёт: ${PHONE_DISPLAY}`;

  return { h1, intro, blocks: rotated, metaTitle, metaDescription };
}
