# DX feedback → GitHub issues on MystenLabs/MemWal

Filed as part of the Walrus Session 5 Prompt Jam feedback bounty. Links added after filing.

## 1. MCP tool names & parameter schemas are hard to find in the docs/README

While writing a system prompt I needed the exact MCP tool names and their parameters
(`memwal_remember`, `memwal_recall`, `memwal_analyze`, `memwal_restore`, `memwal_login`).
These aren't listed together anywhere obvious — the README documents the SDK methods but not
the MCP tool surface, so prompt authors have to infer names and parameters.
**Request:** a single "MCP Tools" reference page listing each tool, its exact name, and its full
parameter schema (namespace, query, limit, etc.).

- Issue link: _(add after filing)_

## 2. docs.wal.app returns HTTP 403 to non-browser fetchers

`https://docs.wal.app/walrus-memory/...` returns 403 Forbidden to programmatic fetches (e.g.
from agents/tools reading the docs). This blocks AI agents — the exact audience of this
product — from reading the documentation.
**Request:** allow read access, or provide a raw/markdown docs endpoint.

- Issue link: _(add after filing)_

## 3. No first-class "forget/delete" or "list namespaces" tool

There's `remember`, `recall`, `analyze`, `restore`, but no documented way to (a) delete/retract
a single memory that's now wrong, or (b) list which namespaces exist for an agent. Both are
needed for a self-correcting agent: superseding via a new `corrections` entry works, but real
deletion and namespace discovery would make memory hygiene far cleaner.
**Request:** `memwal_forget` and `memwal_namespaces` (or document the intended pattern).

- Issue link: _(add after filing)_
