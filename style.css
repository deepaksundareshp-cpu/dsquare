/* Envelope Overlay Styling */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fdf6e3;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    cursor: pointer;
    transition: transform 1.2s ease-in-out, opacity 0.8s ease;
}

.envelope-content { text-align: center; }

.heart-seal {
    font-size: 5rem;
    animation: pulse 2s infinite;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
}

.click-instruction {
    font-family: 'Caveat', cursive;
    font-size: 1.8rem;
    color: #4a4a4a;
    margin-top: 20px;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.overlay.open {
    transform: translateY(-100%);
    opacity: 0;
}

/* Page Background */
body {
    margin: 0;
    padding: 0;
    background: #fdf6e3;
    background-image: url('https://www.transparenttextures.com/patterns/cream-paper.png');
    font-family: 'Inter', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow-x: hidden;
}

/* Notebook Container */
.journal-container {
    background: #ffffff;
    width: 90%;
    max-width: 600px;
    padding: 50px 40px;
    border-radius: 2px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    background-image: repeating-linear-gradient(transparent, transparent 31px, #e8d5d5 31px, #e8d5d5 32px);
    line-height: 32px;
    border-left: 5px solid #ffb6c1;
    position: relative;
    z-index: 10;
}

.title {
    font-family: 'Caveat', cursive;
    font-size: 3rem;
    text-align: center;
    color: #4a4a4a;
}

.journal-text {
    font-family: 'Caveat', cursive;
    font-size: 1.6rem;
    color: #444;
    white-space: pre-line;
}

.coffee-section { margin-top: 40px; text-align: center; }
.coffee-question { font-family: 'Caveat', cursive; font-size: 2.2rem; }

.buttons { display: flex; justify-content: center; gap: 20px; min-height: 60px; }

.btn {
    padding: 10px 30px;
    border-radius: 25px;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    font-size: 1.1rem;
    border: 1px solid #4a4a4a;
    transition: transform 0.2s;
}

.primary { background: #ffb6c1; color: white; border: none; }
.secondary { background: #f0f0f0; color: #555; position: relative; }

.bounce { animation: bounce 2s infinite; }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }

/* Background Deco */
.sticker { position: absolute; font-size: 2.5rem; opacity: 0.6; z-index: 1; }
.s1 { top: 10%; left: 5%; } .s2 { top: 15%; right: 5%; }
.s3 { bottom: 10%; left: 8%; } .s4 { bottom: 15%; right: 8%; }

.hidden { display: none !important; }

.response { text-align: center; animation: fadeIn 1s; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.hearts { font-size: 2rem; margin-top: 15px; }

@media (max-width: 600px) {
    .journal-container { padding: 30px 20px; width: 85%; }
}
