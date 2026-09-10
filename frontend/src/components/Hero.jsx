import { FiPhone } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="hero">
      <div
        className="hero-bg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="container">
        <span className="eyebrow">Professional Building Solutions</span>
        <h1>We Build What You Imagine</h1>
        <p>
          Buildcore Construction turns blueprints into buildings people
          trust — on time, on budget, and built to last. From foundation to
          finish, we manage every stage of your project so you don't have to.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">
            Get a Quote
          </a>
          <a href="tel:+94112345678" className="hero-call">
            <FiPhone /> Call Us
          </a>
        </div>
      </div>
      <div className="hero-trust">
        <div className="container">
          Trusted by 150+ businesses and homeowners across the region.
        </div>
      </div>
    </section>
  );
}
