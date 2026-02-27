const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {

    const revealArea = document.getElementById('reveal-area');

    const fullText = `There’s something called journaling… it’s about preserving something personal. And I genuinely want to thank you for teaching me that. I never used to write things down, especially not my dreams. I realized that the first few minutes after waking up are important. If I let other thoughts enter my mind, the dream slowly fades away. After seeing your work, something clicked for me. It feels private. It feels intentional. It feels like something that is ONLY I KNOW. So... coffee? ☕`;

    fullText.split(' ').forEach(word => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'word';
        revealArea.appendChild(span);
    });

    const words = document.querySelectorAll('.word');

    window.addEventListener('mousemove', (e) => {
        words.forEach(word => {
            const rect = word.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
                word.classList.add('lit');
                setTimeout(() => word.classList.remove('lit'), 2000);
            }
        });
    });

    document.getElementById('envelope-overlay').addEventListener('click', () => {
        document.getElementById('bg-music').play().catch(()=>{});
        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        document.getElementById('envelope-overlay').style.display = 'none';
        document.getElementById('echo-container').classList.remove('hidden');
    });

    /* ===== STAR SYSTEM ===== */

    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let stars = Array.from({ length: 350 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 0.5,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random()
    }));

    let shootingStars = [];

    function createShootingStar() {
        shootingStars.push({
            x: Math.random() * canvas.width,
            y: 0,
            length: Math.random() * 100 + 80,
            speed: Math.random() * 10 + 6,
            size: Math.random() * 2 + 1
        });
    }

    setInterval(() => {
        if (Math.random() < 0.5) {
            createShootingStar();
        }
    }, 2500);

    function drawStars() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(s => {

            ctx.beginPath();
            ctx.globalAlpha = s.opacity;
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.shadowBlur = 12;
            ctx.shadowColor = "#ffffff";
            ctx.fill();

            s.opacity += (Math.random() - 0.5) * 0.05;
            if (s.opacity < 0.2) s.opacity = 0.2;
            if (s.opacity > 1) s.opacity = 1;

            s.y -= s.speed;
            if (s.y < 0) {
                s.y = canvas.height;
                s.x = Math.random() * canvas.width;
            }
        });

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        /* Shooting stars */
        shootingStars.forEach((s, index) => {
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s.x - s.length, s.y + s.length);
            ctx.strokeStyle = "white";
            ctx.lineWidth = s.size;
            ctx.shadowBlur = 20;
            ctx.shadowColor = "white";
            ctx.stroke();

            s.x += s.speed;
            s.y += s.speed;

            if (s.x > canvas.width || s.y > canvas.height) {
                shootingStars.splice(index, 1);
            }
        });

        requestAnimationFrame(drawStars);
    }

    drawStars();

    /* ===== BUTTONS ===== */

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
