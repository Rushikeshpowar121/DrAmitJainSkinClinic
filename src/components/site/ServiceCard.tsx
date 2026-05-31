import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ServiceIcon } from "./ServiceIcon";
import type { Service } from "@/lib/data";

const getCategory = (slug: string) => {
  if (["prp-therapy", "hair-fall-treatment"].includes(slug)) return "Trichology";
  if (["anti-aging-treatment", "cosmetology-procedures"].includes(slug)) return "Cosmetology";
  if (["nail-disorders", "skin-allergy-treatment"].includes(slug)) return "Medical Care";
  return "Dermatology";
};

export function ServiceCard({ service }: { service: Service }) {
  const cat = getCategory(service.slug);
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white/95 hover:shadow-xl border-glow-hover"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-105">
            <ServiceIcon name={service.icon} className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-secondary/80 px-2.5 py-0.5 text-[11px] font-semibold text-secondary-foreground backdrop-blur-sm">
            {cat}
          </span>
        </div>
        <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">{service.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{service.short}</p>
      </div>
      <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-1.5">
        Learn more <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}