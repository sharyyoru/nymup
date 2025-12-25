import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTitle from '@/components/layout/PageTitle';
import ContactForm from '@/components/sections/ContactForm';

export default function ContactPage() {
  return (
    <>
      <Header variant="solid" />
      <main>
        <PageTitle title="Contact Us" breadcrumb="Contact" />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
