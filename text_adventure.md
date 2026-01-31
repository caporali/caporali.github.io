---
layout: text_adventure
title: "Text adventure"
description: "Play Colossal Cave Adventure — classic text adventure in the browser."
---

<p class="adventure_intro"><span class="ta-typewriter">Colossal Cave Adventure.</span> Commands: <code>north</code>, <code>get lamp</code>, <code>look</code>.</p>

<div class="adventure_wrapper">
	<iframe
		class="adventure_frame"
		title="Colossal Cave Adventure"
		src="https://quuxplusone.github.io/Advent/play.html"
		allowfullscreen
	></iframe>
	<div class="adventure_input_bar">
		<span class="adventure_prompt">&gt;</span>
		<span class="adventure_cursor"> </span>
	</div>
</div>

<p class="adventure_credit"><small>Adventure (1976) by Will Crowther and Don Woods. Z-machine port by Arthur O'Dwyer; runs in <a href="https://github.com/curiousdannii/parchment" target="_blank" rel="noopener">Parchment</a>. Type in the game window above.</small></p>

<style>
/* Terminal page: white on black, Computer Modern */
.ta-page .container.content { background: #0a0a0a; color: #e8e8e8; font-family: "Computer Modern Serif", "Latin Modern Roman", serif; }
.ta-page .container.content hr { border-color: rgba(255,255,255,0.15); }
.ta-page #author-name { color: #e8e8e8; }
.ta-page .navbar + div + hr { border-color: rgba(255,255,255,0.15); }

.adventure_intro {
	margin-bottom: 1em;
	color: #e8e8e8;
	font-family: "Computer Modern Serif", "Latin Modern Roman", serif;
}
.adventure_intro code {
	background: rgba(255,255,255,0.1);
	padding: 2px 6px;
	border-radius: 2px;
	font-size: 0.95em;
	color: #e8e8e8;
}
/* Typewriter effect for intro line (slow reveal like original teletype) */
.ta-typewriter {
	display: inline-block;
	overflow: hidden;
	white-space: nowrap;
	border-right: 2px solid #e8e8e8;
	animation: ta-typewriter 2s steps(24) 0.5s forwards;
	width: 0;
}
@keyframes ta-typewriter {
	to { width: 24ch; }
}

.adventure_wrapper {
	width: 100%;
	border: 1px solid rgba(255,255,255,0.2);
	border-radius: 2px;
	overflow: hidden;
	background: #000;
}
/* Invert iframe so game appears white-on-black (original terminal look) */
.adventure_frame {
	display: block;
	width: 100%;
	min-height: 60vh;
	height: 560px;
	border: none;
	filter: invert(1);
	background: #000;
}
/* Input bar below game, like original: prompt + cursor */
.adventure_input_bar {
	display: flex;
	align-items: center;
	padding: 0.4em 0.6em;
	background: #0a0a0a;
	border-top: 1px solid rgba(255,255,255,0.2);
	font-family: "Computer Modern Serif", "Latin Modern Roman", serif;
	font-size: 1em;
	color: #e8e8e8;
}
.adventure_prompt {
	margin-right: 0.35em;
	color: #e8e8e8;
}
.adventure_cursor {
	display: inline-block;
	width: 0.6em;
	height: 1.1em;
	background: #e8e8e8;
	animation: ta-blink 1s step-end infinite;
	vertical-align: -0.05em;
}
@keyframes ta-blink {
	50% { opacity: 0; }
}

.adventure_credit {
	margin-top: 1em;
	color: #999;
	font-family: "Computer Modern Serif", "Latin Modern Roman", serif;
}
.adventure_credit a { color: #e8e8e8; }
.adventure_credit a:hover { text-decoration: underline; }
</style>
