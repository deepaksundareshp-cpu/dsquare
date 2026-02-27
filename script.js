const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const starField = document.getElementById('star-field');
    const revealArea = document.getElementById('reveal-area');
    const buttonGroup = document.getElementById('button-group');
    
    const fullNote = `There’s something called journaling… it’s about preserving something personal. And I genuinely want to thank you for teaching me that. I never used to write things down, especially not my dreams. I realized that the first few minutes after waking up are important. If I let other thoughts enter my mind, the dream slowly fades away. So I started writing immediately after waking up, just whatever I could remember. After seeing your work, something clicked for me. I understood that writing isn’t just about preserving something personal. In a world where so much of our lives feels visible and public, journaling feels different. It feels private. It feels intentional. It feels like something that is ONLY I KNOW. And I genuinely want to thank you for that. I’m someone who wants to learn and keep learning. Sometimes we don’t even realize who teaches us something valuable in life — but in this case, you did. So... coffee? ☕`;

    // 1. GENERATE BACKGROUND STARS
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starField.appendChild(star);
    }

    // 2. SHOOTING STARS ENGINE
    function shoot() {
        const s = document.createElement('div');
        s.className = 'shooting-star';
        s.style.width = Math.random() * 200 + 100 + 'px';
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 40 + '%';
        starField.appendChild(s);
        
        s.animate([
            { transform: 'rotate(-45deg) translateX(0)', opacity: 0 },
            { transform: 'rotate(-45deg) translateX(-150px)', opacity: 1, offset: 0.1 },
            { transform: 'rotate(-45deg) translateX(-1200px)', opacity: 0 }
        ], { duration: 2500 }).onfinish = () => s.remove();
    }
    setInterval(shoot, 1500);

    // 3. SETUP THE NOTE
    fullNote.split(' ').forEach(word => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'word';
        if (word.includes('coffee')) span.id = 'trigger';
        revealArea.appendChild(span);
    });

    // 4. REVEAL AND BUTTON LOGIC
    window.addEventListener('mousemove', (e) => {
        const words = document.querySelectorAll('.word');
        words.forEach(word => {
            const rect = word.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            if (Math.sqrt(dx*dx + dy*dy) < 70) { 
                word.classList.add('lit');
                // SHOW YES/NO BUTTONS ONLY WHEN COFFEE IS REVEALED
                if (word.id === 'trigger') {
                    buttonGroup.classList.remove('hidden-btn');
                    buttonGroup.classList.add('show-btn');
                }
            }
        });
    });

    // 5. ENVELOPE OPENING
    document.getElementById('envelope-overlay').addEventListener('click', () => {
        document.getElementById('bg-music').play().catch(()=>{});
        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        setTimeout(() => {
            document.getElementById('envelope-overlay').style.display = 'none';
            document.getElementById('echo-container').classList.remove('hidden');
        }, 1500);
    });

    // 6. YES CLICK
    document.getElementById('yes-btn').addEventListener('click', () => {
        document.getElementById('echo-container').style.display = 'none';
        document.getElementById('final-yes').classList.remove('hidden');
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { response: "YES 💕" });
    });
});
