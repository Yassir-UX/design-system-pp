import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const labelVariants = cva(
  // Base styles - pill/badge shape with medium weight text
  [
    "inline-flex items-center justify-center",
    "font-body font-medium",
    "whitespace-nowrap",
    "rounded-full",
    "select-none",
  ],
  {
    variants: {
      // Color variants based on design tokens
      color: {
        // Brand/Purple
        brand: [
          "bg-brand-50 text-brand-700",
        ],
        // Gray/Neutral
        gray: [
          "bg-gray-cool-100 text-gray-cool-700",
        ],
        // Blue (default for email labels)
        blue: [
          "bg-blue-50 text-blue-700",
        ],
        // Success/Green
        success: [
          "bg-success-50 text-success-700",
        ],
        // Error/Red
        error: [
          "bg-error-50 text-error-700",
        ],
        // Warning/Orange
        warning: [
          "bg-warning-50 text-warning-700",
        ],
        // Indigo
        indigo: [
          "bg-indigo-50 text-indigo-700",
        ],
        // Purple
        purple: [
          "bg-purple-50 text-purple-700",
        ],
        // Pink
        pink: [
          "bg-pink-50 text-pink-700",
        ],
        // Cyan
        cyan: [
          "bg-cyan-50 text-cyan-700",
        ],
        // Teal
        teal: [
          "bg-teal-50 text-teal-700",
        ],
        // Orange
        orange: [
          "bg-orange-50 text-orange-700",
        ],
      },
      // Size variants
      size: {
        // Small: text-xs (12px/18px), compact padding
        sm: [
          "text-xs",
          "px-md py-xxs", // 8px horizontal, 2px vertical
          "h-[22px]",
        ],
        // Medium: text-xs (12px/18px), standard padding (default)
        md: [
          "text-xs",
          "px-lg py-xs", // 12px horizontal, 4px vertical
          "h-[26px]",
        ],
        // Large: text-sm (14px/20px), larger padding
        lg: [
          "text-sm",
          "px-lg py-xs", // 12px horizontal, 4px vertical
          "h-[28px]",
        ],
      },
      // Optional outline variant
      outline: {
        true: "bg-transparent ring-1 ring-inset",
        false: "",
      },
    },
    compoundVariants: [
      // Outline variants with matching ring colors
      { color: "brand", outline: true, className: "ring-brand-200 text-brand-700 bg-transparent" },
      { color: "gray", outline: true, className: "ring-gray-cool-200 text-gray-cool-700 bg-transparent" },
      { color: "blue", outline: true, className: "ring-blue-200 text-blue-700 bg-transparent" },
      { color: "success", outline: true, className: "ring-success-200 text-success-700 bg-transparent" },
      { color: "error", outline: true, className: "ring-error-200 text-error-700 bg-transparent" },
      { color: "warning", outline: true, className: "ring-warning-200 text-warning-700 bg-transparent" },
      { color: "indigo", outline: true, className: "ring-indigo-200 text-indigo-700 bg-transparent" },
      { color: "purple", outline: true, className: "ring-purple-200 text-purple-700 bg-transparent" },
      { color: "pink", outline: true, className: "ring-pink-200 text-pink-700 bg-transparent" },
      { color: "cyan", outline: true, className: "ring-cyan-200 text-cyan-700 bg-transparent" },
      { color: "teal", outline: true, className: "ring-teal-200 text-teal-700 bg-transparent" },
      { color: "orange", outline: true, className: "ring-orange-200 text-orange-700 bg-transparent" },
    ],
    defaultVariants: {
      color: "blue",
      size: "md",
      outline: false,
    },
  }
)

type LabelColor = "brand" | "gray" | "blue" | "success" | "error" | "warning" | "indigo" | "purple" | "pink" | "cyan" | "teal" | "orange"

export interface LabelProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Color variant */
  color?: LabelColor | null
  /** Size variant */
  size?: "sm" | "md" | "lg" | null
  /** Outline variant */
  outline?: boolean | null
  /** Icon displayed before the label text */
  iconStart?: React.ReactNode
  /** Icon displayed after the label text */
  iconEnd?: React.ReactNode
}

const Label = React.forwardRef<HTMLSpanElement, LabelProps>(
  (
    {
      className,
      color,
      size,
      outline,
      iconStart,
      iconEnd,
      children,
      ...props
    },
    ref
  ) => {
    // Icon size based on label size
    const iconSize = size === "lg" ? 14 : 12

    return (
      <span
        ref={ref}
        className={cn(labelVariants({ color, size, outline, className }))}
        {...props}
      >
        {iconStart && (
          <span
            className="inline-flex items-center justify-center shrink-0 mr-xs"
            style={{ width: iconSize, height: iconSize }}
          >
            {iconStart}
          </span>
        )}
        {children}
        {iconEnd && (
          <span
            className="inline-flex items-center justify-center shrink-0 ml-xs"
            style={{ width: iconSize, height: iconSize }}
          >
            {iconEnd}
          </span>
        )}
      </span>
    )
  }
)

Label.displayName = "Label"

export { Label, labelVariants }

