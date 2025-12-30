import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const tokens = require('./src/tokens.json');

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './stories/**/*.{ts,tsx}',
  ],
  prefix: "",
  safelist: [
    // Brand colors
    'bg-brand-500', 'bg-brand-600', 'bg-brand-700',
    'text-brand-500', 'text-brand-600', 'text-brand-700',
    // Error colors
    'bg-error-500', 'bg-error-600', 'bg-error-700',
    // Blue colors
    'bg-blue-50', 'bg-blue-500',
    // Spacing tokens (gap, padding, margin)
    'gap-xs', 'gap-sm', 'gap-md', 'gap-lg', 'gap-xl',
    'px-xs', 'px-sm', 'px-md', 'px-lg', 'px-xl',
    'py-xs', 'py-sm', 'py-md', 'py-lg', 'py-xl',
    'p-xs', 'p-sm', 'p-md', 'p-lg', 'p-xl',
    // Border radius tokens
    'rounded-none', 'rounded-xxs', 'rounded-xs', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-full',
    // Typography tokens
    'font-display', 'font-body',
    'font-regular', 'font-medium', 'font-semibold', 'font-bold',
    'text-2xs', 'text-xxs', 'text-xs', 'text-sm', 'text-md', 'text-lg', 'text-xl',
    'text-display-xs', 'text-display-sm', 'text-display-md', 'text-display-lg', 'text-display-xl', 'text-display-2xl',
    // Group hover utilities for named groups
    'group/comment',
    'group-hover/comment:opacity-100',
    'group-hover/comment:pointer-events-auto',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Design tokens from Figma
        ...tokens.colors,
        // Keep shadcn/ui semantic colors for compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      spacing: {
        ...tokens.spacing,
      },
      borderRadius: {
        // Design tokens from Figma (preserved)
        ...tokens.borderRadius,
        // shadcn/ui compatibility (using different keys to avoid conflicts)
        'shadcn-lg': "var(--radius)",
        'shadcn-md': "calc(var(--radius) - 2px)",
        'shadcn-sm': "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        // Override default sans to use Inter
        sans: [tokens.typography?.fontFamily?.['font-family-body'] || 'Inter', 'sans-serif'],
        display: [tokens.typography?.fontFamily?.['font-family-display'] || 'Inter', 'sans-serif'],
        body: [tokens.typography?.fontFamily?.['font-family-body'] || 'Inter', 'sans-serif'],
      },
      fontSize: {
        // Text sizes with line heights (smallest to largest)
        '2xs': [tokens.typography?.fontSize?.['text-2xs'] || '10px', tokens.typography?.lineHeight?.['text-2xs'] || '14px'],
        'xxs': [tokens.typography?.fontSize?.['text-xxs'] || '11px', tokens.typography?.lineHeight?.['text-xxs'] || '16px'],
        'xs': [tokens.typography?.fontSize?.['text-xs'] || '12px', tokens.typography?.lineHeight?.['text-xs'] || '18px'],
        'sm': [tokens.typography?.fontSize?.['text-sm'] || '14px', tokens.typography?.lineHeight?.['text-sm'] || '20px'],
        'md': [tokens.typography?.fontSize?.['text-md'] || '16px', tokens.typography?.lineHeight?.['text-md'] || '24px'],
        'lg': [tokens.typography?.fontSize?.['text-lg'] || '18px', tokens.typography?.lineHeight?.['text-lg'] || '28px'],
        'xl': [tokens.typography?.fontSize?.['text-xl'] || '20px', tokens.typography?.lineHeight?.['text-xl'] || '30px'],
        // Display sizes
        'display-xs': [tokens.typography?.fontSize?.['display-xs'] || '24px', tokens.typography?.lineHeight?.['display-xs'] || '32px'],
        'display-sm': [tokens.typography?.fontSize?.['display-sm'] || '30px', tokens.typography?.lineHeight?.['display-sm'] || '38px'],
        'display-md': [tokens.typography?.fontSize?.['display-md'] || '36px', tokens.typography?.lineHeight?.['display-md'] || '44px'],
        'display-lg': [tokens.typography?.fontSize?.['display-lg'] || '48px', tokens.typography?.lineHeight?.['display-lg'] || '60px'],
        'display-xl': [tokens.typography?.fontSize?.['display-xl'] || '60px', tokens.typography?.lineHeight?.['display-xl'] || '72px'],
        'display-2xl': [tokens.typography?.fontSize?.['display-2xl'] || '72px', tokens.typography?.lineHeight?.['display-2xl'] || '90px'],
      },
      fontWeight: {
        regular: tokens.typography?.fontWeight?.['regular'] || '400',
        medium: tokens.typography?.fontWeight?.['medium'] || '500',
        semibold: tokens.typography?.fontWeight?.['semibold'] || '600',
        bold: tokens.typography?.fontWeight?.['bold'] || '700',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

