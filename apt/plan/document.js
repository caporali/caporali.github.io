"use strict";

const name = new URLSearchParams(location.search).get("name") === "visit.md" ? "visit.md" : "furniture.md";
const preview = document.querySelector("#document-preview");

document.title = `${name} · f&s_apartment`;
document.querySelectorAll(".top-actions a").forEach(link => {
	if (link.getAttribute("href") === `document.html?name=${name}`) link.setAttribute("aria-current", "page");
});
async function showDocument() {
	let source = window.APARTMENT_DOCS[name];
	if (location.protocol !== "file:") {
		try {
			const response = await fetch(new URL(`../markdown/${name}`, location.href), { cache: "no-store" });
			if (response.ok) source = await response.text();
		} catch (_) { /* use the offline copy */ }
	}
	preview.innerHTML = window.APARTMENT_MARKDOWN.render(source);
}

showDocument();
