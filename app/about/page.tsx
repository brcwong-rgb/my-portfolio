import Nav from "../components/Nav";
import AboutSection from "../components/AboutSection";
import Ending from "../components/Ending";

export const metadata = {
  title: "About — Brandon Wong",
  description:
    "UX and motion designer in the SF Bay Area. Currently designing for diagnostics at Curve Biosciences.",
};

export default function AboutPage() {
  return (
    <div style={{ background: "#121212", minHeight: "100vh" }}>
      <Nav />
      <AboutSection />
      <Ending />
    </div>
  );
}