---
layout: default
title: "Flashcards"
---

<div id="password_overlay" style="position:fixed;top:0;left:0;width:100%;height:100%;background:white;z-index:10000;display:flex;align-items:center;justify-content:center;">
<div style="text-align:center;padding:30px;border:1px solid #ddd;border-radius:5px;background:#f9f9f9;">
	<h3 style="margin-bottom:20px;">enter password</h3>
	<input type="password" id="password_input" placeholder="password (press enter)" style="padding:10px;border:1px solid #ddd;border-radius:3px;font-family:'Inconsolata',monospace;margin-bottom:10px;width:200px;">
	<p id="password_error" style="color:#ff4444;margin-top:10px;display:none;">incorrect password</p>
</div>
</div>

<div id="flashcards_content" style="display:none;">
<p class="study_intro"><i>Flashcards.</i> Study flashcards from your decks.</p>

<div class="mode_selector">
	<button class="mode_btn active" data-mode="study">study</button>
	<button class="mode_btn" data-mode="quiz">quiz</button>
</div>

<div id="study_mode" class="mode_content active">
	<div class="controls">
	<select id="study_deck_select"><option value="">-- select a deck --</option></select>
	<button id="start_study_btn" disabled>start</button>
	</div>
	<div id="study_area" style="display:none;">
	  <div class="flashcard_wrapper">
		<div class="card_row">
		  <button class="arrow_btn left" id="prev_card_btn">‹</button>
		  <div class="flashcard_container">
			<div class="flashcard" id="study_card">
			  <div class="card_front">
				<div class="card_counter"><span id="current_card_num">1</span>/<span id="total_cards">0</span></div>
				<div class="card_content" id="study_front"></div>
			  </div>
			  <div class="card_back" style="display:none;">
				<div class="card_counter"><span id="current_card_num_back">1</span>/<span id="total_cards_back">0</span></div>
				<div class="card_content" id="study_back"></div>
			  </div>
			</div>
		  </div>
		  <button class="arrow_btn right" id="next_card_btn">›</button>
		</div>
		<div class="shuffle_container">
		  <button class="shuffle_btn" id="shuffle_btn" title="shuffle">↻</button>
		  <button class="fullscreen_btn" id="study_fullscreen_btn" title="fullscreen">⛶</button>
		</div>
	  </div>
	</div>
</div>

<div id="quiz_mode" class="mode_content">
	<div class="controls">
	<select id="quiz_deck_select"><option value="">-- select a deck --</option></select>
	<button id="start_quiz_btn" disabled>start</button>
	</div>
	<div id="quiz_area" style="display:none;">
	<div class="quiz_progress">
		<div class="progress_bar">
		<div class="progress_fill_correct" id="progress_fill_correct"></div>
		<div class="progress_fill_incorrect" id="progress_fill_incorrect"></div>
		</div>
	</div>
	<div class="quiz_question">
		<div class="quiz_counter"><span id="quiz_current_num">1</span>/<span id="quiz_total">0</span></div>
		<button class="quiz_next_btn_top" id="quiz_next_btn" disabled>›</button>
		<h3 id="quiz_question_text"></h3>
		<div id="quiz_options"></div>
		<div id="quiz_answer_input" style="display:none;">
		<input type="text" id="quiz_text_answer" placeholder="Type your answer">
		<button id="submit_answer_btn">submit</button>
		<div id="correct_answer_display" style="display:none;margin-top:10px;color:#00cc00;font-weight:bold;"></div>
		</div>
	</div>
	</div>
	<div id="quiz_results" style="display:none;">
	<p>score = <span id="final_score">0</span>/<span id="final_total">0</span> (<span id="final_percentage">0</span>%).</p>
	<button id="retake_quiz_btn">retake</button>
	</div>
</div>
</div>

