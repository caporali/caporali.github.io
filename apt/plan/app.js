"use strict";

const data = window.APARTMENT_DATA;
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
	return structuredClone(data.plans[key].items);
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
		document.querySelector("#save-status").textContent = "use save to download this layout";
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
		version: 1,
		updated_at: new Date().toISOString(),
		layouts: Object.fromEntries(keys.map(key => [key, key === planKey ? items : loadItems(key)])),
		info: Object.fromEntries(keys.map(key => [key, window.APARTMENT_INFO.read(key)])),
		shapes: data.shapes,
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
window.APARTMENT_PLANNER = {
	currentPlan: () => planKey,
};
if ("serviceWorker" in navigator && location.protocol !== "file:") navigator.serviceWorker.register("service-worker.js");
