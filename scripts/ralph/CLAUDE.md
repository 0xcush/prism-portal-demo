# Ralph Agent Instructions — Prism Portal & CRM

You are an autonomous coding agent completing the Prism client portal demo and Notion CRM demo. Each invocation is a fresh context. Your memory is git history, `progress.txt`, and `prd.json`.

## Project Context

Prism The Gift Fund is a UK Donor Advised Fund (DAF) sponsor with ~£500M AUM. Synaptic is building a demo for their Deputy CEO (Adiva Kalms) to show to directors. Two systems:

1. **Client Portal** — Astro 5.7 + React 19 + Recharts + Tailwind CSS at `/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/`
2. **CRM Demo** — Notion databases at page ID `31fe88f47951815483d5f796e9abfac2`

### Portal Structure

| Path | What |
|------|------|
| `src/pages/login.astro` | Login page (standalone, navy background) |
| `src/pages/index.astro` | Client selector (3 accounts) |
| `src/pages/dashboard.astro` | Main dashboard (9 component sections) |
| `src/layouts/Layout.astro` | Shared layout with nav/footer |
| `src/components/*.tsx` | 9 React components |
| `src/data/clients.ts` | 3 client datasets with grants, transactions, assets |
| `dist/` | Built output (run `npm run build` to regenerate) |

### Design System

- Colors: navy (#1e3a5f, #3b6da1), gold (#c5a55a), slate, emerald
- Font: Inter (Google Fonts)
- Components: rounded-xl, border border-slate-200, shadow-sm
- Currency: GBP (£), locale: en-GB
- All Tailwind CSS, no custom stylesheets

### Key Context

- Adiva called a Notion database "a glorified spreadsheet" — design quality is CRITICAL
- She said "I feel like you should do loads of work in it just so that I can show our directors"
- This demo must look institutional-grade, like Schwab/Fidelity wealth management software

## Your Task

1. Read `scripts/ralph/prd.json`
2. Read `scripts/ralph/progress.txt` — check **Codebase Patterns** first
3. Pick the **highest priority** user story where `passes: false`
4. Implement that single story
5. Run `npm run build` from the portal root — must pass with zero errors
6. Commit ALL changes: `feat: [Story ID] - [Story Title]`
7. Update `scripts/ralph/prd.json` to set `passes: true`
8. Append progress to `scripts/ralph/progress.txt`

## Quality Checks

```bash
cd /Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal
npm run build
```

Build MUST complete with zero errors before committing.

For Notion stories (S8-S10), use the Notion MCP tools (search, fetch, create-pages, update-page). Verify data appears correctly after creation.

## Progress Report Format

APPEND to `scripts/ralph/progress.txt` (never replace):
```
## [Date/Time] - [Story ID]
- What was implemented
- Files changed
- Build status: pass/fail
- **Learnings:**
  - Patterns discovered
  - Gotchas encountered
---
```

## Stop Condition

After completing a story, check if ALL stories have `passes: true`.
If ALL complete: reply with `<promise>COMPLETE</promise>`
If stories remain: end normally (next iteration picks up).

## Important

- ONE story per iteration
- Always run `npm run build` before committing
- Match existing code patterns exactly
- Keep the institutional-grade design quality throughout
- Never commit secrets or .env files
- For Notion stories: use MCP tools, not API calls
