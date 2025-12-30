# Design Tokens Quick Reference

**Always use tokens. Never hardcode values.**

## Colors

### Brand
| Token | Hex | Usage |
|-------|-----|-------|
| `brand-500` | #43389B | Primary actions |
| `brand-600` | #362D7C | Hover state |
| `brand-700` | #28225D | Active/pressed |

### Gray Cool
| Token | Hex | Usage |
|-------|-----|-------|
| `gray-cool-50` | #F6F6F9 | Hover backgrounds |
| `gray-cool-100` | #E9EBF1 | Borders, dividers |
| `gray-cool-200` | #DCDFEA | Secondary borders |
| `gray-cool-400` | #7D89B0 | Placeholder text |
| `gray-cool-600` | #4A5578 | Tertiary text |
| `gray-cool-700` | #404968 | Secondary text |
| `gray-cool-900` | #111322 | Primary text |

### Error
| Token | Hex | Usage |
|-------|-----|-------|
| `error-500` | #F04438 | Error states |
| `error-600` | #D92D20 | Destructive actions |

---

## Text Colors

Use semantic text color tokens from `colors.text` in `src/tokens.json`. These tokens adapt between light/dark modes and ensure consistent text hierarchy.

### Primary & Secondary Text
| Token | Hex | When to Use |
|-------|-----|-------------|
| `text-primary-900` | #111322 | Primary text: page headings, key titles |
| `text-primary-on-brand` | #FFFFFF | Primary text on solid brand backgrounds (CTAs) |
| `text-secondary-700` | #404968 | Secondary text: labels, section headings |
| `text-secondary-hover` | #30374F | Secondary text hover state |
| `text-secondary-on-brand` | #B3AED6 | Secondary text on brand backgrounds |

### Tertiary & Quaternary Text
| Token | Hex | When to Use |
|-------|-----|-------------|
| `text-tertiary-600` | #4A5578 | Tertiary text: supporting text, paragraphs |
| `text-tertiary-hover` | #404968 | Tertiary text hover state |
| `text-tertiary-on-brand` | #B3AED6 | Tertiary text on brand backgrounds |
| `text-quaternary-500` | #5D6B98 | Quaternary text: muted, low-emphasis (footer headings) |
| `text-quaternary-on-brand` | #8D87C3 | Quaternary text on brand backgrounds |

### Special Text States
| Token | Hex | When to Use |
|-------|-----|-------------|
| `text-white` | #FFFFFF | Text always white regardless of mode |
| `text-disabled` | #5D6B98 | Disabled inputs/buttons (higher contrast, accessible) |
| `text-placeholder` | #7D89B0 | Input field placeholders (accessible) |
| `text-placeholder-subtle` | #B9C0D4 | Subtle placeholders (e.g., verification code inputs) |

### Brand Text
| Token | Hex | When to Use |
|-------|-----|-------------|
| `text-brand-primary-900` | #0D0B1F | Strong brand headings (pricing cards) |
| `text-brand-secondary-700` | #28225D | Brand subheadings, highlights (blog cards) |
| `text-brand-tertiary-600` | #362D7C | Lighter brand accents (metric card numbers) |
| `text-brand-tertiary-alt` | #362D7C | Alternative brand accent (lighter in dark mode) |

### Semantic Text
| Token | Hex | When to Use |
|-------|-----|-------------|
| `text-error-primary-600` | #D92D20 | Error messages, validation errors |
| `text-warning-primary-600` | #DC6803 | Warning messages |
| `text-success-primary-600` | #079455 | Success messages |

### Usage Examples

