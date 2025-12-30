# Design System

A design system built with Storybook and shadcn/ui components.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Storybook

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`

### Build Storybook

```bash
npm run build-storybook
```

## Components

### Button

The shadcn/ui Button component is available with multiple variants and sizes:

- **Variants**: default, destructive, outline, secondary, ghost, link
- **Sizes**: sm, default, lg, icon

View all button examples in Storybook!

## Project Structure

```
.
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx          # Button component
│   │       └── button.stories.tsx   # Button stories
│   ├── lib/
│   │   └── utils.ts                 # Utility functions
│   └── index.css                    # Global styles with Tailwind
├── .storybook/                      # Storybook configuration
└── stories/                         # Additional Storybook stories
```

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Storybook** - Component documentation and testing
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Vite** - Build tool

