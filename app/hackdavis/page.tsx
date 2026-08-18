import Nav from "../components/Nav";
import HackDavisNav from "../components/HackDavisNav";
import CaseHeroHackDavis from "../components/CaseHeroHackDavis";
import HackDavisOverview from "../components/HackDavisOverview";
import HackDavisDesign from "../components/HackDavisDesign";
import HackDavisDecisions from "../components/HackDavisDecisions";
import HackDavisLive from "../components/HackDavisLive";
import HackDavisImprovements from "../components/HackDavisImprovements";
import HackDavisTakeaways from "../components/HackDavisTakeaways";
import HackDavisMoreProjects from "../components/HackDavisMoreProjects";
import Ending from "../components/Ending";

const MAX_WIDTH = 1440;

export default function HackDavisPage() {
  return (
    <div style={{ background: "#121212", minHeight: "100vh" }}>
      <Nav />
      <HackDavisNav />
      <div style={{ maxWidth: MAX_WIDTH, margin: "0 auto", width: "100%" }}>
        <CaseHeroHackDavis />
        <HackDavisOverview />
        <HackDavisDesign />
        <HackDavisDecisions />
        <HackDavisLive />
        <HackDavisImprovements />
        <HackDavisTakeaways />
        <HackDavisMoreProjects />
      </div>
      <Ending showBackToTop={false} />
    </div>
  );
}