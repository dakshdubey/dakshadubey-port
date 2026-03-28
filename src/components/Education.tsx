import "./styles/Career.css";

const Education = () => {
    return (
        <div className="career-section section-container" id="education">
            <div className="career-container">
                <h2>
                    Academic <span>Foundation</span>
                </h2>
                <div className="career-info">
                    <div className="career-timeline">
                        <div className="career-dot"></div>
                    </div>
                    <div className="career-info-box">
                        <div className="career-info-in">
                            <div className="career-role">
                                <h4>Parul University</h4>
                                <h5>Bachelor of Technology (B.Tech)</h5>
                            </div>
                            <h3>Aug 2024 - Jun 2028</h3>
                        </div>
                        <p>
                            IEP CSE Microsoft Integration, focusing on full-stack development, cloud technologies, and enterprise solutions.
                        </p>
                    </div>
                    <div className="career-info-box">
                        <div className="career-info-in">
                            <div className="career-role">
                                <h4>PIERC - Parul University</h4>
                                <h5>Startup School Program</h5>
                            </div>
                            <h3>Completed Sep 2024</h3>
                        </div>
                        <p>
                            Intensive entrepreneurship program covering startup fundamentals, business strategy, and execution frameworks.
                        </p>
                    </div>
                    <div className="career-info-box">
                        <div className="career-info-in">
                            <div className="career-role">
                                <h4>Microsoft</h4>
                                <h5>Azure Data Fundamentals DP900</h5>
                            </div>
                            <h3>Issued Mar 2026</h3>
                        </div>
                        <p>
                            Learned core data concepts and how they are implemented using Microsoft Azure data services.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Education;
