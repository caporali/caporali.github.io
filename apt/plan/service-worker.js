"use strict";

const cacheName = "fs-apartment-v13";
const files = ["./", "index.html", "document.html", "app.js", "document.js", "markdown.js", "style.css",
	"data.js", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png",
	"fonts/cmunrm.ttf", "fonts/cmunbx.ttf", "fonts/cmuntt.ttf", "fonts/cmuntb.ttf",
	"../markdown/furniture.md", "../markdown/visit.md"];

self.addEventListener("install", event => {
	event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(files)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
	event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("fs-apartment-") && key !== cacheName).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
	if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
	event.respondWith(fetch(event.request).then(response => {
		if (response.ok) event.waitUntil(caches.open(cacheName).then(cache => cache.put(event.request, response.clone())));
		return response;
	}).catch(() => caches.match(event.request)));
});
