import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/data";

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border bg-white/70 glass p-6 shadow-sm border-glow-hover hover:bg-white/95 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-extrabold text-primary border border-primary/10 shadow-sm">
          {t.initials}
        </div>
        <div>
          <div className="text-sm font-bold text-foreground">{t.name}</div>
          <div className="text-[11px] font-semibold text-muted-foreground">{t.date} · <span className="text-primary font-bold">{t.concern}</span></div>
        </div>
      </div>
      <div className="mt-3.5 flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-3.5 w-3.5 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
        ))}
      </div>
      <p className="mt-3.5 text-xs md:text-sm leading-relaxed text-muted-foreground italic">"{t.text}"</p>
      <div className="mt-auto pt-4 flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
        <span>via Google Reviews</span>
        <span className="text-[9px] bg-secondary/80 px-2 py-0.5 rounded text-primary border border-primary/10">Verified</span>
      </div>
    </div>
  );
}