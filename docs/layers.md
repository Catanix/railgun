# Layers

RAILGUN splits context into five isolated layers. Each layer answers a single question. Keeping them separate prevents the AI from confusing architecture with business logic.

---

## ⏳ 00-runtime — Dynamic Memory

**Question:** *What is the team working on THIS SPRINT?*

This is where current sprint info lives. Active tasks, modules being refactored, code freezes, experimental branches, and "don't touch X until Y is merged" warnings.

**For AI:** Check this layer **before every task**. Runtime rules can temporarily override any other layer (e.g., "we're migrating from Redux to Zustand this sprint — don't write new Redux code").

**For Humans:** Update at least once per sprint. This is the project's heartbeat.

**Example `current.md`:**
```markdown
# Sprint 24: Checkout Redesign

## Active
- Refactoring payment flow (do not touch `/legacy/payment/`)
- New CartWidget component in progress

## Blockers
- Waiting for design system v2 before updating buttons

## Temporary Rules
- All new components MUST use design-system v2 imports
- Do NOT modify `PaymentService.ts` until @alice finishes migration
```

---

## 💼 01-domain — Business Logic

**Question:** *WHAT am I building?*

The Ubiquitous Language layer. How the business speaks. What things are called. What data means.

**Files:**
- `glossary.md` — canonical terms and forbidden synonyms
- `data-models.md` — field constraints, validation limits
- `core-flows.md` — multi-step business processes

**Example `glossary.md`:**
```markdown
# Glossary

| Term | Use For | Never Use |
|------|---------|-----------|
| CartLineItem | One product line in cart | CartRow, ProductItem |
| PaymentIntent | Payment initiation | PaymentRequest, Charge |
| CheckoutSession | User's checkout process | CheckoutFlow, OrderProcess |
```

---

## 📐 02-blueprint — Engineering Skeleton

**Question:** *HOW should I write the code?*

Technical constitution of the repository. State management, routing, component patterns, API conventions.

**Files:**
- `state-management.md` — store rules, mutation patterns
- `routing.md` — route guards, lazy-loading
- `api-conventions.md` — endpoint naming, error handling

**Example `state-management.md`:**
```markdown
# State Management

## Core Rules
- Global state: Zustand store in `stores/`
- Local state: `useState` closest to consumer
- Derived state: selectors, never duplicate in store

## Forbidden
- Direct store mutation outside actions
- Mixing UI state (loading, modal) with domain state
```

---

## 🧪 03-validation — Quality Gates

**Question:** *How do I PROVE the code works?*

Testing protocols. How to write tests. What to mock. What coverage means.

**Files:**
- `unit-tests.md` — mocking, assertions, test structure
- `e2e-tests.md` — browser targets, selectors

**Example `unit-tests.md`:**
```markdown
# Unit Tests

## Required
- React Testing Library for component tests
- `data-testid` for element selection
- Mock all API calls (no live network in tests)

## Forbidden
- `console.log` in tests
- Testing implementation details (test behavior, not structure)
```

---

## 🛡️ 04-guardrails — Security & Delivery

**Question:** *What must I CHECK before I finish?*

Final filter. Security rules, checklist, commit format.

**Files:**
- `checklist.md` — mandatory self-review items
- `security.md` — secrets, PII, env handling

**Example `checklist.md`:**
```markdown
# Pre-Commit Checklist

- [ ] No `console.log` or `debugger` left in code
- [ ] No secrets hardcoded
- [ ] All new code has tests
- [ ] Tests pass locally
- [ ] Variable names follow glossary
- [ ] Commit message follows Conventional Commits
```

---

## Layer Rules

1. **Always check `00-runtime` first.** It contains temporary facts that override everything.
2. **Load only relevant layers.** Fixing CSS? You probably need only `02-blueprint`.
3. **Never mix boundaries.** Business terms go to `01-domain`, not `02-blueprint`.
4. **Guardrails are last.** Load `04-guardrails` after the work is done.

---

**See also:** [Getting Started](getting-started.md) • [Adding Rules](adding-rules.md) • [Best Practices](best-practices.md)
