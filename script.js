const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";

const emailReady = typeof emailjs !== "undefined" && PUBLIC_KEY !== "YOUR_PUBLIC_KEY";
if (emailReady) {
    emailjs.init(PUBLIC_KEY);
}

document.addEventListener("DOMContentLoaded", function () {
    const revealArea = document.getElementById("reveal-area");
    const fullText = "There’s something called journaling… it’s about preserving something personal. And I genuinely want to thank you for teaching me that. I never used to write things down, especially not my dreams. I realized that the first few minutes after waking up are important. If I let other thoughts enter my mind, the dream slowly fades away. After seeing your work, something clicked for me. It feels private. It feels intentional. It feels like something that is ONLY I KNOW. So... coffee? ☕";

    fullText.split(" ").forEach((word) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.className = "word";
        revealArea.appendChild(span);
    });

    const words = document.querySelectorAll(".word");

    function lightNearbyWords(x, y) {
        words.forEach((word) => {
            const rect = word.getBoundingClientRect();
            const dx = x - (rect.left + rect.width / 2);
            const dy = y - (rect.top + rect.height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 105) {
                word.classList.add("lit");
                setTimeout(() => word.classList.remove("lit"), 1800);
            }
        });
    }

    window.addEventListener("mousemove", (e) => lightNearbyWords(e.clientX, e.clientY));
    window.addEventListener("touchmove", (e) => {
        if (e.touches.length > 0) {
            lightNearbyWords(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    document.getElementById("envelope-overlay").addEventListener("click", () => {
        document.getElementById("bg-music").play().catch(() => {});
        document.getElementById("paper-left").classList.add("rip-left");
        document.getElementById("paper-right").classList.add("rip-right");
        document.getElementById("envelope-overlay").style.display = "none";
        document.getElementById("echo-container").classList.remove("hidden");
    });

    const canvas = document.getElementById("starCanvas");
    const ctx = canvas.getContext("2d");

    let stars = [];
    let shootingStars = [];

    function buildStars(count, minSize, maxSize, baseAlpha, alphaRange, drift) {
        return Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: minSize + Math.random() * (maxSize - minSize),
            alphaBase: baseAlpha + Math.random() * alphaRange,
            twinkleSpeed: 0.5 + Math.random() * 2.2,
            phase: Math.random() * Math.PI * 2,
            driftX: (Math.random() - 0.5) * drift,
            driftY: 0.03 + Math.random() * 0.09
        }));
    }

    function createStarField() {
        const area = canvas.width * canvas.height;
        const density = Math.max(300, Math.floor(area / 900));
        const smallCount = Math.floor(density * 0.72);
        const mediumCount = Math.floor(density * 0.22);
        const bigCount = Math.floor(density * 0.06);

        stars = [
            ...buildStars(smallCount, 0.45, 1.2, 0.28, 0.3, 0.03),
            ...buildStars(mediumCount, 1.3, 2.1, 0.45, 0.35, 0.05),
            ...buildStars(bigCount, 2.2, 3.6, 0.7, 0.25, 0.08)
        ];
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createStarField();
    }

    function spawnShootingStar() {
        const startX = Math.random() * canvas.width * 0.85;
        const startY = Math.random() * canvas.height * 0.42;
        const speed = 8 + Math.random() * 10;
        const sizeCategory = Math.random();

        let length = 130;
        let width = 2;
        if (sizeCategory > 0.82) {
            length = 230 + Math.random() * 120;
            width = 3.2;
        } else if (sizeCategory > 0.45) {
            length = 160 + Math.random() * 90;
            width = 2.4;
        } else {
            length = 100 + Math.random() * 70;
            width = 1.8;
        }

        shootingStars.push({
            x: startX,
            y: startY,
            vx: speed,
            vy: speed * (0.35 + Math.random() * 0.18),
            life: 0,
            maxLife: 28 + Math.floor(Math.random() * 18),
            length,
            width
        });
    }

    function drawFrame(ms) {
        const t = ms / 1000;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const star of stars) {
            const twinkle = 0.65 + Math.sin(t * star.twinkleSpeed + star.phase) * 0.35;
            const alpha = Math.min(1, Math.max(0.08, star.alphaBase * twinkle));

            star.x += star.driftX;
            star.y -= star.driftY;

            if (star.y < -5) star.y = canvas.height + 5;
            if (star.x < -5) star.x = canvas.width + 5;
            if (star.x > canvas.width + 5) star.x = -5;

            ctx.beginPath();
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.shadowBlur = star.size > 2.1 ? 14 : 6;
            ctx.shadowColor = "rgba(255,255,255,0.9)";
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        if (Math.random() < 0.02 && shootingStars.length < 3) {
            spawnShootingStar();
        }

        shootingStars = shootingStars.filter((meteor) => {
            meteor.life += 1;
            meteor.x += meteor.vx;
            meteor.y += meteor.vy;

            const progress = meteor.life / meteor.maxLife;
            const alpha = Math.max(0, 1 - progress);

            const endX = meteor.x - meteor.length;
            const endY = meteor.y - meteor.length * 0.42;

            const gradient = ctx.createLinearGradient(meteor.x, meteor.y, endX, endY);
            gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
            gradient.addColorStop(0.15, `rgba(255,255,255,${alpha * 0.8})`);
            gradient.addColorStop(1, "rgba(255,255,255,0)");

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = meteor.width;
            ctx.moveTo(meteor.x, meteor.y);
            ctx.lineTo(endX, endY);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.arc(meteor.x, meteor.y, meteor.width, 0, Math.PI * 2);
            ctx.fill();

            return meteor.life < meteor.maxLife;
        });

        requestAnimationFrame(drawFrame);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    requestAnimationFrame(drawFrame);

    document.getElementById("yes-btn").addEventListener("click", () => {
        document.getElementById("echo-container").classList.add("hidden");
        document.getElementById("final-yes").classList.remove("hidden");

        if (emailReady) {
            emailjs.send(SERVICE_ID, TEMPLATE_ID, { response: "YES 💕" }).catch(() => {});
        }
    });

    document.getElementById("no-btn").addEventListener("mouseover", function () {
        this.style.left = `${Math.random() * 80}vw`;
        this.style.top = `${Math.random() * 80}vh`;
        this.style.position = "fixed";
    });
});
