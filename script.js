const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const revealArea = document.getElementById('reveal-area');
    const fullText = `There’s something called journaling… it’s about preserving something personal. And I genuinely want to thank you for teaching me that. I never used to write things down, especially not my dreams. I realized that the first few minutes after waking up are important. If I let other thoughts enter my mind, the dream slowly fades away. After seeing your work, something clicked for me. It feels private. It feels intentional. It feels like something that is ONLY I KNOW. So... coffee? ☕`;

    // 1. Break text into words
    fullText.split(' ').forEach(word => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'word';
        revealArea.appendChild(span);
    });

    const words = document.querySelectorAll('.word');

    // 2. Reveal Physics
    window.addEventListener('mousemove', (e) => {
        words.forEach(word => {
            const rect = word.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 80) { 
                word.classList.add('lit');
                setTimeout(() => word.classList.remove('lit'), 2500);
            }
        });
    });

    // 3. Star Background Engine (Canvas)
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Background Stars (Denser)
    let staticStars = Array.from({ length: 400 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        opacity: Math.random(),
        blinkSpeed: Math.random() * 0.02 + 0.005
    }));

    // Shooting Star System
    let shootingStars = [];

    function createShootingStar() {
        const sizeType = Math.random();
        let size, speed, len;
        
        if (sizeType > 0.9) { // Big ones
            size = 3; speed = 15; len = 200;
        } else if (sizeType > 0.6) { // Medium ones
            size = 2; speed = 10; len = 120;
        } else { // Small ones
            size = 1; speed = 7; len = 80;
        }

        shootingStars.push({
            x: Math.random() * canvas.width + canvas.width * 0.3,
            y: Math.random() * canvas.height * 0.5,
            size: size,
            speed: speed,
            len: len,
            opacity: 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Background Stars
        staticStars.forEach(s => {
            s.opacity += s.blinkSpeed;
            if (s.opacity > 1 || s.opacity < 0) s.blinkSpeed *= -1;
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(s.opacity)})`;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw and Update Shooting Stars
        shootingStars.forEach((ss, index) => {
            ctx.lineWidth = ss.size;
            const gradient = ctx.createLinearGradient(ss.x, ss.y, ss.x + ss.len, ss.y - ss.len / 2);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(ss.x, ss.y);
            ctx.lineTo(ss.x - ss.len, ss.y + ss.len / 2);
            ctx.stroke();

            ss.x -= ss.speed;
            ss.y += ss.speed / 2;
            ss.opacity -= 0.01;

            if (ss.opacity <= 0) shootingStars.splice(index, 1);
        });

        // Randomly launch shooting stars
        if (Math.random() < 0.02) createShootingStar();

        requestAnimationFrame(animate);
    }
    animate();

    // 4. Envelope/Paper Interactions
    document.getElementById('envelope-overlay').addEventListener('click', () => {
        document.getElementById('bg-music').play().catch(()=>{});
        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        document.getElementById('envelope-overlay').style.display = 'none';
        document.getElementById('echo-container').classList.remove('hidden');
    });

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
