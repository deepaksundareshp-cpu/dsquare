body {
    margin: 0;
    padding: 0;
    background: #fdf6e3; /* Soft cream */
    background-image: url('https://www.transparenttextures.com/patterns/cream-paper.png');
    font-family: 'Inter', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow-x: hidden;
}

.journal-container {
    background: #ffffff;
    width: 90%;
    max-width: 600px;
    padding: 50px 40px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    border-radius: 2px;
    position: relative;
    z-index: 10;
    /* Notebook lines effect */
    background-image: repeating-linear-gradient(transparent, transparent 31px, #e8d5d5 31px, #e8d5d5 32px);
    line-height: 32px;
    border-left: 5px solid #ffb6c1; /* Pink notebook spine */
}

.title {
    font-family: 'Caveat', cursive;
    font-size: 3rem;
    text-align: center;
    margin-bottom: 30px;
    color: #4a4a4a;
}

.journal-text {
    font-family: 'Caveat', cursive;
    font-size: 1.6rem;
    color: #444;
    min-height: 200px;
    white-space: pre-line;
}

.coffee-section {
    margin-top: 40px;
    text-align: center;
    transition: all 0.8s ease;
}

.coffee-question {
    font-family: 'Caveat', cursive;
    font-size: 2.2rem;
    margin-bottom: 25px;
}

.buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    height: 60px; /* Space for moving button */
}

.btn {
    padding: 10px 30px;
    border-radius: 25px;
    border: 1px solid #4a4a4a;
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform 0.2s;
    font-family: 'Inter', sans-serif;
}

.primary {
    background: #ffb6c1;
    color: white;
    border: none;
    box-shadow: 0 4px 10px rgba(255, 182, 193, 0.4);
}

.secondary {
    background: #f0f0f0;
    color: #555;
    position: relative; /* Needed for JS movement */
}

.bounce {
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
}

.sticker {
    position: absolute;
    font-size: 2.5rem;
    z-index: 1;
    opacity: 0.6;
}
.s1 { top: 10%; left: 5%; transform: rotate(-15deg); }
.s2 { top: 15%; right: 5%; transform: rotate(15deg); }
.s3 { bottom: 10%; left: 8%; transform: rotate(10deg); }
.s4 { bottom: 15%; right: 8%; transform: rotate(-20deg); }

.hidden { display: none !important; }

.response {
    text-align: center;
    animation: fadeIn 1s;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.hearts { font-size: 2rem; margin-top: 15px; }

@media (max-width: 600px) {
    .journal-container { padding: 30px 20px; width: 85%; }
    .title { font-size: 2.2rem; }
}
