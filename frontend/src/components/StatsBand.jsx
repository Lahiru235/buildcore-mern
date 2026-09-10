const stats = [
  { value: "20+", label: "Years in Business" },
  { value: "500+", label: "Projects Completed" },
  { value: "85+", label: "Team Members" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function StatsBand() {
  return (
    <section className="stats-band">
      <div className="container">
        {stats.map((s) => (
          <div className="stats-band-item" key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
