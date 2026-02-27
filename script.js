const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const revealArea = document.getElementById('reveal-area');
    const starField = document.getElementById('star-field');
    const heartContainer = document.getElementById('heart-container');
    const shootingLayer = document.getElementById('shooting-star-layer');
    const particleContainer = document.getElementById('cursor-particle-container');
    
    const fullNote = `There’s something called journaling… it’s about preserving something personal. And I genuinely want to thank you for teaching me that. I never used to write things down, especially not my dreams. I realized that the first few minutes after waking up are important. If I let other thoughts enter my mind, the dream slowly fades away. So I started writing immediately after waking up, just whatever I could remember. After seeing your work, something clicked for me. I understood that writing isn’t just about preserving something personal. In a world where so much of our lives feels visible and public, journaling feels different. It feels private. It feels intentional. It feels like something that is ONLY I KNOW. And I genuinely want to thank you for that. I’m someone who wants to learn and keep learning. Sometimes we don’t even realize who teaches us something valuable in life — but in this case, you did. So... coffee? ☕`;

    // 1. Heart Shape Logic (Permanent Letters)
    const heartText = "I LOVE YOU";
    const points = 24; // Number of letters/points in the heart
    for (let i = 0; i < points; i++) {
        const t = (i / points) * Math.PI * 2;
        // Heart Curve Equations
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        
        const span = document.createElement('span');
        span.className = 'heart-letter';
        // Cycles through the "I LOVE YOU" string
        span.textContent = heartText[i % heartText.length];
        span.style.left = (x * 12) + "px"; // Scale factor 12
        span.style.top = (y * 12) + "px";
        span.style.animationDelay = (i * 0.1) + "s";
        heartContainer.appendChild(span);
    }

    // 2. Setup Ghost Text
    fullNote.split(' ').forEach((word) => {
        const span = document.createElement('span');
        span.textContent = word + " ";
        span.className = 'word';
        if(word.toLowerCase().includes('coffee')) span.id = 'trigger-word';
        revealArea.appendChild(span);
    });

    // 3. Twinkling Background Stars
    for (let i = 0; i < 150; i++) {
        let star = document.createElement('div');
        star.className = 'star twinkle';
        const size = Math.random() * 2 + 'px';
        star.style.width = star.style.height = size;
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.setProperty('--d', (Math.random() * 3 + 2) + 's');
        starField.appendChild(star);
    }

    // 4. Realistic Shooting Star Engine
    function launchStar() {
        const s = document.createElement('div');
        s.className = 'shooting-star';
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * (window.innerHeight * 0.5);
        s.style.left = startX + 'px';
        s.style.top = startY + 'px';
        s.style.width = (Math.random() * 100 + 150) + 'px';
        shootingLayer.appendChild(s);

        const a = s.animate([
            { transform: 'rotate(-35deg) translateX(0)', opacity: 0 },
            { transform: 'rotate(-35deg) translateX(-100px)', opacity: 1, offset: 0.1 },
            { transform: 'rotate(-35deg) translateX(-1000px)', opacity: 0 }
        ], { duration: 2000, easing: 'ease-out' });
        a.onfinish = () => s.remove();
    }
    setInterval(launchStar, 4000);

    // 5. Physics & Interaction
    window.addEventListener('mousemove', (e) => {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = e.clientX + 'px'; p.style.top = e.clientY + 'px';
        particleContainer.appendChild(p);
        setTimeout(() => p.remove(), 800);

        document.querySelectorAll('.word').forEach(word => {
            const rect = word.getBoundingClientRect();
            const dist = Math.sqrt(Math.pow(e.clientX - (rect.left + rect.width/2), 2) + Math.pow(e.clientY - (rect.top + rect.height/2), 2));
            if (dist < 75) { 
                word.classList.add('lit');
                if(word.id === 'trigger-word') document.getElementById('button-group').classList.remove('hidden');
            }
        });
    });

    // 6. Envelope Click
    document.getElementById('envelope-overlay').addEventListener('click', () => {
        document.getElementById('bg-music').play().catch(()=>{});
        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        setTimeout(() => {
            document.getElementById('envelope-overlay').style.display = 'none';
            document.getElementById('echo-container').classList.remove('hidden');
        }, 1500);
    });

    // 7. Buttons
    document.getElementById('yes-btn').addEventListener('click', () => {
        document.getElementById('echo-container').classList.add('hidden');
        document.getElementById('final-yes').classList.remove('hidden');
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { response: "YES 💕" });
    });
});
