import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarCheck, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { getServices, getClinicSettings, createAppointment } from "@/lib/firebaseServices";
import { clinic as fallbackClinic } from "@/lib/clinic";
import { services as fallbackServices } from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/appointment")({
  head: () => ({
    meta: [
      { title: "Book Appointment | Dr Jain's Skin Care Clinic" },
      { name: "description", content: "Book an appointment online with Dr. Amit Jain — dermatologist in Katraj, Pune." },
    ],
    links: [{ rel: "canonical", href: "/appointment" }],
  }),
  component: AppointmentPage,
});

const slots = ["10:30 AM", "11:30 AM", "12:30 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"];

function AppointmentPage() {
  const [done, setDone] = useState(false);
  const [time, setTime] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [services, setServices] = useState(fallbackServices);
  const [clinic, setClinic] = useState(fallbackClinic);
  const [booking, setBooking] = useState(false);

  // Input states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    getServices().then(setServices);
    getClinicSettings().then(setClinic);
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !service || !date) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setBooking(true);
    try {
      const payload = {
        name,
        phone,
        email,
        service,
        preferredDate: `${date} at ${time || "TBD"}`,
        message: `Age: ${age || "N/A"}. Description: ${notes || "None"}`
      };
      await createAppointment(payload);
      toast.success("Appointment request received successfully!");
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      toast.error("Booking error: " + err.message);
    } finally {
      setBooking(false);
    }
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Appointment"
        title={<>Book your <span className="text-gradient">consultation</span></>}
        description="A 25-minute personalised consultation with Dr. Amit Jain."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Appointment" }]}
      />
      <section className="mx-auto max-w-5xl px-4 py-12">
        {done ? (
          <div className="rounded-3xl border bg-white/90 p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold">Appointment requested</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">Thank you! Our team will confirm your slot via WhatsApp / phone shortly. For urgent help, call {clinic.phone}.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Button onClick={() => {
                setDone(false);
                setName("");
                setPhone("");
                setEmail("");
                setAge("");
                setDate("");
                setNotes("");
                setTime("");
                setService("");
              }} variant="outline" className="rounded-full">Book another</Button>
              <Button asChild className="rounded-full"><Link to="/">Back to home</Link></Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 rounded-3xl border bg-white/85 p-6 shadow-sm md:p-10"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" placeholder="+91" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" min={1} max={120} value={age} onChange={(e) => setAge(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label>Service *</Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select a service" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Consultation</SelectItem>
                    {services.map((s) => <SelectItem key={s.slug} value={s.slug}>{s.title}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Preferred Date *</Label>
                <Input id="date" required type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="mt-1.5" />
              </div>
            </div>

            <div>
              <Label>Preferred Time *</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {slots.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setTime(s)}
                    className={`rounded-full border px-4 py-1.5 text-sm transition ${time === s ? "bg-primary text-primary-foreground border-primary" : "bg-white/70 hover:bg-white"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Brief description of your concern</Label>
              <Textarea id="notes" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1.5" />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">By booking, you agree to our clinic policies.</p>
              <Button type="submit" disabled={booking} size="lg" className="rounded-full">
                {booking ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarCheck className="mr-2 h-4 w-4" />}
                Confirm Booking
              </Button>
            </div>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}