import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { LoanTypesSection } from '@/components/LoanTypesSection';
import { DocumentsSection } from '@/components/DocumentsSection';
import { EligibilitySection } from '@/components/EligibilitySection';
import { LoanCalculator } from '@/components/LoanCalculator';
import { ApplicationForm } from '@/components/ApplicationForm';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <LoanTypesSection />
        <DocumentsSection />
        <EligibilitySection />
        <LoanCalculator />
        <ApplicationForm />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
