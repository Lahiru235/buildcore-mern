const steps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We discuss your vision, budget, and project requirements to map out a clear initial framework and target delivery timeline.",
  },
  {
    number: "02",
    title: "Planning",
    description:
      "Our architects, in-house engineers, and tradesmen develop precise, comprehensive blueprint specifications and material selection profiles.",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Our expert builders execute construction work on-site, adhering strictly to engineered specifications, rigorous quality standards, and safety guidelines.",
  },
  {
    number: "04",
    title: "Handover",
    description:
      "We complete meticulous clean-up, final rigorous building inspections, and handover keys to your fully certified, ready-to-use structure.",
  },
];

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Methodology</span>
          <h2>Our Proven Construction Process</h2>
          <p>
            A highly disciplined, sequential approach from initial
            consultation to the final physical handover.
          </p>
        </div>

        <div className="process-grid">
          {steps.map((step) => (
            <div className="process-card" key={step.number}>
              <div className="process-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
