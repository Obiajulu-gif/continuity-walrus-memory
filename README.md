# Continuity — an AI agent that never asks twice

**Walrus Session 5 — Walrus Memory Prompt Jam submission**

A drop-in system prompt that gives any MCP agent disciplined, persistent memory on [Walrus Memory (MemWal)](https://github.com/MystenLabs/MemWal). It recalls your facts, preferences, and decisions at the start of every session — and writes new ones to Walrus Mainnet the moment they happen.

> 📄 The full copy-pasteable prompt lives in [`PROMPT.md`](PROMPT.md).

---

## The problem

Every AI coding assistant forgets your stack, your conventions, and your decisions the instant a session ends. So you re-explain *"we use pnpm, 2-space indent, Zustand not Redux — and here's why"* over and over, and the agent keeps repeating mistakes you already corrected. Anyone working with an AI assistant across more than one session hits this daily; for developers it's **every single session**.

Continuity fixes it by making memory a discipline, not an afterthought — the agent gets *more* useful the longer you work with it, instead of resetting to zero each morning.

## What it does

The prompt turns Walrus Memory into a structured "working agreement" the agent maintains for you, across **five namespaces**:

| Namespace | What goes in it |
|---|---|
| `facts` | Stable truths about the user, project, stack, environment |
| `preferences` | How the user wants the agent to work — tools, style, conventions |
| `decisions` | Choices made, **with rationale and rejected alternatives** |
| `corrections` | Mistakes and their fixes, so they never recur |
| `glossary` | Project terms, code names, acronyms |

**When it reads** — at the start of every session it runs `memwal_recall` across all five namespaces plus one query scoped to the current task, then silently applies everything and skips any question it already knows the answer to.

**When it writes** — it calls `memwal_remember` the *instant* a fact is stated, a preference expressed, a decision made, or a correction given — never batched at the end where it would be forgotten.

**How it writes** — one atomic, self-contained fact per memory, category-tagged, with the rationale stored alongside every decision so it never re-litigates a settled choice. Contradictions become explicit `corrections` entries that supersede the old memory instead of piling up duplicates.

**Bulk mode** — paste a spec or transcript and it uses `memwal_analyze` to extract and store many memories in one pass.

**Session close** — it sweeps for anything unsaved and reports it: *"Saved 3 memories: 1 decision, 2 preferences."*

## Why this generates meaningful blob writes

Memory writes are tied to concrete conversational events — every stated fact, expressed preference, and made decision — so a normal working session naturally yields a steady, verifiable stream of writes to Walrus Mainnet rather than a handful of afterthoughts. A single 10-message onboarding run produces **~18–25 distinct blobs**.

## Quick start

1. Get a delegate key at [memory.walrus.xyz/dashboard](https://memory.walrus.xyz/dashboard) → **Delegate keys**. The Public key is your `MEMWAL_AGENT_ID`.
2. Connect the MemWal MCP server to your client (Claude Desktop / Cursor / any MCP client) per the setup at [docs.wal.app/walrus-memory](https://docs.wal.app/walrus-memory).
3. Paste the contents of [`PROMPT.md`](PROMPT.md) as your system prompt.
4. Just work. The agent handles the rest.

The prompt is client-agnostic and depends only on the MemWal MCP tools `memwal_remember` / `memwal_recall` / `memwal_analyze` / `memwal_restore`.

## Prove it yourself

[`demo/demo-script.md`](demo/demo-script.md) contains a scripted ~10-message run (stack facts, preferences, two decisions with rationale, a forced correction, and one `memwal_analyze` bulk paste) that produces a burst of visible writes — plus the payoff test: open a **brand-new session** and ask *"what package manager and state library do we use, and why?"* It answers correctly from recall, without asking. Zero context re-typed.

## Repo contents

```
PROMPT.md              The full copy-pasteable system prompt
demo/demo-script.md    Scripted run to generate writes + demo video outline
feedback/tickets.md    DX feedback filed as GitHub issues on MystenLabs/MemWal
```

## License

MIT
