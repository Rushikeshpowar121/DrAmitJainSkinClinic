import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight, Award, CalendarCheck, CheckCircle2, MessageCircle, ShieldCheck, Sparkles, Star, Heart, Check, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { clinic as fallbackClinic } from "@/lib/clinic";
import {
  services as fallbackServices,
  testimonials as fallbackTestimonials,
  faqs as fallbackFaqs,
  stats as fallbackStats
} from "@/lib/data";
import {
  getClinicSettings,
  getHeroData,
  getDoctorInfo,
  getServices,
  getTestimonials,
  getFAQs
} from "@/lib/firebaseServices";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr Jain's Skin Care Clinic | Dermatologist in Katraj, Pune" },
      { name: "description", content: "Advanced skin, hair and cosmetology care in Katraj, Pune by Dr. Amit Jain (MBBS, MD). 4.8★ rated. Book an appointment today." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <TrustStrip />
      <DoctorIntro />
      <Highlights />
      <BeforeAfter />
      <ServicesOverview />
      <WhyChooseUs />
      <TestimonialsSection />
      <GoogleReviewsSection />
      <FAQSection />
      <MapSectionComponent />
      <ContactCTASection />
    </SiteLayout>
  );
}

function Hero() {
  const [clinic, setClinic] = useState(fallbackClinic);
  const [hero, setHero] = useState({
    title: "Beautiful, healthy skin starts with expert clinical care",
    subtitle: "Advanced dermatology, cosmetology, and laser solutions customized for Indian skin.",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=70",
    ctaText: "Book Appointment",
    rating: 4.8,
    reviewsCount: 140,
  });

  useEffect(() => {
    getClinicSettings().then(setClinic);
    getHeroData().then((h) => {
      setHero({
        title: h.title,
        subtitle: h.subtitle,
        imageUrl: h.imageUrl,
        ctaText: h.ctaText,
        rating: h.rating,
        reviewsCount: h.reviewsCount,
      });
    });
  }, []);

  const whatsappLink = `https://wa.me/${clinic.phoneRaw}?text=${encodeURIComponent(clinic.whatsappMessage)}`;

  return (
    <section className="relative isolate overflow-hidden pt-3 pb-10 md:pt-4 md:pb-16">
      <div className="absolute inset-0 -z-10 bg-soft-radial bg-dot-pattern opacity-95" />
      <div className="absolute -left-20 -top-20 -z-10 h-72 w-72 rounded-full bg-brand-teal/15 blur-3xl opacity-50 animate-pulse" />
      
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-0 pb-8 md:grid-cols-2 md:pt-0 md:pb-14 items-center">
        <div className="flex flex-col justify-center animate-fade-up">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-secondary px-3.5 py-1 text-xs font-bold text-primary shadow-sm backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Trusted Dermatology · Katraj, Pune
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-[3.25rem] lg:text-[3.75rem]">
            {hero.title.split("starts with")[0]} <span className="text-gradient">Skin & Hair</span> Care
          </h1>
          <p className="mt-5 max-w-xl text-sm text-muted-foreground md:text-base leading-relaxed">
            {hero.subtitle} Led by <strong className="text-foreground">{clinic.doctor}</strong> — {clinic.credentials.split("(")[0].trim()}.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <Link to="/appointment">
                <CalendarCheck className="mr-2 h-4 w-4" /> {hero.ctaText}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-emerald-200 bg-white/70 text-emerald-700 hover:bg-emerald-50 shadow-sm hover:-translate-y-0.5 transition-all">
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4 text-emerald-600" /> WhatsApp Consultation
              </a>
            </Button>
          </div>
          
          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-muted-foreground border-t pt-6">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs font-bold text-foreground">
                <span className="text-sm font-extrabold">{hero.rating}</span>/5 <span className="font-normal text-muted-foreground">({hero.reviewsCount}+ Google Reviews)</span>
              </div>
            </div>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-primary font-extrabold">✓</span>
              <span className="font-bold text-foreground">15,000+ Happy Patients</span>
            </div>
          </div>
        </div>
        
        <div className="relative animate-fade-up">
          <div className="absolute -left-8 -top-8 -z-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-8 -bottom-8 -z-10 h-48 w-48 rounded-full bg-brand-emerald/15 blur-3xl" />
          
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-4 border-white bg-white shadow-2xl ring-soft transition-all duration-500 hover:scale-[1.01]">
            <img
              src={hero.imageUrl}
              alt="Advanced skin examination by expert dermatologist"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 glass rounded-2xl p-4 border border-white/60 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                  <Heart className="h-5 w-5 fill-white" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-foreground">{clinic.doctor}</div>
                  <div className="text-[10px] font-bold text-primary">{clinic.credentials.split("(")[0]}</div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t pt-2.5">
                <span className="text-[11px] font-extrabold text-foreground tracking-tight">100% Evidence-Based Protocols</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const [count, setCount] = useState<number>(0);

  const cleanVal = value.replace(/,/g, "");
  const numMatch = cleanVal.match(/^([\d.]+)/);
  const target = numMatch ? parseFloat(numMatch[1]) : 0;
  const suffix = value.replace(/^[\d.,]+/, "");
  
  const hasComma = value.includes(",");
  const isFloat = value.includes(".") && parseFloat(value) % 1 !== 0;

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = 1600;
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(totalMiliseconds / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease out
      const current = end * easeOut;

      setCount(current);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(end);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [target]);

  const formatNumber = (num: number) => {
    if (isFloat) {
      return num.toFixed(1);
    }
    const rounded = Math.floor(num);
    if (hasComma) {
      return rounded.toLocaleString("en-IN");
    }
    return rounded.toString();
  };

  return (
    <div className="text-center relative after:absolute after:right-0 after:top-1/4 after:h-1/2 after:w-px after:bg-border last:after:hidden max-md:even:after:hidden">
      <div className="text-3xl font-extrabold tracking-tight text-gradient md:text-4xl">
        {formatNumber(count)}{suffix}
      </div>
      <div className="mt-1.5 text-xs font-bold text-muted-foreground md:text-sm uppercase tracking-wider">{label}</div>
    </div>
  );
}

function TrustStrip() {
  const [stats, setStats] = useState(fallbackStats);

  useEffect(() => {
    getHeroData().then((h) => {
      if (h.stats) {
        setStats(h.stats);
      }
    });
  }, []);

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 -mt-8">
      <div className="glass rounded-[2rem] border bg-gradient-to-r from-white/95 to-brand-frost/40 px-6 py-8 shadow-xl md:px-12 md:py-10 grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((s) => (
          <AnimatedCounter key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
    </section>
  );
}

