import Nav from "../components/Nav";
import CaseHeroSJCC from "../components/CaseHeroSJCC";
import CaseOverview from "../components/CaseOverview";
import CaseBodyLayout from "../components/CaseBodyLayout";
import ShotListSection from "../components/ShotListSection";
import FootageListSection from "../components/FootageListSection";
import DraftFeedbackSection from "../components/DraftFeedbackSection";
import ReflectionSection from "../components/ReflectionSection";

export default function SJCCPage() {
  return (
    <div style={{ background: "#121212", minHeight: "100vh" }}>
      <Nav />
      <CaseHeroSJCC />
      <CaseOverview />
      <CaseBodyLayout
        content={
          <>
            <ShotListSection />
            <FootageListSection />
            <DraftFeedbackSection />
            <ReflectionSection />
          </>
        }
      />
    </div>
  );
}