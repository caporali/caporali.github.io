---
layout: null
title: "apartments"
permalink: /apt.html
---
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="theme-color" content="#f5f4f0">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<title>apartments</title>
	<link rel="apple-touch-icon" href="/files/images/apt_icon.png">
<style>
@font-face { font-family: "CMU Serif"; src: url("/_fonts/cmu/cmunrm.ttf") format("truetype"); font-weight: 400; font-display: swap; }
@font-face { font-family: "CMU Serif"; src: url("/_fonts/cmu/cmunbx.ttf") format("truetype"); font-weight: 700; font-display: swap; }
@font-face { font-family: "CMU Typewriter"; src: url("/_fonts/cmu/cmuntt.ttf") format("truetype"); font-weight: 400; font-display: swap; }
@font-face { font-family: "CMU Typewriter"; src: url("/_fonts/cmu/cmuntb.ttf") format("truetype"); font-weight: 700; font-display: swap; }
:root { color-scheme: light; font-family: "CMU Serif", serif; color: #26383d; background: #f5f4f0; }
* { box-sizing: border-box; }
body { margin: 0; }
button, select, input, textarea { font: inherit; }
button { cursor: pointer; border: 1px solid #d7dfde; background: #fff; color: #35484d; border-radius: 7px; padding: 8px 13px; }
button:hover { background: #f1f6f4; border-color: #a9bfba; }
button:disabled { cursor: not-allowed; opacity: .4; }
button.primary { background: #2c625b; color: #fff; border-color: #2c625b; }
button.primary:hover { background: #214d48; }
.topbar { min-height: 46px; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 4px 16px; background: #fff; border-bottom: 1px solid #e1e5e1; }
.site-home { color: #35484d; font-family: "CMU Typewriter", monospace; font-size: 14px; text-decoration: none; white-space: nowrap; }
.site-home:hover { text-decoration: underline; }
.brand { font-family: "CMU Typewriter", monospace; font-size: 16px; font-weight: 700; letter-spacing: -.03em; white-space: nowrap; }
.download-button { display: grid; place-items: center; width: 36px; height: 36px; padding: 7px; }
.download-button svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.top-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.top-actions a { color: #35484d; text-decoration: none; padding: 5px 10px; border: 1px solid transparent; border-radius: 7px; }
.top-actions a:hover, .top-actions a[aria-current="page"] { background: #eaf1ee; color: #24564f; }
.app-shell { display: grid; grid-template-columns: 245px minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr) auto; height: calc(100dvh - 46px); }
.catalogue-panel { grid-column: 1; grid-row: 2; min-width: 0; min-height: 0; margin: 0 0 0 18px; overflow: auto; background: #fff; border: 1px solid #e1e7e3; border-radius: 10px; }
.catalogue-panel h1 { margin: 0; padding: 21px 19px 15px; font-size: 14px; }
.catalogue-list { padding: 0 12px 18px; }
.catalogue-row { display: grid; grid-template-columns: 28px 1fr 28px; gap: 9px; align-items: center; padding: 10px 6px; border-top: 1px solid #eff1ee; }
.swatch { width: 25px; height: 25px; border: 1px solid #4b6367; border-radius: 4px; }
.swatch.sofa { clip-path: polygon(0 0,100% 0,100% 100%,50% 100%,50% 60%,0 60%); }
.swatch.sofa.left { clip-path: polygon(0 0,100% 0,100% 60%,50% 60%,50% 100%,0 100%); }
.swatch.sofa.straight { clip-path: none; }
.swatch.desk_chair { border-radius: 50%; }
.swatch.dining_table { border-radius: 8px; }
.swatch.dining_table.round { border-radius: 50%; }
.catalogue-title { font-family: "CMU Typewriter", monospace; font-size: 12px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.catalogue-sub { color: #809093; font-size: 10px; margin-top: 3px; }
.add-button { display: grid; place-items: center; padding: 0; width: 27px; height: 27px; font-size: 18px; line-height: 1; }
.stage-panel { display: contents; }
.stage-heading { grid-column: 1; grid-row: 1; display: flex; flex-direction: column; gap: 4px; align-items: stretch; padding: 17px 18px 12px; min-height: 52px; }
#plan-select { width: 100%; min-width: 0; padding: 8px 12px; border: 1px solid #cbdad4; border-radius: 8px; background: #fff; color: #26383d; font-family: "CMU Typewriter", monospace; font-size: 14px; font-weight: 700; box-shadow: 0 1px 3px rgba(33,57,53,.06); }
#plan-summary { color: #859295; font-size: 11px; }
.stage { grid-column: 2; grid-row: 1 / 3; min-height: 0; margin: 18px 18px 0; border: 1px solid #e1e7e3; border-radius: 10px; background: #fff; overflow: hidden; }
#plan-svg { width: 100%; height: 100%; display: block; touch-action: none; user-select: none; -webkit-user-select: none; }
#plan-svg.panning, #plan-svg.panning .furniture { cursor: grabbing; }
.stage-footer { grid-column: 2; grid-row: 3; display: flex; justify-content: space-between; gap: 15px; padding: 10px 22px 15px; color: #849194; font-size: 10px; }
#save-status { white-space: nowrap; }
.selection { position: fixed; z-index: 10; width: 218px; padding: 13px; background: #fff; border: 1px solid #dce5e0; border-radius: 10px; box-shadow: 0 10px 30px rgba(33,57,53,.18); }
.selection[hidden] { display: none; }
.selected-name { font-family: "CMU Typewriter", monospace; font-size: 13px; font-weight: 700; }
.selected-size { color: #718186; font-size: 11px; margin: 4px 0 13px; }
.drawer-note { color: #9b6949; font-size: 11px; margin: -5px 0 10px; }
.variant-row { display: flex; align-items: center; gap: 7px; margin-bottom: 11px; color: #65777a; font-size: 11px; }
.variant-row select { flex: 1; min-width: 0; padding: 5px 6px; border: 1px solid #d7dfde; border-radius: 6px; background: #fff; color: #26383d; font-family: "CMU Typewriter", monospace; }
.angle-row { display: flex; align-items: center; gap: 7px; color: #65777a; font-size: 11px; }
.angle-row input { width: 66px; padding: 5px 6px; border: 1px solid #d7dfde; border-radius: 6px; }
.selection-actions { display: flex; gap: 5px; margin-top: 11px; }
.selection-actions button { flex: 1; padding: 6px; font-size: 11px; }
.remove-button { color: #9a5043; border-color: #ead3cd; }
.architecture { fill: #465358; fill-rule: evenodd; pointer-events: none; }
#labels-layer { pointer-events: none; }
.room-label { fill: #9ca8aa; font-weight: 700; text-anchor: middle; pointer-events: none; user-select: none; letter-spacing: .03em; }
.furniture { cursor: grab; }
.furniture:active { cursor: grabbing; }
.furniture .body { stroke: #3e5558; stroke-width: 1.5; vector-effect: non-scaling-stroke; }
.furniture.selected .body { stroke: #194e49; stroke-width: 2.8; }
.furniture text { pointer-events: none; font-family: "CMU Typewriter", monospace; font-size: 10px; fill: #233c40; font-weight: 700; text-anchor: middle; dominant-baseline: central; user-select: none; }
.furniture .selection-ring { fill: none; stroke: #2a7c6c; stroke-width: 1.3; stroke-dasharray: 6 4; pointer-events: none; }
.drawer-clearance { pointer-events: none; }
.drawer-clearance rect { fill: rgba(213, 149, 96, .18); stroke: #bb7951; stroke-width: 1.5; stroke-dasharray: 5 4; vector-effect: non-scaling-stroke; }
.document-page { min-height: calc(100dvh - 46px); background: #fff; }
.markdown { max-width: 1100px; margin: 0 auto; padding: 32px; font-size: 13px; line-height: 1.55; }
.markdown h1, .markdown h2, .markdown h3 { line-height: 1.25; margin: 1.2em 0 .55em; }
.markdown h1:first-child { margin-top: 0; }
.markdown h1 { font-size: 22px; }.markdown h2 { font-size: 17px; }.markdown h3 { font-size: 14px; }
.markdown p, .markdown ul { margin: 0 0 1em; }.markdown ul { padding-left: 22px; }
.markdown code { font-family: "CMU Typewriter", monospace; background: #f0f3f1; padding: 1px 4px; border-radius: 3px; }
.markdown a { color: #256b61; overflow-wrap: anywhere; }
.md-table { display: table; width: 100%; border-collapse: collapse; margin: 0 0 18px; }
.md-row { display: table-row; }.md-row span { display: table-cell; padding: 8px 10px; border-bottom: 1px solid #e4eae6; vertical-align: top; }
.furniture-table { table-layout: fixed; }.furniture-table .md-row span:nth-child(1) { width: 16%; }
.furniture-table .md-row span:nth-child(2) { width: 6%; }.furniture-table .md-row span:nth-child(3) { width: 22%; white-space: nowrap; }
.furniture-table .md-row span:nth-child(4) { width: 11%; }.furniture-table .md-row span:nth-child(5) { width: 45%; overflow-wrap: break-word; }
.md-header span { font-weight: 700; border-bottom-color: #bfcfca; }
.info-panel { margin: 18px 18px 28px; padding: 18px 22px; background: #fff; border: 1px solid #e1e7e3; border-radius: 10px; }
.info-panel label { display: block; font-family: "CMU Typewriter", monospace; font-size: 15px; font-weight: 700; }.info-panel #info-status { color: #718186; font-size: 11px; }
.info-panel textarea { display: block; width: 100%; min-height: 120px; margin: 8px 0; padding: 12px; resize: none; overflow: hidden; border: 1px solid #d7dfde; border-radius: 7px; font: 14px/1.5 "CMU Serif", serif; }
@media (max-width: 700px) {
	.topbar { flex-wrap: wrap; gap: 4px 8px; padding: max(4px, env(safe-area-inset-top)) 12px 4px; }
	.brand { flex: 1; }.top-actions { width: 100%; gap: 5px; margin: 0; }
	.top-actions a { flex: 1; min-height: 30px; padding: 5px; text-align: center; }
	.app-shell { display: flex; flex-direction: column; height: auto; min-height: 0; }
	.stage-panel { order: 1; display: flex; flex-direction: column; }.stage { height: 54dvh; min-height: 310px; margin: 0 8px; }
	.stage-heading { flex-direction: row; justify-content: space-between; align-items: baseline; gap: 15px; padding: 10px 13px; min-height: 40px; }#plan-select { width: min(100%, 290px); }
	.catalogue-panel { order: 2; height: auto; margin: 0 8px 16px; }
	.catalogue-list { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); }
	.catalogue-row { grid-template-columns: 24px minmax(0,1fr) 28px; gap: 5px; }
	.stage-footer { padding: 8px 12px; font-size: 9px; }
	.selection { max-width: calc(100vw - 16px); }
	.markdown { padding: 16px; }
	.document-page .markdown { overflow-x: auto; }.furniture-table { min-width: 700px; }
	.md-table { font-size: 11px; }.md-row span { padding: 6px; }
	.info-panel { margin: 0 8px 16px; padding: 15px; }
}
#plan-view[hidden], #document-view[hidden], #export-data[hidden] { display: none; }
</style>
</head>
<body>
	<header class="topbar">
		<a class="site-home" href="/">\caporali</a><div class="brand">apartments</div><button id="export-data" class="download-button" aria-label="download data.json" title="download all layouts and notes as data.json"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M4 18v3h16v-3"/></svg></button>
		<nav class="top-actions" aria-label="views"><a href="/apt.html?view=furniture" data-view="furniture">furniture</a><a href="/apt.html?view=visit" data-view="visit">visit</a><a href="/apt.html?view=plan" data-view="plan">plan</a></nav>
	</header>
<div id="plan-view" hidden>
	<main class="app-shell">
		<aside class="catalogue-panel">
			<h1>furniture</h1>
			<div id="catalogue" class="catalogue-list"></div>
		</aside>
		<section class="stage-panel">
			<div class="stage-heading"><select id="plan-select" aria-label="floor plan"></select><span id="plan-summary"></span></div>
			<div class="stage"><svg id="plan-svg" role="img" aria-label="interactive apartment plan"></svg></div>
			<div class="stage-footer"><span>drag furniture · drag empty space to pan on touch · pinch to zoom · ctrl-drag to pan on desktop</span><span id="save-status">saved locally</span></div>
		</section>
	</main>
	<section class="info-panel" aria-label="apartment notes"><label id="info-title" for="info-editor"></label><textarea id="info-editor" spellcheck="true"></textarea><span id="info-status">saved locally</span></section>
	<div id="selection" class="selection" role="dialog" aria-label="selected furniture" hidden></div>
</div>
<main id="document-view" class="document-page" hidden><article id="document-preview" class="markdown"></article></main>
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
			const kind = line.startsWith("| item | n. | shape") ? " furniture-table" : "";
			output.push(`<div class="md-table${kind}"><div class="md-row md-header">${cells(lines[i]).join("")}</div>`);
			i += 2;
			while (i < lines.length && lines[i].trim().startsWith("|")) output.push(`<div class="md-row">${cells(lines[i++]).join("")}</div>`);
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

const requestedView = new URLSearchParams(location.search).get("view");
const view = ["furniture", "visit"].includes(requestedView) ? requestedView : "plan";
document.querySelector("#plan-view").hidden = view !== "plan";
document.querySelector("#document-view").hidden = view === "plan";
document.querySelector("#export-data").hidden = view !== "plan";
document.querySelectorAll(".top-actions a").forEach(link => {
	if (link.dataset.view === view) link.setAttribute("aria-current", "page");
});
if (view === "plan") {
const response = await fetch("/files/apt/data.json", { cache: "no-store" });
if (!response.ok) throw new Error(`could not load data.json: ${response.status}`);
const source = await response.text();
const data = JSON.parse(source);
let revision = 2166136261;
for (let i = 0; i < source.length; i++) revision = Math.imul(revision ^ source.charCodeAt(i), 16777619);
const revisionKey = "apartment_data_revision";
try {
	const saved = localStorage.getItem(revisionKey);
	if (saved !== String(revision)) {
		for (const key of Object.keys(data.plans)) {
			localStorage.removeItem(`apartment_planner_v1_${key}`);
			localStorage.removeItem(`apartment_info_v1_${key}`);
		}
	}
	localStorage.setItem(revisionKey, String(revision));
} catch (_) { /* local storage may be unavailable */ }
const catalogue = Object.fromEntries(data.catalogue.map(item => [item.name, item]));
const colors = {
	bed: "#a7c8d0", nightstand: "#a7c8d0", desk: "#b9d1ae",
	desk_chair: "#b9d1ae", sofa: "#e9c2a8", sofa_stool: "#e9c2a8",
	tv_unit: "#ddcbb0", sideboard: "#ddcbb0", bench: "#ddcbb0",
	coffee_table: "#ddcbb0", dining_table: "#ddcbb0",
};
const svg = document.querySelector("#plan-svg");
const planSelect = document.querySelector("#plan-select");
const cataloguePanel = document.querySelector("#catalogue");
const selectionPanel = document.querySelector("#selection");
let planKey = new URLSearchParams(location.search).get("plan") || "vantage_33-3810";
if (!data.plans[planKey]) planKey = "vantage_33-3810";
let plan;
let items = [];
let selectedId = null;
let drag = null;
let pan = null;
const touches = new Map();
let pinch = null;
let view;
let popupPoint = null;

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
		if (Array.isArray(saved) && saved.every(validItem)) return saved;
	} catch (_) { /* local storage may be unavailable */ }
	return initialItems(key);
}

function validItem(item) {
	return item && typeof item.id === "string" && catalogue[item.type]
		&& Number.isFinite(item.x) && Number.isFinite(item.y) && Number.isFinite(item.angle)
		&& (item.variant === undefined || catalogue[item.type].variants?.some(variant => variant.name === item.variant));
}

function itemSize(item) {
	const size = catalogue[item.type];
	return size.variants ? { ...size, ...size.variants.find(variant => variant.name === (item.variant || size.variants[0].name)) } : size;
}

function saveItems() {
	try {
		localStorage.setItem(storageKey(planKey), JSON.stringify(items));
		document.querySelector("#save-status").textContent = "saved locally";
	} catch (_) {
		document.querySelector("#save-status").textContent = "local saving unavailable, download data.json";
	}
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

function selectPlan(key) {
	planKey = key;
	plan = data.plans[key];
	items = loadItems(key);
	selectedId = null;
	popupPoint = null;
	planSelect.value = key;
	document.querySelector("#plan-summary").textContent = plan.area;
	fitView();
	renderStatic();
	renderAll();
	window.dispatchEvent(new CustomEvent("apartment-plan-changed", { detail: key }));
}

function renderStatic() {
	const labelSize = Math.max(11, Math.min(17, plan.width / 48));
	const labelMarkup = plan.labels.map(([x, y, label]) => `<text class="room-label" x="${x}" y="${y}" style="font-size:${labelSize}px">${label}</text>`).join("");
	svg.innerHTML = `<rect x="0" y="0" width="${plan.width}" height="${plan.height}" fill="#fff"/>`
		+ `<path class="architecture" d="${plan.architecture}"/>`
		+ `<g id="labels-layer">${labelMarkup}</g>`
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
	const width = (item.type === "desk_chair" ? Math.max(size.width, size.depth) : size.width) * plan.scale;
	const depth = (item.type === "desk_chair" ? Math.max(size.width, size.depth) : size.depth) * plan.scale;
	const fill = colors[item.type];
	let shape;
	if (item.type === "sofa") {
		shape = `<path class="body" fill="${fill}" d="${roomPath(localShape(item))}"/>`;
	} else if (item.type === "desk_chair" || (item.type === "dining_table" && item.variant === "round")) {
		shape = `<ellipse class="body" fill="${fill}" cx="0" cy="0" rx="${width / 2}" ry="${depth / 2}"/>`;
	} else {
		const radius = item.type === "dining_table" ? Math.min(width, depth) * .13 : 1;
		shape = `<rect class="body" fill="${fill}" x="${-width / 2}" y="${-depth / 2}" width="${width}" height="${depth}" rx="${radius}"/>`;
	}
	const fontSize = Math.min(10, Math.min(width, depth) * .9 / (item.type.length * .6));
	const label = fontSize < 6 ? "" : `<text x="0" y="0" style="font-size:${fontSize}px">${item.type}</text>`;
	const ring = selectedId !== item.id ? "" : item.type === "desk_chair" || item.type === "dining_table" && item.variant === "round"
		? `<ellipse class="selection-ring" cx="0" cy="0" rx="${width / 2 + 5}" ry="${depth / 2 + 5}"/>`
		: `<rect class="selection-ring" x="${-width / 2 - 5}" y="${-depth / 2 - 5}" width="${width + 10}" height="${depth + 10}" rx="4"/>`;
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
	const tableRound = items.find(piece => piece.type === "dining_table")?.variant === "round";
	cataloguePanel.innerHTML = data.catalogue.map(item => {
		const swatch = item.name === "sofa" ? sofaVariant === "straight" ? "straight" : sofaVariant === "left_chaise" ? "left" : ""
			: item.name === "dining_table" && tableRound ? "round" : "";
		const detail = item.variants ? item.name === "sofa" ? "3 shapes" : "2 sizes" : `${item.width} × ${item.depth} cm`;
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
	const dimensions = item.type === "dining_table" && item.variant === "round" ? `Ø ${size.width} cm` : `${size.width} × ${size.depth} cm`;
	const options = catalogue[item.type].variants?.map(variant => {
		const label = item.type === "sofa" ? variant.name
			: variant.name === "round" ? `Ø ${variant.width} cm` : `${variant.width} × ${variant.depth} cm`;
		return `<option value="${variant.name}" ${(item.variant || catalogue[item.type].variants[0].name) === variant.name ? "selected" : ""}>${label}</option>`;
	}).join("");
	const variants = options ? `<div class="variant-row"><label for="variant-input">${item.type === "sofa" ? "shape" : "size"}</label><select id="variant-input">${options}</select></div>` : "";
	selectionPanel.innerHTML = `<div class="selected-name">${item.type}</div><div class="selected-size">${dimensions} · height ${size.height} cm</div>`
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
}

function exportData() {
	const keys = Object.keys(data.plans);
	const payload = {
		...data,
		updated_at: new Date().toISOString(),
		layouts: Object.fromEntries(keys.map(key => [key, key === planKey ? items : loadItems(key)])),
		info: Object.fromEntries(keys.map(key => [key, infoText(key)])),
	};
	const link = document.createElement("a");
	link.href = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2) + "\n"], { type: "application/json" }));
	link.download = "data.json";
	link.click();
	setTimeout(() => URL.revokeObjectURL(link.href), 1000);
	return payload;
}

function addItem(type) {
	const size = catalogue[type];
	if (items.filter(item => item.type === type).length >= size.count) return;
	const [x, y] = plan.spawn;
	const id = `${type}_${crypto.randomUUID()}`;
	items.push({ id, type, x, y, angle: 0 });
	selectedId = id;
	popupPoint = null;
	saveItems();
	renderAll();
}

function changeSelected(mutator) {
	const item = itemById(selectedId);
	if (!item) return;
	mutator(item);
	saveItems();
	renderAll();
}

planSelect.innerHTML = Object.keys(data.plans).sort().map(key => `<option value="${key}">${key}</option>`).join("");
planSelect.addEventListener("change", () => selectPlan(planSelect.value));
document.querySelector("#export-data").addEventListener("click", exportData);
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
		renderAll();
	}
});
selectionPanel.addEventListener("change", event => {
	if (event.target.id === "variant-input") {
		changeSelected(item => { item.variant = event.target.value; });
	}
	if (event.target.id === "angle-input") {
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
			if (drag) saveItems();
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
	if (drag) saveItems();
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
		renderAll();
	} else if (event.key === "Escape") {
		selectedId = null;
		popupPoint = null;
		renderAll();
	}
});

selectPlan(planKey);
	const editor = document.querySelector("#info-editor");
	const status = document.querySelector("#info-status");
	const infoKey = key => `apartment_info_v1_${key}`;
	const infoText = key => {
		const saved = localStorage.getItem(infoKey(key));
		if (saved !== null) return saved;
		return data.info[key] || "";
	};
	const resizeInfo = () => {
		editor.style.height = "auto";
		editor.style.height = `${editor.scrollHeight}px`;
	};
	const renderInfo = () => {
		const key = planKey;
		document.querySelector("#info-title").textContent = key;
		editor.value = infoText(key);
		resizeInfo();
	};
	editor.addEventListener("input", () => {
		resizeInfo();
		const key = planKey;
		try { localStorage.setItem(infoKey(key), editor.value); status.textContent = "saved locally"; }
		catch (_) { status.textContent = "local saving unavailable"; }
	});
	window.addEventListener("apartment-plan-changed", renderInfo);
	window.addEventListener("storage", event => {
		if (event.key === infoKey(planKey)) renderInfo();
	});
	window.addEventListener("focus", renderInfo);
	window.addEventListener("resize", resizeInfo);
	renderInfo();
} else {
	const name = `${view}.md`;
	const preview = document.querySelector("#document-preview");
	try {
		const response = await fetch(`/files/apt/markdown/${name}`, { cache: "no-store" });
		if (!response.ok) throw new Error(`http ${response.status}`);
		preview.innerHTML = renderMarkdown(await response.text());
	} catch (_) {
		preview.textContent = `could not load ${name}`;
	}
}
</script>
</body>
</html>
