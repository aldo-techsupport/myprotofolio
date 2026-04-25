import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import VisitorTracker from "@/components/VisitorTracker";
import { getCVData } from "@/lib/getCVData";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const cvData = await getCVData();
  
  return (
    <main className="relative bg-[#0A0A0F] min-h-screen">
      <VisitorTracker />
      <Navbar />
      <HeroSection data={cvData} />
      <AboutSection data={cvData} />
      <ExperienceSection data={cvData} />
      <ProjectsSection data={cvData} />
      <SkillsSection data={cvData} />
      <EducationSection data={cvData} />
      <ContactSection data={cvData} />
      <Footer />
    </main>
  );
}
