import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTitle from '@/components/layout/PageTitle';
import TeamSection from '@/components/sections/TeamSection';
import { getTeamContent } from '@/lib/content';

export default function TeamPage() {
  const teamContent = getTeamContent();

  return (
    <>
      <Header variant="solid" />
      <main>
        <PageTitle 
          title={teamContent.pageTitle} 
          breadcrumb={teamContent.breadcrumb}
          backgroundImage={teamContent.heroImage}
        />
        <TeamSection />
      </main>
      <Footer />
    </>
  );
}
