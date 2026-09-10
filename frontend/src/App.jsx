import "./components/sections.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import StatsBand from "./components/StatsBand";
import Portfolio from "./components/Portfolio";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Admin from "./components/Admin";

export default function App() {
  if (window.location.pathname === "/admin") {
    return <Admin />;
  }

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Process />
      <StatsBand />
      <Portfolio />
      <Team />
      <Testimonials />
      <Blog />
      <CTA />
      <Footer />
    </div>
  );
}
