import Nav from "./components/Nav";
import Hero from "./components/Hero";
import PortfolioSection from "./components/PortfolioSection";
import Ending from "./components/Ending";

export default function Home() {
  return (
    <div style={{ background: "#121212", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: 80 }}>
        <Hero />
      </div>
      <PortfolioSection />
      <Ending />
    </div>
  );
}