const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";

emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById('envelope-overlay');
    const starField = document.getElementById('star-field');
    const typedText = document.getElementById('typed-text');
    const music = document.getElementById('bg-music');
    const particleContainer = document.getElementById('cursor-particle-container');

    // 1. Colorful Star Generator with Parallax data
    const starColors = ['#ffffff', '#ffdfdf', '#dfffd6', '#fffed6'];
    const stars = [];
    
    for (let i = 0; i < 400; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        star.style.left = x + 'vw';
        star.style.top = y + 'vh';
        star.style.width = star.style.height = (Math.random() * 2 + 1) + 'px';
        star.style.backgroundColor = starColors[Math.floor(Math.random() * starColors.length)];
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        starField.appendChild(star);
        stars.push({ el: star, x, y, speed: Math.random() * 2 });
    }

    // 2. Parallax Effect: Stars drift when mouse moves
    window.addEventListener('mousemove', (e) => {
        let moveX = (e.clientX / window.innerWidth) - 0.5;
        let moveY = (e.clientY / window.innerHeight) - 0.5;
        
        stars.forEach(s => {
            s.el.style.transform = `translate(${moveX * s.speed * 20}px, ${moveY * s.speed * 20}px)`;
        });

        // 3. Stardust Cursor Trail
        if (Math.random() > 0.8) { // Only create sometimes for performance
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = e.clientX + 'px';
            p.style.top = e.clientY + 'px';
            p.style.width = p.style.height = Math.random() * 4 + 'px';
            particleContainer.appendChild(p);
            setTimeout(() => p.remove(), 1000);
        }
    });

    // 4. Shooting Stars
    setInterval(() => {
        const sStar = document.createElement('div');
        sStar.className = 'shooting-star';
        sStar.style.left = (Math.random() * 80 + 20) + 'vw';
        sStar.style.top = (Math.random() * 40) + 'vh';
        sStar.style.width = (Math.random() * 100 + 150) + 'px';
        starField.appendChild(sStar);
        sStar.animate([
            { transform: 'translateX(0) translateY(0) rotate(-45deg)', opacity: 1 },
            { transform: 'translateX(-1000px) translateY(1000px) rotate(-45deg)', opacity: 0 }
        ], { duration: 2500 });
        setTimeout(() => sStar.remove(), 2500);
    }, 5000);

    // 5. Open Envelope
    overlay.addEventListener('click', () => {
        music.volume = 0.4;
        music.play();
        document.getElementById('envelope-icon').classList.add('envelope-tear');
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.style.display = 'none';
            document.getElementById('main-card').classList.remove('hidden');
            startTyping();
        }, 1800);
    });

    // 6. Typing Logic
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
                setTimeout(() => span.classList.add('fade-old'), 5000);
            }
            charIndex++;
            setTimeout(startTyping, char === '.' ? 600 : 55);
        } else {
            setTimeout(() => document.getElementById('button-group').classList.remove('hidden'), 1000);
        }
    }

    // 7. Buttons & Final Action
    document.getElementById('no-btn').addEventListener('mouseover', function() {
        this.style.position = 'fixed';
        this.style.left = Math.random() * (window.innerWidth - 150) + 'px';
        this.style.top = Math.random() * (window.innerHeight - 80) + 'px';
    });

    document.getElementById('yes-btn').addEventListener('click', () => {
        document.getElementById('main-card').classList.add('hidden');
        document.getElementById('final-yes').classList.remove('hidden');
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { user_response: "YES 💕" });
    });
});
