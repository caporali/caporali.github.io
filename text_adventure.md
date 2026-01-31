---
layout: text_adventure
title: "Text adventure"
description: "Play Colossal Cave Adventure — classic text adventure in the browser."
---

<p class="adventure_intro"><i>Colossal Cave Adventure.</i> Type commands (e.g. <code>north</code>, <code>get lamp</code>, <code>look</code>).</p>

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

<p class="adventure_credit"><small>Adventure (1976) by Will Crowther and Don Woods. Z-machine port by Arthur O'Dwyer; runs in <a href="https://github.com/curiousdannii/parchment" target="_blank" rel="noopener">Parchment</a>.</small></p>

<style>
/* Page: same style as before (intro + credit use site style) */
.adventure_intro {
	margin-bottom: 1em;
	color: #272727;
}
.adventure_intro code {
	background: rgba(0,0,0,0.06);
	padding: 1px 5px;
	border-radius: 3px;
	font-size: 0.95em;
}

/* Only the game block is terminal: white on black, CM font, input bar below */
.adventure_wrapper {
	width: 100%;
	border: 1px solid rgba(0,0,0,0.1);
	border-radius: 5px;
	overflow: hidden;
	background: #000;
}
.adventure_frame {
	display: block;
	width: 100%;
	min-height: 65vh;
	height: 600px;
	border: none;
	filter: invert(1);
	background: #000;
}
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
.adventure_prompt { margin-right: 0.35em; }
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
	color: #666;
}
.adventure_credit a { color: #FF0F00; }
.adventure_credit a:hover { text-decoration: underline; }
</style>
