// Initialize GSAP & ScrollTrigger with Failsafe
function initAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Initialize Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Integrate with GSAP
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }
}

initAnimations();

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

    // --- Terminal Sound System (Web Audio API) ---
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function playTypeSound() {
        if (!audioCtx) audioCtx = new AudioContext();
        
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(150 + Math.random() * 50, audioCtx.currentTime);
        
        gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.05);
    }

    // --- Terminal Typing Animation (100+ Commands) ---
    const lines = [
        "//  SECTION 1 — PROJECT / SDK / DEV COMMANDS",
        "$ git clone github.com/dakshdubey/evoauth-sdk",
        "Cloning into 'evoauth-sdk'...",
        "remote: Enumerating objects: 452, done.",
        "remote: Counting objects: 100% (452/452), done.",
        "Receiving objects: 100% (452/452), 1.24 MiB | 4.2 MB/s, done.",
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
        "✔ evoauth-sdk@1.0.0 published successfully",
        "$ node index.js",
        "Server listening on port 3000 (production mode)",
        "$ npm version patch",
        "v1.0.1",
        "$ npm pack",
        "evoauth-sdk-1.0.1.tgz created",
        "$ npm run lint",
        "✔ No linting errors found.",
        "$ npm run format",
        "✔ All files formatted.",
        "$ npm run docs",
        "✔ JSDoc documentation generated in /docs",
        "$ npm run coverage",
        "✔ Code coverage: 98.4%",
        "$ npm run benchmark",
        "✔ Benchmark: 1.2M ops/sec",
        "$ npm run security-check",
        "✔ Scanning dependencies... No threats detected.",
        "$ npm run release",
        "✔ Creating release v1.0.1... Done.",
        "$ npm view evoauth-sdk",
        "{ name: 'evoauth-sdk', version: '1.0.1', ... }",
        "",
        "// SECTION 2 — SECURITY / AUTH / SYSTEM THINKING",
        "$ openssl genrsa -out private.key 2048",
        "Generating RSA private key, 2048 bit long modulus...",
        "$ openssl rsa -in private.key -pubout",
        "-----BEGIN PUBLIC KEY-----",
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxS...",
        "$ node -e \"require('crypto').randomBytes(32).toString('hex')\"",
        "7fb5c4e9d0a2b4... (secure hex seed)",
        "$ echo $JWT_SECRET",
        "********************************",
        "$ export NODE_ENV=production",
        "$ cat .env",
        "AUTH_MODE=biometric",
        "POLICY_ENGINE=local_closed",
        "$ chmod 600 .env",
        "✔ Permissions updated",
        "$ ps aux | grep node",
        "daksh   1245  0.2  1.4  node server.js",
        "$ lsof -i :3000",
        "COMMAND   PID   USER   TYPE  NODE NAME",
        "node     1245  daksh   IPv4  LISTEN *:3000",
        "",
        "$ nmap -p 80,443 localhost",
        "PORT    STATE SERVICE",
        "80/tcp  open  http",
        "443/tcp open  https",
        "$ curl -X GET http://localhost/health",
        "{ \"status\": \"UP\", \"uptime\": \"42d 12h\" }",
        "$ tail -f logs/app.log",
        "[INFO] Policy evaluation: SUCCESS (0.4ms)",
        "[WARN] Rate limit approaching for node-124",
        "[INFO] Cryptographic signature verified.",
        "$ pm2 list",
        "┌────┬───────┬────────┬─────────┬────────┬─────┬────────┐",
        "│ id │ name  │ status │ restart │ uptime │ cpu │ mem    │",
        "├────┼───────┼────────┼─────────┼────────┼─────┼────────┤",
        "│ 0  │ api   │ online │ 0       │ 42d    │ 0%  │ 45.2mb │",
        "└────┴───────┴────────┴─────────┴────────┴─────┴────────┘",
        "$ docker ps",
        "CONTAINER ID   IMAGE      STATUS          PORTS",
        "a1b2c3d4e5f6   evo-auth   Up 14 hours     3000-\u003e3000",
        "$ echo \"Security posture: STRONG\"",
        "✔ Security posture: STRONG",
        "$ echo \"All systems operational\"",
        "✔ All systems operational",
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
            
            // If it's a command ($), type it. If it's output, show it immediately or faster.
            const isCommand = currentLine.startsWith('$');
            const isComment = currentLine.startsWith('//');
            
            if (termCharIndex < currentLine.length) {
                if (termContent) termContent.textContent += currentLine.charAt(termCharIndex);
                termCharIndex++;
                
                // Play sound for commands/chars, not empty lines
                if (isCommand || currentLine.trim()) playTypeSound();
                
                const speed = (isCommand || isComment) ? termSpeed : 2;
                setTimeout(typeTerminal, speed);
            } else {
                if (termContent) termContent.textContent += "\n";
                termCharIndex = 0;
                termIndex++;
                if (terminal) terminal.scrollTop = terminal.scrollHeight;
                
                const nextDelay = standsStill(currentLine) ? 1000 : 300;
                setTimeout(typeTerminal, nextDelay);
            }
        }
    }

    function standsStill(line) {
        return line.includes('✔') || line.includes('Cloning') || line.startsWith('//');
    }

    window.typeTerminal = typeTerminal;

    // --- Terminal Typing Trigger ---
    ScrollTrigger.create({
        trigger: ".terminal-section",
        start: "top 95%", 
        onEnter: () => {
            if (!termStarted && termContent) {
                termStarted = true;
                termContent.textContent = ""; 
                typeTerminal();
            }
        },
        onEnterBack: () => {
             if (!termStarted && termContent) {
                termStarted = true;
                termContent.textContent = ""; 
                typeTerminal();
            }
        }
    });

    // Failsafe: Start if already significantly in view
    const termSection = document.querySelector('.terminal-section');
    if (termSection) {
        const rect = termSection.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            if (!termStarted && termContent) {
                termStarted = true;
                termContent.textContent = "";
                typeTerminal();
            }
        }
    }

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
