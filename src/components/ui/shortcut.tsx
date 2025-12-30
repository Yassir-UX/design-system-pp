import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Command icon (⌘) as SVG
const CommandIcon = ({ className }: { className?: string }) => (
  <svg 
    width="12" 
    height="12" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>
  </svg>
)

const shortcutVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-xs",
    "px-xs",
    "font-body font-regular",  // Using font-body and font-regular tokens
    "text-xs",                  // Using text-xs token (12px/18px)
    "overflow-hidden",
  ],
  {
    variants: {
      // Theme matches the button variant it's used with
      theme: {
        // For primary/destructive buttons (dark background)
        dark: [
          "bg-white/10",
          "text-white/70",
        ],
        // For secondary/tertiary buttons (light background)
        light: [
          "bg-gray-cool-50",
          "border border-gray-cool-100",
          "text-gray-cool-400",
        ],
      },
    },
    defaultVariants: {
      theme: "dark",
    },
  }
)

export interface ShortcutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shortcutVariants> {
  /** The keyboard key to display (e.g., "G", "K", "Enter") */
  keys: string
  /** Whether to show the command (⌘) icon */
  showCommand?: boolean
}

const Shortcut = React.forwardRef<HTMLDivElement, ShortcutProps>(
  ({ className, theme, keys, showCommand = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(shortcutVariants({ theme }), "gap-xs", className)}
        {...props}
      >
        {showCommand && (
          <CommandIcon className="shrink-0" />
        )}
        <span className="text-center min-w-[10px]">{keys}</span>
      </div>
    )
  }
)
Shortcut.displayName = "Shortcut"

export { Shortcut, shortcutVariants }

