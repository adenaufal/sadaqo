import { notFound } from 'next/navigation';
import { getArticleBySlug, articles } from '@/lib/articles';
import { Footer } from '@/components/layout/footer';
import { Moon, ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Artikel Tidak Ditemukan' };
  return {
    title: article.title,
    description: article.description,
  };
}

export default async function ArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-background">

      {/* ── Sticky Nav ── */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-emerald flex items-center justify-center">
              <Moon className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold font-heading text-gradient-emerald text-sm">Sadaqo</span>
          </Link>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Link href="/">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Beranda
            </Link>
          </Button>
        </div>
      </header>

      <main>
        {/* ── Article Hero ── */}
        <div className="border-b border-border/40 bg-muted/20 py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Category pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/15 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
              <Moon className="w-3 h-3" aria-hidden="true" />
              Panduan Islami
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading leading-tight tracking-tight mb-5" style={{ textWrap: 'balance' } as React.CSSProperties}>
              {article.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-[55ch]">
              {article.description}
            </p>

            {/* Meta row */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                {new Date(article.publishedAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className="mx-3 text-border">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                {article.readingTime} baca
              </span>
            </div>
          </div>
        </div>

        {/* ── Article Body ── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="prose prose-base max-w-none dark:prose-invert
            prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-5
            prose-p:text-foreground/80 prose-p:leading-[1.85] prose-p:text-base prose-p:my-5
            prose-strong:text-foreground prose-strong:font-semibold
            prose-li:text-foreground/80 prose-li:leading-[1.75] prose-li:my-1.5
            prose-ul:my-5 prose-ol:my-5 prose-ul:space-y-1 prose-ol:space-y-1
            prose-hr:border-border/50 prose-hr:my-10
            prose-a:text-primary prose-a:underline-offset-2
            prose-em:text-foreground/70
            prose-blockquote:border-l-2 prose-blockquote:border-primary/40 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-sm prose-blockquote:text-muted-foreground">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>

          {/* ── CTA Block ── */}
          <div className="mt-16 rounded-2xl bg-primary/5 border border-primary/15 p-8 lg:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="font-bold font-heading text-lg mb-1">
                  Kelola Donasi Masjid Anda dengan Transparan
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                  Buat kampanye zakat dalam 5 menit. Setiap transaksi tercatat publik — jamaah bisa audit kapan saja.
                </p>
              </div>
              <Button asChild size="lg" className="gradient-emerald text-white shrink-0 h-11 px-7">
                <Link href="/register">Mulai Sekarang, Gratis</Link>
              </Button>
            </div>
          </div>

          {/* ── Back link ── */}
          <div className="mt-10 pt-8 border-t border-border/40">
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -ml-2">
              <Link href="/">
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                Kembali ke Beranda
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
