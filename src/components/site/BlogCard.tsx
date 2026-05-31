import { Link } from "@tanstack/react-router";
import type { BlogPost } from "@/lib/data";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-white/80 transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img src={post.cover} alt={post.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-primary">{post.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {post.readMins} min read</div>
        <h3 className="mt-2 text-lg font-semibold tracking-tight">{post.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="mt-4 text-sm font-medium text-primary">Read article →</div>
      </div>
    </Link>
  );
}