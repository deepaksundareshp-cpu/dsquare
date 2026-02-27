const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const revealArea = document.getElementById('reveal-area');
    const fullText = `There’s something called journaling… it’s about preserving something personal. And I genuinely want to thank you for teaching me that. I never used to write things down, especially not my dreams. I realized that the first few minutes after waking up are important. If I let other thoughts enter my mind, the dream slowly fades away. After seeing your work, something clicked for me. It feels private. It feels intentional. It feels like something that is ONLY I KNOW. So... coffee? ☕`;

    // 1. Setup words
    // 1. Break text into words for the "Echo"
    fullText.split(' ').forEach(word => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'word';
        revealArea.appendChild(span);
    });

    const words = document.querySelectorAll('.word');

    // 2. Reveal Logic
    // 2. The Reveal Physics
    window.addEventListener('mousemove', (e) => {
        words.forEach(word => {
            const rect = word.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90) { 

            if (dist < 100) { // If mouse is close
                word.classList.add('lit');
                setTimeout(() => word.classList.remove('lit'), 3000);
                // Auto-fade out after 2 seconds
                setTimeout(() => word.classList.remove('lit'), 2000);
            }
        });
    });

    // 3. The STAR ENGINE
    // 3. Envelope Reveal
    document.getElementById('envelope-overlay').addEventListener('click', () => {
        document.getElementById('bg-music').play().catch(() => {});
        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        document.getElementById('envelope-overlay').style.display = 'none';
        document.getElementById('echo-container').classList.remove('hidden');
    });

    // 4. Star Background (canvas with layered stars + shooting stars)
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');
    
    function resize() {
    let stars = [];
    let shootingStars = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createStarField();
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
    function createStarField() {
        const totalStars = Math.floor((canvas.width * canvas.height) / 2500);
        stars = Array.from({ length: totalStars }, () => {
            const sizeType = Math.random();
            let size = 0.6;
            let brightness = 0.6;

            if (sizeType > 0.95) {
                size = 2.8 + Math.random() * 1.8; // big stars
                brightness = 0.85 + Math.random() * 0.15;
            } else if (sizeType > 0.7) {
                size = 1.5 + Math.random() * 1.2; // medium stars
                brightness = 0.7 + Math.random() * 0.2;
            } else {
                size = 0.4 + Math.random() * 0.9; // small stars
                brightness = 0.45 + Math.random() * 0.25;
            }

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
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size,
                brightness,
                drift: (Math.random() - 0.5) * 0.03,
                twinkleSpeed: 0.005 + Math.random() * 0.02,
                twinklePhase: Math.random() * Math.PI * 2
            };
        });
    }

    function spawnShootingStar() {
        const startX = Math.random() * canvas.width * 0.8;
        const startY = Math.random() * canvas.height * 0.5;
        const speed = 7 + Math.random() * 6;
        shootingStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * (canvas.height * 0.4),
            size: size,
            speed: speed,
            len: len,
            opacity: 1
            x: startX,
            y: startY,
            vx: speed,
            vy: speed * 0.45,
            life: 0,
            maxLife: 32 + Math.floor(Math.random() * 18),
            length: 90 + Math.random() * 80
        });
    }

    function draw() {
    function drawStars(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Twinkling Background
        stars.forEach(s => {
            s.opacity += s.speed;
            if (s.opacity > 1 || s.opacity < 0) s.speed *= -1;
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(s.opacity)})`;
        for (const s of stars) {
            const twinkle = 0.65 + Math.sin(time * s.twinkleSpeed + s.twinklePhase) * 0.35;
            const alpha = Math.max(0.2, Math.min(1, s.brightness * twinkle));
            s.y -= 0.04;
            s.x += s.drift;

            if (s.y < -4) s.y = canvas.height + 4;
            if (s.x < -4) s.x = canvas.width + 4;
            if (s.x > canvas.width + 4) s.x = -4;

            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.shadowBlur = s.size > 2 ? 12 : 6;
            ctx.shadowColor = 'rgba(255,255,255,0.8)';
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
        });
            ctx.shadowBlur = 0;
        }

        if (Math.random() < 0.015 && shootingStars.length < 2) {
            spawnShootingStar();
        }

        shootingStars = shootingStars.filter((meteor) => {
            meteor.life += 1;
            meteor.x += meteor.vx;
            meteor.y += meteor.vy;

            const progress = meteor.life / meteor.maxLife;
            const alpha = Math.max(0, 1 - progress);

            const trailX = meteor.x - meteor.vx * 0.9;
            const trailY = meteor.y - meteor.vy * 0.9;

            const gradient = ctx.createLinearGradient(meteor.x, meteor.y, trailX - meteor.length, trailY - meteor.length * 0.35);
            gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
            gradient.addColorStop(1, 'rgba(255,255,255,0)');

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
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2 + (1 - progress) * 1.5;
            ctx.moveTo(meteor.x, meteor.y);
            ctx.lineTo(trailX - meteor.length, trailY - meteor.length * 0.35);
            ctx.stroke();
            ctx.restore();

            ss.x += ss.speed;
            ss.y += ss.speed / 2.5;
            ss.opacity -= 0.015;
            ctx.beginPath();
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.arc(meteor.x, meteor.y, 2.2, 0, Math.PI * 2);
            ctx.fill();

            if (ss.opacity <= 0) shootingStars.splice(i, 1);
            return meteor.life < meteor.maxLife;
        });

        // Launch frequency: ~every 2 seconds
        if (Math.random() < 0.015) createShootingStar();

        requestAnimationFrame(draw);
        requestAnimationFrame(drawStars);
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
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    requestAnimationFrame(drawStars);

    // 5. Button Actions
    document.getElementById('yes-btn').addEventListener('click', () => {
        document.getElementById('echo-container').classList.add('hidden');
        document.getElementById('final-yes').classList.remove('hidden');
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { response: "YES 💕" });
    });

    document.getElementById('no-btn').addEventListener('mouseover', function() {
        this.style.position = 'fixed';
    document.getElementById('no-btn').addEventListener('mouseover', function () {
        this.style.left = Math.random() * 80 + 'vw';
        this.style.top = Math.random() * 80 + 'vh';
        this.style.position = 'fixed';
    });
});
style.css
style.css
+19
-27

body, html { 
    background-color: #000; margin: 0; padding: 0; 
    height: 100vh; width: 100vw; overflow: hidden; 
    font-family: 'Caveat', cursive; color: #fff;
}

#nebula { 
    position: fixed; width: 100%; height: 100%; 
    background: radial-gradient(circle at 50% 50%, #0d001a, #000); 
    background: radial-gradient(circle at 50% 50%, #1a0033, #000); 
    z-index: -2; 
}

#starCanvas { 
    position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; 
}
#starCanvas { position: fixed; top: 0; left: 0; z-index: -1; }

/* THE ECHO REVEAL TEXT */
#reveal-area {
    width: 85%; max-width: 650px; margin: 50px auto;
    font-size: 1.4rem; /* Even smaller, more elegant font size */
    line-height: 1.5; text-align: center;
    width: 80%; max-width: 800px; margin: 50px auto;
    font-size: 1.85rem; line-height: 1.6; text-align: center;
    pointer-events: none;
    z-index: 10;
}

.word {
    display: inline-block; margin-right: 6px;
    opacity: 0.03; /* Lower base opacity for better reveal contrast */
    transition: opacity 1s ease, transform 0.8s ease, filter 1s ease;
    filter: blur(5px);
    display: inline-block; margin-right: 8px;
    opacity: 0.05; /* Barely visible */
    transition: opacity 1.5s ease, transform 1s ease;
    filter: blur(4px);
}

.word.lit {
    opacity: 1; filter: blur(0px);
    transform: scale(1.05);
    color: #fff;
    text-shadow: 0 0 12px rgba(255, 255, 255, 0.9);
    transform: scale(1.1);
    color: #e0b0ff; /* Soft lavender glow */
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
}

/* PAPER RIP */
.paper-half { 
    position: fixed; top: 0; width: 51%; height: 100%; background: #fff; 
    z-index: 1001; transition: transform 1.5s cubic-bezier(0.7, 0, 0.3, 1); 
}
#paper-left { left: 0; border-right: 1px solid #ddd; }
#paper-right { right: 0; border-left: 1px solid #ddd; }
#paper-left { left: 0; }
#paper-right { right: 0; }
.rip-left { transform: translateX(-100%); }
.rip-right { transform: translateX(100%); }

.white-overlay { 
    position: fixed; inset: 0; z-index: 1005; 
    display: flex; flex-direction: column; justify-content: center; align-items: center; 
    color: #333; cursor: pointer; background: #fff;
    color: #333; cursor: pointer;
}
#envelope-icon { font-size: 5rem; margin-bottom: 20px; }

.btn { 
    font-family: 'Caveat'; font-size: 1.5rem; padding: 10px 30px; 
    border-radius: 40px; border: none; cursor: pointer; margin: 15px; 
    font-family: 'Caveat'; font-size: 1.8rem; padding: 12px 40px; 
    border-radius: 40px; border: none; cursor: pointer; margin: 20px; 
    transition: opacity 2s;
}
.yes { background: #ffb6c1; color: #fff; box-shadow: 0 0 15px rgba(255,182,193,0.4); }
.no { background: #333; color: #fff; }

.yes { background: #ffb6c1; color: #fff; box-shadow: 0 0 20px rgba(255,182,193,0.5); }
.hidden { display: none !important; }
.fade-in-delayed { opacity: 0; animation: fadeIn 3s forwards; animation-delay: 5s; text-align: center; }
.fade-in-delayed { opacity: 0; animation: fadeIn 5s forwards; animation-delay: 10s; }
@keyframes fadeIn { to { opacity: 1; } }

.content-box { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; width: 100%; }
.message { font-size: 3rem; text-shadow: 0 0 20px #fff; }
