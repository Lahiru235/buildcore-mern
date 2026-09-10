import { useEffect, useState } from "react";
import { getProjects } from "../api/api";

const fallbackProjects = [
  {
    title: "Seaside Residence",
    description:
      "A stunning modern waterfront estate featuring advanced steel framing and extreme-weather coastal resilience solutions.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    status: "Completed",
  },
  {
    title: "Kandy Retail Plaza",
    description:
      "Multi-story complex development incorporating high-efficiency plumbing and structural commercial civil engineering.",
    image:
      "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=900&q=80",
    status: "Ongoing",
  },
  {
    title: "Riverside Bridge Access Road",
    description:
      "Massive scale infrastructural development involving heavy concrete civil works and precise topographical surveying.",
    image:
      "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&w=900&q=80",
    status: "Upcoming",
  },
];

export default function Portfolio() {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    getProjects()
      .then((data) => data.length && setProjects(data))
      .catch(() => setProjects(fallbackProjects));
  }, []);

  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Portfolio</span>
          <h2>Recent Work</h2>
          <p>
            A look at some of our landmark projects across residential,
            commercial, and heavy civil infrastructure.
          </p>
        </div>

        <div className="portfolio-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.title}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <span
                  className={`project-badge ${
                    project.status === "Ongoing"
                      ? "ongoing"
                      : project.status === "Upcoming"
                      ? "upcoming"
                      : ""
                  }`}
                >
                  {project.status?.toUpperCase()}
                </span>
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href="#contact" className="project-link">
                  View Details →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
