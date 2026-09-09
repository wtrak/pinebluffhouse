import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist-pages");
const source = readFileSync(resolve(root, "app/walkthrough-data.ts"), "utf8");
const viewPattern = /view\("([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\),/g;
const viewpoints = [];

for (const match of source.matchAll(viewPattern)) {
  const [, id, room, position, facing, x, y, angle] = match;
  viewpoints.push({
    id,
    room,
    position,
    facing,
    x: Number(x),
    y: Number(y),
    angle: Number(angle),
    image: `./house/${id}.jpg`,
  });
}

if (viewpoints.length !== 49) {
  throw new Error(`Expected 49 mapped viewpoints, found ${viewpoints.length}`);
}

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync(resolve(root, "site/index.html"), resolve(output, "index.html"));
cpSync(resolve(root, "site/app.js"), resolve(output, "app.js"));
cpSync(resolve(root, "app/globals.css"), resolve(output, "styles.css"));
cpSync(resolve(root, "public/house"), resolve(output, "house"), { recursive: true });
cpSync(resolve(root, "public/favicon.svg"), resolve(output, "favicon.svg"));
cpSync(resolve(root, "public/og-card.png"), resolve(output, "og-card.png"));
writeFileSync(resolve(output, "walkthrough-data.json"), JSON.stringify({ viewpoints }));
writeFileSync(resolve(output, ".nojekyll"), "");

console.log(`Built GitHub Pages site with ${viewpoints.length} mapped viewpoints.`);
