---
layout: default
title: "Flashcards"
---

<div id = "password-overlay" style = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: white; z-index: 10000; display: flex; align-items: center; justify-content: center;">
    <div style = "text-align: center; padding: 30px; border: 1px solid #ddd; border-radius: 5px; background: #f9f9f9;">
        <h3 style = "margin-bottom: 20px;">enter password</h3>
        <input type = "password" id = "password-input" placeholder = "password (press enter)" style = "padding: 10px; border: 1px solid #ddd; border-radius: 3px; font-family: 'Inconsolata', monospace; margin-bottom: 10px; width: 200px;">
        <p id = "password-error" style = "color: #ff4444; margin-top: 10px; display: none;">incorrect password</p>
    </div>
</div>

<div id = "flashcards-content" style = "display: none;">
<p class = "study-intro"><i>Flashcards.</i> Study flashcards from your decks.</p>

<div class = "mode-selector">
    <button class = "mode-btn active" data-mode = "study">study</button>
    <button class = "mode-btn" data-mode = "quiz">quiz</button>
</div>

<div id = "study-mode" class = "mode-content active">
    <div class = "controls">
        <select id = "study-deck-select"><option value = "">-- select a deck --</option></select>
        <button id = "start-study-btn" disabled>start</button>
    </div>
    <div id = "study-area" style = "display: none;">
        <div class = "flashcard-wrapper">
            <button class = "arrow-btn left" id = "prev-card-btn">‹</button>
            <div class = "flashcard-container">
                <div class = "flashcard" id = "study-card">
                    <div class = "card-front">
                        <div class = "card-counter"><span id = "current-card-num">1</span>/<span id = "total-cards">0</span></div>
                        <div class = "card-content" id = "study-front"></div>
                    </div>
                    <div class = "card-back" style = "display: none;">
                        <div class = "card-counter"><span id = "current-card-num-back">1</span>/<span id = "total-cards-back">0</span></div>
                        <div class = "card-content" id = "study-back"></div>
                    </div>
                </div>
            </div>
            <button class = "arrow-btn right" id = "next-card-btn">›</button>
        </div>
        <div class = "shuffle-container">
            <button class = "shuffle-btn" id = "shuffle-btn" title = "shuffle">↻</button>
            <button class = "fullscreen-btn" id = "study-fullscreen-btn" title = "fullscreen">⛶</button>
        </div>
    </div>
</div>

<div id = "quiz-mode" class = "mode-content">
    <div class = "controls">
        <select id = "quiz-deck-select"><option value = "">-- select a deck --</option></select>
        <button id = "start-quiz-btn" disabled>start</button>
    </div>
    <div id = "quiz-area" style = "display: none;">
        <div class = "quiz-progress">
            <div class = "progress-bar">
                <div class = "progress-fill-correct" id = "progress-fill-correct"></div>
                <div class = "progress-fill-incorrect" id = "progress-fill-incorrect"></div>
            </div>
        </div>
        <div class = "quiz-question">
            <div class = "quiz-counter"><span id = "quiz-current-num">1</span>/<span id = "quiz-total">0</span></div>
            <button class = "quiz-next-btn-top" id = "quiz-next-btn" disabled>›</button>
            <h3 id = "quiz-question-text"></h3>
            <div id = "quiz-options"></div>
            <div id = "quiz-answer-input" style = "display: none;">
                <input type = "text" id = "quiz-text-answer" placeholder = "Type your answer">
                <button id = "submit-answer-btn">submit</button>
                <div id = "correct-answer-display" style = "display: none; margin-top: 10px; color: #00cc00; font-weight: bold;"></div>
            </div>
        </div>
    </div>
    <div id = "quiz-results" style = "display: none;">
        <p>score = <span id = "final-score">0</span>/<span id = "final-total">0</span> (<span id = "final-percentage">0</span>%).</p>
        <button id = "retake-quiz-btn">retake</button>
    </div>
</div>
</div>

