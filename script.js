// 1. INITIALIZE EMAILJS
// Replace "YOUR_PUBLIC_KEY" with your actual key from EmailJS Account tab
emailjs.init("YOUR_PUBLIC_KEY");

document.addEventListener("DOMContentLoaded", function () {

    const text = `There’s something called journaling… and honestly, I only recently understood that word properly — because of you.

I never used to write things down, especially not my dreams. I realized that the first few minutes after waking up are important. If I let other thoughts enter my mind, the dream slowly fades away.

So I started writing immediately after waking up, just whatever I could remember.

After seeing your work, something clicked for me. I understood that writing isn’t just about preserving something personal.

In a world where so much of our lives feels visible and public, journaling feels different. It feels private. It feels intentional. It feels like something that is ONLY I KNOW.

And I genuinely want to thank you for that.

I’m someone who wants to learn and keep learning. Sometimes we don’t even realize who teaches us something valuable in life — but in this case, you did.`;

    const typedText = document.getElementById("typed-text");
    const coffeeSection = document.getElementById("coffee-section");
    const yesBtn = document.getElementById("yes-btn");
    const noBtn = document.getElementById("no-btn");
    const yesContent = document.getElementById("yes-content");
    const noContent = document.getElementById("no-content");

    let index = 0;

    // Typewriter effect
    function typeWriter() {
        if (index < text.length) {
            typedText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 30); // Speed of typing
        } else {
            coffeeSection.classList.remove("hidden");
        }
    }

    typeWriter();

    // The "NO" button runs away logic
    noBtn.addEventListener("mouseover", moveButton);
    noBtn.addEventListener("touchstart", moveButton);

    function moveButton() {
        // Calculate random position within the screen
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        
        noBtn.style.position = "fixed";
        noBtn.style.left = x + "px";
        noBtn.style.top = y + "px";
    }

    // Email Sending Function
    function sendResponse(answer) {
        const params = {
            user_response: answer,
            click_time: new Date().toLocaleString()
        };

        // Replace these with your actual IDs from EmailJS
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", params)
            .then(() => console.log("Sent!"))
            .catch((err) => console.log("Error:", err));
    }

    // Button Actions
    yesBtn.addEventListener("click", function () {
        document.getElementById("typed-text").classList.add("hidden");
        document.querySelector(".title").classList.add("hidden");
        coffeeSection.classList.add("hidden");
        yesContent.classList.remove("hidden");
        sendResponse("YES 💕");
    });

    noBtn.addEventListener("click", function () {
        coffeeSection.classList.add("hidden");
        noContent.classList.remove("hidden");
        sendResponse("NO 🙈");
    });

});
