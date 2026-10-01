const settings = {
	SITE_ORIGIN: "https://caporali.github.io",
	API_ORIGIN: "https://api.apt-save.workers.dev",
	GITHUB_OWNER: "caporali",
	GITHUB_REPO: "caporali.github.io",
	GITHUB_BRANCH: "main",
	GITHUB_APP_ID: "5151347",
	GITHUB_CLIENT_ID: "Iv23linrFr8zITQ76oOC",
	GITHUB_INSTALLATION_ID: "166918574",
	GITHUB_USER_ID: "58989888",
};
const planKey = "libertytowers_E1801";
const filePath = "files/apt/data.json";
const documentPaths = { furniture: "files/apt/markdown/furniture.md", info: "files/apt/markdown/info.md" };
const sessionLifetime = 30 * 60;
const apiVersion = "2026-03-10";
const encoder = new TextEncoder();
const decoder = new TextDecoder();

class HttpError extends Error {
	constructor(status, message) {
		super(message);
		this.status = status;
	}
}

function base64(bytes) {
	let value = "";
	for (let i = 0; i < bytes.length; i += 8192) value += String.fromCharCode(...bytes.subarray(i, i + 8192));
	return btoa(value);
}

function unbase64(value) {
	return Uint8Array.from(atob(value.replace(/\s/g, "")), char => char.charCodeAt(0));
}

function base64url(bytes) {
	return base64(bytes).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

function unbase64url(value) {
	return unbase64(value.replaceAll("-", "+").replaceAll("_", "/"));
}

function randomValue(bytes = 32) {
	return base64url(crypto.getRandomValues(new Uint8Array(bytes)));
}

async function digest(value) {
	return base64url(new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value))));
}

async function layoutHash(items) {
	return digest(JSON.stringify(items));
}

function json(value, status = 200, origin = null) {
	const headers = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };
	if (origin) {
		headers["Access-Control-Allow-Origin"] = origin;
		headers.Vary = "Origin";
	}
	return new Response(JSON.stringify(value), { status, headers });
}

function requireConfig(env, names) {
	if (names.some(name => !env[name])) throw new HttpError(503, "online saving is not configured");
}

async function signAuthCookie(value, env) {
	const body = base64url(encoder.encode(JSON.stringify(value)));
	const key = await crypto.subtle.importKey("raw", encoder.encode(env.SESSION_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
	const signature = base64url(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(body))));
	return `${body}.${signature}`;
}

