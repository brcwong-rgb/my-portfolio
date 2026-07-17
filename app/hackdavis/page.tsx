import Nav from "../components/Nav";
import HackDavisNav from "../components/HackDavisNav";
import CaseHeroHackDavis from "../components/CaseHeroHackDavis";
import HackDavisOverview from "../components/HackDavisOverview";
import HackDavisDesign from "../components/HackDavisDesign";
import HackDavisDecisions from "../components/HackDavisDecisions";
import HackDavisLive from "../components/HackDavisLive";
import HackDavisImprovements from "../components/HackDavisImprovements";
import HackDavisTakeaways from "../components/HackDavisTakeaways";

export default function HackDavisPage() {
  return (
    <div style={{ background: "#121212", minHeight: "100vh" }}>
      <Nav />
      <HackDavisNav />
      <CaseHeroHackDavis />
      <HackDavisOverview />
      <HackDavisDesign />
      <HackDavisDecisions />
      <HackDavisLive />
      <HackDavisImprovements />
      <HackDavisTakeaways />
    </div>
  );
}