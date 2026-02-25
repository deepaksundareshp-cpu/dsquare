body {
    margin: 0;
    padding: 0;
    background: #f8f5f1;
    font-family: 'Inter', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.journal-container {
    background: #ffffff;
    width: 90%;
    max-width: 700px;
    padding: 60px 40px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.06);
    border-radius: 6px;
    line-height: 1.8;
    transition: all 0.4s ease;
}

.title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 40px;
    font-weight: 600;
    color: #2e2e2e;
}

.journal-text {
    font-size: 1.1rem;
    color: #444;
    min-height: 220px;
    white-space: pre-line;
}

.coffee-section {
    margin-top: 50px;
    text-align: center;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.6s ease;
}

.coffee-section.visible {
    opacity: 1;
    transform: translateY(0);
}

.coffee-question {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    margin-bottom: 20px;
}

.buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.btn {
    padding: 10px 26px;
    border-radius: 30px;
    border: 1px solid #2e2e2e;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    background: transparent;
}

.primary:hover {
    background: #2e2e2e;
    color: white;
}

.secondary:hover {
    background: #dcdcdc;
}

.response {
    margin-top: 50px;
    text-align: center;
    opacity: 0;
    transition: opacity 0.6s ease;
}

.response.visible {
    opacity: 1;
}

.hidden {
    display: none;
}

/* Mobile Optimization */
@media (max-width: 600px) {
    .journal-container {
        padding: 40px 25px;
    }

    .title {
        font-size: 2rem;
    }

    .journal-text {
        font-size: 1rem;
    }

    .coffee-question {
        font-size: 1.5rem;
    }
}
