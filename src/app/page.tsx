import { Navbar } from '@/components/layout/navbar';
import { Hero } from '@/components/landing/hero';
import { BeforeAfter } from '@/components/landing/before-after';
import { Features } from '@/components/landing/features';
import { HowItWorks } from '@/components/landing/how-it-works';
import { CTA } from '@/components/landing/cta';
import { MayarBadge } from '@/components/landing/mayar-badge';
import { Footer } from '@/components/layout/footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <BeforeAfter />
      <Features />
      <HowItWorks />
      <CTA />
      <MayarBadge />
      <Footer />
    </main>
  );
}
