# Design Tokens

This design system uses tokens exported from Figma. All tokens are automatically parsed and integrated into Tailwind CSS.

## Token Files

- `_Primitives.json` - Base color primitives, spacing values
- `1. Color modes.json` - Semantic color tokens (text, border, background, etc.)
- `2. Radius.json` - Border radius tokens
- `3. Spacing.json` - Spacing tokens

## Regenerating Tokens

If you update the tokens in Figma and export new JSON files, run:

```bash
npm run parse-tokens
```

This will regenerate `src/tokens.json` which is used by Tailwind CSS.

## Using Tokens in Tailwind

All tokens are available as Tailwind utility classes:

### Colors

```tsx
// Brand colors
<div className="bg-brand-500 text-white">Brand Primary</div>

// Semantic colors
<div className="bg-background-bg-primary text-text-text-primary-900">
  Primary Background
</div>

// Error, Warning, Success
<div className="bg-error-500 text-white">Error</div>
<div className="bg-warning-500 text-white">Warning</div>
<div className="bg-success-500 text-white">Success</div>
```

### Spacing

```tsx
<div className="p-spacing-md m-spacing-lg gap-spacing-sm">
  Content with design system spacing
</div>
```

### Border Radius

```tsx
<div className="rounded-radius-md">
  Rounded corners using design tokens
</div>
```

## Available Color Groups

- `base` - White, black, transparent
- `brand` - Brand colors (25-950 scale)
- `error` - Error colors
- `warning` - Warning colors
- `success` - Success colors
- `gray-cool` - Gray color palette
- `text` - Text color tokens
- `border` - Border color tokens
- `background` - Background color tokens
- `foreground` - Foreground color tokens
- Plus many more color palettes (green, blue, purple, etc.)

## Token Structure

Tokens follow this naming convention:
- Colors: `{group}-{shade}` (e.g., `brand-500`, `error-600`)
- Semantic: `{category}-{name}` (e.g., `text-primary-900`, `bg-primary`)
- Spacing: `spacing-{size}` (e.g., `spacing-md`, `spacing-xl`)
- Radius: `radius-{size}` (e.g., `radius-md`, `radius-lg`)




