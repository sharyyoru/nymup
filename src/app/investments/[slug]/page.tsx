import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTitle from '@/components/layout/PageTitle';
import Image from 'next/image';
import { getInvestmentBySlug, getAllInvestmentSlugs } from '@/lib/content';

interface InvestmentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllInvestmentSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function InvestmentPage({ params }: InvestmentPageProps) {
  const { slug } = await params;
  const investment = getInvestmentBySlug(slug);

  if (!investment) {
    notFound();
  }

  return (
    <>
      <Header variant="solid" />
      <main>
        <PageTitle title={investment.name} breadcrumb="Investments" />

        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Hero Image */}
              {investment.heroImage && (
                <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
                  <Image
                    src={investment.heroImage}
                    alt={investment.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Story Section */}
              <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-6">
                {investment.story.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">{investment.story.content}</p>

              {investment.story.additional && (
                <div className="bg-[#f8f9fa] border-l-4 border-[#c9a96e] p-6 rounded-r-lg mb-12">
                  <p className="text-gray-600 leading-relaxed">{investment.story.additional}</p>
                </div>
              )}

              {/* Vision Section */}
              <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-6 mt-12">
                {investment.vision.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-12">{investment.vision.content}</p>

              {/* Gallery */}
              {investment.gallery && investment.gallery.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {investment.gallery.map((image, index) => (
                    <div key={index} className="relative h-[200px] rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${investment.name} Gallery ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Features */}
              {investment.features && investment.features.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {investment.features.map((feature, index) => (
                    <div key={index} className="bg-[#f8f9fa] p-6 rounded-lg">
                      <h5 className="text-lg font-semibold text-[#1a1a2e] mb-3">{feature.title}</h5>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
