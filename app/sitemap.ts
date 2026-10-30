import type { MetadataRoute } from "next";

import { GUIDES, GUIDES_UPDATED } from "@/lib/guides";
import { DJ_BASE_PATH, DJ_UPDATED } from "@/lib/dj";
import { DJ_SUBPAGES } from "@/lib/dj-pages";

const BASE_URL = "https://www.oncallnetwork.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/cv`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}${DJ_BASE_PATH}`,
      lastModified: new Date(DJ_UPDATED),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...DJ_SUBPAGES.map((p) => ({
      url: `${BASE_URL}${DJ_BASE_PATH}/${p.slug}`,
      lastModified: new Date(DJ_UPDATED),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(GUIDES_UPDATED),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...GUIDES.map((g) => ({
      url: `${BASE_URL}/guides/${g.slug}`,
      lastModified: new Date(GUIDES_UPDATED),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
