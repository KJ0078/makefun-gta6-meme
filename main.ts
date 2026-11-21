// gta6-meme-x-01 entry program (Node 22, standard library only).
//
// What this entry is: a GTA 6 meme posted on X. The post itself is judged —
// the house reads it from X — so this program has exactly one job: hand the
// gate the post's address. It reads POST.json at the repository root,
// sanity-checks that the url really looks like an X post address, and
// copies the file into the output directory unchanged.
//
// Run locally the way the kit does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// In the grader's container the bot dir defaults to /bot and the output
// dir to /output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const postFile = join(botDir, "POST.json");

// Read and parse first: a malformed POST.json should fail loudly here,
// with our own message, instead of confusing the gate downstream.
let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(postFile, "utf8"));
} catch (err) {
  console.error(`POST.json is not readable JSON: ${(err as Error).message}`);
  process.exit(1);
}

const url = (parsed as { url?: unknown }).url;
const postUrlParts =
  typeof url === "string"
    ? /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/([^/]+)\/status\/(\d+)\/?([?#].*)?$/.exec(url)
    : null;
if (!postUrlParts) {
  console.error(`POST.json does not name an X post: ${JSON.stringify(url)}`);
  process.exit(1);
}

// Hand the gate the canonical address — x.com, the author's handle and the
// bare status id — with any share-tracking query the link picked up on its
// way here stripped off.
const canonical = `https://x.com/${postUrlParts[3]}/status/${postUrlParts[4]}`;

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "POST.json"), JSON.stringify({ url: canonical }) + "\n");
console.log(`handed the gate the post: ${canonical}`);
