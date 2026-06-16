# Component Patterns

## Structure
```tsx
interface Props {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: Props) {
  return <div>{title}</div>;
}
```

## Styling
- CSS Modules or Tailwind
- No inline styles except dynamic values
- data-testid on interactive elements
