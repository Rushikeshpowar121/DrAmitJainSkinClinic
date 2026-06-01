import { Star, Quote, CheckCircle2 } from "lucide-react";
import type { Testimonial } from "@/lib/data";

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-2xl">
      {/* Editorial Quote Mark Watermark in top-right */}
      <div className="absolute right-6 top-6 text-accent/25 transition-transform duration-500 group-hover:scale-110">
        <Quote className="h-10 w-10 rotate-180 fill-current" />
      </div>

      <div className="flex items-center gap-3.5">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-extrabold text-primary border border-primary/20 shadow-xs ring-4 ring-secondary/40">
          {t.initials}
        </div>
        <div>
          <div className="text-sm font-extrabold text-foreground">{t.name}</div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            {t.date} · <span className="text-primary">{t.concern}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 transition-all duration-300 group-hover:scale-105 ${
              i < t.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20"
            }`}
          />
        ))}
      </div>

      <p className="mt-4 text-xs md:text-sm leading-relaxed text-muted-foreground/90 italic font-medium flex-1">
        "{t.text}"
      </p>

      <div className="mt-7 pt-4 flex items-center justify-between border-t border-border/40 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          via Google Review
        </span>
        <span className="inline-flex items-center gap-1 rounded bg-secondary/70 px-2 py-0.5 text-[9px] text-primary border border-primary/10 shadow-3xs font-extrabold">
          <CheckCircle2 className="h-3 w-3 text-primary/80" />
          Verified
        </span>
      </div>
    </div>
  );
}