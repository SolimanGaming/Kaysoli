// Glowing links hover effect
document.querySelectorAll('.glow-link, .links a').forEach(link => {
    link.addEventListener('mousemove', e => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        link.style.boxShadow = `${x / 2}px ${y / 2}px 20px rgba(255,255,255,0.9)`;
    });
    link.addEventListener('mouseleave', () => {
        link.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.3)";
    });
});



