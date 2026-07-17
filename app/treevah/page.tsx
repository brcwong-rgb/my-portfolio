import Nav from "../components/Nav";
import CaseHeroTreevah from "../components/CaseHeroTreevah";
import TreevahOverview from "../components/TreevahOverview";
import TreevahBodyLayout from "../components/TreevahBodyLayout";
import InterviewInsights from "../components/InterviewInsights";
import DefineSection from "../components/DefineSection";
import IterationSection from "../components/IterationSection";
import FinalDesignSection from "../components/FinalDesignSection";
import DesignHighlights from "../components/DesignHighlights";
import TreevahReflection from "../components/TreevahReflection";

export default function TreevahPage() {
  return (
    <div style={{ background: "#121212", minHeight: "100vh" }}>
      <Nav />
      <CaseHeroTreevah />
      <TreevahOverview />
      <TreevahBodyLayout
        content={
          <>
            <InterviewInsights />
            <DefineSection />
            <IterationSection />
            <FinalDesignSection />
            <DesignHighlights />
            <TreevahReflection />
          </>
        }
      />
    </div>
  );
}