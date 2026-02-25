body {
    background-color: #fdf6e3;
    background-image: url('https://www.transparenttextures.com/patterns/cream-paper.png');
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    font-family: 'Caveat', cursive;
    overflow: hidden;
    position: relative;
}

/* Stickers */
.sticker {
    position: absolute;
    font-size: 3rem;
    opacity: 0.7;
    z-index: 1;
}
.sticker-1 { top: 15%; left: 10%; transform: rotate(-15deg); }
.sticker-2 { top: 20%; right: 15%; transform: rotate(20deg); }
.sticker-3 { bottom: 15%; left: 15%; transform: rotate(10deg); }
.sticker-4 { bottom: 20%; right: 10%; transform: rotate(-20deg); }

/* Book */
.book {
    position: relative;
    width: 90%;
    max-width: 600px;
    height: 80vh;
    perspective: 2000px;
    z-index: 10;
}

/* Pages */
.page {
    position: absolute;
    width: 100%;
    height: 100%;
    background: white;
    padding: 50px 40px;
    border-radius: 8px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    background-image: repeating-linear-gradient(transparent, transparent 31px, #e8d5d5 31px, #e8d5d5 32px);
    line-height: 32px;
    transform-origin: left;
    transition: transform 1s ease;
    backface-visibility: hidden;
}

/* Page 2 hidden behind */
.page-2 {
    transform: rotateY(180deg);
}

/* Flip animation */
.book.flipped .page-1 {
    transform: rotateY(-180deg);
}

.book.flipped .page-2 {
    transform: rotateY(0deg);
}

.message {
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 30px;
    font-weight: 700;
}

.journal-text {
    font-size: 1.3rem;
    color: #4a4a4a;
}

.turn-btn {
    margin-top: 20px;
    font-size: 1.5rem;
    padding: 8px 20px;
    border: none;
    border-radius: 20px;
    background: #d8bfd8;
    cursor: pointer;
}
.turn-btn:hover {
    background: #c8a2c8;
}

/* Buttons */
.buttons {
    display: flex;
    justify-content: center;
    gap: 30px;
}

.btn {
    font-family: 'Caveat', cursive;
    font-size: 1.8rem;
    padding: 10px 30px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

#yes-btn {
    background-color: #ffb6c1;
    color: #fff;
}

#no-btn {
    background-color: #e0e0e0;
    color: #555;
}

.hidden {
    display: none !important;
}

.hearts {
    font-size: 2rem;
    margin-top: 20px;
    animation: bounce 1.5s infinite ease-in-out;
}

@keyframes bounce {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
}
