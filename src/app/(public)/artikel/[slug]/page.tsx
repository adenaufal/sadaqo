import { notFound } from 'next/navigation';
import { getArticleBySlug, articles } from '@/lib/articles';
import { Footer } from '@/components/layout/footer';
import { Moon, ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

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

  // Convert markdown-ish content to simple paragraphs
  const sections = article.content.split('\n\n').filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-emerald flex items-center justify-center">
              <Moon className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold font-heading text-gradient-emerald">Sadaqo</span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Beranda
            </Link>
          </Button>
        </div>
      </header>

      {/* Article */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold font-heading leading-tight mb-3">
            {article.title}
          </h1>
          <p className="text-muted-foreground text-base mb-4">{article.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.publishedAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime} baca
            </span>
          </div>
        </div>

        <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-li:text-muted-foreground prose-hr:border-border">
          {sections.map((section, i) => {
            if (section.startsWith('## ')) {
              return <h2 key={i}>{section.replace('## ', '')}</h2>;
            }
            if (section.startsWith('**') && section.endsWith('**')) {
              return <p key={i}><strong>{section.slice(2, -2)}</strong></p>;
            }
            if (section.startsWith('---')) {
              return <hr key={i} />;
            }
            if (section.includes('\n') && section.split('\n').every(l => l.startsWith('- ') || l.startsWith('1.') || /^\d+\./.test(l))) {
              const items = section.split('\n').filter(Boolean);
              const isOrdered = /^\d+\./.test(items[0]);
              const Tag = isOrdered ? 'ol' : 'ul';
              return (
                <Tag key={i}>
                  {items.map((item, j) => (
                    <li key={j}>{item.replace(/^[-\d]+[.)]\s*/, '')}</li>
                  ))}
                </Tag>
              );
            }
            // Handle bold inline
            const parts = section.split(/\*\*(.+?)\*\*/g);
            return (
              <p key={i}>
                {parts.map((part, j) =>
                  j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                )}
              </p>
            );
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Bantu masjid Anda kelola donasi dengan transparan
          </p>
          <Button asChild className="gradient-emerald text-white">
            <Link href="/register">Mulai Sekarang, Gratis</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
