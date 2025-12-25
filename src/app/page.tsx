import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSlider from '@/components/sections/HeroSlider';
import AboutSection from '@/components/sections/AboutSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import Preloader from '@/components/sections/Preloader';

export default function Home() {
  return (
    <>
      <Preloader />
      <Header variant="transparent" />
      <main>
        <HeroSlider />
        <AboutSection />
        <PortfolioSection />
      </main>
      <Footer />
    </>
  );
}
