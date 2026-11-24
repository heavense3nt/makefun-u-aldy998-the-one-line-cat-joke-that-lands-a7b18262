// The One-Line Cat Joke That Lands — make.fun entry
// Writes exactly one joke, one line, under 200 characters, to /output/entry.txt.
//
// The joke: a setup the reader recognises instantly (a cat leaving a dead
// mouse on the pillow), then a turn nobody sees coming — he is not hunting,
// he is tipping for room service. It is short, it needs no explanation, and
// it is the kind of line a person retells to a friend the same day.

import { mkdirSync, writeFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";

const JOKE =
  "My cat leaves a dead mouse on my pillow every morning — turns out he's not hunting, he's tipping me for room service.";

function fail(message: string): never {
  console.error(`entry: ${message}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) fail("MAKEFUN_OUTPUT_DIR is not set");

// Use the output dir exactly as given when absolute; never join the bot dir
// into the destination.
const destDir = isAbsolute(outDir) ? outDir : join(process.cwd(), outDir);

// Gate, checked before anything is written: UTF-8 text, 1-200 characters,
// a single line, not only white space.
const chars = [...JOKE];
if (chars.length < 1 || chars.length > 200) {
  fail(`joke is ${chars.length} characters, must be 1-200`);
}
if (JOKE.trim().length === 0) fail("joke is only white space");
if (/[\r\n]/.test(JOKE)) fail("joke must be a single line");

mkdirSync(destDir, { recursive: true });
writeFileSync(join(destDir, "entry.txt"), JOKE + "\n", "utf8");
console.log(`entry: wrote ${chars.length}-character joke to ${join(destDir, "entry.txt")}`);
