const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const revealArea = document.getElementById('reveal-area');
    const fullText = `There’s something called journaling… it’s about preserving something personal. And I genuinely want to thank you for teaching me that. I never used to write things down, especially not my dreams. I realized that the first few minutes after waking up are important. If I let other thoughts enter my mind, the dream slowly fades away. After seeing your work, something clicked for me. It feels private. It feels intentional. It feels like something that is ONLY I KNOW. So... coffee? ☕`;

    // 1. Break text into words for the "Echo"
    fullText.split(' ').forEach(word => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'word';
        revealArea.appendChild(span);
    });

    const words = document.querySelectorAll('.word');

    // 2. The Reveal Physics
    window.addEventListener('mousemove', (e) => {
        words.forEach(word => {
            const rect = word.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) { // If mouse is close
                word.classList.add('lit');
                // Auto-fade out after 2 seconds
                setTimeout(() => word.classList.remove('lit'), 2000);
            }
        });
    });

    // 3. Envelope Reveal
    document.getElementById('envelope-overlay').addEventListener('click', () => {
        document.getElementById('bg-music').play().catch(()=>{});
        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        document.getElementById('envelope-overlay').style.display = 'none';
        document.getElementById('echo-container').classList.remove('hidden');
    });

    // 4. Star Background (Canvas for performance)
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = Array.from({ length: 150 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.05
    }));

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        stars.forEach(s => {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
            s.y -= s.speed; // Slow upward drift
            if (s.y < 0) s.y = canvas.height;
        });
        requestAnimationFrame(drawStars);
    }
    drawStars();

    // 5. Button Actions
    document.getElementById('yes-btn').addEventListener('click', () => {
        document.getElementById('echo-container').classList.add('hidden');
        document.getElementById('final-yes').classList.remove('hidden');
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { response: "YES 💕" });
    });

    document.getElementById('no-btn').addEventListener('mouseover', function() {
        this.style.left = Math.random() * 80 + 'vw';
        this.style.top = Math.random() * 80 + 'vh';
        this.style.position = 'fixed';
    });
});
