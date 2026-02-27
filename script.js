const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const nebula = document.getElementById('nebula');
    const starField = document.getElementById('star-field');
    const typedText = document.getElementById('typed-text');

    // 1. Setup Static Stars
    for (let i = 0; i < 200; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `position:absolute; background:#fff; border-radius:50%; width:2px; height:2px; top:${Math.random()*100}vh; left:${Math.random()*100}vw; opacity:${Math.random()};`;
        starField.appendChild(star);
    }

    // 2. Realistic Shower Engine
    function launchStar(isShower = false) {
        const sStar = document.createElement('div');
        const colors = ['#fff', '#00fbff', '#ffae00', '#ff00ff', '#ffd700', '#fff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        sStar.className = 'shooting-star';
        sStar.style.left = Math.random() * window.innerWidth + 'px';
        sStar.style.top = Math.random() * window.innerHeight * 0.4 + 'px';
        
        const width = isShower ? (Math.random() * 300 + 200) : (Math.random() * 150 + 100);
        sStar.style.width = width + 'px';
        sStar.style.height = '2px';
        sStar.style.background = `linear-gradient(90deg, ${color}, transparent)`;
        sStar.style.boxShadow = `0 0 20px ${color}`;
        
        starField.appendChild(sStar);

        const duration = isShower ? 3500 : 2000;
        const anim = sStar.animate([
            { transform: 'translate(0,0) rotate(-45deg)', opacity: 0 },
            { transform: 'translate(-100px, 100px) rotate(-45deg)', opacity: 1, offset: 0.1 },
            { transform: `translate(-${window.innerWidth}px, ${window.innerWidth}px) rotate(-45deg)`, opacity: 0 }
        ], { duration: duration, easing: 'linear' });

        anim.onfinish = () => sStar.remove();
    }

    // 3. Reveal and Start
    document.getElementById('envelope-overlay').addEventListener('click', () => {
        document.getElementById('bg-music').play().catch(()=>{});
        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        setTimeout(() => {
            document.getElementById('envelope-overlay').classList.add('hidden');
            document.getElementById('main-card').classList.remove('hidden');
            startTyping();
        }, 1500);
    });

    const fullText = `There’s something called journaling… it’s about preserving something personal. And I genuinely want to thank you for teaching me that.\n\nI never used to write things down, especially not my dreams. I realized that the first few minutes after waking up are important. If I let other thoughts enter my mind, the dream slowly fades away.\n\nSo I started writing immediately after waking up, just whatever I could remember.\n\nAfter seeing your work, something clicked for me. I understood that writing isn’t just about preserving something personal.\n\nIn a world where so much of our lives feels visible and public, journaling feels different. It feels private. It feels intentional. It feels like something that is ONLY I KNOW.\n\nAnd I genuinely want to thank you for that.\n\nI’m someone who wants to learn and keep learning. Sometimes we don’t even realize who teaches us something valuable in life — but in this case, you did.\n\nSo... coffee? ☕`;

    let charIndex = 0;
    let currentYOffset = 0;

    function startTyping() {
        if (charIndex < fullText.length) {
            const char = fullText.charAt(charIndex);
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = char;
            
            if (char === '\n') {
                typedText.appendChild(document.createElement('br'));
                // Shift text upward when a new line starts to keep the "active" line centered
                currentYOffset -= 40; 
                typedText.style.transform = `translateY(${currentYOffset}px)`;
            } else {
                typedText.appendChild(span);
            }

            // Long fade-out (12 seconds) so user finishes reading before it dies
            setTimeout(() => span.classList.add('fade-out'), 12000);

            charIndex++;
            setTimeout(startTyping, char === '.' ? 700 : 40);
        } else {
            // Wait for total silence after "coffee?" then hit them with the finale
            setTimeout(triggerBigBangSequence, 6000);
        }
    }

    function triggerBigBangSequence() {
        const bang = document.createElement('div');
        bang.id = 'big-bang-element';
        document.body.appendChild(bang);

        const m1 = document.createElement('div'); m1.className = 'heavy-meteor';
        m1.style.left = '-200px'; m1.style.top = '-200px';
        const m2 = document.createElement('div'); m2.className = 'heavy-meteor';
        m2.style.right = '-200px'; m2.style.bottom = '-200px';
        
        document.body.appendChild(m1); document.body.appendChild(m2);

        const collTime = 3500;
        m1.animate([{left:'-200px', top:'-200px'}, {left:'50%', top:'50%', transform:'translate(-50%,-50%)'}], {duration: collTime, easing:'cubic-bezier(0.5, 0, 0.5, 1)'});
        m2.animate([{right:'-200px', bottom:'-200px'}, {right:'50%', bottom:'50%', transform:'translate(50%,50%)'}], {duration: collTime, easing:'cubic-bezier(0.5, 0, 0.5, 1)'});

        setTimeout(() => {
            m1.remove(); m2.remove();
            bang.classList.add('bang-active');
            nebula.classList.add('intense');

            // Realistic Rain-style Shower
            let showerCount = 0;
            let showerInterval = setInterval(() => {
                launchStar(true);
                showerCount++;
                if(showerCount > 100) clearInterval(showerInterval);
            }, 40);

            setTimeout(() => {
                document.getElementById('main-card').style.opacity = '0';
                emailjs.send(SERVICE_ID, TEMPLATE_ID, { response: "Cinematic End Complete" });
            }, 3000);
        }, collTime);
    }
});
