import Nav from "../components/Nav";
import CaseHeroCurve from "../components/CaseHeroCurve";
import MoreProjects from "../components/MoreProjects";
import Ending from "../components/Ending";

export default function CurvePage() {
  return (
    <div style={{ background: "#121212", minHeight: "100vh" }}>
      <Nav />
      <CaseHeroCurve />
      <MoreProjects exclude="curve" />
      <Ending showBackToTop={false} />
    </div>
  );
}