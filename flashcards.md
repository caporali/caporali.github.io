---
layout: default
title: "Flashcards"
---

*Flashcards.* Study flashcards from your decks.

<div class="mode-selector">
    <button class="mode-btn active" data-mode="study">Study</button>
    <button class="mode-btn" data-mode="quiz">Quiz</button>
</div>

<div id="study-mode" class="mode-content active">
    <div class="controls">
        <select id="study-deck-select"><option value="">-- select a deck --</option></select>
        <button id="start-study-btn" disabled>Start</button>
    </div>
    <div id="study-area" style="display: none;">
        <div class="flashcard-wrapper">
            <button class="arrow-btn left" id="prev-card-btn">‹</button>
            <div class="flashcard-container">
                <div class="card-counter"><span id="current-card-num">1</span>/<span id="total-cards">0</span></div>
                <div class="flashcard" id="study-card">
                    <div class="card-front"><div class="card-content" id="study-front"></div></div>
                    <div class="card-back" style="display: none;"><div class="card-content" id="study-back"></div></div>
                </div>
            </div>
            <button class="arrow-btn right" id="next-card-btn">›</button>
        </div>
        <div class="shuffle-container">
            <button class="shuffle-btn" id="shuffle-btn" title="Shuffle">↻</button>
        </div>
    </div>
</div>

