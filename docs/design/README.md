# docs/design — brand rollout kit (agent-facing index)

Read this file first. Everything here was derived from `react-app/src` on 2026-09-06/07. Use the files in the order below; do not infer page structure from memory — it is in the spec.

| File | What it is | Use it for |
|---|---|---|
| `WORK_PLAN.md` | phases, gates, decisions D1–D14 | sequencing; what is allowed in each slice |
| `DESIGN_SPEC_22_TEMPLATES.md` | per-template sections in render order, real copy, fields, data sources, states | the brief for every design board and every implementation task |
| `wireframes/*.png` | one desktop + one mobile PNG per template (`NN-name--desktop.png`, `--mobile.png`), `00-homepage-v5--*` is the full new-brand homepage | visual reference; attach to Claude Design boards or view in Claude Code |
| `wireframes/WIREFRAMES_21_TEMPLATES.html` | the same wireframes, interactive (tabs), plus the Overlays tab | browse; not meant to be read as source |
| `homepage-v5-full.html` | complete homepage in the new brand, 13 sections, decisions applied, `data-live` slots mark API data | reference implementation of tokens, rhythm, restraint rules |
| `PASS2_FINDINGS.md` | graph pass 2: god nodes, blast radius per shared component, migration parity, scope gaps | before touching any shared component, check its blast radius here |
| `graph/graph.json` | 537-node dependency graph (React + Vue + routes + endpoints + stylesheets + boards) | query dependents mechanically; regression check that logic nodes keep their edges |
| `graph/wiki/` | 16 articles, one per subsystem | orientation when entering an unfamiliar area |
| `DEBATE_VUE_TO_REACT_REBRAND.md` | why the plan is what it is | when a decision is questioned |
| `ALL_PATHS.md`, `all_paths.txt` | all 239 routable paths with live/local links | QA (Playwright over `all_paths.txt`) |

## Rules that apply to every task in this folder
1. Presentation only. The 42 logic-bearing components keep every hook, effect, API call and meta writer. If a change needs a new API field, stop — it is a product change.
2. `styles/mb-tokens.scss` is the design system. Do not add a second token set. Prefer promoting `.mb-home`-scoped rules to `:is(.mb-home, .mb-page)` over writing new overrides.
3. No invented numbers, no placeholder images, no copy outside the voice in the spec. Live data is marked `data-live` in the homepage reference; keep it live.
4. Delete the legacy SCSS a component no longer needs when its board lands (≤20% of the slice, only after that slice's QA).
5. Before editing a shared component, read its blast-radius row in `PASS2_FINDINGS.md` and re-check those pages after.
