# State Management (React)

## Core Principles
- Use Zustand for global state (or Context for simple cases)
- Keep local state closest to consumer (useState)
- Derive values via selectors, never duplicate in store

## Component Rules
- Functional components only
- Props interface required (no 'any')
- Use React.FC<Props> or plain function with typed params

## Hooks
- Custom hooks in `hooks/` directory
- Prefix with `use`
- Never call hooks conditionally
