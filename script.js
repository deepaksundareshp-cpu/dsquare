// Replace these with your actual EmailJS IDs
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";

if (PUBLIC_KEY !== "YOUR_PUBLIC_KEY") emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const revealArea = document.getElementById('reveal-area');
    const starField = document.getElementById('star-field');
    const shootingContainer = document.getElementById('shooting-star-container');
    const particleContainer = document.getElementById('cursor-particle-container');

    const fullNote = `There’s something called journaling… it’s about preserving something personal. And I genuinely want to thank you for teaching me that. I never used to write things down, especially not my dreams. I realized that the first few minutes after waking up are important. If I let other thoughts enter my mind, the dream slowly fades away. So I started writing immediately after waking up, just whatever I could remember. After seeing your work, something clicked for me. I understood that writing isn’t just about preserving something personal. In a world where so much of our lives feels visible and public, journaling feels different. It feels private. It feels intentional. It feels like something that is ONLY I KNOW. And I genuinely want to thank you for that. I’m someone who wants to learn and keep learning. Sometimes we don’t even realize who teaches us something valuable in life — but in this case, you did. So... coffee? ☕`;

    // 1. Static Stars Setup
    for (let i = 0; i < 150; i++) {
        let star = document.createElement('div');
        star.style.position = "absolute";
        star.style.background = "#fff";
        star.style.borderRadius = "50%";
        star.style.width = star.style.height = Math.random() * 2 + 'px';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.boxShadow = "0 0 5px #fff";
        starField.appendChild(star);
    }

    // 2. Shooting Star Engine
    function launchStar() {
        const s = document.createElement('div');
        s.className = 'shooting-star';
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * (window.innerHeight * 0.5);
        const length = Math.random() * 100 + 150;
        
        s.style.left = startX + 'px';
        s.style.top = startY + 'px';
        s.style.width = length + 'px';
        shootingContainer.appendChild(s);
        
        const angle = 35;
        const travelDist = window.innerWidth > 1000 ? window.innerWidth : 1000;

        s.animate([
            { transform: `rotate(${angle}deg) translateX(0)`, opacity: 0 },
            { transform: `rotate(${angle}deg) translateX(100px)`, opacity: 1, offset: 0.1 },
            { transform: `rotate(${angle}deg) translateX(${travelDist}px)`, opacity: 0 }
        ], { duration: 2000, easing: 'ease-in' }).onfinish = () => s.remove();
    }
    setInterval(launchStar, 3000);

    // 3. Prepare Text
    fullNote.split(' ').forEach(word => {
        const span = document.createElement('span');
        span.textContent = word + " ";
        span.className = 'word';
        if(word.toLowerCase().includes('coffee')) span.id = 'trigger-word';
        revealArea.appendChild(span);
    });

    // 4. Interaction (Reveal + Sparkles)
    window.addEventListener('mousemove', (e) => {
        // Sparkle
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = e.clientX + 'px'; p.style.top = e.clientY + 'px';
        p.style.width = p.style.height = '4px';
        particleContainer.appendChild(p);
        setTimeout(() => p.remove(), 800);

        // Reveal Words
        document.querySelectorAll('.word').forEach(word => {
            const rect = word.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width/2);
            const dy = e.clientY - (rect.top + rect.height/2);
            if (Math.sqrt(dx*dx + dy*dy) < 80) { 
                word.classList.add('lit');
                if(word.id === 'trigger-word') document.getElementById('button-group').classList.remove('hidden');
            }
        });
    });

    // 5. Open Envelope
    document.getElementById('envelope-overlay').addEventListener('click', () => {
        const music = document.getElementById('bg-music');
        if (music) music.play().catch(() => {});
        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        setTimeout(() => {
            document.getElementById('envelope-overlay').style.display = 'none';
            document.getElementById('echo-container').classList.remove('hidden');
        }, 1500);
    });

    // 6. Button Actions
    document.getElementById('yes-btn').addEventListener('click', () => {
        document.getElementById('echo-container').classList.add('hidden');
        document.getElementById('final-yes').classList.remove('hidden');
        if (PUBLIC_KEY !== "YOUR_PUBLIC_KEY") emailjs.send(SERVICE_ID, TEMPLATE_ID, { response: "YES 💕" });
    });

    document.getElementById('no-btn').addEventListener('mouseover', function() {
        this.style.position = 'fixed';
        this.style.left = Math.random() * 80 + 'vw';
        this.style.top = Math.random() * 80 + 'vh';
    });
});
