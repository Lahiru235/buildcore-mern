export default function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div className="about-copy">
          <span className="eyebrow">Our Legacy</span>
          <h2>Twenty Years of Building It Right</h2>
          <p>
            Buildcore started as a three-person crew in a rented garage.
            Today we're a full-service construction company with in-house
            engineers, architects, and skilled tradespeople — but we still do
            every job the same way we did on day one: prepared, and
            accountable for the result.
          </p>
          <a href="#services" className="btn btn-outline-dark">
            Learn More
          </a>
        </div>

        <div className="about-media">
          <div className="about-stats">
            <div className="stat-card">
              <strong>20+</strong>
              <span>Years Experience</span>
              <small>Two decades of continuous, high-performance construction across the island.</small>
            </div>
            <div className="stat-card">
              <strong>500+</strong>
              <span>Projects Delivered</span>
              <small>Successfully engineered solutions delivered on budget and on schedule.</small>
            </div>
          </div>
          <div className="about-photo">
            <img
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=700&q=80"
              alt="Buildcore engineer on site"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
