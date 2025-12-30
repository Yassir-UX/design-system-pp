import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Shortcut } from "./shortcut"

// Spinner component for loading state
const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

// Icon size map for clarity
const ICON_SIZES = { sm: 18, md: 20, lg: 20, icon: 20 } as const

const buttonVariants = cva(
  // Base styles matching Figma - using typography tokens
  [
    "inline-flex items-center justify-center",
    "whitespace-nowrap",
    "font-body font-medium",
    "text-sm",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none",
    // Disabled state from Figma - using token classes
    "disabled:bg-gray-cool-100 disabled:text-gray-cool-400",
    "disabled:shadow-[inset_0_0_0_1px_rgba(125,137,176,0.2),inset_0_-2px_0_0_rgba(64,73,104,0.1),0_1px_2px_0_rgba(10,13,18,0.05)]",
    "disabled:after:hidden",
    "relative",
  ],
  {
    variants: {
      variant: {
        // Primary - Brand purple with white text
        primary: [
          "bg-brand-500 text-white",
          "hover:bg-brand-600",
          "active:bg-brand-700",
          // Skeuomorphic shadow from Figma
          "shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]",
          "after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none",
          "after:shadow-[inset_0_0_0_1px_rgba(125,137,176,0.2),inset_0_-2px_0_0_rgba(64,73,104,0.1)]",
          "focus-visible:ring-brand-500",
        ],
        // Secondary gray - White background with skeuomorphic shadow
        "secondary-gray": [
          // Default state
          "bg-white text-gray-cool-700",
          "shadow-[inset_0_0_0_1px_rgba(125,137,176,0.2),inset_0_-2px_0_0_rgba(64,73,104,0.1),0_1px_2px_0_rgba(10,13,18,0.05)]",
          // Hover state
          "hover:bg-gray-cool-50",
          // Active state
          "active:bg-gray-cool-100",
          // Focus
          "focus-visible:ring-brand-500",
          // Disabled state - specific for secondary
          "disabled:bg-gray-cool-50 disabled:border disabled:border-gray-cool-200 disabled:text-gray-cool-400",
          "disabled:shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]",
        ],
        // Tertiary gray - No background, just text
        "tertiary-gray": [
          "bg-transparent text-gray-cool-600",
          "hover:bg-gray-cool-50",
          "active:bg-gray-cool-100",
          "focus-visible:ring-brand-500",
          // Disabled state - transparent bg, muted text, no shadow
          "disabled:bg-transparent disabled:text-gray-cool-300 disabled:shadow-none",
        ],
        // Link gray - Text link style
        "link-gray": [
          "bg-transparent text-gray-cool-600",
          "hover:text-gray-cool-700",
          "active:text-gray-cool-800",
          "focus-visible:ring-brand-500",
          "p-0 h-auto",
        ],
        // Link color - Brand color text link
        "link-color": [
          "bg-transparent text-brand-500",
          "hover:text-brand-600",
          "active:text-brand-700",
          "focus-visible:ring-brand-500",
          "p-0 h-auto",
        ],
        // Destructive - Error/danger style
        destructive: [
          "bg-error-600 text-white",
          "hover:bg-error-700",
          "active:bg-error-800",
          "shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]",
          "after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none",
          "after:shadow-[inset_0_0_0_1px_rgba(125,137,176,0.2),inset_0_-2px_0_0_rgba(64,73,104,0.1)]",
          "focus-visible:ring-error-600",
        ],
      },
      size: {
        // Small: 36px height, gap xs (4px), rounded-md (8px)
        sm: [
          "h-[36px] rounded-md",
          "px-[14px] py-md",  // px-[14px] = lg 14px token value
          "gap-xs",
        ],
        // Medium: 40px height, gap sm (6px), rounded-md (8px)
        md: [
          "h-[40px] rounded-md",
          "px-[14px] py-[10px]",  // px-[14px] = lg 14px, py-[10px] = md 10px token values
          "gap-sm",
        ],
        // Large: 44px height, gap sm (6px), rounded-md (8px)
        lg: [
          "h-[44px] rounded-md",
          "px-xl py-[10px]",  // px-xl = 16px, py-[10px] = md 10px token value
          "gap-sm",
          "text-md",
        ],
        // Icon only - square button
        icon: [
          "rounded-md p-0",
        ],
      },
      // Icon mode for icon-only buttons
      iconMode: {
        default: "",
        only: "",
      },
      // Full width variant
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      // Icon only sizes
      { size: "sm", iconMode: "only", className: "h-[36px] w-[36px]" },
      { size: "md", iconMode: "only", className: "h-[40px] w-[40px]" },
      { size: "lg", iconMode: "only", className: "h-[44px] w-[44px]" },
      { size: "icon", className: "h-[40px] w-[40px]" },
      // Link variants don't need height
      { variant: "link-gray", className: "h-auto px-0 py-0" },
      { variant: "link-color", className: "h-auto px-0 py-0" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      iconMode: "default",
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a child component (for composition with Link, etc.) */
  asChild?: boolean
  /** Icon displayed before the button text */
  iconStart?: React.ReactNode
  /** Icon displayed after the button text */
  iconEnd?: React.ReactNode
  /** Keyboard shortcut to display (e.g., "G", "K") */
  shortcut?: string
  /** Whether to show command icon with shortcut (default: true) */
  shortcutShowCommand?: boolean
  /** Show loading spinner and disable interactions */
  isLoading?: boolean
  /** Text to show while loading (replaces children) */
  loadingText?: string
  /** Stroke width for icons (default: 2) */
  iconStrokeWidth?: number
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      iconStart,
      iconEnd,
      shortcut,
      shortcutShowCommand = true,
      isLoading = false,
      loadingText,
      iconStrokeWidth = 2,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Determine if this is an icon-only button
    const isIconOnly = (iconStart || iconEnd) && !children && !shortcut && !isLoading
    const iconMode = isIconOnly ? "only" : "default"

    // Icon size based on button size
    const iconSize = ICON_SIZES[size ?? "md"]

    // Disable button when loading
    const isDisabled = disabled || isLoading

    // Determine shortcut theme based on button variant
    // Use light theme when disabled for better visibility
    const shortcutTheme = isDisabled 
      ? "light" 
      : (variant === "primary" || variant === "destructive" ? "dark" : "light")

    // Use Slot for asChild pattern
    const Comp = asChild ? Slot : "button"

    // Clone icon element to override strokeWidth
    const renderIcon = (icon: React.ReactNode) => {
      if (React.isValidElement(icon)) {
        return React.cloneElement(icon as React.ReactElement<{ strokeWidth?: number }>, {
          strokeWidth: iconStrokeWidth,
        })
      }
      return icon
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, iconMode, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {isLoading && (
          <span
            className="inline-flex items-center justify-center shrink-0"
            style={{ width: iconSize, height: iconSize }}
          >
            <Spinner className="w-full h-full" />
          </span>
        )}
        {!isLoading && iconStart && (
          <span
            className="inline-flex items-center justify-center shrink-0"
            style={{ width: iconSize, height: iconSize }}
          >
            {renderIcon(iconStart)}
          </span>
        )}
        {(children || loadingText) && (
          <span className="inline-flex items-center">
            {isLoading && loadingText ? loadingText : children}
          </span>
        )}
        {!isLoading && iconEnd && (
          <span
            className="inline-flex items-center justify-center shrink-0"
            style={{ width: iconSize, height: iconSize }}
          >
            {renderIcon(iconEnd)}
          </span>
        )}
        {!isLoading && shortcut && (
          <Shortcut
            keys={shortcut}
            theme={shortcutTheme}
            showCommand={shortcutShowCommand}
          />
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
