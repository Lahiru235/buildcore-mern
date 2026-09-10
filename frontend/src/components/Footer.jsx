import { FiArrowUp, FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

export default function Footer() {
  const scrollToHome = (event) => {
    event.preventDefault();
    const home = document.getElementById("home");

    if (home) {
      home.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="brand">
              <span className="brand-mark" />
              BUILDCORE
            </a>
            <p>
              Buildcore Construction — building the shape you've always
              imagined.
            </p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><FiFacebook /></a>
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" aria-label="Twitter"><FiTwitter /></a>
              <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
            </div>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#process">How We Work</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#team">Leadership</a></li>
            </ul>
          </div>

          <div>
            <h4>Our Services</h4>
            <ul>
              <li><a href="#services">Building Construction</a></li>
              <li><a href="#services">Renovations</a></li>
              <li><a href="#services">Civil Engineering</a></li>
              <li><a href="#services">Roofing Works</a></li>
              <li><a href="#services">Electrical & Plumbing</a></li>
            </ul>
          </div>

          <div>
            <h4>Contact Info</h4>
            <ul>
              <li style={{ display: "flex", gap: 8 }}>
                <FiMapPin /> 45 Coastal Highway, Negombo
              </li>
              <li style={{ display: "flex", gap: 8 }}>
                <FiPhone /> +94 031 555 9800
              </li>
              <li style={{ display: "flex", gap: 8 }}>
                <FiMail /> contact@buildcore.lk
              </li>
              <li style={{ display: "flex", gap: 8 }}>
                <FiClock /> Mon–Fri: 8:00 AM – 5:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Buildcore Construction. All rights reserved.</span>
          <span style={{ display: "flex", gap: 20 }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </span>
        </div>
      </div>
      <a href="#home" className="back-to-top" onClick={scrollToHome} aria-label="Back to top" title="Back to top">
        <FiArrowUp />
      </a>
    </footer>
  );
}
