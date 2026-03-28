import { useEffect, useState, useRef } from "react";
import "./styles/Career.css";

const Terminal = () => {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineText, setCurrentLineText] = useState("");
    const terminalEndRef = useRef<HTMLDivElement>(null);

    const terminalLines = [
        "$ git clone github.com/dakshdubey/3d-portfolio",
        "Cloning into '3d-portfolio'...",
        "remote: Resolving deltas: 100% (452/452), done.",
        "$ cd 3d-portfolio",
        "$ cat README.md",
        "## Features",
        " - 3D character scene rendering (R3F + Three.js)",
        " - GSAP-powered interactive storytelling",
        " - Responsive one-page protocol layout",
        " - Custom cursor & scroll-driven effects",
        "$ npm install",
        "✔ 789 modules transformed. [4.8s]",
        "$ npm run dev",
        "  VITE v5.4.21 ready in 110 ms",
        "  ➜  Local:   http://localhost:5173/",
        "  ➜  Network: http://protocol.active:5173/",
        "$ protocol --status",
        "Full-Stack Protocol: ONLINE",
        "Neural Gateway: STABLE",
        "Initialize Connection: Done."
    ];

    useEffect(() => {
        let lineIndex = 0;
        let charIndex = 0;
        let timeout: any;

        const typeChar = () => {
            if (lineIndex < terminalLines.length) {
                const line = terminalLines[lineIndex];

                if (charIndex < line.length) {
                    setCurrentLineText((prev) => prev + line[charIndex]);
                    charIndex++;
                    timeout = setTimeout(typeChar, line.startsWith("$") ? 40 : 15);
                } else {
                    setDisplayedLines((prev) => [...prev, line]);
                    setCurrentLineText("");
                    charIndex = 0;
                    lineIndex++;
                    timeout = setTimeout(typeChar, 600); // Pause between lines
                }
            }
        };

        typeChar();
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [displayedLines, currentLineText]);

    return (
        <div className="career-section section-container" id="terminal">
            <div className="career-container">
                <h2 style={{ marginBottom: "30px" }}>
                    Terminal <span>Showcase</span>
                </h2>
                <div
                    style={{
                        backgroundColor: "#0d1117",
                        color: "#a5d6ff",
                        fontFamily: "'Fira Code', 'Courier New', monospace",
                        padding: "0",
                        borderRadius: "12px",
                        border: "1px solid #30363d",
                        minHeight: "400px",
                        fontSize: "13px",
                        lineHeight: "1.6",
                        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
                        overflow: "hidden",
                        position: "relative"
                    }}
                >
                    {/* Terminal Header */}
                    <div style={{
                        backgroundColor: "#161b22",
                        padding: "10px 15px",
                        borderBottom: "1px solid #30363d",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ff5f56" }}></div>
                            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ffbd2e" }}></div>
                            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#27c93f" }}></div>
                        </div>
                        <div style={{ color: "#8b949e", fontSize: "12px", fontWeight: "500" }}>
                            dakshdubey — protocol — zsh
                        </div>
                        <div style={{ width: "40px" }}></div>
                    </div>

                    {/* Terminal Body */}
                    <div style={{ padding: "20px", maxHeight: "450px", overflowY: "auto" }}>
                        {displayedLines.map((line, i) => (
                            <div key={i} style={{
                                color: line.startsWith("$") ? "#7ee787" : line.startsWith("✔") ? "#27c93f" : "#a5d6ff",
                                marginBottom: "2px"
                            }}>
                                {line}
                            </div>
                        ))}
                        <div style={{ color: currentLineText.startsWith("$") ? "#7ee787" : "#a5d6ff" }}>
                            {currentLineText}
                            <span style={{
                                display: "inline-block",
                                width: "8px",
                                height: "15px",
                                backgroundColor: "#7ee787",
                                marginLeft: "4px",
                                animation: "blink 1s step-end infinite",
                                verticalAlign: "middle"
                            }}></span>
                        </div>
                        <div ref={terminalEndRef}></div>
                    </div>
                </div>

                <style>{`
                    @keyframes blink {
                        from, to { opacity: 1; }
                        50% { opacity: 0; }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default Terminal;
