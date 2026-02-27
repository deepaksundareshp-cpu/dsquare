document.addEventListener("DOMContentLoaded", () => {
    const nebula = document.getElementById('nebula');
    const starField = document.getElementById('star-field');
    const typedText = document.getElementById('typed-text');
    const mainCard = document.getElementById('main-card');

    // Launch Star Engine with Multiple Colors
    function launchStar(isShower = false) {
        const sStar = document.createElement('div');
        const colors = ['#fff', '#00fbff', '#ffae00', '#ff00ff', '#ffd700', '#fff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        sStar.className = 'shooting-star';
        sStar.style.left = Math.random() * window.innerWidth + 'px';
        sStar.style.top = Math.random() * window.innerHeight * 0.4 + 'px';
        
        const width = isShower ? (Math.random() * 350 + 250) : (Math.random() * 150 + 100);
        sStar.style.width = width + 'px';
        sStar.style.height = '2px';
        sStar.style.background = `linear-gradient(90deg, ${color}, transparent)`;
        sStar.style.boxShadow = `0 0 25px ${color}`;
        
        starField.appendChild(sStar);

        const duration = isShower ? 3000 : 2000;
        const anim = sStar.animate([
            { transform: 'translate(0,0) rotate(-45deg)', opacity: 0 },
            { transform: 'translate(-100px, 100px) rotate(-45deg)', opacity: 1, offset: 0.1 },
            { transform: `translate(-${window.innerWidth}px, ${window.innerWidth}px) rotate(-45deg)`, opacity: 0 }
        ], { duration: duration, easing: 'linear' });

        anim.onfinish = () => sStar.remove();
    }
    
    // Background background stars (slow)
    setInterval(() => launchStar(false), 2000);

    // OPEN ENVELOPE LOGIC
    document.getElementById('envelope-overlay').addEventListener('click', function() {
        const music = document.getElementById('bg-music');
        if(music) music.play().catch(() => {});

        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        this.classList.add('hidden');

        setTimeout(() => {
            mainCard.classList.remove('hidden');
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
                currentYOffset -= 45; 
                typedText.style.transform = `translateY(${currentYOffset}px)`;
            } else {
                typedText.appendChild(span);
            }

            // Text fades out after 12 seconds
            setTimeout(() => span.classList.add('fade-out'), 12000);

            charIndex++;
            setTimeout(startTyping, char === '.' ? 700 : 40);
        } else {
            // Wait 8s after "coffee?" then start meteor approach
            setTimeout(triggerBigBangSequence, 8000);
        }
    }

    function triggerBigBangSequence() {
        const bang = document.createElement('div');
        bang.id = 'big-bang-element';
        document.body.appendChild(bang);

        const m1 = document.createElement('div'); m1.className = 'heavy-meteor';
        m1.style.left = '-250px'; m1.style.top = '-250px';
        const m2 = document.createElement('div'); m2.className = 'heavy-meteor';
        m2.style.right = '-250px'; m2.style.bottom = '-250px';
        
        document.body.appendChild(m1); document.body.appendChild(m2);

        // Slow Realistic Meteor approach (3 seconds)
        const collTime = 3000;
        m1.animate([{left:'-250px', top:'-250px'}, {left:'50%', top:'50%', transform:'translate(-50%,-50%)'}], {duration: collTime, easing:'ease-in'});
        m2.animate([{right:'-250px', bottom:'-250px'}, {right:'50%', bottom:'50%', transform:'translate(50%,50%)'}], {duration: collTime, easing:'ease-in'});

        setTimeout(() => {
            m1.remove(); m2.remove();
            bang.classList.add('bang-active');
            nebula.classList.add('intense');

            // Realistic Rain-style Multi-color Shower (lasts 3 seconds)
            let showerInterval = setInterval(() => {
                launchStar(true);
            }, 40);

            setTimeout(() => {
                clearInterval(showerInterval);
                mainCard.style.opacity = '0';
            }, 3000);
        }, collTime);
    }
});
