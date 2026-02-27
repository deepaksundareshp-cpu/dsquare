const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const revealArea = document.getElementById('reveal-area');
    const fullText = `There’s something called journaling… it’s about preserving something personal. And I genuinely want to thank you for teaching me that. I never used to write things down, especially not my dreams. I realized that the first few minutes after waking up are important. If I let other thoughts enter my mind, the dream slowly fades away. After seeing your work, something clicked for me. It feels private. It feels intentional. It feels like something that is ONLY I KNOW. So... coffee? ☕`;

    // 1. Setup words
    fullText.split(' ').forEach(word => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'word';
        revealArea.appendChild(span);
    });
    const words = document.querySelectorAll('.word');

    // 2. Reveal Logic
    window.addEventListener('mousemove', (e) => {
        words.forEach(word => {
            const rect = word.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90) { 
                word.classList.add('lit');
                setTimeout(() => word.classList.remove('lit'), 3000);
            }
        });
    });

    // 3. The STAR ENGINE
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // 600 Background Stars for a full sky
    let stars = Array.from({ length: 600 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8,
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.005
    }));

    let shootingStars = [];

    function createShootingStar() {
        const type = Math.random();
        let size, speed, len;
        
        if (type > 0.8) { // Huge, rare ones
            size = 3; speed = 18; len = 250;
        } else if (type > 0.4) { // Medium ones
            size = 2; speed = 12; len = 150;
        } else { // Small, fast ones
            size = 1; speed = 9; len = 90;
        }

        shootingStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * (canvas.height * 0.4),
            size: size,
            speed: speed,
            len: len,
            opacity: 1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Twinkling Background
        stars.forEach(s => {
            s.opacity += s.speed;
            if (s.opacity > 1 || s.opacity < 0) s.speed *= -1;
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(s.opacity)})`;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw Shooting Stars with Glow
        shootingStars.forEach((ss, i) => {
            ctx.save();
            ctx.shadowBlur = 10;
            ctx.shadowColor = "white";
            ctx.lineWidth = ss.size;
            
            const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.len, ss.y + ss.len/2);
            grad.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
            grad.addColorStop(1, "rgba(255, 255, 255, 0)");
            
            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(ss.x, ss.y);
            ctx.lineTo(ss.x - ss.len, ss.y + (ss.len / 2.5));
            ctx.stroke();
            ctx.restore();

            ss.x += ss.speed;
            ss.y += ss.speed / 2.5;
            ss.opacity -= 0.015;

            if (ss.opacity <= 0) shootingStars.splice(i, 1);
        });

        // Launch frequency: ~every 2 seconds
        if (Math.random() < 0.015) createShootingStar();

        requestAnimationFrame(draw);
    }
    draw();

    // 4. Interaction
    document.getElementById('envelope-overlay').addEventListener('click', () => {
        document.getElementById('bg-music').play().catch(()=>{});
        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        document.getElementById('envelope-overlay').style.display = 'none';
        document.getElementById('echo-container').classList.remove('hidden');
    });

    document.getElementById('yes-btn').addEventListener('click', () => {
        document.getElementById('echo-container').classList.add('hidden');
        document.getElementById('final-yes').classList.remove('hidden');
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { response: "YES 💕" });
    });

    document.getElementById('no-btn').addEventListener('mouseover', function() {
        this.style.position = 'fixed';
        this.style.left = Math.random() * 80 + 'vw';
        this.style.top = Math.random() * 80 + 'vh';
    });
});
