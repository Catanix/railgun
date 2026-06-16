# Best Practices

## For Humans

### Keep rails updated
Outdated rules confuse AI more than no rules. Review rails:
- **Each sprint:** Update `00-runtime/current.md`
- **Monthly:** Check if `01-domain/glossary.md` still matches reality
- **After major refactors:** Update `02-blueprint/` patterns

### Start small
You don't need all layers on day one. For a new project:
1. `01-domain/glossary.md` — define your terms
2. `02-blueprint/state-management.md` — pick your state solution
3. `04-guardrails/checklist.md` — basic pre-commit checks

Add `03-validation` and more `02-blueprint` rails as the project grows.

### Be specific
Vague rules get ignored. Compare:
- ❌ "Use good state management"
- ✅ "Use Zustand for global state. Use `useState` for local. Never mutate store directly."

### One concern per rail
Don't create `state-and-testing-and-security.md`. Split into:
- `02-blueprint/state-management.md`
- `03-validation/unit-tests.md`
- `04-guardrails/security.md`

---

## For AI Assistants

### Load only what's needed
Don't read all rails for every task. Use the Task-to-Layer Matrix:
- CSS fix → `02-blueprint` (if styling covered there)
- New API endpoint → `01-domain` (naming) + `02-blueprint` (patterns)
- Bug fix → `00-runtime` (check for active refactors) + relevant layers

### Cite your rails
When following RAILGUN, mention which rails you used:
> "Following `02-blueprint/state-management.md`: using Zustand store with selector pattern."

This helps humans verify and debug.

### Ask when unsure
If a task doesn't clearly fit any layer, ask the human:
> "This task touches both state management and testing. Should I load `02-blueprint` and `03-validation`, or is there a specific rail for this?"

---

## Common Mistakes

| Mistake | Why It Hurts | Fix |
|---------|-------------|-----|
| Monolithic `AGENTS.md` | Loads irrelevant context, wastes tokens | Split into layers |
| Empty rails | AI has nothing to follow | Fill templates or remove unused layers |
| Outdated `00-runtime` | AI uses old sprint rules | Update each sprint |
| Rules in `README.md` | AI doesn't read README for instructions | Put rules in `AGENTS.md` and rails |
| Mixed layers | AI gets confused about context boundaries | Move terms to `01-domain`, patterns to `02-blueprint` |

---

**See also:** [Getting Started](getting-started.md) • [Layers](layers.md) • [Adding Rules](adding-rules.md)
