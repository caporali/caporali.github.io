"use strict";


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

window.APARTMENT_MARKDOWN = { render: renderMarkdown };

if (window.APARTMENT_PLANNER) {
	const editor = document.querySelector("#info-editor");
	const status = document.querySelector("#info-status");
	const infoKey = key => `apartment_info_v1_${key}`;
	const infoText = key => {
		const saved = localStorage.getItem(infoKey(key));
		if (saved !== null) return saved;
		return window.APARTMENT_DATA.info[key] || "";
	};
	window.APARTMENT_INFO = { read: infoText };
	const resizeInfo = () => {
		editor.style.height = "auto";
		editor.style.height = `${editor.scrollHeight}px`;
	};
	const renderInfo = () => {
		const key = window.APARTMENT_PLANNER.currentPlan();
		document.querySelector("#info-title").textContent = key;
		editor.value = infoText(key);
		resizeInfo();
	};
	editor.addEventListener("input", () => {
		resizeInfo();
		const key = window.APARTMENT_PLANNER.currentPlan();
		try { localStorage.setItem(infoKey(key), editor.value); status.textContent = "saved locally"; }
		catch (_) { status.textContent = "local saving unavailable"; }
	});
	window.addEventListener("apartment-plan-changed", renderInfo);
	window.addEventListener("storage", event => {
		if (event.key === infoKey(window.APARTMENT_PLANNER.currentPlan())) renderInfo();
	});
	window.addEventListener("focus", renderInfo);
	window.addEventListener("resize", resizeInfo);
	renderInfo();
}
