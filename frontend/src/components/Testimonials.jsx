import { useEffect, useState } from "react";
import { getTestimonials } from "../api/api";

const fallbackTestimonials = [
  {
    quote:
      "Buildcore transformed our commercial site. Anushka's architectural plans and Sanjeewa's project tracking kept our commercial warehouse ahead of schedule. Truly elite work.",
    name: "Dilani Fernando",
    title: "Managing Director, Landmark Holdings",
  },
  {
    quote:
      "We hired Buildcore for our home construction. They were entirely accountable from foundation to roofing handover. No hidden costs. On time. Built correctly.",
    name: "Ruwan Perera",
    title: "Residential Homeowner, Negombo",
  },
];

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    getTestimonials()
      .then((data) => data.length && setTestimonials(data))
      .catch(() => setTestimonials(fallbackTestimonials));
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Testimonials</span>
          <h2>Client Partnerships Built on Trust</h2>
          <p>
            What our commercial clients and residential homeowners say about
            working with Buildcore.
          </p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <p className="quote">"{t.quote}"</p>
              <div className="testimonial-person">
                <div className="testimonial-avatar">{initials(t.name)}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
