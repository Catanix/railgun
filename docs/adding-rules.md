# Adding Rules to RAILGUN

When your team needs a new rule, follow this process to keep RAILGUN consistent.

---

## Step 1: Identify the Layer

Use the Task-to-Layer Matrix:

| If your rule is about... | Add to Layer |
|--------------------------|-------------|
| Business terms, naming, data models | `01-domain/` |
| Architecture, patterns, libraries | `02-blueprint/` |
| Testing, mocks, coverage | `03-validation/` |
| Security, checklist, commits | `04-guardrails/` |
| Temporary sprint rules | `00-runtime/current.md` |

**Never** put a testing rule in `02-blueprint` or an architecture pattern in `01-domain`.

---

## Step 2: Check for Duplicates

Before creating a new rail, read all existing rails in the target layer. If your rule is 80% covered by an existing one, update the existing rail instead.

---

## Step 3: Write the Rail

Rail files should be:
- **Dense and bulleted** — not essays
- **Imperative** — "You MUST...", "It is forbidden to..."
- **Code-free** — constraints, not snippets
- **Focused** — one concern per file

**Template:**
```markdown
# [Name] Rail

## Core Principles
- 2-5 high-level rules

## Allowed
- Explicitly permitted patterns

## Forbidden
- Explicitly prohibited patterns

## Examples (if needed)
- Brief pseudocode only
```

---

## Step 4: Update the Dispatcher

Each layer has an `AGENTS.md` that acts as a navigation map. When you add a new rail, update the dispatcher so AI can find it.

**Example — adding `api-conventions.md` to `02-blueprint`:**

1. Create `02-blueprint/api-conventions.md`
2. Open `02-blueprint/AGENTS.md`
3. Add to Navigation Map:
```markdown
- **API Conventions** → Read `api-conventions.md`
  - Mandatory when: defining or calling API endpoints
  - Covers: endpoint naming, error handling, request/response formats
```

---

## Step 5: Example Prompts for AI

You can ask your AI assistant to add rails. Provide the layer and the rule.

**New architectural rule:**
> "Add a rail to `02-blueprint` that forbids direct `axios` calls in React components. All HTTP must go through `lib/api-client.ts`."

**Update existing rail:**
> "Update `02-blueprint/state-management.md`: we're migrating from Zustand to Redux Toolkit. Replace Zustand rules with Redux patterns."

**New domain term:**
> "Add `payment-flows.md` to `01-domain/`. Define checkout sequence: Cart → Checkout → Payment → Confirmation. Use `PaymentIntent`, never `Charge`."

---

## What NOT to Do

- ❌ **Don't paste code.** Rails are constraints, not snippet libraries.
- ❌ **Don't write essays.** Keep it dry and bulleted.
- ❌ **Don't mix layers.** One concern per file in the right layer.
- ❌ **Don't put rules in README.md.** AI reads `AGENTS.md`, not README.

---

**See also:** [Getting Started](getting-started.md) • [Layers](layers.md) • [Best Practices](best-practices.md)
