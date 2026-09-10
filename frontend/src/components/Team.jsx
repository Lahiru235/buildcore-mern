import { useEffect, useState } from "react";
import { getTeam } from "../api/api";

const fallbackTeam = [
  {
    name: "John Smith",
    role: "Founder & Principal Engineer",
    bio: "Over 25 years of civil engineering excellence. John founded Buildcore with a commitment to uncompromised construction quality.",
    photo:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Emily Johnson",
    role: "Lead Architect",
    bio: "A visionary architect specializing in green, sustainable structural designs and advanced structural integration.",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Michael Davis",
    role: "Head of Project Management",
    bio: "Master planner who keeps large-scale commercial and civil developments running precisely on time and exactly within budget margins.",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
  },
];

export default function Team() {
  const [team, setTeam] = useState(fallbackTeam);

  useEffect(() => {
    getTeam()
      .then((data) => data.length && setTeam(data))
      .catch(() => setTeam(fallbackTeam));
  }, []);

  return (
    <section className="section section-alt" id="team">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Leadership</span>
          <h2>Meet Our Team</h2>
          <p>
            The industry professionals guiding our architectural, civil
            engineering, and construction management efforts.
          </p>
        </div>

        <div className="team-grid">
          {team.map((member) => (
            <div className="team-card" key={member.name}>
              <div className="team-photo">
                <img src={member.photo} alt={member.name} />
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <span className="team-role">
                  {member.role.toUpperCase()}
                </span>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
