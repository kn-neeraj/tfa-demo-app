#!/usr/bin/env node
// Rewrites mock-prod-logs.json with timestamps anchored to "right now".
// Run before each demo rehearsal so the agent's time-window filter has fresh entries.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(__dirname, "..", "mock-prod-logs.json");

const now = Date.now();
const offset = (sec) => new Date(now + sec * 1000).toISOString();

const entries = [
  { dt:    0, level: "info",  path: "/",         message: "GET / 200" },
  { dt:    2, level: "info",  path: "/products", message: "GET /products 200" },
  { dt:    6, level: "info",  path: "/cart",     message: "GET /cart 200" },
  { dt:   51, level: "warn",  path: "/login",    message: "[auth] login() resolved true but UserContext state did not transition; downstream auth-gated routes may render as anonymous" },
  { dt:   55, level: "error", path: "/products", message: "ProductCard: tried to render premium item add-to-cart-9 with user=null (post-login)" },
  { dt:   79, level: "info",  path: "/products", message: "GET /products 200" },
  { dt:  150, level: "warn",  path: "/checkout", message: "[checkout] computed total differs from naive sum by 0.02 (Math.floor cents reducer)" },
  { dt:  153, level: "info",  path: "/checkout", message: "GET /checkout 200" },
];

const data = entries.map(({ dt, level, path: p, message }) => ({
  timestamp: offset(dt),
  level,
  path: p,
  statusCode: 200,
  message,
}));

fs.writeFileSync(out, JSON.stringify(data, null, 2) + "\n");
console.log(`Wrote ${data.length} entries to ${out}`);