```tsx
// ✅ Primary heading on light background
<h1 className="text-text-primary-900 text-display-xs font-semibold">
  Dashboard
</h1>

// ✅ Secondary label
<label className="text-text-secondary-700 text-sm font-medium">
  Email
</label>

// ✅ Tertiary supporting text
<p className="text-text-tertiary-600 text-sm">
  Enter your email to get started.
</p>

// ✅ On-brand CTA section
<div className="bg-brand-500">
  <h2 className="text-text-primary-on-brand text-display-sm font-semibold">
    Get Started Today
  </h2>
  <p className="text-text-secondary-on-brand text-md">
    Join thousands of users.
  </p>
</div>

// ✅ Placeholder text
<input placeholder="you@example.com" className="placeholder:text-text-placeholder" />

// ✅ Disabled state
<input disabled className="text-text-disabled" />

// ✅ Error message
<span className="text-text-error-primary-600 text-sm">
  Invalid email address
</span>
```

### DO NOT
- ❌ Use raw gray-cool tokens for text (use semantic `text-*` tokens)
- ❌ Hardcode hex values for text colors
- ❌ Use opacity to create disabled text (use `text-disabled` token)

### DO
- ✅ Use semantic text tokens (`text-primary-900`, `text-secondary-700`, etc.)
- ✅ Use `_on-brand` variants when text is on solid brand backgrounds
- ✅ Use `_hover` variants for interactive text hover states
- ✅ Use `text-disabled` for disabled states (accessible contrast)

---

## Spacing

| Token | Value |
|-------|-------|
| `xs` | 4px |
| `sm` | 6px |
| `md` | 8px |
| `lg` | 12px |
| `xl` | 16px |
| `2xl` | 20px |
| `3xl` | 24px |

## Border Radius

| Token | Value |
|-------|-------|
| `xs` | 4px |
| `sm` | 6px |
| `md` | 8px |
| `lg` | 10px |
| `xl` | 12px |
| `full` | 9999px |

## Typography

### Font Family
- `font-family-display`: Inter
- `font-family-body`: Inter

### Font Weight
| Token | Weight |
|-------|--------|
| `regular` | 400 |
| `medium` | 500 |
| `semibold` | 600 |
| `bold` | 700 |

### Font Size (Text)
| Token | Size | Line Height |
|-------|------|-------------|
| `text-xs` | 12px | 18px |
| `text-sm` | 14px | 20px |
| `text-md` | 16px | 24px |
| `text-lg` | 18px | 28px |
| `text-xl` | 20px | 30px |

### Font Size (Display)
| Token | Size | Line Height |
|-------|------|-------------|
| `display-xs` | 24px | 32px |
| `display-sm` | 30px | 38px |
| `display-md` | 36px | 44px |
| `display-lg` | 48px | 60px |
| `display-xl` | 60px | 72px |
| `display-2xl` | 72px | 90px |

## Button Sizes

| Size | Height | Gap | Padding X |
|------|--------|-----|-----------|
| `sm` | 36px | 4px (xs) | 14px |
| `md` | 40px | 4px (xs) | 14px |
| `lg` | 44px | 6px (sm) | 16px |

## Icons

**Always use Untitled UI Icons** (`@untitledui/icons`)

### Sizes
| Context | Size |
|---------|------|
| Small buttons | 16px |
| Medium/Large buttons | 20px |
| Standalone | 24px |

### Usage
```tsx
import { ArrowRight, Plus, Check } from '@untitledui/icons';

<Button iconStart={<ArrowRight size={20} />}>Continue</Button>
```

❌ Don't use: Heroicons, Lucide, FontAwesome, custom SVGs

## Usage Examples

```tsx
// ✅ Good - using tokens
<Button variant="primary" size="md">Click me</Button>

// ❌ Bad - hardcoded values
<button className="bg-[#43389B] h-[40px] rounded-[8px]">Click me</button>
```

```css
/* ✅ Good */
.card {
  padding: 16px; /* xl token */
  border-radius: 8px; /* md token */
  gap: 4px; /* xs token */
}

/* ❌ Bad */
.card {
  padding: 15px; /* arbitrary */
  border-radius: 7px; /* not a token */
}
```

