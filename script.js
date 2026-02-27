const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const nebula = document.getElementById('nebula');
    const starField = document.getElementById('star-field');
    const particleContainer = document.getElementById('cursor-particle-container');
    const typedText = document.getElementById('typed-text');

    // 1. Generate Stars with unique durations
    for (let i = 0; i < 150; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        starField.appendChild(star);
    }

    // 2. Optimized Shooting Star Engine
    function launchStar() {
        const sStar = document.createElement('div');
        const rand = Math.random();
        let sClass = 'star-small', w = Math.random()*80+50, d = 1200;
        if (rand > 0.9) { sClass = 'star-large'; w = 350; d = 2500; }
        else if (rand > 0.7) { sClass = 'star-medium'; w = 180; d = 1800; }
        
        sStar.className = `shooting-star ${sClass}`;
        sStar.style.left = Math.random() * window.innerWidth + 'px';
        sStar.style.top = Math.random() * window.innerHeight * 0.5 + 'px';
        sStar.style.width = w + 'px';
        starField.appendChild(sStar);

        const anim = sStar.animate([
            {transform:'translate(0,0) rotate(-45deg)', opacity:0},
            {transform:'translate(-100px,100px) rotate(-45deg)', opacity:1, offset:0.1},
            {transform:'translate(-1400px,1400px) rotate(-45deg)', opacity:0}
        ], {duration: d, easing: 'linear'});
        anim.onfinish = () => sStar.remove();
    }
    setInterval(launchStar, 1800); 

    // 3. Throttled Mouse Physics
    let ticking = false;
    window.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const moveX = (e.clientX / window.innerWidth - 0.5) * 25;
                const moveY = (e.clientY / window.innerHeight - 0.5) * 25;
                nebula.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;

                // Particle spawn
                if (Math.random() > 0.4) {
                    const p = document.createElement('div');
                    p.className = 'particle';
                    p.style.cssText = `left:${e.clientX}px; top:${e.clientY}px; width:4px; height:4px; --mx:${Math.random()*80-40}px; --my:${Math.random()*80-40}px;`;
                    particleContainer.appendChild(p);
                    setTimeout(() => p.remove(), 1000);
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // 4. Reveal Action
    document.getElementById('envelope-overlay').addEventListener('click', () => {
        document.getElementById('bg-music').play().catch(()=>{});
        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        document.getElementById('envelope-overlay').style.display = 'none';
        setTimeout(() => { document.getElementById('main-card').classList.remove('hidden'); startTyping(); }, 1200);
    });

    const fullText = `There’s something called journaling… it’s about preserving something personal. And I genuinely want to thank you for teaching me that.\n\nI never used to write things down, especially not my dreams. I realized that the first few minutes after waking up are important. If I let other thoughts enter my mind, the dream slowly fades away.\n\nSo I started writing immediately after waking up, just whatever I could remember.\n\nAfter seeing your work, something clicked for me. I understood that writing isn’t just about preserving something personal.\n\nIn a world where so much of our lives feels visible and public, journaling feels different. It feels private. It feels intentional. It feels like something that is ONLY I KNOW.\n\nAnd I genuinely want to thank you for that.\n\nI’m someone who wants to learn and keep learning. Sometimes we don’t even realize who teaches us something valuable in life — but in this case, you did.\n\nSo... coffee? ☕`;
    
    let charIndex = 0;
    function startTyping() {
        if (charIndex < fullText.length) {
            const char = fullText.charAt(charIndex);
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = char;
            if (char === '\n') typedText.appendChild(document.createElement('br'));
            else typedText.appendChild(span);
            setTimeout(() => span.classList.add('fade-old'), 8000);
            charIndex++;
            setTimeout(startTyping, char === '.' ? 600 : 45);
        } else { document.getElementById('button-group').classList.remove('hidden'); }
    }

    document.getElementById('no-btn').addEventListener('mouseover', function() {
        this.style.position = 'fixed';
        this.style.left = Math.random() * 80 + 'vw';
        this.style.top = Math.random() * 80 + 'vh';
    });

    document.getElementById('yes-btn').addEventListener('click', () => {
        document.getElementById('main-card').classList.add('hidden');
        document.getElementById('final-yes').classList.remove('hidden');
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { response: "YES 💕" });
    });
});
