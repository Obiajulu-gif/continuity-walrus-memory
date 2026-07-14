/**
 * Continuity — live demo for the recording.
 *
 * Usage:
 *   node live-demo.mjs write    (Act 1: "Session 1" — memories written the moment they happen)
 *   node live-demo.mjs recall   (Act 2: "Session 2, fresh" — it just knows)
 *
 * Requires: npm i @mysten-incubation/memwal
 * Credentials via env vars: MEMWAL_PRIVATE_KEY, MEMWAL_ACCOUNT_ID, MEMWAL_SERVER_URL
 */
import { MemWal } from "@mysten-incubation/memwal";

const teal = (s) => `\x1b[96m${s}\x1b[0m`;
const dim = (s) => `\x1b[90m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const green = (s) => `\x1b[92m${s}\x1b[0m`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const memwal = MemWal.create({
  key: process.env.MEMWAL_PRIVATE_KEY,
  accountId: process.env.MEMWAL_ACCOUNT_ID,
  serverUrl: process.env.MEMWAL_SERVER_URL,
});

const mode = process.argv[2] ?? "recall";

if (mode === "write") {
  console.log(bold("\n  SESSION 1 — a normal working conversation\n"));
  const moments = [
    { say: 'User: "Error tracking is Sentry, and staging runs on the dev branch."', mem: "FACT: Error tracking is Sentry; staging runs on the 'dev' branch.", ns: "facts" },
    { say: 'User: "Always write SQL keywords in uppercase."', mem: "PREFERENCE: SQL keywords are always written in uppercase.", ns: "preferences" },
    { say: 'User: "We\'re going with Playwright over Cypress — better parallelism, Cypress rejected."', mem: "DECISION: Chose Playwright over Cypress for e2e tests — better parallelism; Cypress rejected.", ns: "decisions" },
  ];
  for (const m of moments) {
    console.log("  " + m.say);
    await sleep(600);
    process.stdout.write(dim(`    -> memwal_remember [${m.ns}] ... `));
    const r = await memwal.rememberAndWait(m.mem, m.ns, { timeoutMs: 180000 });
    console.log(green("stored on Walrus Mainnet"));
    console.log(dim(`       blob: ${r.blob_id ?? r.id ?? "ok"}\n`));
  }
  console.log(teal("  Saved 3 memories: 1 fact, 1 preference, 1 decision.\n"));
} else {
  console.log(bold("\n  SESSION 2 — brand new session. Zero context provided.\n"));
  const questions = [
    { q: "What package manager do we use?", query: "package manager", ns: "preferences" },
    { q: "Which state library did we pick, and why?", query: "state management library decision and why", ns: "decisions" },
    { q: "What did you get wrong before?", query: "mistakes to avoid", ns: "corrections" },
    { q: "e2e testing framework?", query: "end to end testing framework decision", ns: "decisions" },
  ];
  for (const item of questions) {
    console.log("  " + bold("User: ") + item.q);
    await sleep(400);
    const r = await memwal.recall({ query: item.query, namespace: item.ns, limit: 1 });
    const hit = r.results?.[0];
    console.log(teal("  Agent: ") + (hit ? hit.text : "(no memory found)"));
    console.log(dim(`         recalled from Walrus [${item.ns}] distance=${hit?.distance?.toFixed?.(3) ?? "-"}\n`));
    await sleep(400);
  }
  console.log(green("  It never asked. It just knew.\n"));
}
memwal.destroy();
