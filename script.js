// Step 1: Initialize EmailJS (You will replace 'YOUR_PUBLIC_KEY' later)
emailjs.init("YOUR_PUBLIC_KEY");

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mainContent = document.getElementById('main-content');
const yesContent = document.getElementById('yes-content');
const noContent = document.getElementById('no-content');

// Make the NO button run away
function moveNoButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

// Triggers when mouse hovers or touches the NO button
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);

// Function to send email
function sendNotification(answer) {
    const templateParams = {
        user_response: answer,
        click_time: new Date().toLocaleString()
    };

    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' later
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
}

// YES Button Clicked
yesBtn.addEventListener('click', () => {
    mainContent.classList.add('hidden');
    yesContent.classList.remove('hidden');
    sendNotification('YES 💕');
});

// NO Button Clicked (In case she somehow catches it!)
noBtn.addEventListener('click', () => {
    mainContent.classList.add('hidden');
    noContent.classList.remove('hidden');
    sendNotification('NO 🙈');
});
