// ENTER YOUR EMAILJS KEYS HERE
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";

emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const envelope = document.getElementById('envelope');
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

    // Increased to 400 stars for a "Starry Night" feel
    const starField = document.getElementById('star-field');
    for (let i = 0; i < 400; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.width = star.style.height = (Math.random() * 2 + 1) + 'px';
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        starField.appendChild(star);
    }

    // Audio triggers specifically upon clicking the heart
    envelope.addEventListener('click', () => {
        envelope.style.opacity = '0';
        music.volume = 0.4; 
        music.play().catch(e => console.log("Audio play failed:", e));

        setTimeout(() => {
            envelope.classList.add('hidden');
            mainCard.classList.remove('hidden');
            startTyping();
        }, 1200);
    });

    let i = 0;
    function startTyping() {
        if (i < fullText.length) {
            typedText.textContent += fullText.charAt(i);
            i++;
            let speed = 55; 
            if (fullText.charAt(i-1) === '.' || fullText.charAt(i-1) === '?') speed = 600;
            if (fullText.charAt(i-1) === ',') speed = 300;
            setTimeout(startTyping, speed);
        } else {
            setTimeout(() => {
                btnGroup.classList.remove('hidden');
            }, 1000);
        }
    }

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('touchstart', moveButton);

    function moveButton() {
        const x = Math.random() * (window.innerWidth - 150);
        const y = Math.random() * (window.innerHeight - 80);
        noBtn.style.position = 'fixed';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
        noBtn.style.zIndex = "1001";
    }

    yesBtn.addEventListener('click', () => {
        mainCard.classList.add('hidden');
        document.getElementById('final-yes').classList.remove('hidden');
        emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            user_response: "YES 💕",
            click_time: new Date().toLocaleString()
        });
    });
});
