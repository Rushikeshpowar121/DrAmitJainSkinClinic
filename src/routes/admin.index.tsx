import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarCheck, Eye, MessageSquare, Star, TrendingUp, Clock, User, Phone, Mail } from "lucide-react";
import { getServices, getBlogs, getTestimonials } from "@/lib/firebaseServices";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ services: 0, blogs: 0, testimonials: 0 });

  useEffect(() => {
    async function loadData() {
      try {
        // Load recent appointments
        const apptsQuery = query(collection(db, "appointments"), orderBy("createdAt", "desc"), limit(6));
        const apptsSnap = await getDocs(apptsQuery);
        const apptsList: any[] = [];
        apptsSnap.forEach((doc) => {
          apptsList.push({ id: doc.id, ...doc.data() });
        });
        setAppointments(apptsList);

        // Load collection counts
        const sList = await getServices();
        const bList = await getBlogs();
        const tList = await getTestimonials();
        setCounts({
          services: sList.length,
          blogs: bList.length,
          testimonials: tList.length,
        });
      } catch (error) {
        console.error("Error loading admin dashboard stats: ", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const stats = [
    { label: "Total Bookings", value: appointments.length.toString(), icon: CalendarCheck, trend: "Live registry" },
    { label: "Avg. Google Rating", value: "4.8", icon: Star, trend: "140+ reviews" },
    { label: "Clinic Services", value: counts.services.toString(), icon: Eye, trend: "Active treatments" },
    { label: "Testimonials", value: counts.testimonials.toString(), icon: MessageSquare, trend: "Verified" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Clinic CMS Dashboard</h1>
        <p className="text-sm text-muted-foreground">Manage your clinic contents and track incoming patient appointments in real-time.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border bg-white/90 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{s.label}</span>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 text-3xl font-extrabold tracking-tight">{s.value}</div>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-primary/80">
              <TrendingUp className="h-3 w-3" /> {s.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white/90 p-6 lg:col-span-2 shadow-sm">
          <h2 className="text-base font-extrabold tracking-tight">Recent Booking Inquiries</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time incoming appointments submitted by website patients.</p>
          
          {loading ? (
            <div className="py-10 text-center text-sm text-muted-foreground">Loading inquiries...</div>
          ) : appointments.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground border border-dashed rounded-xl mt-4">
              No appointments received yet. The system is listening for bookings.
            </div>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase tracking-wider border-b">
                  <tr>
                    <th className="pb-2 font-bold">Patient</th>
                    <th className="pb-2 font-bold">Service Requested</th>
                    <th className="pb-2 font-bold">Preferred Date</th>
                    <th className="pb-2 font-bold">Email / Phone</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {appointments.map((a) => (
                    <tr key={a.id} className="text-xs hover:bg-secondary/20 transition-colors">
                      <td className="py-3 font-bold text-foreground flex items-center gap-1.5">
                        <User className="h-3 w-3 text-primary" /> {a.name}
                      </td>
                      <td className="py-3 text-muted-foreground font-semibold">{a.service}</td>
                      <td className="py-3 font-bold text-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3 text-primary" /> {a.preferredDate}
                      </td>
                      <td className="py-3 text-muted-foreground">
                        <div className="font-semibold">{a.phone}</div>
                        <div className="text-[10px]">{a.email}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="rounded-2xl border bg-white/90 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-extrabold tracking-tight">Database Index</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Quick lookup sizing for seeded collections.</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold text-muted-foreground">Active Treatments</span>
                <span className="font-extrabold text-foreground">{counts.services}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold text-muted-foreground">Blog Articles</span>
                <span className="font-extrabold text-foreground">{counts.blogs}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold text-muted-foreground">Verified Reviews</span>
                <span className="font-extrabold text-foreground">{counts.testimonials}</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-6 rounded-xl bg-secondary/40 p-4 border text-[11px] text-muted-foreground leading-relaxed">
            <strong className="text-primary font-bold block mb-1">💡 CMS Replication Note:</strong>
            To reuse this doctor website template, simply copy this repository, change the keys in `.env`, and load the homepage. The database will auto-seed automatically!
          </div>
        </div>
      </div>
    </div>
  );
}