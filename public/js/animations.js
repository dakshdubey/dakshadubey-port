// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    paddingInner: 0,
    paddingOuter: 0,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Integrate Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Basic Animations & Logic
document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Typewriter Effect ---
    const heroTypingElement = document.getElementById('hero-typing');
    const heroWords = ["System Strategy", "AI Integration", "Robotics", "Space Technology", "Scalable Architecture"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeHero() {
        const currentWord = heroWords[wordIndex];
        if (isDeleting) {
            heroTypingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            heroTypingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % heroWords.length;
            typeSpeed = 500;
        }

        setTimeout(typeHero, typeSpeed);
    }

    if (heroTypingElement) typeHero();

    // --- Terminal Typing Animation (100+ Commands) ---
    const lines = [
        "//  SECTION 1 — PROJECT / SDK / DEV COMMANDS",
        "$ git clone github.com/dakshdubey/evoauth-sdk",
        "$ cd evoauth-sdk",
        "$ npm install",
        "✔ dependencies installed [1.2s]",
        "$ npm run build",
        "✔ build successful: dist/main.js compiled",
        "$ npm test",
        "✔ 42 tests passed [0.8s]",
        "$ npm audit",
        "✔ 0 vulnerabilities found",
        "$ npm publish --access public",
        "✔ evoauth-sdk published successfully",
        "$ node index.js",
        "$ npm version patch",
        "$ npm pack",
        "$ npm run lint",
        "$ npm run format",
        "$ npm run docs",
        "$ npm run coverage",
        "$ npm run benchmark",
        "$ npm run security-check",
        "$ npm run prepublishOnly",
        "$ npm run release",
        "$ npm view evoauth-sdk",
        "$ npm info evo-map-sdk",
        "$ npm deprecate evo-old-sdk",
        "$ npm login",
        "$ npm whoami",
        "$ npm logout",
        "$ npm cache clean --force",
        "$ npm config list",
        "",
        "// SECTION 2 — SECURITY / AUTH / SYSTEM THINKING",
        "$ openssl version",
        "$ openssl rand -hex 32",
        "$ openssl genrsa -out private.key 2048",
        "$ openssl rsa -in private.key -pubout",
        "$ openssl dgst -sha256 file.txt",
        "$ node -e \"require('crypto').randomBytes(32).toString('hex')\"",
        "$ echo $JWT_SECRET",
        "$ export NODE_ENV=production",
        "$ printenv | grep AUTH",
        "$ cat .env",
        "$ chmod 600 .env",
        "$ chmod 700 ./secure",
        "$ id",
        "$ whoami",
        "$ groups",
        "$ ulimit -a",
        "$ ps aux | grep node",
        "$ netstat -tulnp",
        "$ lsof -i :3000",
        "",
        "//  SECTION 3 — ETHICAL HACKING / TESTING VIBE (SAFE)",
        "// ⚠️ Ye sab “testing / learning / audit” context me hain",
        "$ nmap --version",
        "$ nmap -p 80,443 localhost",
        "$ nmap -sS 127.0.0.1",
        "$ curl -I http://localhost",
        "$ curl -X OPTIONS http://localhost/api",
        "$ curl -X GET http://localhost/health",
        "$ curl -X POST http://localhost/login",
        "$ curl -H \"Authorization: Bearer <token>\"",
        "$ http GET localhost/api/status",
        "$ http --headers localhost",
        "$ http OPTIONS localhost",
        "$ nikto -Version",
        "✔ Simulated security scan completed",
        "",
        "//  SECTION 4 — LOGS / MONITORING / PROD FEEL",
        "$ tail -f logs/app.log",
        "$ tail -n 50 logs/auth.log",
        "$ grep ERROR logs/app.log",
        "$ grep WARN logs/app.log",
        "$ journalctl -u nodeapp",
        "$ pm2 list",
        "$ pm2 status",
        "$ pm2 logs",
        "$ pm2 restart all",
        "$ pm2 monit",
        "$ docker ps",
        "$ docker images",
        "$ docker logs api-container",
        "$ uptime",
        "$ df -h",
        "$ free -m",
        "",
        "//  SECTION 5 — HACKER AESTHETIC (PORTFOLIO ONLY)",
        "$ echo \"Initializing secure runtime...\"",
        "✔ Initializing secure runtime...",
        "$ echo \"Loading policy engine...\"",
        "✔ Loading policy engine...",
        "$ echo \"Verifying cryptographic signatures...\"",
        "✔ Verifying cryptographic signatures...",
        "$ echo \"Fail-closed authorization enabled\"",
        "✔ Fail-closed authorization enabled",
        "$ echo \"Policy evaluation: LOCAL\"",
        "✔ Policy evaluation: LOCAL",
        "$ echo \"Latency: 0.8ms\"",
        "✔ Latency: 0.8ms",
        "$ echo \"No network dependency detected\"",
        "✔ No network dependency detected",
        "$ echo \"Security posture: STRONG\"",
        "✔ Security posture: STRONG",
        "$ echo \"All systems operational\"",
        "✔ All systems operational",
        "$ echo \"Build complete. Ready for production.\"",
        "✔ Build complete. Ready for production.",
        "$ _"
    ];

    let termIndex = 0;
    let termCharIndex = 0;
    const termSpeed = 15;
    const terminal = document.getElementById("terminal-output");
    const termContent = document.getElementById("term-content");
    let termStarted = false;

    function typeTerminal() {
        if (termIndex < lines.length) {
            const currentLine = lines[termIndex];
            if (termCharIndex < currentLine.length) {
                if (termContent) termContent.textContent += currentLine.charAt(termCharIndex);
                termCharIndex++;
                setTimeout(typeTerminal, termSpeed);
            } else {
                if (termContent) termContent.textContent += "\n";
                termCharIndex = 0;
                termIndex++;
                if (terminal) terminal.scrollTop = terminal.scrollHeight;
                setTimeout(typeTerminal, 400);
            }
        }
    }

    // --- Terminal Typing Trigger ---
    ScrollTrigger.create({
        trigger: ".terminal-section",
        start: "top 70%",
        onEnter: () => {
            if (!termStarted && termContent) {
                termStarted = true;
                termContent.textContent = "";
                typeTerminal();
            }
        },
        // Ensure it triggers even if already in view
        onUpdate: (self) => {
            if (self.progress > 0 && !termStarted && termContent) {
                termStarted = true;
                termContent.textContent = "";
                typeTerminal();
            }
        }
    });

    // --- 3D Terminal Scroll Straightening ---
    gsap.to(".terminal", {
        scrollTrigger: {
            trigger: ".terminal-section",
            start: "top bottom",
            end: "center center",
            scrub: 0.5
        },
        rotateX: 0,
        y: 0,
        z: 0,
        ease: "power2.out"
    });

    // --- GSAP Animations ---

    // Header Parallax
    gsap.to('.hero-gradient', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 100,
        opacity: 0.2
    });

    // Hero Text Stagger
    const heroTl = gsap.timeline();
    heroTl.from("nav", { y: -50, opacity: 0, duration: 1, ease: "power3.out" })
        .from("h1", { y: 60, opacity: 0, duration: 1.2, ease: "power4.out" }, "-=0.6")
        .from("p.text-lg", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.8")
        .from(".btn-primary, .btn-secondary", { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.4");

    // Section Reveals
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    scrollRevealElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Navbar Active State
    ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: { className: "glass-nav-active", targets: "nav" }
    });

    // Mobile Menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
                gsap.fromTo(mobileLinks, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.4 });
            } else {
                mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            }
        });
        mobileLinks.forEach(link => link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        }));
    }
});
