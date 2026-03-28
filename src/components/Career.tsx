import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Director</h4>
                <h5>Eventofu</h5>
              </div>
              <h3>Jun 2025 - Present</h3>
            </div>
            <p>
              Leading strategic direction and business development for the SaaS-based B2B2C event-tech platform.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Founder & CEO</h4>
                <h5>Eventofu</h5>
              </div>
              <h3>Jan 2024 - Present</h3>
            </div>
            <p>
              Leading the overall vision, product strategy, and business growth of the technology-driven event management platform. Building scalable systems to connect users with trusted vendors while ensuring a smooth, transparent booking experience.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Development Intern</h4>
                <h5>Eduexpose.in</h5>
              </div>
              <h3>May 2025 - Jul 2025</h3>
            </div>
            <p>
              Focused on full-stack development and enhancing platform UI/UX.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intern</h4>
                <h5>ArctikkCircle</h5>
              </div>
              <h3>Jan 2025 - Apr 2025</h3>
            </div>
            <p>
              Gained hands-on experience in full-stack development and leadership within a hybrid environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
