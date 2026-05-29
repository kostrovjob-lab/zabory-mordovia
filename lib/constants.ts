export const SITE_NAME = "Заборы Мордовия";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://zabory-mordovia.ru";
export const PHONE = "+79271800639";
export const PHONE_DISPLAY = "+7 (927) 180-06-39";
export const SMS_BODY = "Здравствуйте! Хочу заказать забор. Перезвоните, пожалуйста.";
export const AVITO_URL =
  "https://www.avito.ru/saransk/predlozheniya_uslug/zabory_pod_klyuch_mordoviya_ustanovka_ot_3_dney_8071395201";

export const BUSINESS = {
  region: "Республика Мордовия",
  city: "Саранск",
  hours: "Ежедневно 8:00–20:00",
  geo: { lat: 54.1874, lng: 45.1839 },
};

export const BULLETS = [
  "Сами закупим и доставим материал",
  "Гарантия до 10 лет",
  "Наличный и безналичный расчёт",
  "Бесплатный предварительный расчёт",
  "Работаем по всей Мордовии",
];

export const GALLERY_IMAGES = [
  { src: "/images/gallery-1.jpg", alt: "Забор из профнастила Grand Line" },
  { src: "/images/gallery-2.jpg", alt: "Откатные ворота с автоматикой" },
  { src: "/images/gallery-3.jpg", alt: "3D забор из сетки" },
  { src: "/images/gallery-4.jpg", alt: "Распашные ворота из профнастила" },
  { src: "/images/gallery-5.jpg", alt: "Металлическая калитка" },
  { src: "/images/gallery-6.jpg", alt: "Забор из профнастила с декоративной решёткой" },
  { src: "/images/gallery-7.jpg", alt: "Забор из евроштакетника" },
  { src: "/images/gallery-8.jpg", alt: "Комбинированный забор: штакетник и кирпич" },
];

export function telLink() {
  return `tel:${PHONE}`;
}

export function smsLink(body = SMS_BODY) {
  return `sms:${PHONE}?body=${encodeURIComponent(body)}`;
}

export function formatPrice(n: number): string {
  return n.toLocaleString("ru-RU");
}