function DoctorIntro() {
  const [doctor, setDoctor] = useState({
    name: "Dr. Amit Jain",
    role: "Chief Dermatologist & Hair Transplant Specialist",
    qualifications: ["MBBS from prestigious university", "MD - Skin (Dermatology, Venereology & Leprosy)"],
    memberships: [
      "Indian Association of Dermatologists, Venereologists and Leprologists (IADVL)",
      "Cosmetology Society of India (CSI)",
      "Association of Hair Restoration Surgeons (AHRS)",
    ],
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=70",
    bio: "Dr. Amit Jain is a highly experienced skin specialist based in Katraj, Pune. Over the last 10+ years, he has successfully delivered clinical and aesthetic solutions for thousands of patients with a patient-first ethos.",
  });

  useEffect(() => {
    getDoctorInfo().then(setDoctor);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:py-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-40 translate-x-4 translate-y-4 rounded-[2rem]" />
          <div className="absolute -left-10 -bottom-10 -z-10 h-36 w-36 rounded-full bg-brand-emerald/10 blur-2xl" />
          
          <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] border-4 border-white bg-white shadow-xl hover:scale-[1.005] transition-transform duration-300">
            <img src={doctor.imageUrl} alt={`${doctor.name} — Skin and Cosmetology expert`} className="h-full w-full object-cover" />
          </div>
        </div>
        <div>
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-secondary/80 px-3.5 py-1 text-[11px] font-bold text-primary uppercase tracking-wider">
            Meet your dermatologist
          </span>
          <h2 className="mt-3.5 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">{doctor.name}</h2>
          <p className="mt-1.5 text-sm font-semibold text-primary">{doctor.role}</p>
          <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed">
            {doctor.bio}
          </p>
          
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {doctor.memberships.slice(0, 4).map((m, idx) => (
              <li key={idx} className="flex gap-3 rounded-2xl border bg-white/70 p-3.5 shadow-sm hover:bg-white/95 transition-all">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5 bg-secondary rounded-full p-1" />
                <div>
                  <div className="text-xs font-bold text-foreground">Verified Member</div>
                  <div className="text-[10px] text-muted-foreground leading-tight">{m}</div>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="rounded-full shadow-sm hover:shadow">
              <Link to="/about">Read full bio profile <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/appointment">Book a consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const items = [
    { 
      title: "Skin Treatments", 
      desc: "Comprehensive diagnostic care for acne, pigmentation, eczema, psoriasis, and deep scars.", 
      icon: Sparkles,
      tags: ["Acne Care", "Pigmentation", "Peels", "Skin Allergies"]
    },
    { 
      title: "Hair Treatments", 
      desc: "Advanced trichology services for male/female pattern hair loss, PRP growth factor therapy.", 
      icon: Award,
      tags: ["PRP Therapy", "Hair Thinning", "Mesotherapy", "Scalp Care"]
    },
    { 
      title: "Cosmetology", 
      desc: "Anti-aging injectables, fillers, medical Hydrafacials, carbon facials and skin boosters.", 
      icon: Star,
      tags: ["Hydrafacial", "Anti-aging", "Glow Facials", "Skin Boosters"]
    },
  ];
  return (
    <section className="relative isolate overflow-hidden py-14 md:py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-mint/20 via-brand-frost/25 to-transparent -z-10 bg-dot-pattern opacity-60" />
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading 
          eyebrow="What we treat" 
          title="Personalised skin & hair specialties" 
          description="Every clinical solution is calibrated under a single specialist to achieve maximum safety and natural results." 
        />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="group relative flex flex-col justify-between rounded-2xl border bg-white/70 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/95 hover:shadow-xl border-glow-hover">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-105">
                  <it.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">{it.title}</h3>
                <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              </div>
              
              <div className="mt-6 border-t pt-4">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-2">Featured services</span>
                <div className="flex flex-wrap gap-1.5">
                  {it.tags.map((t) => (
                    <span key={t} className="rounded-full bg-secondary/80 px-2.5 py-0.5 text-[10px] font-semibold text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const sets = [
    { label: "Acne Control", before: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=70", after: "https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=900&q=70" },
    { label: "Pigmentation & Tone", before: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=70", after: "https://images.unsplash.com/photo-1614109800763-7b46d0a9ad44?w=900&q=70" },
    { label: "Hair Density (PRP)", before: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=900&q=70", after: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=900&q=70" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:py-16">
      <SectionHeading 
        eyebrow="Clinical results" 
        title="Transformative patient results" 
        description="A real-world showcase of dermatological success. Specific clinical outcomes differ; consultation is recommended." 
      />
      <div className="grid gap-6 md:grid-cols-3">
        {sets.map((s) => (
          <div key={s.label} className="group overflow-hidden rounded-2xl border bg-white/70 shadow-sm border-glow-hover transition-all duration-300 hover:shadow-lg">
            <div className="grid grid-cols-2 relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={s.before} alt={`${s.label} before`} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">Before</span>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden border-l border-white">
                <img src={s.after} alt={`${s.label} after`} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">After</span>
              </div>
            </div>
            <div className="bg-white/90 px-5 py-4 text-center border-t">
              <div className="text-sm font-bold text-foreground">{s.label} Treatment</div>
              <div className="mt-1 text-[11px] text-muted-foreground leading-relaxed">Visible results after completed clinical sessions</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesOverview() {
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  return (
    <section className="relative isolate overflow-hidden py-14 md:py-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-brand-frost/30 to-brand-mint/20 bg-dot-pattern opacity-50" />
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Our clinical services"
          title="Evidence-based dermatology treatments"
          description="Gentle protocols matched with state-of-the-art diagnostic technology for maximum patient comfort."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="rounded-full shadow-sm hover:shadow">
            <Link to="/services">View all services catalog <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const items = [
    { t: "Expert-led consultations", d: "Every diagnosis and therapy procedure is directly formulated and delivered by Dr. Amit Jain." },
    { t: "State-of-the-art tech", d: "Equipped with the latest FDA-cleared aesthetic lasers and double-spin clinical PRP centrifuges." },
    { t: "Research-backed protocols", d: "Every medication and procedure is heavily rooted in verified dermatology research studies." },
    { t: "Transparent clinical costs", d: "Upfront pricing schedules without any forced add-ons or sudden cosmetic packages." },
    { t: "Melanin-calibrated care", d: "Specially adjusted skin treatments focused on melanocyte safety for rich Indian skin." },
    { t: "Luxurious patient comfort", d: "A calm, highly sterilized clinic environment designed with close individual attention." },
  ];
  return (
    <section className="relative isolate overflow-hidden py-14 md:py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-mint/15 to-brand-frost/25 -z-10" />
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Why choose our clinic" title="Premium dermatology built on science" />
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.t} className="group rounded-2xl border bg-white/70 p-6 shadow-sm border-glow-hover hover:bg-white/95 transition-all">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-primary transition-all duration-300 group-hover:scale-105">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-4 font-bold text-foreground text-base tracking-tight">{it.t}</div>
              <div className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{it.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    getTestimonials().then(setTestimonials);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:py-16">
      <SectionHeading eyebrow="Patient success stories" title="Loved by our patients" />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.slice(0, 3).map((t, idx) => (
          <TestimonialCard key={idx} t={t} />
        ))}
      </div>
    </section>
  );
}

function GoogleReviewsSection() {
  const [clinic, setClinic] = useState(fallbackClinic);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    getClinicSettings().then(setClinic);
    getTestimonials().then(setTestimonials);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 md:pb-16">
      <div className="relative overflow-hidden rounded-[2.5rem] border bg-white/80 p-8 md:p-12 shadow-md bg-grid-pattern bg-gradient-to-br from-white/95 to-brand-frost/20">
        <div className="absolute -bottom-10 -right-10 hidden h-32 w-32 rounded-full bg-primary/10 blur-2xl md:block" />
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 shadow-sm">
              ⭐ Google Verified Patients
            </span>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-6xl font-extrabold tracking-tight text-foreground">{clinic.rating}</span>
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="mt-1 text-xs font-bold text-muted-foreground">Based on {clinic.reviews}+ reviews</div>
              </div>
            </div>
            <h3 className="mt-5 text-xl font-bold text-foreground">Why patients trust Dr Jain's Skin Care Clinic</h3>
            <p className="mt-3 text-xs md:text-sm text-muted-foreground leading-relaxed">
              Patients consistently appreciate Dr. Amit Jain's detailed diagnosis, clear communication of triggers, and ethical advice that ensures no unnecessary cosmetological treatments are pushed.
            </p>
            <div className="mt-6">
              <Button asChild className="rounded-full shadow-sm hover:shadow">
                <Link to="/testimonials">Read all verified reviews</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            {testimonials.slice(1, 3).map((t, idx) => (
              <div key={idx} className="rounded-2xl border bg-white/90 p-5 shadow-sm hover:-translate-y-0.5 transition-all">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-foreground">{t.name}</div>
                  <span className="rounded-full bg-secondary/80 px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground">{t.concern}</span>
                </div>
                <div className="mt-1.5 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed italic">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [faqs, setFaqs] = useState(fallbackFaqs);

  useEffect(() => {
    getFAQs().then(setFaqs);
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-4 py-14 md:py-16">
      <SectionHeading eyebrow="Common doubts" title="Frequently asked questions" />
      <Accordion type="single" collapsible className="rounded-2xl border bg-white/70 shadow-sm border-glow-hover p-2 space-y-2">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`f-${i}`} className="border-b last:border-b-0 px-4 rounded-xl hover:bg-secondary/40 transition-colors">
            <AccordionTrigger className="text-left text-base font-bold text-foreground hover:no-underline py-4">{f.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function MapSectionComponent() {
  const [clinic, setClinic] = useState(fallbackClinic);

  useEffect(() => {
    getClinicSettings().then(setClinic);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 md:pb-16">
      <SectionHeading eyebrow="Our location" title="Visit Dr Jain's Skin Care Clinic" description={`${clinic.address.line1}, ${clinic.address.line2}, ${clinic.address.city}.`} />
      <div className="overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl">
        <iframe title="Clinic location" src={clinic.mapEmbed} className="h-[380px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </section>
  );
}

function ContactCTASection() {
  const [clinic, setClinic] = useState(fallbackClinic);

  useEffect(() => {
    getClinicSettings().then(setClinic);
  }, []);

  const telLink = `tel:${clinic.phone.replace(/\s/g, "")}`;
  const whatsappLink = `https://wa.me/${clinic.phoneRaw}?text=${encodeURIComponent(clinic.whatsappMessage)}`;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16">
      <div className="relative overflow-hidden rounded-[2.5rem] border bg-gradient-to-br from-brand-deep via-primary to-brand-emerald p-10 text-center md:p-16 shadow-2xl">
        <div className="absolute inset-0 -z-10 opacity-35 bg-dot-pattern" />
        <div className="absolute -left-20 -top-20 hidden h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl md:block animate-pulse" />
        <div className="absolute -right-20 -bottom-20 hidden h-64 w-64 rounded-full bg-white/10 blur-3xl md:block" />
        
        <span className="inline-flex items-center rounded-full bg-white/20 px-3.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase backdrop-blur shadow-sm">
          ✨ Premium Clinic Care
        </span>
        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white md:text-5xl leading-tight">Ready for healthier skin & hair?</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/95 text-xs md:text-sm leading-relaxed">
          Book an appointment or speak with our clinical helpdesk on WhatsApp. Get specialized diagnostics calibrated directly for your skin type.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/95 font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <Link to="/appointment"><CalendarCheck className="mr-2 h-4 w-4" /> Book Appointment</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 font-bold shadow-lg hover:-translate-y-0.5 transition-all">
            <a href={whatsappLink} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Consultation</a>
          </Button>
        </div>
        <div className="mt-6 text-xs text-white/70 font-semibold">
          Or call our clinic directly at <a href={telLink} className="underline hover:text-white">{clinic.phone}</a>
        </div>
      </div>
    </section>
  );
}
