const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const revealArea = document.getElementById('reveal-area');
    const starField = document.getElementById('star-field');
    const particleContainer = document.getElementById('cursor-particle-container');
    
    const fullNote = `There’s something called journaling… it’s about preserving something personal. And I genuinely want to thank you for teaching me that. I never used to write things down, especially not my dreams. I realized that the first few minutes after waking up are important. If I let other thoughts enter my mind, the dream slowly fades away. So I started writing immediately after waking up, just whatever I could remember. After seeing your work, something clicked for me. I understood that writing isn’t just about preserving something personal. In a world where so much of our lives feels visible and public, journaling feels different. It feels private. It feels intentional. It feels like something that is ONLY I KNOW. And I genuinely want to thank you for that. I’m someone who wants to learn and keep learning. Sometimes we don’t even realize who teaches us something valuable in life — but in this case, you did. So... coffee? ☕`;

    // 1. Populate Note
    fullNote.split(' ').forEach((word) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'word';
        if(word.toLowerCase().includes('coffee')) span.id = 'trigger-word';
        revealArea.appendChild(span);
    });

    // 2. Static Glowing Stars
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        starField.appendChild(star);
    }

    // 3. Multi-Size Shooting Star Engine
    function createShootingStar() {
        const s = document.createElement('div');
        const rand = Math.random();
        let sClass = 'star-sm', w = '100px', d = 1500;
        
        if (rand > 0.9) { sClass = 'star-lg'; w = '350px'; d = 2500; }
        else if (rand > 0.6) { sClass = 'star-md'; w = '200px'; d = 1800; }

        s.className = `shooting-star ${sClass}`;
        s.style.width = w;
        s.style.left = Math.random() * window.innerWidth + 'px';
        s.style.top = Math.random() * (window.innerHeight * 0.6) + 'px';
        starField.appendChild(s);

        const anim = s.animate([
            { transform: 'rotate(-45deg) translateX(0)', opacity: 0 },
            { transform: 'rotate(-45deg) translateX(-150px)', opacity: 1, offset: 0.1 },
            { transform: 'rotate(-45deg) translateX(-1000px)', opacity: 0 }
        ], { duration: d, easing: 'linear' });

        anim.onfinish = () => s.remove();
    }

    // Launch stars constantly
    setInterval(createShootingStar, 1200); 

    // 4. Interaction (Reveal & Particles)
    window.addEventListener('mousemove', (e) => {
        // Particle effect
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = e.clientX + 'px'; p.style.top = e.clientY + 'px';
        p.style.width = p.style.height = '4px';
        particleContainer.appendChild(p);
        setTimeout(() => p.remove(), 700);

        // Word Reveal (70px Radius)
        const words = document.querySelectorAll('.word');
        words.forEach(word => {
            const rect = word.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 70) { 
                word.classList.add('lit');
                if(word.id === 'trigger-word') {
                    document.getElementById('button-group').classList.remove('hidden');
                }
            }
        });
    });

    // 5. Envelope Rip
    document.getElementById('envelope-overlay').addEventListener('click', () => {
        document.getElementById('bg-music').play().catch(()=>{});
        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        setTimeout(() => {
            document.getElementById('envelope-overlay').style.display = 'none';
            document.getElementById('echo-container').classList.remove('hidden');
        }, 1800);
    });

    // 6. Yes Action
    document.getElementById('yes-btn').addEventListener('click', () => {
        document.getElementById('echo-container').classList.add('hidden');
        document.getElementById('final-yes').classList.remove('hidden');
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { response: "YES 💕" });
    });
});
