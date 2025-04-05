import HeroSection from '@/app/components/landing/HeroSection';
import FeaturesSection from '@/app/components/landing/FeaturesSection';
import TestimonialsSection from '@/app/components/landing/TestimonialsSection';
import CtaSection from '@/app/components/landing/CtaSection';
import Footer from './components/landing/Footer';



export default function Home() {
  return (
    
    <main className="bg-gray-950">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer/>
    </main>
  );
}