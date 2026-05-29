/** Префикс для GitHub Pages: /zabory-mordovia. Для своего домена — пусто. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}

/** Внутренний URL страницы (город/услуга, контакты и т.д.) с учётом basePath. */
export function pagePath(...parts: string[]): string {
  if (parts.length === 0) return withBase("/");
  const path = `/${parts.map((p) => p.replace(/^\/+|\/+$/g, "")).join("/")}`;
  return withBase(path);
}
