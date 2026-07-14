# Proof of writes — Walrus Mainnet

Run date: 2026-07-14 · Relayer: `https://relayer.memory.walrus.xyz` (production, api 1.0.0)

| | |
|---|---|
| **MEMWAL_AGENT_ID** (delegate public key) | `14889ac22eacb1bdedb4dd9d17b149a2933a785f92f900e836f8c29e0ac6638a` |
| **Blob writes this run** | **22** (10 × `remember` + 12 × `analyze`) |
| **Namespaces used** | `facts`, `preferences`, `decisions`, `corrections`, `glossary` |

## Blob IDs (10 × rememberBulk — one atomic memory each)

```
xq8KhCAAOp9gr_ZYolTql3SEYOBCoPw5xUeLs6f40Hw   FACT: Next.js 15 app on Vercel
cNkBCjYQ4m8T3ka9dv2bGFTvIOqYc8m6gV-GJiIMdGM   FACT: Postgres 16 on Neon
kJGZcLXzH0ws3Pbwptf2aOkFY0BguT_lkwGNjaaiaOw   FACT: deploy from main; dev = staging
nkVQfeNpDbfgZNYuM28i79cbDADHZWhpU1lsKlRBCxY   PREFERENCE: pnpm only
Y8c49frhCOmzbv2COnamdmZBeM_R6ESNgQcXuhadrlE   PREFERENCE: 2-space indent
0BeU92HI15rs9ad8-FxjbK3pA8k0qol-9j9rEfFMjRo   PREFERENCE: terse commits
84QU7RBbJzPMjsjBgggD8AJzrkdiHi6HUxnHwSdT_S4   DECISION: Zustand over Redux + rationale
ht-YC1eI6Wltle2HesXBiN4mDFFu92TmmYMBp3cK06k   DECISION: Clerk over NextAuth + rationale
QIKoLS-RfbatRV83JGfJUnW1_TAqu3nP6cjGwlHbMgE   CORRECTION: npm slip -> pnpm always
VrFfLfu6y-JPVs_Im8htUpE4Lph3yH4sQJy61qkEiUM   GLOSSARY: "Aurora" design system
```

## Blob IDs (12 × analyze — bulk extraction from the seed spec, one pass)

```
QpgYPhj5vr8RsmZVQdmpUTc0UGWMix0WakSdF0WtYdg
d7X-XYWlE2eMVg1ufbh3zor9KtroIg9xC5PZMmlnUQw
Z-6X9wyLw0sPjHB9mJFvTmc-S_FvzP8dsDv4FdDtwOA
_YxbodYkvPqhlD1G8s_5OquHf1qcgcVaR7aR5Bw8Mrw
lmav5et4qmqrpjK1oBVsMZNDxOUf_XsqrJDoZ6ua61k
_qkB3l3YIWscM_tIyLf9wymkMbQjPfMs4k0x_RU8yeg
ALFJVpmLyGqODsHTXVS5pPrP-MC3xjIWZXLea4jADz8
g48_L9wlSQGZzjyF9fpm-MNwyivjKxA77t-Y_oFPhiY
ojG7xOO05rOll52vFXYXGwcGv3K6yLn0GgW12HHDcY4
MtBG1ItU-ooZgjgZ9hpRty0XSi6tFu6nndus3SEtkC0
ZgxTlAFQVu1vQLcZmR-OMTY8PmDa12qAdAbpCcHXPRY
y0uuZm2__OQQEBDIlgDNa3bznKWdJ0N2ZcweuWOQS9Y
```

## Recall verification (fresh-session simulation)

Every query answered correctly from memory, scoped to the right namespace:

```
recall [preferences] "what package manager does the user use"
  -> PREFERENCE: The user uses pnpm exclusively — never suggest npm or yarn. (0.516)

recall [decisions] "state management library decision and why"
  -> DECISION: Chose Zustand over Redux for state management — the team is small
     and Redux boilerplate was rejected as not worth it. (0.497)

recall [corrections] "mistakes to avoid"
  -> CORRECTION: I suggested npm despite the pnpm-only rule. Always use pnpm
     commands in every suggestion from now on. (0.778)

recall [glossary] "what is Aurora"
  -> GLOSSARY: 'Aurora' is the internal design system / component library. (0.358)
```

The run script (SDK calls mirroring the prompt's rules) is documented in
[`demo/demo-script.md`](demo/demo-script.md). Credentials were supplied via environment
variables and are not present in this repository.
