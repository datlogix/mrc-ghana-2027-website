import Link from "next/link";
import { categories } from "@/data/categories";

export default function NotFound() {
  return (
    <section className="bg-navy-band relative overflow-hidden text-white">
      <div className="container-x relative py-24 text-center sm:py-32 on-dark">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-4 text-5xl font-extrabold !text-white sm:text-6xl">This robot went off the line.</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">The page you are looking for has moved or does not exist. Let&apos;s get you back on track.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-gold">Back to home</Link>
          <Link href="/categories" className="btn btn-ghost-light">Explore categories</Link>
        </div>
        <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <li key={c.slug}><Link href={`/categories/${c.slug}`} className="inline-block rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-slate-200 hover:border-gold-400 hover:text-white">{c.name}</Link></li>
          ))}
        </ul>
      </div>
      
    </section>
  );
}
