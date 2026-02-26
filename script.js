// ENTER YOUR EMAILJS KEYS
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
    for (let i = 0; i < 400; i++) {
        let star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.backgroundColor = ['#fff','#ffdfdf','#dfffd6','#fffed6'][Math.floor(Math.random()*4)];
        star.style.borderRadius = '50%';
        star.style.width = star.style.height = (Math.random()*2+1)+'px';
        let x = Math.random()*100;
        let y = Math.random()*100;
        star.style.left = x + 'vw';
        star.style.top = y + 'vh';
        starField.appendChild(star);
        stars.push({el: star, speed: Math.random()*2.5 + 1});
    }

    // --- INTERACTIVE MOUSE LOGIC ---
    window.addEventListener('mousemove', (e) => {
        let mouseX = (e.clientX / window.innerWidth) - 0.5;
        let mouseY = (e.clientY / window.innerHeight) - 0.5;

        // Parallax Movement
        stars.forEach(s => {
            s.el.style.transform = `translate(${mouseX * s.speed * 25}px, ${mouseY * s.speed * 25}px)`;
        });
        nebula.style.transform = `translate(${mouseX * 50}px, ${mouseY * 50}px)`;

        // Spawn Stardust
        if (Math.random() > 0.7) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = e.clientX + 'px';
            p.style.top = e.clientY + 'px';
            p.style.width = p.style.height = (Math.random() * 6 + 2) + 'px';
            particleContainer.appendChild(p);
            setTimeout(() => p.remove(), 1100);
        }
    });

    // --- ENVELOPE OPENING ---
    overlay.addEventListener('click', () => {
        music.volume = 0.4;
        music.play().catch(() => {});
        document.getElementById('envelope-icon').style.transform = 'translateY(-120vh) rotate(30deg) scale(2)';
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.style.display = 'none';
            document.getElementById('main-card').classList.remove('hidden');
            startTyping();
        }, 1600);
    });

    // --- RISING TYPEWRITER LOGIC ---
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
            setTimeout(startTyping, char === '.' ? 600 : 50);
        } else {
            document.getElementById('button-group').classList.remove('hidden');
        }
    }

    // --- NO BUTTON RUNAWAY ---
    document.getElementById('no-btn').addEventListener('mouseover', function() {
        this.style.position = 'fixed';
        this.style.left = Math.random() * 70 + 'vw';
        this.style.top = Math.random() * 70 + 'vh';
    });

    // --- FINAL YES ACTION ---
    document.getElementById('yes-btn').addEventListener('click', () => {
        document.getElementById('main-card').classList.add('hidden');
        document.getElementById('final-yes').classList.remove('hidden');
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { response: "YES 💕" });
    });
});
