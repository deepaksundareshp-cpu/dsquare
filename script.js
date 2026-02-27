const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const revealArea = document.getElementById('reveal-area');
    const starContainer = document.getElementById('star-container');
    const buttonGroup = document.getElementById('button-group');
    
    const fullNote = `There’s something called journaling… it’s about preserving something personal. And I genuinely want to thank you for teaching me that. I never used to write things down, especially not my dreams. I realized that the first few minutes after waking up are important. If I let other thoughts enter my mind, the dream slowly fades away. So I started writing immediately after waking up, just whatever I could remember. After seeing your work, something clicked for me. I understood that writing isn’t just about preserving something personal. In a world where so much of our lives feels visible and public, journaling feels different. It feels private. It feels intentional. It feels like something that is ONLY I KNOW. And I genuinely want to thank you for that. I’m someone who wants to learn and keep learning. Sometimes we don’t even realize who teaches us something valuable in life — but in this case, you did. So... coffee? ☕`;

    // 1. Force Stars to Load
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2.5 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.opacity = Math.random();
        starContainer.appendChild(star);
    }

    // 2. Heavy Shooting Star Engine
    function createShootingStar() {
        const s = document.createElement('div');
        s.className = 'shooting-star';
        s.style.height = '2px';
        s.style.width = (Math.random() * 200 + 100) + 'px';
        s.style.left = Math.random() * window.innerWidth + 'px';
        s.style.top = Math.random() * window.innerHeight + 'px';
        starContainer.appendChild(s);
        
        s.animate([
            { transform: 'rotate(-45deg) translateX(0)', opacity: 0 },
            { transform: 'rotate(-45deg) translateX(-100px)', opacity: 1, offset: 0.1 },
            { transform: 'rotate(-45deg) translateX(-1200px)', opacity: 0 }
        ], { duration: 2000 }).onfinish = () => s.remove();
    }
    setInterval(createShootingStar, 1000);

    // 3. Setup Words
    fullNote.split(' ').forEach((word) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'word';
        if (word.includes('coffee')) span.id = 'final-word';
        revealArea.appendChild(span);
    });

    // 4. Reveal Logic
    window.addEventListener('mousemove', (e) => {
        const words = document.querySelectorAll('.word');
        words.forEach(word => {
            const rect = word.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            if (Math.sqrt(dx*dx + dy*dy) < 80) { 
                word.classList.add('lit');
                if (word.id === 'final-word') {
                    buttonGroup.classList.remove('hidden-btn');
                    buttonGroup.classList.add('show-btn');
                }
            }
        });
    });

    // 5. Interaction
    document.getElementById('envelope-overlay').addEventListener('click', () => {
        document.getElementById('bg-music').play().catch(()=>{});
        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        setTimeout(() => {
            document.getElementById('envelope-overlay').style.display = 'none';
            document.getElementById('echo-container').classList.remove('hidden');
        }, 1500);
    });

    document.getElementById('yes-btn').addEventListener('click', () => {
        document.getElementById('echo-container').style.display = 'none';
        document.getElementById('final-yes').classList.remove('hidden');
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { response: "YES 💕" });
    });

    document.getElementById('no-btn').addEventListener('mouseover', function() {
        this.style.position = 'fixed';
        this.style.left = Math.random() * 80 + 'vw';
        this.style.top = Math.random() * 80 + 'vh';
    });
});
