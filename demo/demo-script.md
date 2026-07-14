# Demo script — generate writes + record the video

## Part 1 — the scripted run (~18–25 blob writes)

With the MemWal MCP server connected and `PROMPT.md` as the system prompt, say these to the
agent one at a time:

```
1.  "This project is a Next.js 15 app on Vercel, DB is Postgres 16 on Neon."
2.  "I use pnpm — never suggest npm or yarn."
3.  "Indentation is 2 spaces, no tabs, ever."
4.  "We chose Zustand over Redux because the team is small and Redux was too much boilerplate."
5.  "Auth is Clerk. We rejected NextAuth because we needed org/multi-tenant out of the box."
6.  "Call the internal design system 'Aurora' — that's our component library."
7.  "I prefer terse commit messages, imperative mood, no emoji."
8.  "We deploy from the 'main' branch only; 'dev' is for staging."
9.   [Let it slip (npm/tabs), then correct it:]
     "You used npm again — remember, pnpm only."   -> forces a corrections write
10.  [Paste the seed-spec below and say:] "Analyze and remember the key facts here."
11.  START A NEW SESSION and ask: "What package manager and state library do we use, and why?"
     -> It answers correctly from recall WITHOUT asking. That's the payoff shot.
```

## Seed-spec for step 10 (one `memwal_analyze` call → ~10–14 memories)

> Project brief — "Aurora Dashboard." Aurora is our internal analytics dashboard, a Next.js 15
> app deployed on Vercel with a Postgres 16 database on Neon. Auth is handled by Clerk; we picked
> Clerk over NextAuth because we needed multi-tenant org support out of the box. State is managed
> with Zustand — we rejected Redux because the team is only three engineers and the boilerplate
> wasn't worth it. Styling is Tailwind CSS with our own component library, code-named "Nimbus."
> We use pnpm exclusively; never npm or yarn. All code is 2-space indent, no tabs. Commit messages
> are terse, imperative mood, no emoji. We deploy from the `main` branch only — `dev` is staging.
> CI runs on GitHub Actions and must pass before merge. The design lead is Priya; product
> decisions route through her. Our error-tracking is Sentry, and we alias the analytics service
> internally as "Pulse."

## Part 2 — video outline (keep under 3:00)

| Time | Shot |
|---|---|
| 0:00–0:20 | **The pain.** Fresh agent knows nothing about your project. "I re-explain my stack every single day." |
| 0:20–0:40 | **The fix.** Show the Continuity prompt pasted + MemWal MCP connected. One line on the five namespaces. |
| 0:40–1:40 | **It writes.** Run steps 1–8; point at each `memwal_remember` tool call firing. Emphasize the decision + rationale. |
| 1:40–2:05 | **It self-corrects.** Step 9 — the slip, the correction, the `corrections` write landing. |
| 2:05–2:40 | **The payoff.** Brand-new session, ask the question, it answers from recall. "Zero context re-typed — it just knew." |
| 2:40–3:00 | **Proof.** Walrus dashboard: blob count + agent ID. "Every one of these is a memory on Walrus Mainnet." |