<style>
.mode_selector {
display: flex;
gap: 10px;
margin: 20px 0;
border-bottom: 1px solid rgba(0,0,0,0.1);
padding-bottom: 10px;
}
.mode_btn {
padding: 10px 20px;
background: #f5f5f5;
border: 1px solid rgba(0,0,0,0.1);
border-radius: 5px;
cursor: pointer;
font-family: "Inconsolata", monospace;
transition: all 0.3s;
}
.mode_btn:hover { background: #e0e0e0; }
.mode_btn.active { background: #4a4a4a; color: white; border-color: #4a4a4a; }
.mode_content { display: none; margin-top: 20px; }
.mode_content.active { display: block; }
.controls {
margin-bottom: 20px;
padding: 15px;
background: #f9f9f9;
border-radius: 5px;
}
.controls select {
padding: 8px;
margin-right: 10px;
border: 1px solid #ddd;
border-radius: 3px;
font-family: "Inconsolata", monospace;
}
.controls button {
padding: 8px 15px;
background: #4a4a4a;
color: white;
border: none;
border-radius: 3px;
cursor: pointer;
font-family: "Inconsolata", monospace;
}
.controls button:hover { background: #333; }
.controls button:disabled { background: #ccc; cursor: not-allowed; }

.flashcard_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 30px 0;
  position: relative;
}
.card_row {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
}
.arrow_btn {
width: 40px;
height: 40px;
border-radius: 50%;
border: 1px solid #ddd;
background: white;
font-size: 24px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.3s;
color: #4a4a4a;
}
.arrow_btn:hover { background: #f5f5f5; border-color: #4a4a4a; }
.arrow_btn:active { transform: scale(0.95); }
.flashcard_container {
flex: 1;
perspective: 1000px;
min-height: 200px;
position: relative;
display: flex;
align-items: center;
justify-content: center;
}
.flashcard {
width: 100%;
aspect-ratio: 5/3;
height: auto;
position: relative;
transform-style: preserve-3d;
transition: transform 0.6s;
cursor: pointer;
}
.flashcard.flipped { transform: rotateY(180deg); }
.card_front,
.card_back {
position: absolute;
width: 100%;
height: 100%;
backface-visibility: hidden;
border: 1px solid #ddd;
border-radius: 10px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: white;
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
transform-style: preserve-3d;
}
.card_back { transform: rotateY(180deg); }
.card_counter {
position: absolute;
top: 10px;
right: 10px;
font-size: 16px;
color: #666;
z-index: 1;
background: rgba(255,255,255,0.95);
padding: 5px 10px;
border-radius: 3px;
backface-visibility: hidden;
transform: translateZ(1px);
}
.card_content {
  padding: 30px;
  text-align: center;
  font-size: 22px;
  word-wrap: break-word;
  max-width: 90%;
  white-space: pre-wrap;
}
.shuffle_container { text-align: center; margin-top: 20px; }
.shuffle_btn {
width: 40px;
height: 40px;
border-radius: 50%;
border: 1px solid #ddd;
background: white;
font-size: 20px;
cursor: pointer;
display: inline-flex;
align-items: center;
justify-content: center;
transition: all 0.3s;
color: #4a4a4a;
}
.shuffle_btn:hover { background: #f5f5f5; border-color: #4a4a4a; transform: rotate(90deg); }
.shuffle_btn:active { transform: rotate(90deg) scale(0.95); }
.fullscreen_btn {
width: 40px;
height: 40px;
border-radius: 50%;
border: 1px solid #ddd;
background: white;
font-size: 18px;
cursor: pointer;
display: inline-flex;
align-items: center;
justify-content: center;
transition: all 0.3s;
color: #4a4a4a;
margin-left: 10px;
}
.fullscreen_btn:hover { background: #f5f5f5; border-color: #4a4a4a; }
.fullscreen_btn:active { transform: scale(0.95); }

.quiz_progress { margin-bottom: 20px; display: flex; justify-content: center; }
.progress_bar {
width: 300px;
height: 8px;
background: #e0e0e0;
border-radius: 4px;
border: 1px solid #999;
display: flex;
position: relative;
overflow: visible;
}
.progress_fill_correct,
.progress_fill_incorrect {
height: 100%;
transition: width 0.3s;
width: 0%;
border-right: 1px solid #999;
box-sizing: border-box;
}
.progress_fill_correct { background: #00cc00; }
.progress_fill_incorrect { background: #ff4444; }
.quiz_question {
background: #f9f9f9;
padding: 30px;
border-radius: 5px;
margin: 20px 0;
position: relative;
}
.quiz_counter {
position: absolute;
top: 10px;
left: 10px;
font-size: 14px;
color: #4a4a4a;
background: rgba(255,255,255,0.95);
padding: 5px 10px;
border-radius: 3px;
border: 1px solid #ddd;
}
.quiz_next_btn_top {
position: absolute;
top: 10px;
right: 10px;
width: 30px;
height: 30px;
border-radius: 50%;
border: 1px solid #ddd;
background: white;
font-size: 20px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.3s;
color: #4a4a4a;
}
.quiz_next_btn_top:hover { background: #f5f5f5; border-color: #4a4a4a; }
.quiz_next_btn_top:active { transform: scale(0.95); }
.quiz_next_btn_top:disabled { background: #ccc; border-color: #ccc; color: #999; cursor: not-allowed; }
.quiz_question h3 { margin-bottom: 20px; color: #4a4a4a; white-space: pre-wrap; }
.quiz_option {
padding: 15px;
margin: 10px 0;
background: white;
border: 2px solid #ddd;
border-radius: 5px;
cursor: pointer;
transition: all 0.3s;
white-space: pre-wrap;
}
.quiz_option:hover { border-color: #4a4a4a; background: #f5f5f5; }
.quiz_option.correct { border-color: #00cc00; background: #f0fff0; }
.quiz_option.incorrect { border-color: #ff4444; background: #fff0f0; }
#quiz_answer_input { margin-top: 20px; }
#quiz_answer_input input {
width: 70%;
padding: 10px;
border: 1px solid #ddd;
border-radius: 3px;
font-family: "Inconsolata", monospace;
}
#quiz_answer_input button {
padding: 10px 20px;
margin-left: 10px;
background: #4a4a4a;
color: white;
border: none;
border-radius: 3px;
cursor: pointer;
font-family: "Inconsolata", monospace;
}
#quiz_answer_input button:hover { background: #333; }
#quiz_results {
text-align: center;
padding: 30px;
background: #f9f9f9;
border-radius: 5px;
margin-top: 20px;
}
#quiz_results h2 { color: #4a4a4a; margin-bottom: 20px; }
#quiz_results p { font-size: 18px; margin: 10px 0; }
#retake_quiz_btn {
padding: 10px 20px;
margin-top: 20px;
background: #4a4a4a;
color: white;
border: none;
border-radius: 3px;
cursor: pointer;
font-family: "Inconsolata", monospace;
}
#retake_quiz_btn:hover { background: #333; }
.actions { display: flex; gap: 10px; justify-content: center; margin-top: 20px; }
.actions button {
padding: 10px 20px;
background: #4a4a4a;
color: white;
border: none;
border-radius: 3px;
cursor: pointer;
font-family: "Inconsolata", monospace;
}
.actions button:hover { background: #333; }
.actions button:disabled { background: #ccc; cursor: not-allowed; }
.error {
  background: #fff0f0;
  color: #ff4444;
  padding: 15px;
  border-radius: 5px;
  margin: 20px 0;
  border: 2px solid #ff4444;
}

@media (max-width: 768px) {
  .card_content { font-size: 16px; padding: 20px; }
  .card_counter { font-size: 13px; }
}

html.study_fullscreen,
body.study_fullscreen {
overflow: hidden !important;
height: 100%;
height: 100dvh;
}
body.study_fullscreen #flashcards_content {
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
width: 100%;
height: 100%;
height: 100dvh;
min-height: -webkit-fill-available;
background: #fff;
z-index: 9000;
overflow: hidden;
padding: 28px;
display: flex;
flex-direction: column;
box-sizing: border-box;
}
#flashcards_content:fullscreen,
#flashcards_content:-webkit-full-screen,
#flashcards_content:-moz-full-screen,
#flashcards_content:-ms-fullscreen {
width: 100%;
height: 100%;
min-height: 100vh;
min-height: 100dvh;
overflow: hidden;
padding: 28px;
display: flex;
flex-direction: column;
box-sizing: border-box;
background: #fff;
}
body.study_fullscreen .navbar,
body.study_fullscreen .mode_selector,
body.study_fullscreen .controls,
body.study_fullscreen #quiz_mode { display: none !important; }
body.study_fullscreen #study_mode {
display: flex !important;
flex-direction: column;
flex: 1;
min-height: 0;
height: 100%;
overflow: hidden;
}
body.study_fullscreen #study_area {
display: flex !important;
flex-direction: column;
flex: 1;
min-height: 0;
height: 100%;
overflow: hidden;
justify-content: flex-start;
}
body.study_fullscreen .flashcard_wrapper {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  margin: 0;
  gap: 16px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  z-index: 1;
}
body.study_fullscreen .card_row {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
}
body.study_fullscreen .flashcard_container {
  flex: 1 1 auto;
  min-height: 0;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 50%;
  max-width: 82%;
}
body.study_fullscreen .flashcard {
  flex: 0 0 auto;
  width: 100%;
  max-height: 100%;
  aspect-ratio: 5/3;
  height: auto;
  position: relative;
}
body.study_fullscreen .shuffle_container {
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}
body.study_fullscreen .study_intro,
body.study_fullscreen hr { display: none; }
body.study_fullscreen .arrow_btn { width: 56px; height: 56px; font-size: 30px; }
body.study_fullscreen .shuffle_btn,
body.study_fullscreen .fullscreen_btn { width: 56px; height: 56px; font-size: 26px; }
body.study_fullscreen .card_content { font-size: 34px; padding: 40px; }
body.study_fullscreen .card_counter { font-size: 22px; }

@media (max-width: 768px) {
html.study_fullscreen,
body.study_fullscreen { height: 100dvh; min-height: -webkit-fill-available; }
body.study_fullscreen #flashcards_content {
	padding: 16px;
	padding: max(16px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right)) max(16px, env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left));
	height: 100dvh;
	min-height: -webkit-fill-available;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}
body.study_fullscreen .flashcard_wrapper { gap: 12px; }
body.study_fullscreen .arrow_btn { width: 44px; height: 44px; font-size: 24px; }
body.study_fullscreen .shuffle_btn,
body.study_fullscreen .fullscreen_btn { width: 44px; height: 44px; font-size: 20px; margin-left: 8px; }
body.study_fullscreen .card_content { font-size: 18px; padding: 24px; }
body.study_fullscreen .card_counter { font-size: 14px; }
}

@media (orientation: landscape) {
  body.study_fullscreen #flashcards_content,
  body.study_fullscreen #study_mode,
  body.study_fullscreen #study_area,
  body.study_fullscreen .flashcard_container { overflow: visible; }
  body.study_fullscreen .flashcard_wrapper { overflow: hidden; }
  body.study_fullscreen .flashcard_container {
    max-width: min(75vw, calc((100vh - 170px) * 5 / 3));
    max-height: min(calc(100vh - 170px), 45vw);
  }
  body.study_fullscreen .flashcard {
    max-width: 100%;
    max-height: min(calc(100vh - 170px), 100%);
  }
  body.study_fullscreen .card_content { font-size: 18px; padding: 24px; }
  body.study_fullscreen .card_counter { font-size: 14px; }
}

@media (orientation: landscape) and (max-height: 500px) and (pointer: coarse) {
  body.study_fullscreen .flashcard_container {
    max-width: min(75vw, calc((100dvh - 170px) * 5 / 3));
    max-height: min(calc(100dvh - 170px), 45vw);
  }
  body.study_fullscreen .flashcard { max-height: min(calc(100dvh - 170px), 100%); }
  body.study_fullscreen #flashcards_content {
    padding-left: max(32px, env(safe-area-inset-left));
    padding-right: max(32px, env(safe-area-inset-right));
  }
}
</style>

<script>
(function() {
var is_touch = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
if (is_touch) {
	var vp = document.querySelector('meta[name="viewport"]');
	if (vp) vp.setAttribute('content', 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover');
}
})();

const FLASHCARDS_PASSWORD = 'fands_2025';
let decks = [], study_cards = [], study_idx = 0, quiz_cards = [], quiz_idx = 0, quiz_score = 0;
let _saved_viewport = null;

function check_password() {
if (sessionStorage.getItem('flashcards_authenticated') === 'true') {
	document.getElementById('password_overlay').style.display = 'none';
	document.getElementById('flashcards_content').style.display = 'block';
	return true;
}
return false;
}

function authenticate() {
var input = document.getElementById('password_input').value;
if (input === FLASHCARDS_PASSWORD) {
	sessionStorage.setItem('flashcards_authenticated', 'true');
	document.getElementById('password_overlay').style.display = 'none';
	document.getElementById('flashcards_content').style.display = 'block';
	initialize_app();
} else {
	document.getElementById('password_error').style.display = 'block';
	document.getElementById('password_input').value = '';
	document.getElementById('password_input').focus();
}
}

function initialize_app() {
load_decks();
document.querySelectorAll('.mode_btn').forEach(function(b) {
	b.onclick = function() { switch_mode(b.dataset.mode); };
});
document.getElementById('start_study_btn').onclick = start_study;
document.getElementById('study_deck_select').onchange = function(e) {
	document.getElementById('start_study_btn').disabled = !e.target.value;
};
document.getElementById('study_card').onclick = flip_card;
document.getElementById('next_card_btn').onclick = function() {
	study_idx = (study_idx + 1) % study_cards.length;
	show_card();
};
document.getElementById('prev_card_btn').onclick = function() {
	study_idx = (study_idx - 1 + study_cards.length) % study_cards.length;
	show_card();
};
document.getElementById('shuffle_btn').onclick = function() {
	for (var i = study_cards.length - 1; i > 0; i--) {
	var j = Math.floor(Math.random() * (i + 1));
	var t = study_cards[i];
	study_cards[i] = study_cards[j];
	study_cards[j] = t;
	}
	study_idx = 0;
	show_card();
};
document.getElementById('study_fullscreen_btn').onclick = function() { toggle_study_fullscreen(); };
['fullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'mozfullscreenchange'].forEach(function(ev) {
	document.addEventListener(ev, on_fullscreen_change);
});
document.addEventListener('keydown', function(e) {
	if (document.getElementById('study_area').style.display !== 'none') {
	if (e.key === 'ArrowLeft') {
		study_idx = (study_idx - 1 + study_cards.length) % study_cards.length;
		show_card();
	}
	if (e.key === 'ArrowRight') {
		study_idx = (study_idx + 1) % study_cards.length;
		show_card();
	}
	if (e.key === ' ' || e.key === 'Enter') {
		e.preventDefault();
		flip_card();
	}
	if (e.key === 'Escape' && document.body.classList.contains('study_fullscreen')) {
		toggle_study_fullscreen(false);
	}
	}
});
document.getElementById('start_quiz_btn').onclick = start_quiz;
document.getElementById('quiz_deck_select').onchange = function(e) {
	document.getElementById('start_quiz_btn').disabled = !e.target.value;
};
document.getElementById('submit_answer_btn').onclick = submit_answer;
document.getElementById('quiz_text_answer').onkeypress = function(e) {
	if (e.key === 'Enter') submit_answer();
};
document.getElementById('quiz_next_btn').onclick = function() {
	quiz_idx++;
	show_quiz();
};
document.getElementById('retake_quiz_btn').onclick = start_quiz;
}

document.addEventListener('DOMContentLoaded', function() {
if (!check_password()) {
	document.getElementById('password_input').focus();
	document.getElementById('password_input').onkeypress = function(e) {
	if (e.key === 'Enter') authenticate();
	};
	return;
}
initialize_app();
});

function load_decks() {
var known_decks = [
	{ name: 'ddd_1_1', file: 'flashcards/ddd_1_1.txt' },
	{ name: 'ddd_1_2', file: 'flashcards/ddd_1_2.txt' }
];
decks = [];
return Promise.all(known_decks.map(function(d) {
	return fetch(d.file).then(function(r) {
	if (r.ok) decks.push(d);
	}).catch(function() {});
})).then(function() {
	['study_deck_select', 'quiz_deck_select'].forEach(function(id) {
	var sel = document.getElementById(id);
	sel.innerHTML = '<option value="">-- select a deck --</option>';
	decks.forEach(function(d) {
		var opt = document.createElement('option');
		opt.value = d.file;
		opt.textContent = d.name;
		sel.appendChild(opt);
	});
	});
});
}

function load_deck(file) {
return fetch(file).then(function(r) { return r.text(); }).then(function(text) {
	return text.split('\n').filter(function(l) { return l.trim(); }).map(function(l) {
	var p = l.split(' / ');
	return p.length >= 2 ? { front: p[0].trim(), back: p.slice(1).join(' / ').trim() } : null;
	}).filter(function(c) { return c; });
});
}

function start_study() {
var file = document.getElementById('study_deck_select').value;
if (!file) return alert('Please select a deck!');
load_deck(file).then(function(cards) {
	study_cards = cards;
	if (!study_cards.length) return alert('No cards found!');
	study_idx = 0;
	document.getElementById('study_area').style.display = 'block';
	show_card();
}).catch(function(e) {
	document.getElementById('study_area').innerHTML = '<div class="error">Error: ' + e.message + '</div>';
});
}

function show_card() {
var c = study_cards[study_idx];
document.getElementById('study_front').textContent = c.front;
document.getElementById('study_back').textContent = c.back;
var num = study_idx + 1;
var total = study_cards.length;
document.getElementById('current_card_num').textContent = num;
document.getElementById('total_cards').textContent = total;
document.getElementById('current_card_num_back').textContent = num;
document.getElementById('total_cards_back').textContent = total;
document.getElementById('study_card').classList.remove('flipped');
document.querySelector('.card_back').style.display = 'none';
}

function flip_card() {
var fc = document.getElementById('study_card');
var cb = document.querySelector('.card_back');
if (fc.classList.contains('flipped')) {
	fc.classList.remove('flipped');
	cb.style.display = 'none';
} else {
	fc.classList.add('flipped');
	cb.style.display = 'flex';
}
}

function start_quiz() {
var file = document.getElementById('quiz_deck_select').value;
if (!file) return alert('Please select a deck!');
load_deck(file).then(function(cards) {
	quiz_cards = cards;
	if (!quiz_cards.length) return alert('No cards found!');
	for (var i = quiz_cards.length - 1; i > 0; i--) {
	var j = Math.floor(Math.random() * (i + 1));
	var t = quiz_cards[i];
	quiz_cards[i] = quiz_cards[j];
	quiz_cards[j] = t;
	}
	quiz_idx = 0;
	quiz_score = 0;
	document.getElementById('quiz_area').style.display = 'block';
	document.getElementById('quiz_results').style.display = 'none';
	document.getElementById('progress_fill_correct').style.width = '0%';
	document.getElementById('progress_fill_incorrect').style.width = '0%';
	show_quiz();
}).catch(function(e) {
	document.getElementById('quiz_area').innerHTML = '<div class="error">Error: ' + e.message + '</div>';
});
}

function show_quiz() {
if (quiz_idx >= quiz_cards.length) {
	document.getElementById('quiz_area').style.display = 'none';
	document.getElementById('quiz_results').style.display = 'block';
	document.getElementById('final_score').textContent = quiz_score;
	document.getElementById('final_total').textContent = quiz_cards.length;
	document.getElementById('final_percentage').textContent = Math.round((quiz_score / quiz_cards.length) * 100);
	return;
}
var c = quiz_cards[quiz_idx];
document.getElementById('quiz_question_text').textContent = c.front;
var current = quiz_idx + 1;
var total = quiz_cards.length;
document.getElementById('quiz_current_num').textContent = current;
document.getElementById('quiz_total').textContent = total;
update_progress_bar(false);
document.getElementById('quiz_next_btn').disabled = true;
if (quiz_cards.length >= 4) {
	document.getElementById('quiz_options').style.display = 'block';
	document.getElementById('quiz_answer_input').style.display = 'none';
	var opts = document.getElementById('quiz_options');
	opts.innerHTML = '';
	var wrong = [];
	while (wrong.length < 3 && wrong.length < quiz_cards.length - 1) {
	var r = quiz_cards[Math.floor(Math.random() * quiz_cards.length)];
	if (r !== c && wrong.indexOf(r.back) === -1) wrong.push(r.back);
	}
	var all = [c.back].concat(wrong);
	for (var i = all.length - 1; i > 0; i--) {
	var j = Math.floor(Math.random() * (i + 1));
	var t = all[i];
	all[i] = all[j];
	all[j] = t;
	}
	all.forEach(function(a) {
	var div = document.createElement('div');
	div.className = 'quiz_option';
	div.textContent = a;
	div.onclick = function() {
		if (document.getElementById('quiz_next_btn').disabled) select_answer(div, a === c.back);
	};
	opts.appendChild(div);
	});
} else {
	document.getElementById('quiz_options').style.display = 'none';
	document.getElementById('quiz_answer_input').style.display = 'block';
	document.getElementById('quiz_text_answer').value = '';
	document.getElementById('quiz_text_answer').disabled = false;
	document.getElementById('quiz_text_answer').style.backgroundColor = '';
	document.getElementById('quiz_text_answer').style.borderColor = '';
	document.getElementById('correct_answer_display').style.display = 'none';
	document.getElementById('quiz_text_answer').focus();
}
}

function select_answer(el, correct) {
document.querySelectorAll('.quiz_option').forEach(function(o) { o.style.pointerEvents = 'none'; });
var correct_answer = quiz_cards[quiz_idx].back;
document.querySelectorAll('.quiz_option').forEach(function(o) {
	if (o.textContent === correct_answer) o.classList.add('correct');
	else if (o === el && !correct) o.classList.add('incorrect');
});
if (correct) quiz_score++;
update_progress_bar(true);
document.getElementById('quiz_next_btn').disabled = false;
}

function submit_answer() {
var ua = document.getElementById('quiz_text_answer').value.trim().toLowerCase();
var ca = quiz_cards[quiz_idx].back.trim().toLowerCase();
var correct = ua === ca;
if (correct) quiz_score++;
document.getElementById('quiz_text_answer').disabled = true;
document.getElementById('quiz_text_answer').style.backgroundColor = correct ? '#f0fff0' : '#fff0f0';
document.getElementById('quiz_text_answer').style.borderColor = correct ? '#00cc00' : '#ff4444';
var cad = document.getElementById('correct_answer_display');
if (!correct) {
	cad.style.display = 'block';
	cad.textContent = 'Correct: ' + quiz_cards[quiz_idx].back;
} else {
	cad.style.display = 'none';
}
update_progress_bar(true);
document.getElementById('quiz_next_btn').disabled = false;
}

function update_progress_bar(include_current) {
if (include_current === undefined) include_current = true;
var total = quiz_cards.length;
var answered = include_current ? quiz_idx + 1 : quiz_idx;
var correct_pct = answered > 0 ? (quiz_score / total) * 100 : 0;
var incorrect_pct = answered > 0 ? ((answered - quiz_score) / total) * 100 : 0;
document.getElementById('progress_fill_correct').style.width = correct_pct + '%';
document.getElementById('progress_fill_incorrect').style.width = incorrect_pct + '%';
}

function apply_study_fullscreen_ui(enable) {
var html = document.documentElement;
var body = document.body;
var btn = document.getElementById('study_fullscreen_btn');
var vp = document.querySelector('meta[name="viewport"]');
var is_mobile = window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth < 1024);
if (enable) {
	if (is_mobile && vp) {
	_saved_viewport = _saved_viewport || vp.getAttribute('content');
	vp.setAttribute('content', 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover');
	}
	html.classList.add('study_fullscreen');
	body.classList.add('study_fullscreen');
	if (btn) { btn.textContent = '✕'; btn.title = 'exit fullscreen'; }
} else {
	if (vp && _saved_viewport !== null) {
	vp.setAttribute('content', _saved_viewport);
	_saved_viewport = null;
	}
	html.classList.remove('study_fullscreen');
	body.classList.remove('study_fullscreen');
	if (btn) { btn.textContent = '⛶'; btn.title = 'fullscreen'; }
}
}

function toggle_study_fullscreen(force_off) {
var el = document.getElementById('flashcards_content');
var fs_el = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || document.mozFullScreenElement;
var req_fs = el && (el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen || el.mozRequestFullScreen);
var exit_fs = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen;
var in_fs = !!fs_el;
var want_exit = force_off === false || (force_off === undefined && in_fs);
if (want_exit && exit_fs) {
	exit_fs.call(document).then(function() { apply_study_fullscreen_ui(false); }).catch(function() { apply_study_fullscreen_ui(false); });
	return;
}
var want_enter = force_off === true || (force_off === undefined && !in_fs);
if (want_enter && req_fs) {
	req_fs.call(el).then(function() { apply_study_fullscreen_ui(true); }).catch(function() { apply_study_fullscreen_ui(true); });
	return;
}
if (!req_fs) {
	apply_study_fullscreen_ui(force_off === undefined ? !document.body.classList.contains('study_fullscreen') : !!force_off);
}
}

function on_fullscreen_change() {
var fs_el = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || document.mozFullScreenElement;
if (!fs_el && document.body.classList.contains('study_fullscreen')) {
	apply_study_fullscreen_ui(false);
}
}

function switch_mode(mode) {
document.querySelectorAll('.mode_btn').forEach(function(b) { b.classList.remove('active'); });
document.querySelector('[data-mode="' + mode + '"]').classList.add('active');
document.querySelectorAll('.mode_content').forEach(function(c) { c.classList.remove('active'); });
document.getElementById(mode + '_mode').classList.add('active');
}
</script>
