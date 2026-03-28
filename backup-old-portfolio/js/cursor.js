document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');

    // Only active on non-touch devices ideally, but check simple condition
    if (!cursor || !cursorBlur) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let blurX = 0;
    let blurY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        // Main cursor - tight follow
        const dist = 0.2;
        cursorX += (mouseX - cursorX) * dist;
        cursorY += (mouseY - cursorY) * dist;

        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

        // Blur trail - loose follow
        const blurDist = 0.08;
        blurX += (mouseX - blurX) * blurDist;
        blurY += (mouseY - blurY) * blurDist;

        cursorBlur.style.transform = `translate3d(${blurX}px, ${blurY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(animate);
    }
    animate();

    // Hover Effects
    const hoverables = document.querySelectorAll('a, button, .project-card, input, textarea');

    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('scale-[3]', 'bg-white', 'mix-blend-difference');
            cursorBlur.classList.add('scale-150', 'bg-blue-400/30');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('scale-[3]', 'bg-white', 'mix-blend-difference');
            cursorBlur.classList.remove('scale-150', 'bg-blue-400/30');
        });
    });
});
