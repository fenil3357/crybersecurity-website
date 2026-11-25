import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { posts } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/services/", "/about/", "/insights/", "/contact/"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}/`, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...posts.map((p) => ({ url: `${site.url}/insights/${p.slug}/`, lastModified: p.date, priority: 0.6 })),
  ];
}
