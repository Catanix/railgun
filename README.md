<p align="center">
  <img src="assets/banner.png" alt="RAILGUN Banner" />
</p>

<p align="center">
  <a href="https://github.com/Catanix/railgun/actions"><img src="https://img.shields.io/badge/tests-passing-brightgreen" alt="Tests"></a>
  <a href="https://www.npmjs.com/package/@railgun/cli"><img src="https://img.shields.io/badge/npm-@railgun/cli-pink" alt="npm"></a>
  <a href="https://github.com/Catanix/railgun"><img src="https://img.shields.io/badge/license-MIT-blue" alt="License"></a>
</p>

<p align="center">
  <a href="docs/getting-started.md">Getting Started</a> •
  <a href="docs/layers.md">Layers</a> •
  <a href="docs/adding-rules.md">Adding Rules</a> •
  <a href="docs/best-practices.md">Best Practices</a>
</p>

<h1 align="center">⚡️ RAILGUN</h1>

<p align="center"><strong>R</strong>epository-level <strong>A</strong>I <strong>L</strong>ogic & <strong>G</strong>uidance <strong>U</strong>nified <strong>N</strong>etwork</p>

---

## 🎯 What is RAILGUN?

RAILGUN is a lightweight system for organizing AI context in your repository. Inspired by <a href="https://x.com/karpathy/status/2039805659525644595" target="_blank">Andrej Karpathy's idea</a> of using Obsidian as a knowledge base for LLMs, it applies the same principle to codebase context — structured, navigable, and loadable on demand.

Instead of a monolithic `.cursorrules` file, RAILGUN splits rules into focused layers that AI agents load only when needed.

---

## ✨ What RAILGUN Does

- **Reduces architectural drift** — agents don't invent their own patterns when the rules are explicit
- **Speeds up onboarding** — new team members (and new AI sessions) read the same rails
- **Makes code predictable** — not perfect, but consistent and traceable
- **Saves tokens** — agents load only the rules relevant to the current task

---

## 📦 Quick Start

### Option 1: CLI (Recommended)

```bash
npx @railgun/cli add    # Add RAILGUN to current project
npx @railgun/cli init   # Interactive wizard with presets
```

### Option 2: Manual

1. Copy the `.railgun/` directory into your repository
2. Add a root `AGENTS.md`:

```markdown
# RAILGUN Activation

This repository uses RAILGUN. Before any task, read `.railgun/AGENTS.md`.
```

3. Fill the rails with your project's rules — see [Adding Rules](docs/adding-rules.md)

---

## ⚠️ Reality Check

RAILGUN improves consistency but **cannot guarantee** an AI will follow rules. LLMs are probabilistic — they can skip steps or misinterpret instructions.

**What works:** Better context focus, easier maintenance, team alignment.

**Limitations:** No runtime enforcement, AI can ignore rules, requires discipline to keep updated.

It is scaffolding, not a compiler.

---

## 📚 Documentation

- **[Getting Started](docs/getting-started.md)** — Installation and first steps
- **[Layers](docs/layers.md)** — How the five layers work
- **[Adding Rules](docs/adding-rules.md)** — Creating and updating rails
- **[Best Practices](docs/best-practices.md)** — Keeping RAILGUN effective

---

## License

MIT
