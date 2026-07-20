import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SalaryPredictSection from './sections/SalaryPredictSection';
import SkillPlannerSection from './sections/SkillPlannerSection';
import DecisionHelperSection from './sections/DecisionHelperSection';
import DataDashboardSection from './sections/DataDashboardSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <SalaryPredictSection />
        <SkillPlannerSection />
        <DecisionHelperSection />
        <DataDashboardSection />
      </main>
      <Footer />
    </div>
  );
}
