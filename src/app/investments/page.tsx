import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTitle from '@/components/layout/PageTitle';
import PortfolioSection from '@/components/sections/PortfolioSection';
import Image from 'next/image';
import { getInvestmentsContent } from '@/lib/content';

export default function InvestmentsPage() {
  const investmentsContent = getInvestmentsContent();

  return (
    <>
      <Header variant="solid" />
      <main>
        <PageTitle title={investmentsContent.pageTitle} breadcrumb={investmentsContent.breadcrumb} />

        {/* Intro Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
                <Image
                  src={investmentsContent.heroImage}
                  alt="Investment"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-6">
                {investmentsContent.intro.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {investmentsContent.intro.content}
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <PortfolioSection />
      </main>
      <Footer />
    </>
  );
}
