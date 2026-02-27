const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";

emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const nebula = document.getElementById('nebula');
    const starField = document.getElementById('star-field');
    const particleContainer = document.getElementById('cursor-particle-container');
    const typedText = document.getElementById('typed-text');

    // 1. Light Stars
    for (let i = 0; i < 150; i++) {
        let star = document.createElement('div');
        star.style.cssText = `position:absolute; background:#fff; border-radius:50%; width:2px; height:2px; 
                             top:${Math.random()*100}vh; left:${Math.random()*100}vw; opacity:0.5;`;
        starField.appendChild(star);
    }

    // 2. Throttled Mouse Interaction (Fixes Lag)
    let lastMove = 0;
    window.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastMove < 30) return; 
        lastMove = now;

        // Smooth Nebula Parallax
        const moveX = (e.clientX / window.innerWidth - 0.5) * 25;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 25;
        nebula.style.transform = `translate(${moveX}px, ${moveY}px)`;

        // Efficient Particle Spawn
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = e.clientX + 'px';
        p.style.top = e.clientY + 'px';
        p.style.width = p.style.height = '4px';
        p.style.setProperty('--mx', (Math.random() * 80 - 40) + 'px');
        p.style.setProperty('--my', (Math.random() * 80 - 40) + 'px');
        particleContainer.appendChild(p);
        setTimeout(() => p.remove(), 1200);
    });

    // 3. The Reveal
    document.getElementById('envelope-overlay').addEventListener('click', () => {
        const music = document.getElementById('bg-music');
        music.volume = 0.3;
        music.play().catch(() => {});

        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        document.getElementById('envelope-overlay').style.display = 'none';

        setTimeout(() => {
            document.getElementById('main-card').classList.remove('hidden');
            startTyping();
        }, 1200);
    });

    // 4. Typing Logic
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
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = char;
            
            if (char === '\n') typedText.appendChild(document.createElement('br'));
            else typedText.appendChild(span);
            
            setTimeout(() => { span.classList.add('fade-old'); }, 7000);
            
            charIndex++;
            setTimeout(startTyping, char === '.' ? 600 : 45);
        } else {
            document.getElementById('button-group').classList.remove('hidden');
        }
    }

    // Buttons
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