<style>
.mode-selector { display: flex; gap: 10px; margin: 20px 0; border-bottom: 1px solid rgba(0, 0, 0, 0.1); padding-bottom: 10px; }
.mode-btn { padding: 10px 20px; background: #f5f5f5; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 5px; cursor: pointer; font-family: "Inconsolata", monospace; transition: all 0.3s; }
.mode-btn:hover { background: #e0e0e0; }
.mode-btn.active { background: #4a4a4a; color: white; border-color: #4a4a4a; }
.mode-content { display: none; margin-top: 20px; }
.mode-content.active { display: block; }
.controls { margin-bottom: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px; }
.controls select { padding: 8px; margin-right: 10px; border: 1px solid #ddd; border-radius: 3px; font-family: "Inconsolata", monospace; }
.controls button { padding: 8px 15px; background: #4a4a4a; color: white; border: none; border-radius: 3px; cursor: pointer; font-family: "Inconsolata", monospace; }
.controls button:hover { background: #333; }
.controls button:disabled { background: #ccc; cursor: not-allowed; }
.flashcard-wrapper { display: flex; align-items: center; gap: 15px; margin: 30px 0; position: relative; }
.arrow-btn { width: 40px; height: 40px; border-radius: 50%; border: 1px solid #ddd; background: white; font-size: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s; color: #4a4a4a; }
.arrow-btn:hover { background: #f5f5f5; border-color: #4a4a4a; }
.arrow-btn:active { transform: scale(0.95); }
.flashcard-container { flex: 1; perspective: 1000px; min-height: 300px; position: relative; }
.flashcard { width: 100%; height: 300px; position: relative; transform-style: preserve-3d; transition: transform 0.6s; cursor: pointer; }
.flashcard.flipped { transform: rotateY(180deg); }
.card-front, .card-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border: 1px solid #ddd; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transform-style: preserve-3d; }
.card-back { transform: rotateY(180deg); }
.card-counter { position: absolute; top: 10px; right: 10px; font-size: 16px; color: #666; z-index: 1; background: rgba(255,255,255,0.95); padding: 5px 10px; border-radius: 3px; backface-visibility: hidden; transform: translateZ(1px); }
.card-content { padding: 30px; text-align: center; font-size: 22px; word-wrap: break-word; max-width: 90%; white-space: pre-wrap; }
.shuffle-container { text-align: center; margin-top: 20px; }
.shuffle-btn { width: 40px; height: 40px; border-radius: 50%; border: 1px solid #ddd; background: white; font-size: 20px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all 0.3s; color: #4a4a4a; }
.shuffle-btn:hover { background: #f5f5f5; border-color: #4a4a4a; transform: rotate(90deg); }
.shuffle-btn:active { transform: rotate(90deg) scale(0.95); }
.fullscreen-btn { width: 40px; height: 40px; border-radius: 50%; border: 1px solid #ddd; background: white; font-size: 18px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all 0.3s; color: #4a4a4a; margin-left: 10px; }
.fullscreen-btn:hover { background: #f5f5f5; border-color: #4a4a4a; }
.fullscreen-btn:active { transform: scale(0.95); }
.quiz-progress { margin-bottom: 20px; display: flex; justify-content: center; }
.progress-bar { width: 300px; height: 8px; background: #e0e0e0; border-radius: 4px; border: 1px solid #999; display: flex; position: relative; overflow: visible; }
.progress-fill-correct { height: 100%; background: #00cc00; transition: width 0.3s; width: 0%; border-right: 1px solid #999; box-sizing: border-box; }
.progress-fill-incorrect { height: 100%; background: #ff4444; transition: width 0.3s; width: 0%; border-right: 1px solid #999; box-sizing: border-box; }
.quiz-question { background: #f9f9f9; padding: 30px; border-radius: 5px; margin: 20px 0; position: relative; }
.quiz-counter { position: absolute; top: 10px; left: 10px; font-size: 14px; color: #4a4a4a; background: rgba(255,255,255,0.95); padding: 5px 10px; border-radius: 3px; border: 1px solid #ddd; }
.quiz-next-btn-top { position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; border-radius: 50%; border: 1px solid #ddd; background: white; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s; color: #4a4a4a; }
.quiz-next-btn-top:hover { background: #f5f5f5; border-color: #4a4a4a; }
.quiz-next-btn-top:active { transform: scale(0.95); }
.quiz-next-btn-top:disabled { background: #ccc; border-color: #ccc; color: #999; cursor: not-allowed; }
.quiz-question h3 { margin-bottom: 20px; color: #4a4a4a; white-space: pre-wrap; }
.quiz-option { padding: 15px; margin: 10px 0; background: white; border: 2px solid #ddd; border-radius: 5px; cursor: pointer; transition: all 0.3s; white-space: pre-wrap; }
.quiz-option:hover { border-color: #4a4a4a; background: #f5f5f5; }
.quiz-option.correct { border-color: #00cc00; background: #f0fff0; }
.quiz-option.incorrect { border-color: #ff4444; background: #fff0f0; }
#quiz-answer-input { margin-top: 20px; }
#quiz-answer-input input { width: 70%; padding: 10px; border: 1px solid #ddd; border-radius: 3px; font-family: "Inconsolata", monospace; }
#quiz-answer-input button { padding: 10px 20px; margin-left: 10px; background: #4a4a4a; color: white; border: none; border-radius: 3px; cursor: pointer; font-family: "Inconsolata", monospace; }
#quiz-answer-input button:hover { background: #333; }
#quiz-results { text-align: center; padding: 30px; background: #f9f9f9; border-radius: 5px; margin-top: 20px; }
#quiz-results h2 { color: #4a4a4a; margin-bottom: 20px; }
#quiz-results p { font-size: 18px; margin: 10px 0; }
#retake-quiz-btn { padding: 10px 20px; margin-top: 20px; background: #4a4a4a; color: white; border: none; border-radius: 3px; cursor: pointer; font-family: "Inconsolata", monospace; }
#retake-quiz-btn:hover { background: #333; }
.actions { display: flex; gap: 10px; justify-content: center; margin-top: 20px; }
.actions button { padding: 10px 20px; background: #4a4a4a; color: white; border: none; border-radius: 3px; cursor: pointer; font-family: "Inconsolata", monospace; }
.actions button:hover { background: #333; }
.actions button:disabled { background: #ccc; cursor: not-allowed; }
.error { background: #fff0f0; color: #ff4444; padding: 15px; border-radius: 5px; margin: 20px 0; border: 2px solid #ff4444; }

html.study-fullscreen,
body.study-fullscreen { overflow: hidden !important; height: 100%; height: 100dvh; }
body.study-fullscreen #flashcards-content {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    height: 100dvh;
    min-height: -webkit-fill-available;
    background: #ffffff;
    z-index: 9000;
    overflow: hidden;
    padding: 28px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}
#flashcards-content:fullscreen,
#flashcards-content:-webkit-full-screen,
#flashcards-content:-moz-full-screen,
#flashcards-content:-ms-fullscreen {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    overflow: hidden;
    padding: 28px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: #ffffff;
}
body.study-fullscreen .navbar,
body.study-fullscreen .mode-selector,
body.study-fullscreen .controls,
body.study-fullscreen #quiz-mode { display: none !important; }
body.study-fullscreen #study-mode {
    display: flex !important;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    height: 100%;
    overflow: hidden;
}
body.study-fullscreen #study-area {
    display: flex !important;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    height: 100%;
    overflow: hidden;
    justify-content: center;
}
body.study-fullscreen .flashcard-wrapper {
    flex: 0 1 auto;
    display: flex;
    margin: 0;
    min-height: 0;
    gap: 20px;
}
body.study-fullscreen .flashcard-container {
    flex: 1;
    min-height: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
}
body.study-fullscreen .flashcard {
    flex: 1;
    min-height: 0;
    height: 100%;
    width: 100%;
    position: relative;
}
body.study-fullscreen .shuffle-container {
    margin-top: 20px;
    padding-bottom: 4px;
    flex-shrink: 0;
}
body.study-fullscreen .study-intro { display: none; }
body.study-fullscreen hr { display: none; }
body.study-fullscreen .arrow-btn { width: 56px; height: 56px; font-size: 30px; }
body.study-fullscreen .shuffle-btn,
body.study-fullscreen .fullscreen-btn { width: 56px; height: 56px; font-size: 26px; }
body.study-fullscreen .flashcard-wrapper { align-items: center; justify-content: center; }
body.study-fullscreen .flashcard-container { flex: 1 1 auto; min-width: 50%; max-width: 82%; max-height: 70%; min-height: 65vh; }
body.study-fullscreen .flashcard { flex: 1 1 auto; width: 100%; max-height: 100%; }
body.study-fullscreen .card-content { font-size: 30px; padding: 40px; }
body.study-fullscreen .card-counter { font-size: 20px; }

@media (max-width: 768px) {
    html.study-fullscreen,
    body.study-fullscreen { height: 100dvh; min-height: -webkit-fill-available; }
    body.study-fullscreen #flashcards-content {
        padding: 16px;
        padding: max(16px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right)) max(16px, env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left));
        height: 100dvh;
        min-height: -webkit-fill-available;
        top: 0; left: 0; right: 0; bottom: 0;
    }
    body.study-fullscreen .flashcard-wrapper { gap: 12px; }
    body.study-fullscreen .arrow-btn { width: 44px; height: 44px; font-size: 24px; }
    body.study-fullscreen .shuffle-btn,
    body.study-fullscreen .fullscreen-btn { width: 44px; height: 44px; font-size: 20px; margin-left: 8px; }
    body.study-fullscreen .shuffle-container { margin-top: 24px; }
    body.study-fullscreen .flashcard-container { min-width: 70%; max-width: 95%; min-height: 50vh; max-height: 65%; }
    body.study-fullscreen .card-content { font-size: 26px; padding: 24px; }
    body.study-fullscreen .card-counter { font-size: 18px; }
}
</style>

<script>
const FLASHCARDS_PASSWORD = 'fands_2025'; // password setup
let decks = [], study_cards = [], study_idx = 0, quiz_cards = [], quiz_idx = 0, quiz_score = 0;

function checkPassword() {
    // Check if already authenticated in this session
    if (sessionStorage.getItem('flashcards_authenticated') === 'true') {
        document.getElementById('password-overlay').style.display = 'none';
        document.getElementById('flashcards-content').style.display = 'block';
        return true;
    }
    return false;
}

function authenticate() {
    const input = document.getElementById('password-input').value;
    if (input === FLASHCARDS_PASSWORD) {
        sessionStorage.setItem('flashcards_authenticated', 'true');
        document.getElementById('password-overlay').style.display = 'none';
        document.getElementById('flashcards-content').style.display = 'block';
        initializeApp();
    } else {
        document.getElementById('password-error').style.display = 'block';
        document.getElementById('password-input').value = '';
        document.getElementById('password-input').focus();
    }
}

function initializeApp() {
    loadDecks();
    document.querySelectorAll('.mode-btn').forEach(b => b.onclick = () => switchMode(b.dataset.mode));
    document.getElementById('start-study-btn').onclick = startStudy;
    document.getElementById('study-deck-select').onchange = (e) => document.getElementById('start-study-btn').disabled = !e.target.value;
    document.getElementById('study-card').onclick = flipCard;
    document.getElementById('next-card-btn').onclick = () => { study_idx = (study_idx + 1) % study_cards.length; showCard(); };
    document.getElementById('prev-card-btn').onclick = () => { study_idx = (study_idx - 1 + study_cards.length) % study_cards.length; showCard(); };
    document.getElementById('shuffle-btn').onclick = () => { 
        for (let i = study_cards.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [study_cards[i], study_cards[j]] = [study_cards[j], study_cards[i]]; 
        } 
        study_idx = 0; 
        showCard(); 
    };
    document.getElementById('study-fullscreen-btn').onclick = () => toggleStudyFullscreen();
    ['fullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'mozfullscreenchange'].forEach(ev => {
        document.addEventListener(ev, onFullscreenChange);
    });
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('study-area').style.display !== 'none') {
            if (e.key === 'ArrowLeft') { 
                study_idx = (study_idx - 1 + study_cards.length) % study_cards.length; 
                showCard(); 
            }
            if (e.key === 'ArrowRight') { 
                study_idx = (study_idx + 1) % study_cards.length; 
                showCard(); 
            }
            if (e.key === ' ' || e.key === 'Enter') { 
                e.preventDefault(); 
                flipCard(); 
            }
            if (e.key === 'Escape' && document.body.classList.contains('study-fullscreen')) {
                toggleStudyFullscreen(false);
            }
        }
    });
    document.getElementById('start-quiz-btn').onclick = startQuiz;
    document.getElementById('quiz-deck-select').onchange = (e) => document.getElementById('start-quiz-btn').disabled = !e.target.value;
    document.getElementById('submit-answer-btn').onclick = submitAnswer;
    document.getElementById('quiz-text-answer').onkeypress = (e) => { 
        if (e.key === 'Enter') submitAnswer(); 
    };
    document.getElementById('quiz-next-btn').onclick = () => { 
        quiz_idx++; 
        showQuiz(); 
    };
    document.getElementById('retake-quiz-btn').onclick = startQuiz;
}

document.addEventListener('DOMContentLoaded', () => {
    if (!checkPassword()) {
        document.getElementById('password-input').focus();
        document.getElementById('password-input').onkeypress = (e) => {
            if (e.key === 'Enter') authenticate();
        };
        return;
    }
    initializeApp();
});

async function loadDecks() {
    const known_decks = [
        { name: 'ddd_1_1', file: 'flashcards/ddd_1_1.txt' },
        { name: 'ddd_1_2', file: 'flashcards/ddd_1_2.txt' }
    ];
    decks = [];
    for (const d of known_decks) {
        try { 
            if ((await fetch(d.file)).ok) decks.push(d); 
        } catch {}
    }
    ['study-deck-select', 'quiz-deck-select'].forEach(id => {
        const sel = document.getElementById(id);
        sel.innerHTML = '<option value = "">-- select a deck --</option>';
        decks.forEach(d => { 
            const opt = document.createElement('option'); 
            opt.value = d.file; 
            opt.textContent = d.name; 
            sel.appendChild(opt); 
        });
    });
}

async function loadDeck(file) {
    const text = await (await fetch(file)).text();
    return text.split('\n').filter(l => l.trim()).map(l => {
        const p = l.split(' / ');
        return p.length >= 2 ? { front: p[0].trim(), back: p.slice(1).join(' / ').trim() } : null;
    }).filter(c => c);
}

async function startStudy() {
    const file = document.getElementById('study-deck-select').value;
    if (!file) return alert('Please select a deck!');
    try {
        study_cards = await loadDeck(file);
        if (!study_cards.length) return alert('No cards found!');
        study_idx = 0;
        document.getElementById('study-area').style.display = 'block';
        showCard();
    } catch (e) {
        document.getElementById('study-area').innerHTML = `<div class = "error">Error: ${e.message}</div>`;
    }
}

function showCard() {
    const c = study_cards[study_idx];
    document.getElementById('study-front').textContent = c.front;
    document.getElementById('study-back').textContent = c.back;
    const num = study_idx + 1;
    const total = study_cards.length;
    document.getElementById('current-card-num').textContent = num;
    document.getElementById('total-cards').textContent = total;
    document.getElementById('current-card-num-back').textContent = num;
    document.getElementById('total-cards-back').textContent = total;
    document.getElementById('study-card').classList.remove('flipped');
    document.querySelector('.card-back').style.display = 'none';
}

function flipCard() {
    const fc = document.getElementById('study-card');
    const cb = document.querySelector('.card-back');
    if (fc.classList.contains('flipped')) { 
        fc.classList.remove('flipped'); 
        cb.style.display = 'none'; 
    } else { 
        fc.classList.add('flipped'); 
        cb.style.display = 'flex'; 
    }
}

async function startQuiz() {
    const file = document.getElementById('quiz-deck-select').value;
    if (!file) return alert('Please select a deck!');
    try {
        quiz_cards = await loadDeck(file);
        if (!quiz_cards.length) return alert('No cards found!');
        for (let i = quiz_cards.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [quiz_cards[i], quiz_cards[j]] = [quiz_cards[j], quiz_cards[i]]; 
        }
        quiz_idx = 0; 
        quiz_score = 0;
        document.getElementById('quiz-area').style.display = 'block';
        document.getElementById('quiz-results').style.display = 'none';
        document.getElementById('progress-fill-correct').style.width = '0%';
        document.getElementById('progress-fill-incorrect').style.width = '0%';
        showQuiz();
    } catch (e) {
        document.getElementById('quiz-area').innerHTML = `<div class = "error">Error: ${e.message}</div>`;
    }
}

function showQuiz() {
    if (quiz_idx >= quiz_cards.length) {
        document.getElementById('quiz-area').style.display = 'none';
        document.getElementById('quiz-results').style.display = 'block';
        document.getElementById('final-score').textContent = quiz_score;
        document.getElementById('final-total').textContent = quiz_cards.length;
        document.getElementById('final-percentage').textContent = Math.round((quiz_score / quiz_cards.length) * 100);
        return;
    }
    const c = quiz_cards[quiz_idx];
    document.getElementById('quiz-question-text').textContent = c.front;
    const current = quiz_idx + 1;
    const total = quiz_cards.length;
    document.getElementById('quiz-current-num').textContent = current;
    document.getElementById('quiz-total').textContent = total;
    updateProgressBar(false); // false = haven't answered current question yet
    document.getElementById('quiz-next-btn').disabled = true;
    
    if (quiz_cards.length >= 4) {
        document.getElementById('quiz-options').style.display = 'block';
        document.getElementById('quiz-answer-input').style.display = 'none';
        const opts = document.getElementById('quiz-options');
        opts.innerHTML = '';
        const wrong = [];
        while (wrong.length < 3 && wrong.length < quiz_cards.length - 1) {
            const r = quiz_cards[Math.floor(Math.random() * quiz_cards.length)];
            if (r !== c && !wrong.includes(r.back)) wrong.push(r.back);
        }
        const all = [c.back, ...wrong];
        for (let i = all.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [all[i], all[j]] = [all[j], all[i]]; 
        }
        all.forEach(a => {
            const div = document.createElement('div');
            div.className = 'quiz-option';
            div.textContent = a;
            div.onclick = () => { 
                if (document.getElementById('quiz-next-btn').disabled) selectAnswer(div, a === c.back); 
            };
            opts.appendChild(div);
        });
    } else {
        document.getElementById('quiz-options').style.display = 'none';
        document.getElementById('quiz-answer-input').style.display = 'block';
        document.getElementById('quiz-text-answer').value = '';
        document.getElementById('quiz-text-answer').disabled = false;
        document.getElementById('quiz-text-answer').style.backgroundColor = '';
        document.getElementById('quiz-text-answer').style.borderColor = '';
        document.getElementById('correct-answer-display').style.display = 'none';
        document.getElementById('quiz-text-answer').focus();
    }
}

function selectAnswer(el, correct) {
    document.querySelectorAll('.quiz-option').forEach(o => o.style.pointerEvents = 'none');
    const correct_answer = quiz_cards[quiz_idx].back;
    document.querySelectorAll('.quiz-option').forEach(o => {
        if (o.textContent === correct_answer) o.classList.add('correct');
        else if (o === el && !correct) o.classList.add('incorrect');
    });
    if (correct) quiz_score++;
    updateProgressBar(true); // true = just answered current question
    document.getElementById('quiz-next-btn').disabled = false;
}

function submitAnswer() {
    const ua = document.getElementById('quiz-text-answer').value.trim().toLowerCase();
    const ca = quiz_cards[quiz_idx].back.trim().toLowerCase();
    const correct = ua === ca;
    if (correct) quiz_score++;
    document.getElementById('quiz-text-answer').disabled = true;
    document.getElementById('quiz-text-answer').style.backgroundColor = correct ? '#f0fff0' : '#fff0f0';
    document.getElementById('quiz-text-answer').style.borderColor = correct ? '#00cc00' : '#ff4444';
    if (!correct) {
        document.getElementById('correct-answer-display').style.display = 'block';
        document.getElementById('correct-answer-display').textContent = 'Correct: ' + quiz_cards[quiz_idx].back;
    } else {
        document.getElementById('correct-answer-display').style.display = 'none';
    }
    updateProgressBar(true); // true = just answered current question
    document.getElementById('quiz-next-btn').disabled = false;
}

function updateProgressBar(include_current = true) {
    const total = quiz_cards.length;
    const answered = include_current ? quiz_idx + 1 : quiz_idx; // number of questions answered
    const correct_percentage = answered > 0 ? (quiz_score / total) * 100 : 0;
    const incorrect_percentage = answered > 0 ? ((answered - quiz_score) / total) * 100 : 0;
    document.getElementById('progress-fill-correct').style.width = correct_percentage + '%';
    document.getElementById('progress-fill-incorrect').style.width = incorrect_percentage + '%';
}

function applyStudyFullscreenUI(enable) {
    const html = document.documentElement;
    const body = document.body;
    const btn = document.getElementById('study-fullscreen-btn');
    if (enable) {
        html.classList.add('study-fullscreen');
        body.classList.add('study-fullscreen');
        if (btn) { btn.textContent = '✕'; btn.title = 'exit fullscreen'; }
    } else {
        html.classList.remove('study-fullscreen');
        body.classList.remove('study-fullscreen');
        if (btn) { btn.textContent = '⛶'; btn.title = 'fullscreen'; }
    }
}

function toggleStudyFullscreen(force_off) {
    const el = document.getElementById('flashcards-content');
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || document.mozFullScreenElement;
    const reqFs = el && (el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen || el.mozRequestFullScreen);
    const exitFs = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen;
    const inFullscreen = !!fsEl;
    const wantExit = force_off === false || (force_off === undefined && inFullscreen);
    if (wantExit && exitFs) {
        exitFs.call(document).then(() => applyStudyFullscreenUI(false)).catch(() => applyStudyFullscreenUI(false));
        return;
    }
    const wantEnter = force_off === true || (force_off === undefined && !inFullscreen);
    if (wantEnter && reqFs) {
        reqFs.call(el).then(() => applyStudyFullscreenUI(true)).catch(() => applyStudyFullscreenUI(true));
        return;
    }
    if (!reqFs) {
        applyStudyFullscreenUI(force_off === undefined ? !document.body.classList.contains('study-fullscreen') : !!force_off);
    }
}

function onFullscreenChange() {
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || document.mozFullScreenElement;
    if (!fsEl && document.body.classList.contains('study-fullscreen')) {
        applyStudyFullscreenUI(false);
    }
}

function switchMode(mode) {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-mode = "${mode}"]`).classList.add('active');
    document.querySelectorAll('.mode-content').forEach(c => c.classList.remove('active'));
    document.getElementById(`${mode}-mode`).classList.add('active');
}
</script>
