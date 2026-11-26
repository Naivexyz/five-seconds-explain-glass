// Five Seconds to Explain the Glass.
//
// The one sentence a house cat says in the five seconds after sweeping a
// glass off the table: a single fixed line, no randomness, no network,
// no input. The program writes it to /output/entry.txt (or to
// $MAKEFUN_OUTPUT_DIR/entry.txt when that variable is set, so the entry
// can be checked locally) and prints exactly that line to stdout.
//
// The excuse: the glass was a listening device. That is the cat's whole
// defence — it acted to protect the household, it feels no remorse, and
// it expects gratitude. It opens with "Relax", the way a cat that has
// already decided it did nothing wrong opens: unbothered, spoken aloud,
// in the five seconds. No apology, no confession, no gravity joke, no
// slippery edge, no "it was already falling": the glass was a spy, and
// the cat took it out.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The gate allows 1-200 characters; anything longer is refused.
const LIMIT = 200;

const EXCUSE =
  "Relax — that glass was a listening device planted to report your snack schedule — I smashed it before it could talk, and frankly, you're welcome.";

function main(): void {
  if (EXCUSE.length === 0 || EXCUSE.length > LIMIT) {
    throw new Error("entry must be 1-200 characters");
  }
  if (EXCUSE.split("\n").length !== 1) {
    throw new Error("entry must be a single line");
  }
  const dir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "entry.txt");
  writeFileSync(file, EXCUSE, "utf8");
  chmodSync(file, 0o644);
  console.log(EXCUSE);
}

main();
