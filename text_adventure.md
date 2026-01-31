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
</div>

<p class="adventure_credit"><small>Adventure (1976) by Will Crowther and Don Woods. Z-machine port by Arthur O'Dwyer; runs in <a href="https://github.com/curiousdannii/parchment" target="_blank" rel="noopener">Parchment</a>.</small></p>

<style>
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
.adventure_wrapper {
	width: 100%;
	border: 1px solid rgba(0,0,0,0.1);
	border-radius: 5px;
	overflow: hidden;
	background: #fafafa;
}
.adventure_frame {
	display: block;
	width: 100%;
	min-height: 65vh;
	height: 600px;
	border: none;
}
.adventure_credit {
	margin-top: 1em;
	color: #666;
}
.adventure_credit a { color: #FF0F00; }
.adventure_credit a:hover { text-decoration: underline; }
</style>
