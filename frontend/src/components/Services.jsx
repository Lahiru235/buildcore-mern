import { useEffect, useState } from "react";
import {
  FiHome,
  FiTool,
  FiPenTool,
  FiWatch,
  FiGrid,
  FiZap,
  FiLayers,
} from "react-icons/fi";
import { getServices } from "../api/api";

const iconMap = {
  building: FiHome,
  hammer: FiTool,
  ruler: FiPenTool,
  roof: FiWatch,
  home: FiGrid,
  wrench: FiZap,
  default: FiLayers,
};

const fallbackServices = [
  { title: "Building Construction", description: "Turn your vision into reality with our expert commercial and residential building services, ensuring top-tier engineering standards.", icon: "building" },
  { title: "Renovation", description: "Breathe new life into existing spaces. From layout changes to complete modernizations, we upgrade your structures flawlessly.", icon: "hammer" },
  { title: "Civil Engineering", description: "Expertly managing complex infrastructure works. We handle massive ground-up structures with complete regulatory compliance.", icon: "ruler" },
  { title: "Roofing", description: "Engineered roofing solutions designed to withstand extreme weather conditions, backed by durable industrial materials.", icon: "roof" },
  { title: "Interior", description: "Comprehensive custom fit-outs combining premium materials and layout design to match modern, highly functional standards.", icon: "home" },
  { title: "Electrical & Plumbing", description: "Full-scale mechanical engineering, heavy electrical infrastructure, and structural plumbing built to endure generations.", icon: "wrench" },
];

export default function Services() {
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    getServices()
      .then((data) => data.length && setServices(data))
      .catch(() => setServices(fallbackServices));
  }, []);

  return (
    <section className="section section-alt" id="services">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Services</span>
          <h2>Services Built Around Your Project</h2>
          <p>
            From master planning to mechanical trade integration, we provide
            end-to-end expertise across specialized disciplines.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || iconMap.default;
            return (
              <div className="service-card" key={service.title}>
                <div className="service-icon">
                  <Icon />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