async function authCookie(request, env) {
	const value = request.headers.get("Cookie")?.match(/(?:^|;\s*)apt_oauth=([^;]+)/)?.[1];
	if (!value) throw new HttpError(400, "login session expired");
	try {
		const [body, signature] = value.split(".");
		const key = await crypto.subtle.importKey("raw", encoder.encode(env.SESSION_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
		if (!await crypto.subtle.verify("HMAC", key, unbase64url(signature), encoder.encode(body))) throw new Error("invalid signature");
		return JSON.parse(decoder.decode(unbase64url(body)));
	}
	catch { throw new HttpError(400, "invalid login session"); }
}

function cookieHeader(value, secure) {
	return `apt_oauth=${value}; Path=/auth; HttpOnly; SameSite=Lax; Max-Age=600${secure ? "; Secure" : ""}`;
}

async function signSession(env) {
	const now = Math.floor(Date.now() / 1000);
	const header = base64url(encoder.encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
	const payload = base64url(encoder.encode(JSON.stringify({ sub: String(env.GITHUB_USER_ID), aud: env.SITE_ORIGIN,
		iss: env.API_ORIGIN, iat: now, exp: now + sessionLifetime })));
	const key = await crypto.subtle.importKey("raw", encoder.encode(env.SESSION_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
	const body = `${header}.${payload}`;
	const signature = base64url(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(body))));
	return `${body}.${signature}`;
}

async function verifySession(token, env) {
	try {
		const parts = token.split(".");
		if (parts.length !== 3) return false;
		const header = JSON.parse(decoder.decode(unbase64url(parts[0])));
		const payload = JSON.parse(decoder.decode(unbase64url(parts[1])));
		const now = Math.floor(Date.now() / 1000);
		if (header.alg !== "HS256" || payload.sub !== String(env.GITHUB_USER_ID) || payload.aud !== env.SITE_ORIGIN
			|| payload.iss !== env.API_ORIGIN || !Number.isInteger(payload.iat) || !Number.isInteger(payload.exp)
			|| payload.iat > now + 60 || payload.exp <= now || payload.exp - payload.iat > sessionLifetime) return false;
		const key = await crypto.subtle.importKey("raw", encoder.encode(env.SESSION_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
		return crypto.subtle.verify("HMAC", key, unbase64url(parts[2]), encoder.encode(`${parts[0]}.${parts[1]}`));
	} catch { return false; }
}

async function startAuth(request, env) {
	requireConfig(env, ["SITE_ORIGIN", "API_ORIGIN", "GITHUB_CLIENT_ID", "GITHUB_USER_ID", "SESSION_SECRET"]);
	const url = new URL(request.url);
	const nonce = url.searchParams.get("nonce");
	const view = url.searchParams.get("view") || "plan";
	if (url.searchParams.get("origin") !== env.SITE_ORIGIN || !nonce || !/^[A-Za-z0-9_-]{20,128}$/.test(nonce)
		|| !["plan", "furniture", "info"].includes(view)) throw new HttpError(400, "invalid login request");
	const state = randomValue();
	const verifier = randomValue();
	const cookie = await signAuthCookie({ state, verifier, nonce, view, created: Date.now() }, env);
	const authorize = new URL("https://github.com/login/oauth/authorize");
	authorize.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
	authorize.searchParams.set("redirect_uri", `${env.API_ORIGIN}/auth/callback`);
	authorize.searchParams.set("state", state);
	authorize.searchParams.set("code_challenge", await digest(verifier));
	authorize.searchParams.set("code_challenge_method", "S256");
	return new Response(null, { status: 302, headers: { Location: authorize.href, "Set-Cookie": cookieHeader(cookie, url.protocol === "https:"), "Cache-Control": "no-store" } });
}

async function finishAuth(request, env) {
	requireConfig(env, ["SITE_ORIGIN", "API_ORIGIN", "GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET", "GITHUB_USER_ID", "SESSION_SECRET"]);
	const url = new URL(request.url);
	const saved = await authCookie(request, env);
	if (saved.state !== url.searchParams.get("state") || !Number.isInteger(saved.created)
		|| saved.created > Date.now() + 60000 || Date.now() - saved.created > 600000 || !url.searchParams.get("code")) throw new HttpError(400, "invalid login callback");
	const form = new URLSearchParams({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET,
		code: url.searchParams.get("code"), redirect_uri: `${env.API_ORIGIN}/auth/callback`, code_verifier: saved.verifier });
	const exchange = await fetch("https://github.com/login/oauth/access_token", { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" }, body: form });
	if (!exchange.ok) throw new HttpError(502, "github login failed");
	const credentials = await exchange.json();
	if (!credentials.access_token) throw new HttpError(401, "github login was not authorized");
	const profile = await fetch("https://api.github.com/user", { headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${credentials.access_token}`, "User-Agent": "caporali-apt-save", "X-GitHub-Api-Version": apiVersion } });
	if (!profile.ok) throw new HttpError(502, "could not verify github account");
	const user = await profile.json();
	if (String(user.id) !== String(env.GITHUB_USER_ID)) throw new HttpError(403, "this github account cannot edit the apartment plan");
	const view = ["plan", "furniture", "info"].includes(saved.view) ? saved.view : "plan";
	const destination = new URL(`/apt.html?view=${view}`, env.SITE_ORIGIN);
	destination.hash = new URLSearchParams({ apt_session: await signSession(env), apt_nonce: saved.nonce }).toString();
	return new Response(null, { status: 302, headers: { Location: destination.href, "Set-Cookie": cookieHeader("", url.protocol === "https:").replace("Max-Age=600", "Max-Age=0"), "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
}

async function appToken(env) {
	requireConfig(env, ["GITHUB_APP_ID", "GITHUB_APP_PRIVATE_KEY", "GITHUB_INSTALLATION_ID"]);
	const pem = env.GITHUB_APP_PRIVATE_KEY.replaceAll("\\n", "\n").replace(/-----[^-]+-----|\s/g, "");
	const key = await crypto.subtle.importKey("pkcs8", unbase64(pem), { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
	const now = Math.floor(Date.now() / 1000);
	const header = base64url(encoder.encode(JSON.stringify({ alg: "RS256", typ: "JWT" })));
	const payload = base64url(encoder.encode(JSON.stringify({ iat: now - 60, exp: now + 540, iss: String(env.GITHUB_APP_ID) })));
	const body = `${header}.${payload}`;
	const signature = base64url(new Uint8Array(await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, encoder.encode(body))));
	const response = await fetch(`https://api.github.com/app/installations/${env.GITHUB_INSTALLATION_ID}/access_tokens`, {
		method: "POST", headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${body}.${signature}`, "User-Agent": "caporali-apt-save", "X-GitHub-Api-Version": apiVersion },
		body: JSON.stringify({ repositories: [env.GITHUB_REPO], permissions: { contents: "write" } }),
	});
	if (!response.ok) throw new HttpError(502, "could not authorize github file access");
	return (await response.json()).token;
}

async function githubContent(env, token, path) {
	const url = `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${path}?ref=${encodeURIComponent(env.GITHUB_BRANCH)}`;
	const response = await fetch(url, { headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}`, "User-Agent": "caporali-apt-save", "X-GitHub-Api-Version": apiVersion } });
	if (!response.ok) throw new HttpError(502, "could not read file from github");
	const file = await response.json();
	if (file.encoding !== "base64" || !file.sha) throw new HttpError(502, "unexpected github file response");
	return { sha: file.sha, text: decoder.decode(unbase64(file.content)) };
}

async function githubFile(env, token) {
	const file = await githubContent(env, token, filePath);
	return { sha: file.sha, data: JSON.parse(file.text) };
}

function validateItems(items, data) {
	if (!Array.isArray(items) || items.length > 100) throw new HttpError(400, "invalid layout");
	const catalogue = new Map(data.catalogue.map(item => [item.name, item]));
	const ids = new Set();
	const counts = new Map();
	return items.map(item => {
		const product = catalogue.get(item?.type);
		if (!product || typeof item.id !== "string" || !/^[A-Za-z0-9_-]{1,120}$/.test(item.id) || ids.has(item.id)
			|| ![item.x, item.y, item.angle].every(Number.isFinite) || Math.abs(item.x) > 2000 || Math.abs(item.y) > 2000) throw new HttpError(400, "invalid furniture item");
		if (item.variant !== undefined && !product.variants?.some(variant => variant.name === item.variant)) throw new HttpError(400, "invalid furniture variant");
		ids.add(item.id);
		counts.set(item.type, (counts.get(item.type) || 0) + 1);
		if (counts.get(item.type) > product.count) throw new HttpError(400, "too many furniture items of one type");
		return { id: item.id, type: item.type, x: item.x, y: item.y, angle: item.angle, ...(item.variant === undefined ? {} : { variant: item.variant }) };
	});
}

async function mergeLayout(data, items, baseHash, now = new Date()) {
	if (!data.layouts?.[planKey] || !data.plans?.[planKey]) throw new HttpError(502, "apartment layout is missing");
	const currentHash = await layoutHash(data.layouts[planKey]);
	if (baseHash !== currentHash) return { conflict: true, layout: data.layouts[planKey], hash: currentHash, updated_at: data.updated_at };
	const next = validateItems(items, data);
	if (JSON.stringify(next) === JSON.stringify(data.layouts[planKey])) return { unchanged: true, layout: next, hash: currentHash, updated_at: data.updated_at };
	const updated = { ...data, layouts: { ...data.layouts, [planKey]: next },
		updated_at: now.toLocaleString("sv-SE", { timeZone: "America/New_York" }).replace(" ", "T") + " America/New_York" };
	return { updated, layout: next, hash: await layoutHash(next), updated_at: updated.updated_at };
}

function requestOrigin(request, env) {
	const origin = request.headers.get("Origin");
	if (origin !== env.SITE_ORIGIN) throw new HttpError(403, "origin is not allowed");
	return origin;
}

function preflight(origin) {
	return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": origin,
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Authorization, Content-Type", "Access-Control-Max-Age": "600", Vary: "Origin" } });
}

async function authorizedToken(request, env) {
	requireConfig(env, ["SITE_ORIGIN", "API_ORIGIN", "GITHUB_USER_ID", "SESSION_SECRET", "GITHUB_OWNER", "GITHUB_REPO", "GITHUB_BRANCH"]);
	const bearer = request.headers.get("Authorization")?.match(/^Bearer (.+)$/)?.[1];
	if (!bearer || !await verifySession(bearer, env)) throw new HttpError(401, "sign in again to save online");
	return appToken(env);
}

async function handleLayout(request, env) {
	const origin = requestOrigin(request, env);
	if (request.method === "OPTIONS") return preflight(origin);
	const token = await authorizedToken(request, env);
	const file = await githubFile(env, token);
	const layout = file.data.layouts?.[planKey];
	if (!Array.isArray(layout)) throw new HttpError(502, "apartment layout is missing");
	if (request.method === "GET") return json({ layout, hash: await layoutHash(layout), updated_at: file.data.updated_at }, 200, origin);
	if (request.method !== "POST") throw new HttpError(405, "method not allowed");
	const raw = await request.text();
	if (raw.length > 100000) throw new HttpError(413, "layout is too large");
	let body;
	try { body = JSON.parse(raw); } catch { throw new HttpError(400, "invalid json"); }
	if (typeof body.base_hash !== "string") throw new HttpError(400, "missing layout version");
	const result = await mergeLayout(file.data, body.items, body.base_hash);
	if (result.conflict) return json({ error: "conflict", ...result }, 409, origin);
	if (result.unchanged) return json({ saved: true, ...result }, 200, origin);
	const url = `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${filePath}`;
	const response = await fetch(url, { method: "PUT", headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}`, "User-Agent": "caporali-apt-save",
		"Content-Type": "application/json", "X-GitHub-Api-Version": apiVersion }, body: JSON.stringify({ message: "update apartment furniture layout",
		content: base64(encoder.encode(JSON.stringify(result.updated, null, 2) + "\n")), sha: file.sha, branch: env.GITHUB_BRANCH }) });
	if (response.status === 409 || response.status === 422) return json({ error: "conflict", message: "the file changed during saving" }, 409, origin);
	if (!response.ok) throw new HttpError(502, "github could not save data.json");
	const commit = (await response.json()).commit;
	return json({ saved: true, hash: result.hash, layout: result.layout, updated_at: result.updated_at, commit: commit?.html_url }, 200, origin);
}

async function handleDocument(request, env) {
	const origin = requestOrigin(request, env);
	if (request.method === "OPTIONS") return preflight(origin);
	const name = new URL(request.url).searchParams.get("name");
	if (!Object.hasOwn(documentPaths, name)) throw new HttpError(404, "document not found");
	if (!["GET", "POST"].includes(request.method)) throw new HttpError(405, "method not allowed");
	const path = documentPaths[name];
	const token = await authorizedToken(request, env);
	const file = await githubContent(env, token, path);
	if (request.method === "GET") return json(file, 200, origin);
	const raw = await request.text();
	if (raw.length > 250000) throw new HttpError(413, "document is too large");
	let body;
	try { body = JSON.parse(raw); } catch { throw new HttpError(400, "invalid json"); }
	if (typeof body?.text !== "string" || !body.text.length || body.text.length > 200000 || body.text.includes("\0")
		|| !/^[0-9a-f]{40}$/.test(body.base_sha)) throw new HttpError(400, "invalid document");
	if (body.base_sha !== file.sha) return json({ error: "conflict", ...file }, 409, origin);
	if (body.text === file.text) return json({ saved: true, ...file }, 200, origin);
	const url = `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${path}`;
	const response = await fetch(url, { method: "PUT", headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}`, "User-Agent": "caporali-apt-save",
		"Content-Type": "application/json", "X-GitHub-Api-Version": apiVersion }, body: JSON.stringify({ message: `update apartment ${name}.md`,
		content: base64(encoder.encode(body.text)), sha: file.sha, branch: env.GITHUB_BRANCH }) });
	if (response.status === 409 || response.status === 422) return json({ error: "conflict", message: "the document changed during saving" }, 409, origin);
	if (!response.ok) throw new HttpError(502, "github could not save the document");
	const saved = await response.json();
	return json({ saved: true, text: body.text, sha: saved.content?.sha, commit: saved.commit?.html_url }, 200, origin);
}

export default {
	async fetch(request, bindings) {
		const env = { ...settings, ...bindings };
		try {
			const path = new URL(request.url).pathname;
			if (path === "/health" && request.method === "GET") return json({ ok: true });
			if (path === "/auth/start" && request.method === "GET") return await startAuth(request, env);
			if (path === "/auth/callback" && request.method === "GET") return await finishAuth(request, env);
			if (path === "/api/layout") return await handleLayout(request, env);
			if (path === "/api/document") return await handleDocument(request, env);
			throw new HttpError(404, "not found");
		} catch (error) {
			const origin = request.headers.get("Origin") === env.SITE_ORIGIN ? env.SITE_ORIGIN : null;
			return json({ error: error instanceof HttpError ? error.message : "online saving is unavailable" }, error instanceof HttpError ? error.status : 500, origin);
		}
	},
};
