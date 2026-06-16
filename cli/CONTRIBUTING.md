# Contributing to railgun-cli

## Adding a New Preset

Presets are plain `.railgun/` directories in `src/templates/`. To add a new preset:

1. Create `src/templates/{name}/.railgun/` with the same structure as a real project
2. Add rails to relevant layers (e.g., `02-blueprint/`, `03-validation/`)
3. Update `src/commands/init.ts` to register the preset
4. Send a PR!

### Example Preset Structure

```
src/templates/svelte/.railgun/
├── 02-blueprint/
│   └── state-management.md
└── 03-validation/
    └── unit-tests.md
```

## Development Setup

```bash
cd cli
npm install
npm run dev    # Run CLI from source
npm test       # Run tests
npm run build  # Build to dist/
```

## Release Process

1. Update `package.json` version (semver)
2. Update `CHANGELOG.md`
3. Run `npm run build && npm test`
4. Commit: `git commit -m "release: v0.2.0"`
5. Push: `git push`
6. GitHub Actions publishes automatically (if `NPM_TOKEN` is set)

## Publishing Manually (if CI is broken)

```bash
cd cli
npm run build
npm test
npm login
npm publish --access public
```