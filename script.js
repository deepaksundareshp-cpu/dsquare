const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";

emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById('envelope-overlay');
    const nebula = document.getElementById('nebula');
    const starField = document.getElementById('star-field');
    const typedText = document.getElementById('typed-text');
    const music = document.getElementById('bg-music');
    const particleContainer = document.getElementById('cursor-particle-container');

    // Generate Stars
    const stars = [];
    for (let i = 0; i < 300; i++) {
        let star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.backgroundColor = ['#fff','#ffdae0','#e0ffda','#dafbff'][Math.floor(Math.random()*4)];
        star.style.borderRadius = '50%';
        star.style.width = star.style.height = (Math.random()*2.5 + 1)+'px';
        star.style.left = Math.random()*100 + 'vw';
        star.style.top = Math.random()*100 + 'vh';
        starField.appendChild(star);
        stars.push({el: star, depth: Math.random()*0.4 + 0.1});
    }

    // --- REALISTIC PARALLAX & STARDUST ---
    window.addEventListener('mousemove', (e) => {
        let mouseX = (e.clientX / window.innerWidth) - 0.5;
        let mouseY = (e.clientY / window.innerHeight) - 0.5;

        // Dampened Movement: Stars move slightly, Nebula even less
        stars.forEach(s => {
            s.el.style.transform = `translate(${mouseX * s.depth * 18}px, ${mouseY * s.depth * 18}px)`;
        });
        nebula.style.transform = `translate(${mouseX * 25}px, ${mouseY * 25}px)`;

        // Rich Stardust Trail
        if (Math.random() > 0.4) { 
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = e.clientX + 'px';
            p.style.top = e.clientY + 'px';
            const size = Math.random() * 7 + 4; // Larger sparks
            p.style.width = p.style.height = size + 'px';
            
            p.style.setProperty('--mx', (Math.random() * 160 - 80) + 'px');
            p.style.setProperty('--my', (Math.random() * 160 - 80) + 'px');
            
            particleContainer.appendChild(p);
            setTimeout(() => p.remove(), 1800);
        }
    });

    // --- BRIGHT SHOOTING STARS ---
    function launchShootingStar() {
        const sStar = document.createElement('div');
        sStar.className = 'shooting-star';
        sStar.style.left = (Math.random() * 100) + 'vw';
        sStar.style.top = (Math.random() * 40) + 'vh';
        sStar.style.width = (Math.random() * 200 + 150) + 'px';
        starField.appendChild(sStar);

        sStar.animate([
            { transform: 'translateX(0) translateY(0) rotate(-45deg)', opacity: 0 },
            { transform: 'translateX(-100px) translateY(100px) rotate(-45deg)', opacity: 1, offset: 0.1 },
            { transform: 'translateX(-1500px) translateY(1500px) rotate(-45deg)', opacity: 0 }
        ], { duration: 1600, easing: 'ease-in' });
        
        setTimeout(() => sStar.remove(), 1600);
    }
    setInterval(launchShootingStar, 5000);

    // --- ENVELOPE OPENING ---
    overlay.addEventListener('click', () => {
        music.volume = 0.5;
        music.play().catch(() => {});
        document.getElementById('envelope-icon').style.transform = 'translateY(-120vh) rotate(35deg) scale(2)';
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.style.display = 'none';
            document.getElementById('main-card').classList.remove('hidden');
            startTyping();
        }, 1600);
    });

    const fullText = `There’s something called journaling… it’s about preserving something personal. And I genuinely want to thank you for teaching me that.

I never used to write things down, especially not my dreams. I realized that the first few minutes after waking up are important. If I let other thoughts enter my mind, the dream slowly fades away.

So I started writing immediately after waking up, just whatever I could remember.

After seeing your work, something clicked for me. I understood that writing isn’t just about preserving something personal.

In a world where so much of our lives feels visible and public, journaling feels different. It feels private. It feels intentional. It feels like something that is ONLY I KNOW.

And I genuinely want to thank you for that.

I’m someone who wants to learn and keep learning. Sometimes we don’t even realize who teaches us something valuable in life — but in this case, you did.

So... coffee? ☕`;

    let charIndex = 0;
    function startTyping() {
        if (charIndex < fullText.length) {
            const char = fullText.charAt(charIndex);
            if (char === '\n') {
                typedText.appendChild(document.createElement('br'));
            } else {
                const span = document.createElement('span');
                span.className = 'letter';
                span.textContent = char;
                typedText.appendChild(span);
                setTimeout(() => span.classList.add('fade-old'), 6000);
            }
            charIndex++;
            setTimeout(startTyping, char === '.' ? 750 : 50);
        } else {
            setTimeout(() => document.getElementById('button-group').classList.remove('hidden'), 1000);
        }
    }

    // --- NO BUTTON ---
    document.getElementById('no-btn').addEventListener('mouseover', function() {
        this.style.position = 'fixed';
        this.style.left = Math.random() * 80 + 'vw';
        this.style.top = Math.random() * 80 + 'vh';
    });

    // --- YES BUTTON ---
    document.getElementById('yes-btn').addEventListener('click', () => {
        document.getElementById('main-card').classList.add('hidden');
        document.getElementById('final-yes').classList.remove('hidden');
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { response: "YES 💕" });
    });
});
