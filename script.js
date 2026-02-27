const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const revealArea = document.getElementById('reveal-area');
    const particleContainer = document.getElementById('cursor-particle-container');
    const starField = document.getElementById('star-field');
    
    const fullNote = `There’s something called journaling… it’s about preserving something personal. And I genuinely want to thank you for teaching me that. I never used to write things down, especially not my dreams. I realized that the first few minutes after waking up are important. If I let other thoughts enter my mind, the dream slowly fades away. So I started writing immediately after waking up, just whatever I could remember. After seeing your work, something clicked for me. I understood that writing isn’t just about preserving something personal. In a world where so much of our lives feels visible and public, journaling feels different. It feels private. It feels intentional. It feels like something that is ONLY I KNOW. And I genuinely want to thank you for that. I’m someone who wants to learn and keep learning. Sometimes we don’t even realize who teaches us something valuable in life — but in this case, you did. So... coffee? ☕`;

    // 1. Setup Ghost Text
    const wordsArray = fullNote.split(' ');
    wordsArray.forEach((word) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'word';
        if(word.toLowerCase().includes('coffee')) span.id = 'trigger-word';
        revealArea.appendChild(span);
    });

    // 2. Glowing Backdrop Stars (Denser field)
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = star.style.height = size + 'px';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        
        // Custom animation timing for each star
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.animationDelay = Math.random() * 5 + 's';
        
        starField.appendChild(star);
    }

    // 3. Realistic Shooting Star Engine
    function launchStar() {
        const s = document.createElement('div');
        s.className = 'shooting-star';
        
        // Start from random side/top
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * (window.innerHeight * 0.5);
        
        s.style.left = startX + 'px';
        s.style.top = startY + 'px';
        s.style.width = (Math.random() * 100 + 150) + 'px'; // Length of streak
        
        starField.appendChild(s);
        
        // Realistic diagonal trajectory
        const animation = s.animate([
            { transform: 'rotate(-35deg) translateX(0)', opacity: 0 },
            { transform: 'rotate(-35deg) translateX(-200px)', opacity: 1, offset: 0.1 },
            { transform: 'rotate(-35deg) translateX(-1000px)', opacity: 0 }
        ], {
            duration: Math.random() * 1000 + 1500,
            easing: 'ease-in'
        });

        animation.onfinish = () => s.remove();
    }
    
    // Launch stars at irregular intervals
    setInterval(() => {
        if(Math.random() > 0.3) launchStar();
    }, 3000);

    // 4. Interaction (Sparkles & Text Reveal)
    window.addEventListener('mousemove', (e) => {
        // Sparkle trail
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = e.clientX + 'px'; 
        p.style.top = e.clientY + 'px';
        const pSize = Math.random() * 4 + 2;
        p.style.width = p.style.height = pSize + 'px';
        particleContainer.appendChild(p);
        setTimeout(() => p.remove(), 800);

        // Word reveal physics
        const words = document.querySelectorAll('.word');
        words.forEach(word => {
            const rect = word.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 80) { 
                word.classList.add('lit');
                if(word.id === 'trigger-word') {
                    document.getElementById('button-group').classList.remove('hidden');
                }
            }
        });
    });

    // 5. Envelope Click
    document.getElementById('envelope-overlay').addEventListener('click', () => {
        const music = document.getElementById('bg-music');
        music.volume = 0.4;
        music.play().catch(()=>{});
        
        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        
        setTimeout(() => {
            document.getElementById('envelope-overlay').style.display = 'none';
            document.getElementById('echo-container').classList.remove('hidden');
        }, 1200);
    });

    // 6. Button Actions
    document.getElementById('yes-btn').addEventListener('click', () => {
        document.getElementById('echo-container').classList.add('hidden');
        document.getElementById('final-yes').classList.remove('hidden');
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { response: "YES 💕" });
    });

    document.getElementById('no-btn').addEventListener('mouseover', function() {
        // Just a little playful "No" button that moves away
        this.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
    });
});
