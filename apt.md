---
layout: default
title: "apartments"
permalink: /apt.html
author_name: '\caporali'
body_class: apartment-page
show_footer: false
apple_touch_icon: "/files/images/apt_icon.png"
apple_mobile_app: true
nav:
  - name: furniture
    link: /apt.html?view=furniture
  - name: info
    link: /apt.html?view=info
  - name: plan
    link: /apt.html?view=plan
---
<style>
@font-face { font-family: "CMU Serif"; src: url("/_fonts/cmu/cmunrm.ttf") format("truetype"); font-weight: 400; font-display: swap; }
@font-face { font-family: "CMU Serif"; src: url("/_fonts/cmu/cmunbx.ttf") format("truetype"); font-weight: 700; font-display: swap; }
@font-face { font-family: "CMU Typewriter"; src: url("/_fonts/cmu/cmuntt.ttf") format("truetype"); font-weight: 400; font-display: swap; }
@font-face { font-family: "CMU Typewriter"; src: url("/_fonts/cmu/cmuntb.ttf") format("truetype"); font-weight: 700; font-display: swap; }
.apartment-page .content { max-width: none; font-family: "CMU Serif", serif; color: #272727; background: #fff; }
.apartment-page .content, .apartment-page .content * { box-sizing: border-box; }
.apartment-page .content button, .apartment-page .content select, .apartment-page .content input, .apartment-page .content textarea { font: inherit; }
.apartment-page .content button { cursor: pointer; border: 1px solid #ddd; background: #fff; color: #272727; border-radius: 7px; padding: 8px 13px; }
.apartment-page .content button:hover { background: #f5f5f5; border-color: #bbb; }
.apartment-page .content button:disabled { cursor: not-allowed; opacity: .4; }
.apartment-page #navlist a[aria-current="page"] { text-decoration: underline; }
.app-shell { display: grid; grid-template-columns: 245px minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr) auto; height: calc(100dvh - 42px); }
.catalogue-panel { grid-column: 1; grid-row: 2; display: flex; flex-direction: column; min-width: 0; min-height: 0; margin: 0 0 0 18px; overflow: hidden; background: #fff; border: 1px solid #e5e5e5; border-radius: 10px; }
.catalogue-panel h1 { margin: 0; padding: 21px 19px 15px; font-size: 14px; }
.catalogue-list { flex: 1; min-height: 0; overflow: auto; padding: 0 12px 18px; }
.catalogue-sync { grid-column: 1; grid-row: 3; display: flex; align-items: center; gap: 8px; margin-left: 18px; padding: 10px 0 15px; font-size: 11px; }
.catalogue-sync #sync-state { flex: 1; font-family: "CMU Typewriter", monospace; }
.catalogue-sync #sync-state::before { content: ""; display: inline-block; width: 6px; height: 6px; margin-right: 7px; border-radius: 50%; background: #aaa; vertical-align: 1px; }
.catalogue-sync #sync-state.online::before { background: #4d9b70; }
.apartment-page .content .catalogue-sync button { padding: 4px 8px; font-size: 11px; }
.catalogue-row { display: grid; grid-template-columns: 28px 1fr 28px; gap: 9px; align-items: center; padding: 10px 6px; border-top: 1px solid #eff1ee; }
.swatch { width: 25px; height: 25px; border: 1px solid #555; border-radius: 4px; }
.swatch.sofa { clip-path: polygon(0 0,100% 0,100% 100%,50% 100%,50% 60%,0 60%); }
.swatch.sofa.left { clip-path: polygon(0 0,100% 0,100% 60%,50% 60%,50% 100%,0 100%); }
.swatch.sofa.straight { clip-path: none; }
.swatch.desk_chair, .swatch.night_lamp, .swatch.wireless_charger, .swatch.mouse { border-radius: 50%; }
.swatch.dining_table, .swatch.dining_chair { border-radius: 0; }
.catalogue-title { font-family: "CMU Typewriter", monospace; font-size: 12px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.catalogue-sub { color: #888; font-size: 10px; margin-top: 3px; }
.apartment-page .content .add-button { display: grid; place-items: center; padding: 0; width: 27px; height: 27px; font-size: 18px; line-height: 1; }
.stage-panel { display: contents; }
.stage-heading { grid-column: 1; grid-row: 1; display: flex; flex-direction: column; gap: 4px; align-items: stretch; padding: 17px 18px 12px; min-height: 52px; }
#plan-name { font-family: "CMU Typewriter", monospace; font-size: 14px; }
#plan-summary { color: #888; font-size: 11px; }
.stage { grid-column: 2; grid-row: 1 / 3; position: relative; min-height: 0; margin: 18px 18px 0; border: 1px solid #e5e5e5; border-radius: 10px; background: #fff; overflow: hidden; }
.history-actions { position: absolute; top: 12px; left: 12px; z-index: 1; display: flex; gap: 4px; }
.apartment-page .content .history-actions button { width: 28px; height: 28px; padding: 0; font-size: 17px; line-height: 1; }
.apartment-page .content #sync-save { position: absolute; top: 12px; right: 12px; z-index: 1; padding: 5px 10px; font-size: 11px; }
#plan-svg { width: 100%; height: 100%; display: block; touch-action: none; user-select: none; -webkit-user-select: none; }
#plan-svg.panning, #plan-svg.panning .furniture { cursor: grabbing; }
.stage-footer { grid-column: 2; grid-row: 3; display: flex; justify-content: space-between; gap: 15px; padding: 10px 22px 15px; color: #888; font-size: 10px; }
.price-totals { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
#save-status { white-space: nowrap; }
#save-status:empty { display: none; }
#plan-total, #non-plan-total, #spent-total { color: #555; white-space: nowrap; font-family: "CMU Typewriter", monospace; }
.footer-right { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; justify-content: flex-end; }
#sync-choice { width: min(390px, calc(100vw - 28px)); padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 12px 35px rgba(0,0,0,.15); }
#sync-choice::backdrop { background: rgba(0,0,0,.3); }
#sync-choice h2 { margin: 0 0 9px; font-size: 16px; }
#sync-choice p { margin: 0 0 16px; font-size: 12px; }
#sync-choice .sync-choice-actions { display: flex; gap: 7px; flex-wrap: wrap; }
.selection { position: fixed; z-index: 10; width: 218px; padding: 13px; background: #fff; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,.12); }
.selection[hidden] { display: none; }
.selected-name { font-family: "CMU Typewriter", monospace; font-size: 13px; font-weight: 700; }
.selected-size { color: #777; font-size: 11px; margin: 4px 0 13px; }
.drawer-note { color: #9b6949; font-size: 11px; margin: -5px 0 10px; }
.variant-row { display: flex; align-items: center; gap: 7px; margin-bottom: 11px; color: #666; font-size: 11px; }
.variant-row select { flex: 1; min-width: 0; padding: 5px 6px; border: 1px solid #ddd; border-radius: 6px; background: #fff; color: #272727; font-family: "CMU Typewriter", monospace; }
.angle-row { display: flex; align-items: center; gap: 7px; color: #666; font-size: 11px; }
.angle-row input { width: 66px; padding: 5px 6px; border: 1px solid #d7dfde; border-radius: 6px; }
.selection-actions { display: flex; gap: 5px; margin-top: 11px; }
.apartment-page .content .selection-actions button { flex: 1; padding: 5px 3px; font-size: 11px; white-space: nowrap; }
.remove-button { color: #9a5043; border-color: #ead3cd; }
.furniture { cursor: grab; }
.furniture:active { cursor: grabbing; }
.furniture .body { stroke: #4a4a4a; stroke-width: 1.5; vector-effect: non-scaling-stroke; }
.furniture.selected .body { stroke: #272727; stroke-width: 2.8; }
.furniture text { pointer-events: none; font-family: "CMU Typewriter", monospace; font-size: 10px; fill: #272727; font-weight: 700; text-anchor: middle; dominant-baseline: central; user-select: none; }
.furniture .selection-ring { fill: none; stroke: #777; stroke-width: 1.3; stroke-dasharray: 6 4; pointer-events: none; }
.drawer-clearance { pointer-events: none; }
.drawer-clearance rect { fill: rgba(213, 149, 96, .18); stroke: #bb7951; stroke-width: 1.5; stroke-dasharray: 5 4; vector-effect: non-scaling-stroke; }
.document-page { min-height: calc(100dvh - 42px); background: #fff; }
.document-tools { display: flex; align-items: center; gap: 8px; max-width: 1100px; margin: 0 auto; padding: 20px 32px 0; font-size: 11px; }
.document-tools #document-state { font-family: "CMU Typewriter", monospace; }
.document-tools #document-state::before { content: ""; display: inline-block; width: 6px; height: 6px; margin-right: 7px; border-radius: 50%; background: #aaa; vertical-align: 1px; }
.document-tools #document-state.online::before { background: #4d9b70; }
.document-tools #document-status { flex: 1; color: #777; }
.apartment-page .content .document-tools button { padding: 5px 9px; font-size: 11px; }
.document-editor { position: relative; width: calc(100% - 64px); max-width: 1100px; height: calc(100dvh - 180px); min-height: 400px; margin: 20px auto 32px; font-family: "CMU Typewriter", monospace; font-size: 12px; line-height: 1.5; tab-size: 4; }
.document-editor[hidden] { display: none; }
.document-highlight, .document-source { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; padding: 0; border: 0; font: inherit; line-height: inherit; letter-spacing: 0; tab-size: inherit; white-space: pre; overflow: auto; }
.document-highlight { pointer-events: none; color: #272727; scrollbar-width: none; }
.document-highlight::-webkit-scrollbar { display: none; }
.document-source { background: transparent; color: transparent; -webkit-text-fill-color: transparent; caret-color: #272727; resize: none; outline: none; }
.document-source::selection { background: rgba(100, 150, 225, .25); }
.syntax-mark { color: #8351a0; }.syntax-heading { color: #255c93; font-weight: 700; }.syntax-code { color: #317a4c; }
.syntax-link { color: #2676a4; }.syntax-emphasis { color: #a45b39; }.syntax-check { color: #3c8b64; }.syntax-table { color: #929aa1; }
.markdown { max-width: 1100px; margin: 0 auto; padding: 32px; font-size: 13px; line-height: 1.55; }
.info-view .markdown { max-width: 760px; }
.info-view .document-tools, .info-view .document-editor { max-width: 760px; }
.info-view .md-row span:first-child { width: 34%; }
.markdown h1, .markdown h2, .markdown h3 { line-height: 1.25; margin: 1.2em 0 .55em; }
.markdown h1:first-child { margin-top: 0; }
.markdown h1 { font-size: 22px; }.markdown h2 { font-size: 17px; }.markdown h3 { font-size: 14px; }
.markdown p, .markdown ul { margin: 0 0 1em; }.markdown ul { padding-left: 22px; }
.markdown code { font-family: "CMU Typewriter", monospace; background: #f5f5f5; padding: 1px 4px; border-radius: 3px; }
.markdown a { color: #ff0f00; overflow-wrap: anywhere; }
.md-table { display: table; width: 100%; border-collapse: collapse; margin: 0 0 18px; }
.md-row { display: table-row; }.md-row span { display: table-cell; padding: 8px 10px; border-bottom: 1px solid #e4eae6; vertical-align: top; }
.furniture-table { table-layout: fixed; }.furniture-table .md-row span:nth-child(1), .furniture-table .md-row span:nth-child(2) { width: 5%; text-align: center; }
.furniture-table .md-row span:nth-child(3) { width: 28%; overflow-wrap: anywhere; }.furniture-table .md-row span:nth-child(4) { width: 5%; }
.furniture-table .md-row span:nth-child(5) { width: 14%; text-align: right; }.furniture-table .md-row span:nth-child(6) { width: 25%; white-space: nowrap; }
.furniture-table .md-row span:nth-child(7) { width: 18%; }
.furniture-table .md-row.group-start:not(:nth-child(2)) span { border-top: 2px solid #c8d5d0; }
.md-header span { font-weight: 700; border-bottom-color: #bfcfca; }
@media (max-width: 700px) {
	.apartment-page .navbar { text-align: center; }
	.apartment-page #author-name, .apartment-page #navlist { display: block; float: none; width: 100%; margin: 0; }
	.apartment-page #navlist { padding: 4px 0 6px; }
	.apartment-page #navlist li { display: inline-block; float: none; margin: 0 3px; }
	.app-shell { display: flex; flex-direction: column; height: auto; min-height: 0; }
	.stage-panel { order: 1; display: flex; flex-direction: column; }.stage { height: 54dvh; min-height: 310px; margin: 0 8px; }
	.stage-heading { flex-direction: row; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 8px; padding: 10px 13px; min-height: 40px; }
	.catalogue-panel { order: 2; height: auto; margin: 0 8px 16px; }
	.catalogue-sync { order: 3; margin: -8px 8px 16px; padding: 0 5px; }
	.catalogue-list { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); overflow: visible; }
	.catalogue-row { grid-template-columns: 24px minmax(0,1fr) 28px; gap: 5px; }
	.stage-footer { padding: 8px 12px; font-size: 9px; }
	.selection { max-width: calc(100vw - 16px); }
	.markdown { padding: 16px; }
	.document-tools { flex-wrap: wrap; padding: 12px 16px 0; }
	.document-tools #document-status { flex-basis: 100%; order: 1; }
	.document-editor { width: calc(100% - 32px); height: 60dvh; min-height: 320px; margin-top: 16px; }
	.document-page .markdown { overflow-x: auto; }.furniture-table { min-width: 800px; }
	.info-view .markdown { overflow-x: visible; }
	.info-view .md-table { table-layout: fixed; }
	.info-view .md-row span { overflow-wrap: anywhere; }
	.md-table { font-size: 11px; }.md-row span { padding: 6px; }
}
#plan-view[hidden], #document-view[hidden] { display: none; }
</style>
<div id="plan-view" hidden>
	<main class="app-shell">
		<aside class="catalogue-panel">
			<h1>furniture</h1>
			<div id="catalogue" class="catalogue-list"></div>
		</aside>
		<div class="catalogue-sync"><span id="sync-state" role="status">offline</span><button id="sync-login" type="button">sign in</button></div>
		<section class="stage-panel">
			<div class="stage-heading"><strong id="plan-name"></strong><span id="plan-summary"></span></div>
			<div class="stage"><div class="history-actions"><button id="undo" type="button" aria-label="undo" title="undo" disabled>↶</button><button id="redo" type="button" aria-label="redo" title="redo" disabled>↷</button></div><button id="sync-save" type="button" title="restore the last saved layout">sync</button><svg id="plan-svg" role="img" aria-label="interactive apartment plan"></svg></div>
			<div class="stage-footer"><div class="price-totals"><span id="plan-total" title="placed items not yet bought, before tax, delivery, and discounts"></span><span id="non-plan-total" title="items marked plan ☐ and not yet bought in furniture.md, before tax, delivery, and discounts"></span></div><div class="footer-right"><span id="save-status" role="status"></span><span id="spent-total" title="IKEA $6,035.48, Brooklinen $1,435.81, Branch $786.89, Article $1,096.64 (subtotal $1,076.00), including tax and shipping">paid · $9,354.82</span></div></div>
		</section>
	</main>
	<div id="selection" class="selection" role="dialog" aria-label="selected furniture" hidden></div>
	<dialog id="sync-choice"><h2>two layouts found</h2><p>this browser has a local draft that differs from the layout on github. choose which version to use.</p><div class="sync-choice-actions"><button type="button" data-sync-choice="local">keep local draft</button><button type="button" data-sync-choice="online">load online layout</button><button type="button" data-sync-choice="later">decide later</button></div></dialog>
</div>
<main id="document-view" class="document-page" hidden>
	<div class="document-tools"><span id="document-state" role="status">offline</span><button id="document-login" type="button">sign in</button><span id="document-status" role="status"></span><button id="document-edit" type="button">edit text</button><button id="document-save" type="button" hidden>save online</button></div>
	<article id="document-preview" class="markdown"></article>
	<div id="document-editor" class="document-editor" hidden><pre id="document-highlight" class="document-highlight" aria-hidden="true"></pre><textarea id="document-source" class="document-source" aria-label="markdown source" spellcheck="false" wrap="off"></textarea></div>
</main>
<script type="module">

const escapeHtml = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

function inlineMarkdown(value) {
	return escapeHtml(value)
		.replace(/`([^`]+)`/g, "<code>$1</code>")
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => /^https?:\/\//i.test(href)
			? `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>` : label)
		.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
		.replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function renderMarkdown(source) {
	const lines = source.replaceAll("\r\n", "\n").split("\n");
	const output = [];
	for (let i = 0; i < lines.length;) {
		const line = lines[i].trim();
		if (!line) { i++; continue; }
		if (line.startsWith("```")) {
			const code = [];
			for (i++; i < lines.length && !lines[i].trim().startsWith("```"); i++) code.push(lines[i]);
			output.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
			i++;
		} else if (/^#{1,6} /.test(line)) {
			const level = line.match(/^#+/)[0].length;
			const title = line.slice(level + 1);
			const id = title.toLowerCase().replace(/[^a-z0-9_-]+/g, "-");
			output.push(`<h${level} id="doc-${id}">${inlineMarkdown(title)}</h${level}>`);
			i++;
		} else if (line.startsWith("|") && lines[i + 1]?.trim().match(/^\|[\s:|-]+\|$/)) {
			const cells = row => row.trim().slice(1, -1).split("|").map(cell => `<span>${inlineMarkdown(cell.trim())}</span>`);
			const kind = line.startsWith("| bought | plan | item | n. | price |") ? " furniture-table" : "";
			output.push(`<div class="md-table${kind}"><div class="md-row md-header">${cells(lines[i]).join("")}</div>`);
			i += 2;
			let previousItem = "";
			while (i < lines.length && lines[i].trim().startsWith("|")) {
				const row = lines[i++];
				const item = kind ? row.match(/\[`([a-z_]+)`\]/)?.[1] : "";
				output.push(`<div class="md-row${kind && item !== previousItem ? " group-start" : ""}">${cells(row).join("")}</div>`);
				previousItem = item;
			}
			output.push("</div>");
		} else if (/^- /.test(line)) {
			output.push("<ul>");
			while (i < lines.length && /^- /.test(lines[i].trim())) output.push(`<li>${inlineMarkdown(lines[i++].trim().slice(2))}</li>`);
			output.push("</ul>");
		} else {
			const paragraph = [];
			while (i < lines.length && lines[i].trim() && !/^(#{1,6} |\| |- |```)/.test(lines[i].trim())) paragraph.push(lines[i++].trim());
			if (paragraph.length) output.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
			else i++;
		}
	}
	return output.join("\n");
}

function highlightInline(value) {
	const tokens = /(`[^`\n]+`|\[[^\]\n]+\]\([^)\n]+\)|\*\*[^*\n]+\*\*|\*[^*\n]+\*|☑|☐|\|)/g;
	let result = "";
	let index = 0;
	for (const match of value.matchAll(tokens)) {
		result += escapeHtml(value.slice(index, match.index));
		const token = match[0];
		const type = token.startsWith("`") ? "code" : token.startsWith("[") ? "link"
			: token.startsWith("*") ? "emphasis" : token === "|" ? "table" : "check";
		result += `<span class="syntax-${type}">${escapeHtml(token)}</span>`;
		index = match.index + token.length;
	}
	return result + escapeHtml(value.slice(index));
}

function highlightMarkdown(source) {
	let fenced = false;
	return source.split("\n").map(line => {
		if (/^\s*```/.test(line)) {
			fenced = !fenced;
			return `<span class="syntax-mark">${escapeHtml(line)}</span>`;
		}
		if (fenced) return `<span class="syntax-code">${escapeHtml(line)}</span>`;
		const heading = line.match(/^(\s*#{1,6}\s)(.*)$/);
		if (heading) return `<span class="syntax-mark">${escapeHtml(heading[1])}</span><span class="syntax-heading">${highlightInline(heading[2])}</span>`;
		const list = line.match(/^(\s*(?:[-*]|\d+\.)\s)(.*)$/);
		if (list) return `<span class="syntax-mark">${escapeHtml(list[1])}</span>${highlightInline(list[2])}`;
		return highlightInline(line);
	}).join("\n") + " ";
}

const requestedView = new URLSearchParams(location.search).get("view");
const view = ["furniture", "info"].includes(requestedView) ? requestedView : "plan";
const syncApi = "https://api.apt-save.workers.dev";

function authRedirect() {
	const params = new URLSearchParams(location.hash.slice(1));
	const token = params.get("apt_session");
	if (!token) return;
	window.history.replaceState(null, "", location.pathname + location.search);
	try {
		const nonce = sessionStorage.getItem("apt_auth_nonce");
		sessionStorage.removeItem("apt_auth_nonce");
		if (nonce && nonce === params.get("apt_nonce")) sessionStorage.setItem("apt_online_session", token);
	} catch (_) { /* session storage may be unavailable */ }
}

function beginLogin() {
	const bytes = crypto.getRandomValues(new Uint8Array(16));
	const nonce = Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
	try { sessionStorage.setItem("apt_auth_nonce", nonce); } catch (_) { return false; }
	location.assign(`${syncApi}/auth/start?origin=${encodeURIComponent(location.origin)}&nonce=${nonce}&view=${view}`);
	return true;
}

function clearSession() {
	try { sessionStorage.removeItem("apt_online_session"); } catch (_) { /* session storage may be unavailable */ }
	sessionToken = null;
}

authRedirect();
let sessionToken = null;
try { sessionToken = sessionStorage.getItem("apt_online_session"); } catch (_) { /* session storage may be unavailable */ }
document.querySelector("#plan-view").hidden = view !== "plan";
document.querySelector("#document-view").hidden = view === "plan";
document.querySelector("#document-view").classList.toggle("info-view", view === "info");
document.querySelectorAll("#navlist a").forEach(link => {
	if (new URL(link.href).searchParams.get("view") === view) link.setAttribute("aria-current", "page");
});
if (view === "plan") {
const response = await fetch("/files/apt/data.json", { cache: "no-store" });
if (!response.ok) throw new Error(`could not load data.json: ${response.status}`);
const data = await response.json();
const furnitureResponse = await fetch("/files/apt/markdown/furniture.md", { cache: "no-store" });
if (!furnitureResponse.ok) throw new Error(`could not load furniture.md: ${furnitureResponse.status}`);
const furnitureRows = (await furnitureResponse.text()).split("\n");
const boughtItems = new Set(furnitureRows.filter(row => /^\|\s*☑\s*\|/.test(row))
	.map(row => row.match(/\[`([a-z_]+)`\]/)?.[1]).filter(Boolean));
const nonPlanTotal = furnitureRows
	.filter(row => /^\|\s*☐\s*\|\s*☐\s*\|/.test(row))
	.reduce((sum, row) => {
		const cells = row.split("|").map(cell => cell.trim());
		const price = cells[5]?.replaceAll(",", "").match(/\$([\d.]+)/);
		return sum + (price && Number.isFinite(Number(cells[4])) ? Number(cells[4]) * Number(price[1]) : 0);
	}, 0);
const formatPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
document.querySelector("#non-plan-total").textContent = `not on plan · ${formatPrice.format(nonPlanTotal)}`;
const catalogue = Object.fromEntries(data.catalogue.map(item => [item.name, item]));
const colors = {
	bed: "#a7c8d0", dresser: "#a7c8d0", nightstand: "#a7c8d0", desk: "#b9d1ae",
	desk_chair: "#b9d1ae", sofa: "#e9c2a8", sofa_stool: "#e9c2a8",
	tv_unit: "#ddcbb0", sideboard: "#ddcbb0", bench: "#ddcbb0",
	coffee_table: "#ddcbb0", side_table: "#ddcbb0", shoe_rack: "#ddcbb0", dining_table: "#ddcbb0", dining_chair: "#ddcbb0",
	armrest_tray: "#e9c2a8", wall_shelf: "#ddcbb0",
	night_lamp: "#e9c2a8", floor_lamp_3_spot: "#e9c2a8", floor_lamp: "#e9c2a8", wall_spotlight: "#e9c2a8", wireless_charger: "#b9d1ae",
	magsafe_charger: "#b9d1ae", laptop_stand: "#b9d1ae", mouse: "#b9d1ae", mouse_pad: "#b9d1ae",
};
const svg = document.querySelector("#plan-svg");
const cataloguePanel = document.querySelector("#catalogue");
const selectionPanel = document.querySelector("#selection");
const undoButton = document.querySelector("#undo");
const redoButton = document.querySelector("#redo");
const planKey = "libertytowers_E1801";
const syncStatus = document.querySelector("#save-status");
const syncState = document.querySelector("#sync-state");
const planTotal = document.querySelector("#plan-total");
const syncLogin = document.querySelector("#sync-login");
const syncSave = document.querySelector("#sync-save");
const syncChoice = document.querySelector("#sync-choice");
let plan;
let items = [];
let selectedId = null;
let drag = null;
let pan = null;
const touches = new Map();
let pinch = null;
let view;
let popupPoint = null;
const histories = new Map();
let history;
let onlineReady = false;
let onlineHash = null;
let onlineSnapshot = null;
let onlineRemote = null;
let onlineTimer = null;
let onlineSaving = false;

const format = value => Number(value.toFixed(1));
const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
const itemById = id => items.find(item => item.id === id);

function roomPath(points) {
	return `M${points.map(point => point.join(",")).join("L")}Z`;
}

function initialItems(key) {
	return structuredClone(data.layouts[key]);
}

function storageKey(key) {
	return `apartment_planner_v1_${key}`;
}

function loadItems(key) {
	try {
		const saved = JSON.parse(localStorage.getItem(storageKey(key)));
		if (Array.isArray(saved)) {
			for (const item of saved) {
				if (item?.type === "desk" && ["electric", "fixed", "small"].includes(item.variant)) item.variant = "big";
				if (item?.type === "sofa" && ["right_chaise", "straight"].includes(item.variant)) item.variant = "left_chaise";
				if (item?.type === "table_lamp") item.type = "night_lamp";
				if (item?.type === "dining_table") delete item.variant;
			}
			if (saved.every(validItem)) {
				const marker = `${storageKey(key)}_article_chairs`;
				if (!localStorage.getItem(marker)) {
					if (!saved.some(item => item.type === "dining_chair")) saved.push(...initialItems(key).filter(item => item.type === "dining_chair"));
					localStorage.setItem(storageKey(key), JSON.stringify(saved));
					localStorage.setItem(marker, "1");
				}
				return saved;
			}
		}
	} catch (_) { /* local storage may be unavailable */ }
	return initialItems(key);
}

function validItem(item) {
	return item && typeof item.id === "string" && catalogue[item.type]
		&& Number.isFinite(item.x) && Number.isFinite(item.y) && Number.isFinite(item.angle)
		&& (item.variant === undefined || catalogue[item.type].variants?.some(variant => variant.name === item.variant));
}

function savedLayout() {
	try {
		const saved = JSON.parse(localStorage.getItem(`${storageKey(planKey)}_online`));
		if (Array.isArray(saved) && saved.every(validItem)) return saved;
	} catch (_) { /* local storage may be unavailable */ }
	return initialItems(planKey);
}

function rememberOnlineLayout(layout) {
	try { localStorage.setItem(`${storageKey(planKey)}_online`, JSON.stringify(layout)); } catch (_) { /* local storage may be unavailable */ }
}

function itemSize(item) {
	const size = catalogue[item.type];
	return size.variants ? { ...size, ...size.variants.find(variant => variant.name === (item.variant || size.variants[0].name)) } : size;
}

function saveItems() {
	try {
		localStorage.setItem(storageKey(planKey), JSON.stringify(items));
		syncStatus.textContent = "";
	} catch (_) {
		syncStatus.textContent = "local saving unavailable";
	}
	if (onlineReady) scheduleOnlineSave();
}

function setOnlineState(ready) {
	onlineReady = ready;
	if (!ready) clearTimeout(onlineTimer);
	syncState.textContent = ready ? "online" : "offline";
	syncState.classList.toggle("online", ready);
	syncLogin.textContent = sessionToken ? ready ? "sign out" : "retry" : "sign in";
	syncSave.title = ready ? "save the current layout online" : "restore the last saved layout";
}

function disconnectOnline() {
	clearTimeout(onlineTimer);
	clearSession();
	onlineHash = null;
	onlineSnapshot = null;
	onlineRemote = null;
	setOnlineState(false);
	syncStatus.textContent = "";
}

async function onlineRequest(method, body = null) {
	const response = await fetch(`${syncApi}/api/layout`, { method, cache: "no-store", headers: {
		Authorization: `Bearer ${sessionToken}`, ...(body ? { "Content-Type": "application/json" } : {}),
	}, ...(body ? { body: JSON.stringify(body) } : {}) });
	let result;
	try { result = await response.json(); } catch (_) { throw new Error("invalid response from online save"); }
	if (!response.ok) {
		const error = new Error(result.error || "online save failed");
		error.status = response.status;
		error.result = result;
		throw error;
	}
	return result;
}

function scheduleOnlineSave(delay = 15000) {
	clearTimeout(onlineTimer);
	if (!onlineReady || !onlineHash || onlineRemote) return;
	if (JSON.stringify(items) === onlineSnapshot) {
		syncStatus.textContent = "";
		return;
	}
	syncStatus.textContent = "online pending";
	onlineTimer = setTimeout(() => { void saveOnline(); }, delay);
}

function useOnlineLayout(remote) {
	try { localStorage.setItem(`${storageKey(planKey)}_before_online`, JSON.stringify(items)); } catch (_) { /* local storage may be unavailable */ }
	items = structuredClone(remote.layout);
	history = { steps: [JSON.stringify(items)], index: 0 };
	histories.set(planKey, history);
	updateHistoryButtons();
	selectedId = null;
	popupPoint = null;
	onlineHash = remote.hash;
	onlineSnapshot = JSON.stringify(remote.layout);
	onlineRemote = null;
	saveItems();
	renderAll();
}

function restoreSavedLayout() {
	const saved = savedLayout();
	const changed = JSON.stringify(items) !== JSON.stringify(saved);
	if (changed) {
		items = structuredClone(saved);
		selectedId = null;
		popupPoint = null;
		saveItems();
		recordHistory();
		renderAll();
	}
	syncStatus.textContent = changed ? "restored last saved layout" : "already at last saved layout";
}

function reconcileOnline(remote) {
	rememberOnlineLayout(remote.layout);
	const local = JSON.stringify(items);
	const online = JSON.stringify(remote.layout);
	if (local === online || local === JSON.stringify(initialItems(planKey))) {
		if (local !== online) useOnlineLayout(remote);
		else {
			onlineHash = remote.hash;
			onlineSnapshot = online;
			onlineRemote = null;
			syncStatus.textContent = "";
		}
		return;
	}
	onlineHash = null;
	onlineRemote = remote;
	syncStatus.textContent = "choose a layout to sync";
	if (!syncChoice.open) syncChoice.showModal();
}

async function refreshOnline() {
	if (!sessionToken) return;
	syncStatus.textContent = "checking online layout";
	try {
		const remote = await onlineRequest("GET");
		setOnlineState(true);
		reconcileOnline(remote);
	}
	catch (error) {
		if (error.status === 401) disconnectOnline();
		else {
			setOnlineState(false);
			syncStatus.textContent = "online unavailable";
		}
	}
}

async function saveOnline() {
	clearTimeout(onlineTimer);
	if (!onlineReady || onlineSaving) return;
	if (onlineRemote) {
		if (!syncChoice.open) syncChoice.showModal();
		return;
	}
	if (!onlineHash) return refreshOnline();
	if (JSON.stringify(items) === onlineSnapshot) {
		syncStatus.textContent = "";
		return;
	}
	const snapshot = JSON.stringify(items);
	onlineSaving = true;
	syncSave.disabled = true;
	syncStatus.textContent = "saving online";
	try {
		const result = await onlineRequest("POST", { items: JSON.parse(snapshot), base_hash: onlineHash });
		onlineHash = result.hash;
		onlineSnapshot = JSON.stringify(result.layout);
		rememberOnlineLayout(result.layout);
		syncStatus.textContent = "";
	} catch (error) {
		if (error.status === 401) disconnectOnline();
		else if (error.status === 409) {
			if (error.result.layout) reconcileOnline(error.result);
			else await refreshOnline();
		} else {
			setOnlineState(false);
			syncStatus.textContent = "online save failed";
		}
	} finally {
		onlineSaving = false;
		syncSave.disabled = false;
		if (sessionToken && onlineHash && !onlineRemote && JSON.stringify(items) !== snapshot) scheduleOnlineSave();
	}
}

function initOnline() {
	setOnlineState(false);
	if (!sessionToken) return;
	void refreshOnline();
}

syncLogin.addEventListener("click", () => {
	if (sessionToken) return onlineReady ? disconnectOnline() : void refreshOnline();
	if (!beginLogin()) syncStatus.textContent = "browser session storage is required for login";
});
syncSave.addEventListener("click", () => { if (onlineReady) void saveOnline(); else restoreSavedLayout(); });
window.addEventListener("offline", () => { if (sessionToken) setOnlineState(false); });
window.addEventListener("online", () => { if (sessionToken && !onlineReady) void refreshOnline(); });
syncChoice.addEventListener("click", event => {
	const button = event.target.closest("[data-sync-choice]");
	if (!button) return;
	const choice = button.dataset.syncChoice;
	syncChoice.close();
	if (choice === "online") useOnlineLayout(onlineRemote);
	else if (choice === "local") {
		onlineHash = onlineRemote.hash;
		onlineSnapshot = JSON.stringify(onlineRemote.layout);
		onlineRemote = null;
		scheduleOnlineSave();
	} else syncStatus.textContent = "online choice pending";
});

function updateHistoryButtons() {
	undoButton.disabled = history.index === 0;
	redoButton.disabled = history.index === history.steps.length - 1;
}

function recordHistory() {
	const snapshot = JSON.stringify(items);
	if (snapshot === history.steps[history.index]) return;
	history.steps.splice(history.index + 1);
	history.steps.push(snapshot);
	if (history.steps.length > 100) history.steps.shift();
	history.index = history.steps.length - 1;
	updateHistoryButtons();
}

function stepHistory(direction) {
	const index = history.index + direction;
	if (index < 0 || index >= history.steps.length) return;
	history.index = index;
	items = JSON.parse(history.steps[index]);
	if (!itemById(selectedId)) selectedId = null;
	popupPoint = null;
	saveItems();
	renderAll();
	updateHistoryButtons();
}

function fitView() {
	const pad = Math.max(plan.width, plan.height) * .035;
	view = { x: -pad, y: -pad, w: plan.width + 2 * pad, h: plan.height + 2 * pad };
	updateView();
}

function updateView() {
	svg.setAttribute("viewBox", `${view.x} ${view.y} ${view.w} ${view.h}`);
}

function worldPoint(event) {
	const point = svg.createSVGPoint();
	point.x = event.clientX;
	point.y = event.clientY;
	return point.matrixTransform(svg.getScreenCTM().inverse());
}

function zoom(factor, center = null) {
	const origin = center || { x: view.x + view.w / 2, y: view.y + view.h / 2 };
	const width = clamp(view.w * factor, Math.min(plan.width, plan.height) * .25, Math.max(plan.width, plan.height) * 3);
	const applied = width / view.w;
	view.x = origin.x - (origin.x - view.x) * applied;
	view.y = origin.y - (origin.y - view.y) * applied;
	view.w *= applied;
	view.h *= applied;
	updateView();
}

function selectPlan() {
	plan = data.plans[planKey];
	items = loadItems(planKey);
	history = histories.get(planKey);
	if (!history) {
		history = { steps: [JSON.stringify(items)], index: 0 };
		histories.set(planKey, history);
	}
	updateHistoryButtons();
	selectedId = null;
	popupPoint = null;
	document.querySelector("#plan-name").textContent = "liberty towers · E1801";
	document.querySelector("#plan-summary").textContent = plan.area;
	fitView();
	renderStatic();
	renderAll();
}

function renderStatic() {
	svg.innerHTML = `<rect x="0" y="0" width="${plan.width}" height="${plan.height}" fill="#fff"/>`
		+ `<image id="plan-image" href="${plan.image}?v=${encodeURIComponent(data.updated_at)}" width="${plan.width}" height="${plan.height}"/>`
		+ `<g id="furniture-layer"></g>`
		+ `<g id="clearance-layer"></g>`;
}

function localShape(item) {
	const size = itemSize(item);
	const width = size.width * plan.scale;
	const depth = size.depth * plan.scale;
	if (item.type === "sofa" && item.variant !== "straight") {
		const chaise = catalogue.sofa.chaise_width * plan.scale;
		const body = catalogue.sofa.body_depth * plan.scale;
		if (item.variant === "left_chaise") {
			return [[-width / 2, -depth / 2], [width / 2, -depth / 2],
				[width / 2, -depth / 2 + body], [-width / 2 + chaise, -depth / 2 + body],
				[-width / 2 + chaise, depth / 2], [-width / 2, depth / 2]];
		}
		return [[-width / 2, -depth / 2], [width / 2, -depth / 2],
			[width / 2, depth / 2], [width / 2 - chaise, depth / 2],
			[width / 2 - chaise, -depth / 2 + body], [-width / 2, -depth / 2 + body]];
	}
	return [[-width / 2, -depth / 2], [width / 2, -depth / 2],
		[width / 2, depth / 2], [-width / 2, depth / 2]];
}

function shapeMarkup(item) {
	const size = itemSize(item);
	const width = size.width * plan.scale;
	const depth = size.depth * plan.scale;
	const fill = colors[item.type];
	let shape;
	if (item.type === "sofa") {
		shape = `<path class="body" fill="${fill}" d="${roomPath(localShape(item))}"/>`;
	} else if (["desk_chair", "night_lamp", "floor_lamp_3_spot", "floor_lamp", "wall_spotlight", "wireless_charger", "mouse"].includes(item.type)) {
		shape = `<ellipse class="body" fill="${fill}" cx="0" cy="0" rx="${width / 2}" ry="${depth / 2}"/>`;
	} else {
		const radius = ["dining_table", "dining_chair"].includes(item.type) ? 0 : 1;
		shape = `<rect class="body" fill="${fill}" x="${-width / 2}" y="${-depth / 2}" width="${width}" height="${depth}" rx="${radius}"/>`;
	}
	const fontSize = Math.min(10, Math.min(width, depth) * .9 / (item.type.length * .6));
	const label = fontSize < 6 ? "" : `<text x="0" y="0" style="font-size:${fontSize}px">${item.type}</text>`;
	const ring = selectedId !== item.id ? "" : ["desk_chair", "night_lamp", "floor_lamp_3_spot", "floor_lamp", "wall_spotlight", "wireless_charger", "mouse"].includes(item.type)
		? `<ellipse class="selection-ring" cx="0" cy="0" rx="${width / 2 + 5}" ry="${depth / 2 + 5}"/>`
		: `<rect class="selection-ring" x="${-width / 2 - 5}" y="${-depth / 2 - 5}" width="${width + 10}" height="${depth + 10}" rx="${["dining_table", "dining_chair"].includes(item.type) ? 0 : 4}"/>`;
	return `<g class="furniture${selectedId === item.id ? " selected" : ""}" data-id="${item.id}" transform="translate(${format(item.x)} ${format(item.y)}) rotate(${format(item.angle)})"><title>${item.type}: ${size.width} × ${size.depth} cm</title>${shape}${label}${ring}</g>`;
}

function drawerMarkup(item) {
	if (item?.type !== "bed") return "";
	const size = itemSize(item);
	const width = size.width * plan.scale;
	const depth = size.depth * plan.scale;
	const drawerDepth = catalogue.bed.drawer_depth * plan.scale;
	const drawerWidth = catalogue.bed.drawer_width * plan.scale;
	const margin = (depth - 2 * drawerWidth) / 2;
	const drawers = [-1, 1].flatMap(side => [0, 1].map(index => {
		const x = side < 0 ? -width / 2 - drawerDepth : width / 2;
		const y = -depth / 2 + margin + index * drawerWidth;
		return `<rect x="${x}" y="${y}" width="${drawerDepth}" height="${drawerWidth}"/>`;
	}));
	return `<g class="drawer-clearance" transform="translate(${format(item.x)} ${format(item.y)}) rotate(${format(item.angle)})">${drawers.join("")}</g>`;
}

function renderFurniture() {
	document.querySelector("#furniture-layer").innerHTML = items.map(shapeMarkup).join("");
	document.querySelector("#clearance-layer").innerHTML = drawerMarkup(itemById(selectedId));
}

function renderCatalogue() {
	const counts = Object.fromEntries(data.catalogue.map(item => [item.name, items.filter(piece => piece.type === item.name).length]));
	const sofaVariant = items.find(piece => piece.type === "sofa")?.variant;
	cataloguePanel.innerHTML = data.catalogue.map(item => {
		const swatch = item.name === "sofa" ? sofaVariant === "straight" ? "straight" : sofaVariant === "left_chaise" ? "left" : "" : "";
		const detail = item.variants?.length > 1 ? `${item.variants.length} options` : `${item.width} × ${item.depth} cm`;
		return `<div class="catalogue-row"><span class="swatch ${item.name} ${swatch}" style="background:${colors[item.name]}"></span>`
			+ `<div><div class="catalogue-title" title="${item.name}">${item.name}</div>`
			+ `<div class="catalogue-sub">${detail} · ${counts[item.name]}/${item.count} placed</div></div>`
			+ `<button class="add-button" data-add="${item.name}" title="add ${item.name}" ${counts[item.name] >= item.count ? "disabled" : ""}>+</button></div>`;
	}).join("");
}

function renderSelection() {
	const item = itemById(selectedId);
	if (!item) {
		selectionPanel.hidden = true;
		return;
	}
	const size = itemSize(item);
	const dimensions = `${size.width} × ${size.depth} cm`;
	const options = catalogue[item.type].variants?.length > 1 ? catalogue[item.type].variants.map(variant => {
		const label = `${variant.name} · ${variant.width} × ${variant.depth} cm`;
		return `<option value="${variant.name}" ${(item.variant || catalogue[item.type].variants[0].name) === variant.name ? "selected" : ""}>${label}</option>`;
	}).join("") : "";
	const variants = options ? `<div class="variant-row"><label for="variant-input">option</label><select id="variant-input">${options}</select></div>` : "";
	selectionPanel.innerHTML = `<div class="selected-name">${item.type}</div><div class="selected-size">${dimensions} · height ${size.height === "—" ? "unlisted" : `${size.height} cm`}</div>`
		+ (item.type === "bed" ? `<div class="drawer-note">drawers: ${catalogue.bed.drawer_depth} cm each side</div>` : "")
		+ variants + `<div class="angle-row"><label for="angle-input">angle</label><input id="angle-input" type="number" step="1" value="${format(item.angle)}">°</div>`
		+ `<div class="selection-actions"><button data-rotate="-15">↶ 15°</button><button data-rotate="15">15° ↷</button><button class="remove-button" id="remove-item">remove</button></div>`;
	if (!popupPoint) {
		const point = svg.createSVGPoint();
		point.x = item.x;
		point.y = item.y;
		const screen = point.matrixTransform(svg.getScreenCTM());
		popupPoint = { x: screen.x, y: screen.y };
	}
	selectionPanel.hidden = false;
	selectionPanel.style.left = `${clamp(popupPoint.x + 16, 8, window.innerWidth - 226)}px`;
	selectionPanel.style.top = `${clamp(popupPoint.y + 16, 8, window.innerHeight - selectionPanel.offsetHeight - 8)}px`;
}

function renderAll() {
	renderFurniture();
	renderCatalogue();
	renderSelection();
	const total = items.reduce((sum, item) => sum + (boughtItems.has(item.type) ? 0 : itemSize(item).price), 0);
	planTotal.textContent = `placed · ${formatPrice.format(total)}`;
}

function addItem(type) {
	const size = catalogue[type];
	if (items.filter(item => item.type === type).length >= size.count) return;
	const [x, y] = plan.spawn;
	const id = `${type}_${crypto.randomUUID()}`;
	items.push({ id, type, x, y, angle: 0, ...(size.variants ? { variant: size.variants[0].name } : {}) });
	selectedId = id;
	popupPoint = null;
	saveItems();
	recordHistory();
	renderAll();
}

function changeSelected(mutator) {
	const item = itemById(selectedId);
	if (!item) return;
	mutator(item);
	saveItems();
	recordHistory();
	renderAll();
}

undoButton.addEventListener("click", () => stepHistory(-1));
redoButton.addEventListener("click", () => stepHistory(1));
cataloguePanel.addEventListener("click", event => {
	const button = event.target.closest("[data-add]");
	if (button) addItem(button.dataset.add);
});
selectionPanel.addEventListener("click", event => {
	const rotate = event.target.closest("[data-rotate]");
	if (rotate) changeSelected(item => { item.angle = (item.angle + Number(rotate.dataset.rotate) + 360) % 360; });
	if (event.target.id === "remove-item") {
		items = items.filter(item => item.id !== selectedId);
		selectedId = null;
		popupPoint = null;
		saveItems();
		recordHistory();
		renderAll();
	}
});
selectionPanel.addEventListener("change", event => {
	if (event.target.id === "variant-input") {
		changeSelected(item => { item.variant = event.target.value; });
	}
	if (event.target.id === "angle-input") {
		recordHistory();
		event.target.value = format(itemById(selectedId).angle);
	}
});
selectionPanel.addEventListener("input", event => {
	if (event.target.id !== "angle-input" || !event.target.value.trim()) return;
	const value = Number(event.target.value);
	if (!Number.isFinite(value)) return;
	itemById(selectedId).angle = (value % 360 + 360) % 360;
	saveItems();
	renderFurniture();
});
svg.addEventListener("pointerdown", event => {
	if (event.pointerType === "touch") {
		event.preventDefault();
		touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
		svg.setPointerCapture(event.pointerId);
		if (touches.size === 2) {
			if (drag) { saveItems(); recordHistory(); }
			drag = null;
			pan = null;
			const [first, second] = [...touches.values()];
			pinch = { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2,
				distance: Math.hypot(first.x - second.x, first.y - second.y) };
			selectionPanel.hidden = true;
			return;
		}
	}
	if (event.ctrlKey) {
		event.preventDefault();
		selectedId = null;
		popupPoint = null;
		pan = { x: event.clientX, y: event.clientY, viewX: view.x, viewY: view.y, scale: svg.getScreenCTM().a };
		svg.setPointerCapture(event.pointerId);
		svg.classList.add("panning");
		renderAll();
		return;
	}
	const group = event.target.closest(".furniture");
	if (group) {
		selectedId = group.dataset.id;
		const item = itemById(selectedId);
		const point = worldPoint(event);
		drag = { id: selectedId, dx: point.x - item.x, dy: point.y - item.y };
		popupPoint = { x: event.clientX, y: event.clientY };
		svg.setPointerCapture(event.pointerId);
		renderAll();
	} else {
		selectedId = null;
		popupPoint = null;
		if (event.pointerType === "touch") {
			pan = { x: event.clientX, y: event.clientY, viewX: view.x, viewY: view.y, scale: svg.getScreenCTM().a };
			svg.classList.add("panning");
		}
		renderAll();
	}
});
svg.addEventListener("pointermove", event => {
	if (event.pointerType === "touch" && touches.has(event.pointerId)) touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
	if (pinch && touches.size >= 2) {
		const [first, second] = [...touches.values()];
		const x = (first.x + second.x) / 2;
		const y = (first.y + second.y) / 2;
		const distance = Math.hypot(first.x - second.x, first.y - second.y);
		if (distance > 0 && pinch.distance > 0) zoom(pinch.distance / distance, worldPoint({ clientX: pinch.x, clientY: pinch.y }));
		const scale = svg.getScreenCTM().a;
		view.x -= (x - pinch.x) / scale;
		view.y -= (y - pinch.y) / scale;
		updateView();
		pinch = { x, y, distance };
		return;
	}
	if (pan) {
		view.x = pan.viewX - (event.clientX - pan.x) / pan.scale;
		view.y = pan.viewY - (event.clientY - pan.y) / pan.scale;
		updateView();
		return;
	}
	if (!drag) return;
	const point = worldPoint(event);
	const item = itemById(drag.id);
	item.x = point.x - drag.dx;
	item.y = point.y - drag.dy;
	selectionPanel.hidden = true;
	renderFurniture();
});
svg.addEventListener("pointerup", event => {
	if (event.pointerType === "touch") touches.delete(event.pointerId);
	if (pinch) {
		if (touches.size < 2) pinch = null;
		svg.classList.remove("panning");
		return;
	}
	if (pan) {
		pan = null;
		svg.classList.remove("panning");
		return;
	}
	if (drag) {
		saveItems();
		recordHistory();
		popupPoint = { x: event.clientX, y: event.clientY };
		renderSelection();
	}
	drag = null;
});
svg.addEventListener("pointercancel", event => {
	touches.delete(event.pointerId);
	pinch = null;
	pan = null;
	svg.classList.remove("panning");
	if (drag) { saveItems(); recordHistory(); }
	drag = null;
	renderSelection();
});
svg.addEventListener("dblclick", fitView);
svg.addEventListener("wheel", event => { event.preventDefault(); zoom(event.deltaY > 0 ? 1.12 : .89, worldPoint(event)); }, { passive: false });
document.addEventListener("keydown", event => {
	if (!selectedId || ["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
	const steps = event.shiftKey ? 10 : 1;
	const moves = { ArrowLeft: [-steps * plan.scale, 0], ArrowRight: [steps * plan.scale, 0],
		ArrowUp: [0, -steps * plan.scale], ArrowDown: [0, steps * plan.scale] };
	if (moves[event.key]) {
		event.preventDefault();
		changeSelected(item => { item.x += moves[event.key][0]; item.y += moves[event.key][1]; });
	} else if (["[", "q", "Q"].includes(event.key)) {
		changeSelected(item => { item.angle = (item.angle + 345) % 360; });
	} else if (["]", "e", "E"].includes(event.key)) {
		changeSelected(item => { item.angle = (item.angle + 15) % 360; });
	} else if (event.key === "Delete" || event.key === "Backspace") {
		items = items.filter(item => item.id !== selectedId);
		selectedId = null;
		popupPoint = null;
		saveItems();
		recordHistory();
		renderAll();
	} else if (event.key === "Escape") {
		selectedId = null;
		popupPoint = null;
		renderAll();
	}
});

selectPlan();
initOnline();
} else {
	const name = `${view}.md`;
	const preview = document.querySelector("#document-preview");
	const editor = document.querySelector("#document-editor");
	const highlight = document.querySelector("#document-highlight");
	const source = document.querySelector("#document-source");
	const state = document.querySelector("#document-state");
	const status = document.querySelector("#document-status");
	const login = document.querySelector("#document-login");
	const edit = document.querySelector("#document-edit");
	const save = document.querySelector("#document-save");
	const draftKey = `apartment_doc_draft_${view}`;
	let baseText = "";
	let remoteText = null;
	let remoteSha = null;
	let documentOnline = false;
	let saving = false;

	function setDocumentOnline(ready) {
		documentOnline = ready;
		state.textContent = ready ? "online" : "offline";
		state.classList.toggle("online", ready);
		login.textContent = sessionToken ? ready ? "sign out" : "retry" : "sign in";
		save.disabled = !ready || saving;
	}

	function readDraft() {
		try {
			const draft = JSON.parse(localStorage.getItem(draftKey));
			if (typeof draft?.base === "string" && typeof draft.text === "string") return draft;
		} catch (_) { /* local storage may be unavailable */ }
		return null;
	}

	function storeDraft() {
		try {
			if (source.value === baseText) localStorage.removeItem(draftKey);
			else localStorage.setItem(draftKey, JSON.stringify({ base: baseText, text: source.value }));
		} catch (_) { status.textContent = "local draft storage unavailable"; }
	}

	function paintSource() {
		highlight.innerHTML = highlightMarkdown(source.value);
		highlight.scrollTop = source.scrollTop;
		highlight.scrollLeft = source.scrollLeft;
	}

	function showEditor(editing) {
		preview.hidden = editing;
		editor.hidden = !editing;
		save.hidden = !editing;
		edit.textContent = editing ? "preview" : "edit text";
		if (editing) paintSource();
		else preview.innerHTML = renderMarkdown(source.value);
	}

	async function documentRequest(method, body = null) {
		const response = await fetch(`${syncApi}/api/document?name=${view}`, { method, cache: "no-store", headers: {
			Authorization: `Bearer ${sessionToken}`, ...(body ? { "Content-Type": "application/json" } : {}),
		}, ...(body ? { body: JSON.stringify(body) } : {}) });
		const result = await response.json();
		if (!response.ok) {
			const error = new Error(result.error || "online document unavailable");
			error.status = response.status;
			error.result = result;
			throw error;
		}
		return result;
	}

	async function refreshDocument() {
		if (!sessionToken) return;
		status.textContent = "checking online document";
		try {
			const remote = await documentRequest("GET");
			remoteText = remote.text;
			remoteSha = remote.sha;
			const draft = readDraft();
			if (draft && draft.text !== remote.text) {
				baseText = draft.base;
				source.value = draft.text;
				showEditor(true);
				status.textContent = "local draft";
			} else {
				baseText = remote.text;
				source.value = remote.text;
				storeDraft();
				if (preview.hidden) showEditor(false);
				else preview.innerHTML = renderMarkdown(remote.text);
				status.textContent = "";
			}
			setDocumentOnline(true);
		} catch (error) {
			if (error.status === 401) clearSession();
			setDocumentOnline(false);
			status.textContent = error.status === 401 ? "sign in again" : "online unavailable";
		}
	}

	async function saveDocument() {
		if (!documentOnline || saving) return;
		if (baseText !== remoteText && source.value !== remoteText) {
			if (!window.confirm("the online document changed since this draft began. replace the online version with your draft?")) return;
			baseText = remoteText;
			storeDraft();
		}
		saving = true;
		save.disabled = true;
		status.textContent = "saving online";
		try {
			const snapshot = source.value;
			const result = await documentRequest("POST", { text: snapshot, base_sha: remoteSha });
			remoteText = result.text;
			remoteSha = result.sha;
			baseText = result.text;
			storeDraft();
			status.textContent = source.value === snapshot ? "saved online" : "local draft";
		} catch (error) {
			if (error.status === 401) {
				clearSession();
				setDocumentOnline(false);
				status.textContent = "sign in again";
			} else if (error.status === 409) {
				if (error.result.sha) {
					remoteText = error.result.text;
					remoteSha = error.result.sha;
				} else await refreshDocument();
				status.textContent = "online changed, review and save again";
			} else {
				setDocumentOnline(false);
				status.textContent = "online save failed";
			}
		} finally {
			saving = false;
			save.disabled = !documentOnline;
		}
	}

	try {
		const response = await fetch(`/files/apt/markdown/${name}`, { cache: "no-store" });
		if (!response.ok) throw new Error(`http ${response.status}`);
		baseText = await response.text();
		const draft = readDraft();
		if (draft && draft.text !== draft.base) {
			baseText = draft.base;
			source.value = draft.text;
			showEditor(true);
			status.textContent = "local draft";
		} else source.value = baseText;
		preview.innerHTML = renderMarkdown(source.value);
	} catch (_) {
		preview.textContent = `could not load ${name}`;
	}
	paintSource();
	setDocumentOnline(false);
	if (sessionToken) void refreshDocument();
	login.addEventListener("click", () => {
		if (sessionToken) {
			if (!documentOnline) return void refreshDocument();
			clearSession();
			setDocumentOnline(false);
			status.textContent = "";
		} else if (!beginLogin()) status.textContent = "browser session storage is required for login";
	});
	edit.addEventListener("click", () => { showEditor(editor.hidden); if (!editor.hidden) source.focus(); });
	source.addEventListener("input", () => { paintSource(); storeDraft(); status.textContent = "local draft"; });
	source.addEventListener("scroll", () => { highlight.scrollTop = source.scrollTop; highlight.scrollLeft = source.scrollLeft; });
	source.addEventListener("keydown", event => {
		if (event.key !== "Tab" || event.shiftKey) return;
		event.preventDefault();
		source.setRangeText("\t", source.selectionStart, source.selectionEnd, "end");
		source.dispatchEvent(new Event("input"));
	});
	save.addEventListener("click", () => { void saveDocument(); });
	window.addEventListener("offline", () => { if (sessionToken) setDocumentOnline(false); });
	window.addEventListener("online", () => { if (sessionToken && !documentOnline) void refreshDocument(); });
}
</script>
