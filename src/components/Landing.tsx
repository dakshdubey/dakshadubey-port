import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <p data-cursor="disable">
              Full-Stack Protocol Active
              <br />
              <span>Architecting Resilient Systems</span>
            </p>
          </div>
          <div className="landing-info">
            <h3>Founder &</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">ARCHITECT</div>
              <div className="landing-h2-2">EVENTOFU</div>
            </h2>
            <h2>
              <div className="landing-h2-info">EVENTOFU</div>
              <div className="landing-h2-info-1">ARCHITECT</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
