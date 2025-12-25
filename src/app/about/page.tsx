import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTitle from '@/components/layout/PageTitle';
import Image from 'next/image';
import Link from 'next/link';
import { getAboutContent } from '@/lib/content';

export default function AboutPage() {
  const aboutContent = getAboutContent();
  const { heroSection, mainContent } = aboutContent;

  return (
    <>
      <Header variant="solid" />
      <main>
        <PageTitle title={aboutContent.pageTitle} breadcrumb={aboutContent.breadcrumb} />

        {/* Hero About Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <Image
                  src="/assets/img/shape/square-1.png"
                  alt="Shape"
                  width={100}
                  height={100}
                  className="absolute -top-4 -left-4 opacity-20"
                />
                <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
                  <Image
                    src={heroSection.image}
                    alt="About Niyamo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="pl-0 lg:pl-12">
                <h6 className="text-[#c9a96e] text-sm uppercase tracking-wider mb-3">
                  {heroSection.semiTitle}
                </h6>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a2e] mb-6">
                  {heroSection.title}
                </h2>
                <div
                  className="text-gray-600 leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{ __html: heroSection.description }}
                />
                <div
                  className="text-gray-600 leading-relaxed mb-8"
                  dangerouslySetInnerHTML={{ __html: heroSection.content }}
                />
                <div className="flex flex-wrap gap-4">
                  {heroSection.buttons.map((button, index) => (
                    <Link
                      key={index}
                      href={button.link}
                      className="border-2 border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white px-6 py-3 rounded transition-colors font-medium"
                    >
                      {button.text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-20 md:py-28 bg-[#f8f9fa]">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-12">
                <Image
                  src={mainContent.heroImage}
                  alt="Portfolio"
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-6">
                {mainContent.sections[0].title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-12">
                {mainContent.sections[0].content}
              </p>

              {/* Gallery 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {mainContent.gallery.map((image, index) => (
                  <div key={index} className="relative h-[200px] rounded-lg overflow-hidden">
                    <Image src={image} alt={`Gallery ${index + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>

              {/* Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {mainContent.pillars.map((pillar, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <h5 className="text-lg font-semibold text-[#1a1a2e] mb-3">
                      {pillar.number}. {pillar.title}
                    </h5>
                    <p className="text-gray-600 text-sm leading-relaxed">{pillar.content}</p>
                  </div>
                ))}
              </div>

              {/* Gallery 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {mainContent.gallery2.map((image, index) => (
                  <div key={index} className="relative h-[200px] rounded-lg overflow-hidden">
                    <Image src={image} alt={`Gallery ${index + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>

              {/* Additional Sections */}
              {mainContent.sections.slice(1).map((section, index) => (
                <div key={index} className="mb-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-6">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
