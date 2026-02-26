// ENTER YOUR EMAILJS KEYS HERE
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";

emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById('envelope-overlay');
    const icon = document.getElementById('envelope-icon');
    const mainCard = document.getElementById('main-card');
    const typedText = document.getElementById('typed-text');
    const music = document.getElementById('bg-music');
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const btnGroup = document.getElementById('button-group');

    const fullText = `There’s something called journaling… it’s about preserving something personal. And I genuinely want to thank you for teaching me that.

I never used to write things down, especially not my dreams. I realized that the first few minutes after waking up are important. If I let other thoughts enter my mind, the dream slowly fades away.

So I started writing immediately after waking up, just whatever I could remember.

After seeing your work, something clicked for me. I understood that writing isn’t just about preserving something personal.

In a world where so much of our lives feels visible and public, journaling feels different. It feels private. It feels intentional. It feels like something that is ONLY I KNOW.

And I genuinely want to thank you for that.

I’m someone who wants to learn and keep learning. Sometimes we don’t even realize who teaches us something valuable in life — but in this case, you did.

So... coffee? ☕`;

    // 1. Multicolored Star Generator
    const starField = document.getElementById('star-field');
    const starColors = ['#ffffff', '#ffb3b3', '#b3ffb3', '#ffffb3']; // White, soft red, soft green, soft yellow
    
    for (let i = 0; i < 400; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.width = star.style.height = (Math.random() * 2 + 1) + 'px';
        star.style.backgroundColor = starColors[Math.floor(Math.random() * starColors.length)];
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        starField.appendChild(star);
    }

    // 2. Shooting Stars Generator
    function launchShootingStar() {
        const sStar = document.createElement('div');
        sStar.className = 'shooting-star';
        sStar.style.left = (Math.random() * 80 + 20) + 'vw';
        sStar.style.top = (Math.random() * 40) + 'vh';
        sStar.style.width = (Math.random() * 100 + 150) + 'px';
        starField.appendChild(sStar);

        const animation = sStar.animate([
            { transform: 'translateX(0) translateY(0) rotate(-45deg)', opacity: 1 },
            { transform: 'translateX(-1000px) translateY(1000px) rotate(-45deg)', opacity: 0 }
        ], { duration: 2500, easing: 'linear' });

        animation.onfinish = () => sStar.remove();
    }
    // Launch a shooting star every 5 seconds
    setInterval(launchShootingStar, 5000);

    // 3. Envelope Tear & Transition
    overlay.addEventListener('click', () => {
        music.volume = 0.4;
        music.play().catch(e => console.log("Audio trigger failed:", e));
        
        icon.classList.add('envelope-tear');
        overlay.classList.add('fade-out');

        setTimeout(() => {
            overlay.style.display = 'none';
            mainCard.classList.remove('hidden');
            startTyping();
        }, 1800);
    });

    // 4. Rising Typewriter with Letter Fade
    let charIndex = 0;
    function startTyping() {
        if (charIndex < fullText.length) {
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = fullText.charAt(charIndex);
            typedText.appendChild(span);

            // Start fading after 4 seconds
            setTimeout(() => {
                span.classList.add('fade-old');
            }, 4000);

            charIndex++;
            let speed = 65;
            if (fullText.charAt(charIndex - 1) === '.' || fullText.charAt(charIndex - 1) === '?') speed = 600;
            
            setTimeout(startTyping, speed);
        } else {
            setTimeout(() => {
                btnGroup.classList.remove('hidden');
            }, 1000);
        }
    }

    // 5. Runaway Button logic
    noBtn.addEventListener('mouseover', () => {
        const x = Math.random() * (window.innerWidth - 150);
        const y = Math.random() * (window.innerHeight - 80);
        noBtn.style.position = 'fixed';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
    });

    yesBtn.addEventListener('click', () => {
        mainCard.classList.add('hidden');
        document.getElementById('final-yes').classList.remove('hidden');
        
        emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            user_response: "YES 💕",
            click_time: new Date().toLocaleString()
        });
    });
});
