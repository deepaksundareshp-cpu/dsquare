const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const nebula = document.getElementById('nebula');
    const starField = document.getElementById('star-field');
    const particleContainer = document.getElementById('cursor-particle-container');
    const typedText = document.getElementById('typed-text');
    const mainCard = document.getElementById('main-card');

    // 1. Generate Static Stars
    for (let i = 0; i < 150; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `width:2px; height:2px; top:${Math.random()*100}vh; left:${Math.random()*100}vw; --duration:${Math.random()*3+2}s;`;
        starField.appendChild(star);
    }

    // 2. Multi-Color Star Engine
    function launchStar(isShower = false) {
        const sStar = document.createElement('div');
        const colors = ['#fff', '#00fbff', '#ffae00', '#ff00ff', '#ffd700'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        sStar.className = 'shooting-star';
        sStar.style.left = Math.random() * window.innerWidth + 'px';
        sStar.style.top = Math.random() * window.innerHeight * 0.6 + 'px';
        sStar.style.width = (Math.random() * 150 + 100) + 'px';
        sStar.style.height = isShower ? '3px' : '2px';
        sStar.style.background = `linear-gradient(90deg, ${color}, transparent)`;
        sStar.style.boxShadow = `0 0 15px ${color}`;
        
        starField.appendChild(sStar);

        const duration = isShower ? 3000 : 1800; // Shower stars go slow (3s)
        const anim = sStar.animate([
            {transform:'translate(0,0) rotate(-45deg)', opacity:0},
            {transform:'translate(-100px,100px) rotate(-45deg)', opacity:1, offset:0.1},
            {transform:'translate(-1200px,1200px) rotate(-45deg)', opacity:0}
        ], {duration: duration, easing: 'linear'});
        anim.onfinish = () => sStar.remove();
    }
    setInterval(() => launchStar(false), 2000); 

    // 3. Mouse Interaction
    window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
        nebula.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        if (Math.random() > 0.5) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.cssText = `left:${e.clientX}px; top:${e.clientY}px; width:4px; height:4px; --mx:${Math.random()*80-40}px; --my:${Math.random()*80-40}px;`;
            particleContainer.appendChild(p);
            setTimeout(() => p.remove(), 1000);
        }
    });

    // 4. Reveal Action
    document.getElementById('envelope-overlay').addEventListener('click', () => {
        document.getElementById('bg-music').play().catch(()=>{});
        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        document.getElementById('envelope-overlay').style.display = 'none';
        setTimeout(() => { 
            mainCard.classList.remove('hidden'); 
            startTyping(); 
        }, 1200);
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
            
            // Fades to completely invisible
            setTimeout(() => span.classList.add('fade-old'), 7000);
            
            charIndex++;
            // Auto-scroll logic
            mainCard.scrollTop = mainCard.scrollHeight;
            setTimeout(startTyping, char === '.' ? 600 : 45);
        } else {
            // Wait for coffee to disappear then explode
            setTimeout(triggerBigBangSequence, 9000);
        }
    }

    function triggerBigBangSequence() {
        const bang = document.createElement('div');
        bang.id = 'big-bang-element';
        document.body.appendChild(bang);

        const m1 = document.createElement('div'); m1.className = 'heavy-meteor';
        m1.style.left = '-150px'; m1.style.top = '-150px';
        const m2 = document.createElement('div'); m2.className = 'heavy-meteor';
        m2.style.right = '-150px'; m2.style.bottom = '-150px';
        
        document.body.appendChild(m1); document.body.appendChild(m2);

        // Meteor collision speed (3s)
        const collTime = 3000;
        m1.animate([{left:'-150px', top:'-150px'}, {left:'50%', top:'50%', transform:'translate(-50%,-50%)'}], {duration: collTime, easing:'ease-out'});
        m2.animate([{right:'-150px', bottom:'-150px'}, {right:'50%', bottom:'50%', transform:'translate(50%,50%)'}], {duration: collTime, easing:'ease-out'});

        setTimeout(() => {
            m1.remove(); m2.remove();
            bang.classList.add('bang-active'); // Expansion lasts 3s
            nebula.classList.add('intense');

            // Slow, multi-colored shower starts immediately upon impact
            let showerInterval = setInterval(() => launchStar(true), 60); 
            
            setTimeout(() => {
                clearInterval(showerInterval);
                mainCard.classList.add('hidden');
                emailjs.send(SERVICE_ID, TEMPLATE_ID, { response: "Cinematic End Reached" });
            }, 4000); // Shower lasts 4 seconds total

        }, collTime);
    }
});