<div id="quiz-mode" class="mode-content">
    <div class="controls">
        <select id="quiz-deck-select"><option value="">-- select a deck --</option></select>
        <button id="start-quiz-btn" disabled>Start</button>
    </div>
    <div id="quiz-area" style="display: none;">
        <div class="quiz-progress">Question <span id="quiz-current-num">1</span> of <span id="quiz-total">0</span> | Score: <span id="quiz-score">0</span>/<span id="quiz-max-score">0</span></div>
        <div class="quiz-question">
            <h3 id="quiz-question-text"></h3>
            <div id="quiz-options"></div>
            <div id="quiz-answer-input" style="display: none;">
                <input type="text" id="quiz-text-answer" placeholder="Type your answer">
                <button id="submit-answer-btn">Submit</button>
            </div>
            <div id="quiz-feedback" style="display: none;"></div>
        </div>
        <div class="actions">
            <button id="quiz-next-btn" disabled>Next</button>
        </div>
    </div>
    <div id="quiz-results" style="display: none;">
        <h2>Results</h2>
        <p>Score: <span id="final-score">0</span>/<span id="final-total">0</span> (<span id="final-percentage">0</span>%)</p>
        <button id="retake-quiz-btn">Retake</button>
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
.card-counter { position: absolute; top: 10px; right: 10px; font-size: 14px; color: #666; z-index: 10; background: rgba(255,255,255,0.9); padding: 5px 10px; border-radius: 3px; }
.flashcard { width: 100%; height: 300px; position: relative; transform-style: preserve-3d; transition: transform 0.6s; cursor: pointer; }
.flashcard.flipped { transform: rotateY(180deg); }
.card-front, .card-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border: 1px solid #ddd; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.card-back { transform: rotateY(180deg); }
.card-content { padding: 30px; text-align: center; font-size: 18px; word-wrap: break-word; max-width: 90%; white-space: pre-wrap; }
.shuffle-container { text-align: center; margin-top: 20px; }
.shuffle-btn { width: 40px; height: 40px; border-radius: 50%; border: 1px solid #ddd; background: white; font-size: 20px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all 0.3s; color: #4a4a4a; }
.shuffle-btn:hover { background: #f5f5f5; border-color: #4a4a4a; transform: rotate(90deg); }
.shuffle-btn:active { transform: rotate(90deg) scale(0.95); }
.quiz-progress { text-align: center; margin-bottom: 20px; font-weight: bold; color: #4a4a4a; }
.quiz-question { background: #f9f9f9; padding: 30px; border-radius: 5px; margin: 20px 0; }
.quiz-question h3 { margin-bottom: 20px; color: #4a4a4a; white-space: pre-wrap; }
.quiz-option { padding: 15px; margin: 10px 0; background: white; border: 1px solid #ddd; border-radius: 5px; cursor: pointer; transition: all 0.3s; white-space: pre-wrap; }
.quiz-option:hover { border-color: #4a4a4a; background: #f5f5f5; }
.quiz-option.correct { border-color: #00cc00; background: #f0fff0; }
.quiz-option.incorrect { border-color: #ff4444; background: #fff0f0; }
#quiz-answer-input { margin-top: 20px; }
#quiz-answer-input input { width: 70%; padding: 10px; border: 1px solid #ddd; border-radius: 3px; font-family: "Inconsolata", monospace; }
#quiz-answer-input button { padding: 10px 20px; margin-left: 10px; background: #4a4a4a; color: white; border: none; border-radius: 3px; cursor: pointer; font-family: "Inconsolata", monospace; }
#quiz-answer-input button:hover { background: #333; }
#quiz-feedback { margin-top: 20px; padding: 15px; border-radius: 5px; font-weight: bold; white-space: pre-wrap; }
#quiz-feedback.correct { background: #f0fff0; color: #00cc00; border: 1px solid #00cc00; }
#quiz-feedback.incorrect { background: #fff0f0; color: #ff4444; border: 1px solid #ff4444; }
#quiz-results { text-align: center; padding: 30px; background: #f9f9f9; border-radius: 5px; margin-top: 20px; }
#quiz-results h2 { color: #4a4a4a; margin-bottom: 20px; }
#quiz-results p { font-size: 18px; margin: 10px 0; }
#retake-quiz-btn { padding: 10px 20px; margin-top: 20px; background: #4a4a4a; color: white; border: none; border-radius: 3px; cursor: pointer; font-family: "Inconsolata", monospace; }
#retake-quiz-btn:hover { background: #333; }
.actions { display: flex; gap: 10px; justify-content: center; margin-top: 20px; }
.actions button { padding: 10px 20px; background: #4a4a4a; color: white; border: none; border-radius: 3px; cursor: pointer; font-family: "Inconsolata", monospace; }
.actions button:hover { background: #333; }
.actions button:disabled { background: #ccc; cursor: not-allowed; }
.error { background: #fff0f0; color: #ff4444; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #ff4444; }
</style>

<script>
let decks = [], studyCards = [], studyIdx = 0, quizCards = [], quizIdx = 0, quizScore = 0;

document.addEventListener('DOMContentLoaded', () => {
    loadDecks();
    document.querySelectorAll('.mode-btn').forEach(b => b.onclick = () => switchMode(b.dataset.mode));
    document.getElementById('start-study-btn').onclick = startStudy;
    document.getElementById('study-deck-select').onchange = (e) => document.getElementById('start-study-btn').disabled = !e.target.value;
    document.getElementById('study-card').onclick = flipCard;
    document.getElementById('next-card-btn').onclick = () => { studyIdx = (studyIdx + 1) % studyCards.length; showCard(); };
    document.getElementById('prev-card-btn').onclick = () => { studyIdx = (studyIdx - 1 + studyCards.length) % studyCards.length; showCard(); };
    document.getElementById('shuffle-btn').onclick = () => { for (let i = studyCards.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [studyCards[i], studyCards[j]] = [studyCards[j], studyCards[i]]; } studyIdx = 0; showCard(); };
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('study-area').style.display !== 'none') {
            if (e.key === 'ArrowLeft') { studyIdx = (studyIdx - 1 + studyCards.length) % studyCards.length; showCard(); }
            if (e.key === 'ArrowRight') { studyIdx = (studyIdx + 1) % studyCards.length; showCard(); }
            if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCard(); }
        }
    });
    document.getElementById('start-quiz-btn').onclick = startQuiz;
    document.getElementById('quiz-deck-select').onchange = (e) => document.getElementById('start-quiz-btn').disabled = !e.target.value;
    document.getElementById('submit-answer-btn').onclick = submitAnswer;
    document.getElementById('quiz-text-answer').onkeypress = (e) => { if (e.key === 'Enter') submitAnswer(); };
    document.getElementById('quiz-next-btn').onclick = () => { quizIdx++; showQuiz(); };
    document.getElementById('retake-quiz-btn').onclick = startQuiz;
});

async function loadDecks() {
    const knownDecks = [{ name: 'ddd_1_1', file: 'flashcards/ddd_1_1.txt' }];
    decks = [];
    for (const d of knownDecks) {
        try { if ((await fetch(d.file)).ok) decks.push(d); } catch {}
    }
    ['study-deck-select', 'quiz-deck-select'].forEach(id => {
        const sel = document.getElementById(id);
        sel.innerHTML = '<option value="">-- select a deck --</option>';
        decks.forEach(d => { const opt = document.createElement('option'); opt.value = d.file; opt.textContent = d.name; sel.appendChild(opt); });
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
        studyCards = await loadDeck(file);
        if (!studyCards.length) return alert('No cards found!');
        studyIdx = 0;
        document.getElementById('study-area').style.display = 'block';
        showCard();
    } catch (e) {
        document.getElementById('study-area').innerHTML = `<div class="error">Error: ${e.message}</div>`;
    }
}

function showCard() {
    const c = studyCards[studyIdx];
    document.getElementById('study-front').textContent = c.front;
    document.getElementById('study-back').textContent = c.back;
    document.getElementById('current-card-num').textContent = studyIdx + 1;
    document.getElementById('total-cards').textContent = studyCards.length;
    document.getElementById('study-card').classList.remove('flipped');
    document.querySelector('.card-back').style.display = 'none';
}

function flipCard() {
    const fc = document.getElementById('study-card');
    const cb = document.querySelector('.card-back');
    if (fc.classList.contains('flipped')) { fc.classList.remove('flipped'); cb.style.display = 'none'; }
    else { fc.classList.add('flipped'); cb.style.display = 'flex'; }
}

async function startQuiz() {
    const file = document.getElementById('quiz-deck-select').value;
    if (!file) return alert('Please select a deck!');
    try {
        quizCards = await loadDeck(file);
        if (!quizCards.length) return alert('No cards found!');
        for (let i = quizCards.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [quizCards[i], quizCards[j]] = [quizCards[j], quizCards[i]]; }
        quizIdx = 0; quizScore = 0;
        document.getElementById('quiz-area').style.display = 'block';
        document.getElementById('quiz-results').style.display = 'none';
        showQuiz();
    } catch (e) {
        document.getElementById('quiz-area').innerHTML = `<div class="error">Error: ${e.message}</div>`;
    }
}

function showQuiz() {
    if (quizIdx >= quizCards.length) {
        document.getElementById('quiz-area').style.display = 'none';
        document.getElementById('quiz-results').style.display = 'block';
        document.getElementById('final-score').textContent = quizScore;
        document.getElementById('final-total').textContent = quizCards.length;
        document.getElementById('final-percentage').textContent = Math.round((quizScore / quizCards.length) * 100);
        return;
    }
    const c = quizCards[quizIdx];
    document.getElementById('quiz-question-text').textContent = c.front;
    document.getElementById('quiz-current-num').textContent = quizIdx + 1;
    document.getElementById('quiz-total').textContent = quizCards.length;
    document.getElementById('quiz-max-score').textContent = quizCards.length;
    document.getElementById('quiz-score').textContent = quizScore;
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('quiz-next-btn').disabled = true;
    
    if (quizCards.length >= 4) {
        document.getElementById('quiz-options').style.display = 'block';
        document.getElementById('quiz-answer-input').style.display = 'none';
        const opts = document.getElementById('quiz-options');
        opts.innerHTML = '';
        const wrong = [];
        while (wrong.length < 3 && wrong.length < quizCards.length - 1) {
            const r = quizCards[Math.floor(Math.random() * quizCards.length)];
            if (r !== c && !wrong.includes(r.back)) wrong.push(r.back);
        }
        const all = [c.back, ...wrong];
        for (let i = all.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [all[i], all[j]] = [all[j], all[i]]; }
        all.forEach(a => {
            const div = document.createElement('div');
            div.className = 'quiz-option';
            div.textContent = a;
            div.onclick = () => { if (document.getElementById('quiz-next-btn').disabled) selectAnswer(div, a === c.back); };
            opts.appendChild(div);
        });
    } else {
        document.getElementById('quiz-options').style.display = 'none';
        document.getElementById('quiz-answer-input').style.display = 'block';
        document.getElementById('quiz-text-answer').value = '';
        document.getElementById('quiz-text-answer').focus();
    }
}

function selectAnswer(el, correct) {
    document.querySelectorAll('.quiz-option').forEach(o => o.style.pointerEvents = 'none');
    if (correct) { el.classList.add('correct'); quizScore++; document.getElementById('quiz-score').textContent = quizScore; showFeedback(true); }
    else { el.classList.add('incorrect'); document.querySelectorAll('.quiz-option').forEach(o => { if (o.textContent === quizCards[quizIdx].back) o.classList.add('correct'); }); showFeedback(false); }
    document.getElementById('quiz-next-btn').disabled = false;
}

function submitAnswer() {
    const ua = document.getElementById('quiz-text-answer').value.trim().toLowerCase();
    const ca = quizCards[quizIdx].back.trim().toLowerCase();
    const correct = ua === ca;
    if (correct) { quizScore++; document.getElementById('quiz-score').textContent = quizScore; }
    showFeedback(correct, quizCards[quizIdx].back);
    document.getElementById('quiz-text-answer').disabled = true;
    document.getElementById('quiz-next-btn').disabled = false;
}

function showFeedback(correct, answer = null) {
    const fb = document.getElementById('quiz-feedback');
    fb.style.display = 'block';
    fb.className = correct ? 'correct' : 'incorrect';
    fb.textContent = correct ? '✓ Correct!' : `✗ Incorrect. Correct answer: ${answer || ''}`;
}

function switchMode(mode) {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    document.querySelectorAll('.mode-content').forEach(c => c.classList.remove('active'));
    document.getElementById(`${mode}-mode`).classList.add('active');
}
</script>
