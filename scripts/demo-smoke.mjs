// Headless demo smoke: play the entire self-driving demo under ?demoTurbo
// (paced holds and reveal intervals shrink; tick counts and the end state are
// identical) and assert what the recording would show: the canonical CS220
// proposal ends approved, a prediction is recorded, the drill reached the
// final hop with P = 0.43, and there are no page errors.
//
// Run `npm run build` first, then `npm run smoke`.

import { existsSync } from "node:fs";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import puppeteer from "puppeteer-core";

const PORT = 4198;
const ROOT = "dist";
const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".xlsx": "application/octet-stream",
  ".csv": "text/csv",
  ".pdf": "application/pdf",
  ".pptx": "application/octet-stream",
};

const server = createServer(async (req, res) => {
  try {
    const url = (req.url ?? "/").split("?")[0];
    const path = join(ROOT, url === "/" ? "index.html" : url);
    const body = await readFile(existsSync(path) ? path : join(ROOT, "index.html"));
    res.writeHead(200, { "content-type": MIME[extname(path)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((r) => server.listen(PORT, r));

const CHROME_PATHS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const executablePath = CHROME_PATHS.find((p) => existsSync(p));
if (!executablePath) {
  console.error("No Chrome/Edge found.");
  process.exit(1);
}

const browser = await puppeteer.launch({ executablePath, headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));

let failed = 0;
const check = (name, ok, detail = "") => {
  if (ok) console.log(`PASS  ${name}`);
  else {
    failed += 1;
    console.error(`FAIL  ${name}  ${detail}`);
  }
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  await page.goto(`http://localhost:${PORT}/?demoTurbo`, { waitUntil: "networkidle0" });
  await page.waitForSelector('[data-demo-id="play-demo"]', { timeout: 8000 });
  await page.click('[data-demo-id="play-demo"]');

  // Poll the store until the canonical proposal is approved or we time out.
  const t0 = Date.now();
  let end = null;
  let sawDrillFinal = false;
  while (Date.now() - t0 < 300000) {
    const snap = await page.evaluate(() => {
      const s = window.__lyceum?.getState();
      if (!s) return null;
      const p = s.proposals.find((x) => x.id === "CP-CS220-001");
      return {
        status: p?.status ?? "none",
        drillStep: s.drillStep,
        p: p?.acceptanceResult?.drillRoot?.p ?? null,
        predictions: s.predictions.filter((x) => x.proposalId === "CP-CS220-001").length,
        uploads: s.resultUploads.length,
      };
    });
    if (snap) {
      if (snap.drillStep >= 5) sawDrillFinal = true;
      if (snap.status === "approved" && snap.predictions > 0) {
        end = snap;
        break;
      }
    }
    await sleep(500);
  }

  check("demo reaches approval with a prediction recorded", Boolean(end));
  if (end) {
    check("drill reached the final hop", sawDrillFinal);
    check(
      "drill P is the canonical 0.43",
      end.p !== null && Math.abs(end.p - 0.4256) < 0.005,
      String(end.p),
    );
    check("the sample results upload filed during the demo", end.uploads >= 2, String(end.uploads));
  }

  // Let the closing beats play out, then confirm no errors surfaced.
  await sleep(8000);
  check("no page errors during the demo", errors.length === 0, errors.slice(0, 3).join(" | "));
} finally {
  await browser.close();
  server.close();
}

console.log(failed === 0 ? "\nDEMO SMOKE OK" : `\n${failed} checks failed`);
process.exit(failed === 0 ? 0 : 1);
