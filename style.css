// REPLACE THESE WITH YOUR KEYS FROM EMAILJS
const PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // From Account tab
const SERVICE_ID = "YOUR_SERVICE_ID"; // From Email Services tab
const TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // From Email Templates tab

// 1. Initialize EmailJS
emailjs.init(PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", function () {
    const envelopeOverlay = document.getElementById("envelope-overlay");
    const mainSection = document.getElementById("main-section");
    const yesContent = document.getElementById("yes-content");
    const noContent = document.getElementById("no-content");
    const music = document.getElementById("bg-music");
    const noBtn = document.getElementById("no-btn");
    const yesBtn = document.getElementById("yes-btn");

    // 1. handle overlay interaction (activates music)
    envelopeOverlay.addEventListener("click", function() {
        envelopeOverlay.classList.add("open");
        music.volume = 0.3; // Low background volume
        music.play();

        // Reveal the main section after envelope animation
        setTimeout(() => {
            envelopeOverlay.style.display = "none";
            mainSection.classList.remove("hidden");
        }, 1200);
    });

    // 2. Playful runaway NO button logic
    function moveNoButton() {
        // Calculate random position
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        
        // Move button to position
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    }

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', moveNoButton);

    // 3. Email Sending Function
    function sendNotification(responseString) {
        const templateParams = {
            user_response: responseString,
            click_time: new Date().toLocaleString()
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });
    }

    // 4. Handle YES button click
    yesBtn.addEventListener("click", function () {
        mainSection.classList.add("hidden");
        yesContent.classList.remove("hidden");
        sendNotification('YES! 💕');
    });

    // 5. Handle NO button click (In case she catches it)
    noBtn.addEventListener("click", function () {
        mainSection.classList.add("hidden");
        noContent.classList.remove("hidden");
        sendNotification('NO 🙈');
    });

});
