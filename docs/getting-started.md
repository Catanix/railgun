# Getting Started

## Prerequisites

- A repository where you use AI coding assistants (Claude Code, Kimi CLI, Cursor, Copilot, etc.)
- Basic understanding of markdown

## Installation

### Step 1: Copy RAILGUN into your repository

```bash
cp -r .railgun/ /path/to/your/project/
```

### Step 2: Create root AGENTS.md

In your repository root, create `AGENTS.md`:

```markdown
# RAILGUN Activation

This repository uses RAILGUN. Before any task, read `.railgun/AGENTS.md` and follow its execution loop.
```

### Step 3: Configure your layers

Open `.railgun/` and fill each layer with your project rules:

| Layer | What to put there |
|-------|-------------------|
| `00-runtime/current.md` | Active sprint goals, temporary rules, blockers |
| `01-domain/glossary.md` | Your business terms (CartLineItem, not CartRow) |
| `02-blueprint/state-management.md` | How you manage state (Redux, Zustand, etc.) |
| `03-validation/unit-tests.md` | Testing rules (RTL, mocking, coverage) |
| `04-guardrails/checklist.md` | Pre-commit checklist |

### Step 4: Start using

Tell your AI assistant: *"Follow RAILGUN in this repository. Check .railgun/AGENTS.md before starting any task."*

The AI will:
1. Read root `AGENTS.md`
2. Read `.railgun/AGENTS.md` (Command Center)
3. Check `00-runtime` for current sprint info
4. Load only the layers relevant to the task
5. Follow the loaded rails

---

## First-Time Tips

- **Start small.** You don't need all layers. Begin with `01-domain/glossary.md` and `02-blueprint/state-management.md`.
- **Update `00-runtime` each sprint.** This is your project's current reality.
- **Review rails monthly.** Outdated rules confuse AI more than no rules.
- **Be specific.** "Use Zustand" is better than "Use a state management library."

---

**See also:** [Layers](layers.md) • [Adding Rules](adding-rules.md) • [Best Practices](best-practices.md)
