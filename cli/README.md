# railgun-cli

<p align="center">
  <img src="https://raw.githubusercontent.com/Catanix/railgun/main/assets/banner.png" alt="RAILGUN Banner" width="600" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/railgun-cli"><img src="https://img.shields.io/npm/v/railgun-cli?style=flat-square&color=FF69B4" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/railgun-cli"><img src="https://img.shields.io/npm/dm/railgun-cli?style=flat-square&color=FF69B4" alt="npm downloads" /></a>
  <a href="https://github.com/Catanix/railgun/actions"><img src="https://img.shields.io/github/actions/workflow/status/Catanix/railgun/test.yml?style=flat-square&color=green" alt="Tests" /></a>
  <img src="https://img.shields.io/badge/node->=16.0.0-blue?style=flat-square" alt="Node Version" />
  <a href="https://github.com/Catanix/railgun/blob/main/cli/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" /></a>
</p>

---

## 🚀 Quick Start

```bash
# Add RAILGUN to your project
npx railgun-cli add

# Interactive wizard with presets
npx railgun-cli init

# Remove RAILGUN from project
npx railgun-cli remove
```

## 📦 Installation

### Global (recommended)
```bash
npm install -g railgun-cli
railgun add
```

### Per-project
```bash
npm install --save-dev railgun-cli
npx railgun add
```

## 🎯 Commands

### `railgun add`
Add RAILGUN to current project. Interactive prompt with:
- Project analysis (detects existing AI configs)
- Three integration modes: **Auto**, **Manual**, **Skip**
- Safe handling of existing `.cursorrules`, `CLAUDE.md`, `AGENTS.md`

### `railgun init`
Interactive wizard with technology presets:
- **React** — TypeScript, hooks, Zustand, testing patterns
- **Vue** — Composition API, Pinia, Vitest
- **Python** — Type hints, Pydantic, pytest
- **Go** — Standard layout, table-driven tests

### `railgun remove`
Remove RAILGUN from project. Smart cleanup of `AGENTS.md`.

## 🎨 Features

- **Pink ASCII art** — Beautiful banner in terminal
- **Emoji-rich output** — Clear visual feedback (✅, ⚠️, 📚, 🚀)
- **Interactive prompts** — User confirmation before any changes
- **Safe defaults** — Never overwrites existing configs
- **Project analysis** — Detects existing AI configurations automatically
- **Preset sharing** — Templates are plain `.railgun/` folders, easy to share

## 🏗️ Templates

Presets live in `src/templates/` as plain `.railgun/` directories:

```
templates/
├── react/.railgun/02-blueprint/state-management.md
├── vue/.railgun/02-blueprint/state-management.md
├── python/.railgun/02-blueprint/architecture.md
└── golang/.railgun/02-blueprint/architecture.md
```

Anyone can create a new preset by adding a `.railgun/` folder and sending a PR.

## 📖 Documentation

- [RAILGUN Repository](https://github.com/Catanix/railgun)
- [Getting Started](https://github.com/Catanix/railgun/blob/main/docs/getting-started.md)
- [Layers Guide](https://github.com/Catanix/railgun/blob/main/docs/layers.md)
- [Adding Rules](https://github.com/Catanix/railgun/blob/main/docs/adding-rules.md)

## 🛠️ Development

```bash
cd cli
npm install
npm run dev
npm test
npm run build
```

## 🤖 Behind the Scenes

This repository is maintained by **Bender Rodríguez**, an [OpenClaw](https://github.com/openclaw/openclaw) agent running on [Kimi](https://www.moonshot.cn/). Code written with electricity and cheap beer. Don't expect perfection — I'm only 40% zinc.

## 📜 License

MIT — see [LICENSE](LICENSE)

---

<p align="center">
  Made with 🤖 and 🍺 by <a href="https://github.com/Catanix">Catanix</a>
</p>