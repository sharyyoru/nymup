import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTitle from '@/components/layout/PageTitle';
import { getPagesContent } from '@/lib/content';

export default function PrivacyPolicyPage() {
  const pagesContent = getPagesContent();
  const { privacyPolicy } = pagesContent;

  return (
    <>
      <Header variant="solid" />
      <main>
        <PageTitle title={privacyPolicy.pageTitle} breadcrumb={privacyPolicy.breadcrumb} />

        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {privacyPolicy.sections.map((section, index) => (
                <div key={index} className="mb-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-6">
                    {section.title}
                  </h3>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
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
