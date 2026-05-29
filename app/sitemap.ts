import type { MetadataRoute } from "next";
import { getAllPages } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = getAllPages();
  const now = new Date();

  const servicePages: MetadataRoute.Sitemap = pages.map(({ city, service }) => ({
    url: `${SITE_URL}/${city}/${service}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/kontakty`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...servicePages,
  ];
}
