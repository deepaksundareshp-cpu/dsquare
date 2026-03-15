document.addEventListener("DOMContentLoaded", () => {
    const nebula = document.getElementById('nebula');
    const starField = document.getElementById('star-field');
    const typedText = document.getElementById('typed-text');
    const mainCard = document.getElementById('main-card');

    // 1. Static Twinkling Stars (The missing part)
    function createBackgroundStars() {
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.className = 'static-star';
            const size = Math.random() * 2 + 1 + 'px';
            star.style.width = size;
            star.style.height = size;
            star.style.top = Math.random() * 100 + 'vh';
            star.style.left = Math.random() * 100 + 'vw';
            star.style.setProperty('--twinkle-duration', (Math.random() * 3 + 2) + 's');
            starField.appendChild(star);
        }
    }
    createBackgroundStars();

    // 2. Mouse Effect: Stardust Trail
    window.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.3) {
            const p = document.createElement('div');
            p.className = 'cursor-particle';
            p.style.left = e.clientX + 'px';
            p.style.top = e.clientY + 'px';
            const driftX = (Math.random() - 0.5) * 100 + 'px';
            const driftY = (Math.random() - 0.5) * 100 + 'px';
            p.style.setProperty('--dx', driftX);
            p.style.setProperty('--dy', driftY);
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 1200);
        }
    });

    // 3. Shooting Star Engine
    function launchStar(isShower = false) {
        const sStar = document.createElement('div');
        const colors = ['#fff', '#00fbff', '#ffae00', '#ff00ff', '#ffd700'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        sStar.className = 'shooting-star';
        sStar.style.left = Math.random() * window.innerWidth + 'px';
        sStar.style.top = Math.random() * window.innerHeight * 0.4 + 'px';
        sStar.style.width = (isShower ? 300 : 150) + 'px';
        sStar.style.height = '2px';
        sStar.style.background = `linear-gradient(90deg, ${color}, transparent)`;
        sStar.style.boxShadow = `0 0 20px ${color}`;
        starField.appendChild(sStar);

        const anim = sStar.animate([
            { transform: 'translate(0,0) rotate(-45deg)', opacity: 0 },
            { transform: 'translate(-100px, 100px) rotate(-45deg)', opacity: 1, offset: 0.1 },
            { transform: 'translate(-1200px, 1200px) rotate(-45deg)', opacity: 0 }
        ], { duration: isShower ? 3000 : 2000 });
        anim.onfinish = () => sStar.remove();
    }
    setInterval(() => launchStar(false), 2000);

    // 4. Opening Sequence
    document.getElementById('envelope-overlay').addEventListener('click', function() {
        document.getElementById('bg-music').play().catch(() => {});
        document.getElementById('paper-left').classList.add('rip-left');
        document.getElementById('paper-right').classList.add('rip-right');
        this.classList.add('hidden');
        setTimeout(() => {
            mainCard.classList.remove('hidden');
            startTyping();
        }, 1500);
    });

    // 5. Typing Logic
    const fullText = `I feel something is missing in me.... A reason???? A question of worth???\n\nI just don’t know. I don’t give up easily, no matter how humiliating it gets—everything... is learning. It happened to me in a way I didn’t expect, and it happened to you, too.\n\nI just don’t know if you feel how I feel. I feel things deeply and I care too much, expecting nothing in return... but the truth is, I expected something from you.\n\nI thought you could change me. I thought you could make me better for your better future. Maybe it’s false, but I believed it was true.\n\nThings took a change in a way we never expected. That’s fine; learning makes us better. I moved on alone, but you had someone you thought might be the one.\n\nI want you to learn, too, rather than getting angry at him. It’s not worth it. Trust me, it’s not going to make you better. Things fade... your good deeds fade... your past fades... just like how these words are fading on the screen.\n\nI see you most of the time. Whenever I go to the office, you appear. And every time I see you...\n\nYOU... LOOK... LIKE... THIS.`;
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
                currentYOffset -= 35;
                typedText.style.transform = `translateY(${currentYOffset}px)`;
            } else {
                typedText.appendChild(span);
            }
            setTimeout(() => span.classList.add('fade-out'), 5000);
            charIndex++;
            setTimeout(startTyping, char === '.' ? 900 : 65);
        } else {
            setTimeout(triggerBigBangSequence, 6000);
        }
    }

    // 6. Big Bang Sequence
    function triggerBigBangSequence() {
        const bang = document.createElement('div');
        bang.id = 'big-bang-element';
        document.body.appendChild(bang);
        const m1 = document.createElement('div'); m1.className = 'heavy-meteor';
        m1.style.left = '-200px'; m1.style.top = '-200px';
        const m2 = document.createElement('div'); m2.className = 'heavy-meteor';
        m2.style.right = '-200px'; m2.style.bottom = '-200px';
        document.body.appendChild(m1); document.body.appendChild(m2);
        const collTime = 3000;
        m1.animate([{left:'-200px', top:'-200px'}, {left:'50%', top:'50%', transform:'translate(-50%,-50%)'}], {duration: collTime, easing:'ease-in'});
        m2.animate([{right:'-200px', bottom:'-200px'}, {right:'50%', bottom:'50%', transform:'translate(50%,50%)'}], {duration: collTime, easing:'ease-in'});
        setTimeout(() => {
            m1.remove(); m2.remove();
            bang.classList.add('bang-active');
            nebula.classList.add('intense');
            let showerInterval = setInterval(() => launchStar(true), 50);
            setTimeout(() => {
                clearInterval(showerInterval);
                mainCard.style.opacity = '0';
            }, 3000);
        }, collTime);
    }
});
