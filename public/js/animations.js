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
// lenis.on('scroll', ScrollTrigger.update); // Optional: if using pin heavily

// Basic Animations
document.addEventListener('DOMContentLoaded', () => {

    // Header Parallax
    gsap.to('.hero-gradient', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 200,
        opacity: 0.5
    });

    // Hero Text Stagger (Enhanced)
    const heroTl = gsap.timeline();
    heroTl.from("nav", { y: -100, opacity: 0, duration: 1.2, ease: "power4.out" })
        .from("h1", { y: 100, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.8")
        .from("p.max-w-2xl", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(".btn-primary, .btn-secondary", { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.4")
        .from(".opacity-40", { opacity: 0, y: 30, duration: 1 }, "-=0.2");

    // Scroll Animations for Sections
    const sections = gsap.utils.toArray('section:not(:first-child)');

    sections.forEach(section => {
        gsap.from(section.children, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    });

    // Parallax for 3D Cards in Skills
    gsap.to(".float-3d", {
        scrollTrigger: {
            trigger: "#skills",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
        },
        y: -50,
        rotationX: 10
    });

    // Navbar Blur on Scroll
    ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: { className: "glass-nav-active", targets: "nav" }
    });

    // Mobile Menu Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;

            if (isMenuOpen) {
                // Open
                mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
                gsap.fromTo(mobileLinks,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power3.out" }
                );
                // Animate hamburger to X
                // (Simple toggle for now, can be GSAPd too)
            } else {
                // Close
                mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            }
        });

        // Close on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            });
        });
    }
});
