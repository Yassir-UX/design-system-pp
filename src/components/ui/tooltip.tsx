import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Shortcut } from "./shortcut"

const TooltipProvider = TooltipPrimitive.Provider

const TooltipRoot = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const tooltipContentVariants = cva(
  [
    // Base styles
    "z-50",
    "font-body font-medium",
    "text-xs", // 12px/18px from design tokens
    // Animation
    "animate-in fade-in-0 zoom-in-95",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    "data-[side=bottom]:slide-in-from-top-2",
    "data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2",
    "data-[side=top]:slide-in-from-bottom-2",
  ],
  {
    variants: {
      variant: {
        dark: [
          "bg-gray-cool-800",
          "text-white",
          "rounded-md",
          "px-lg py-md",
          "shadow-lg",
          "border border-gray-cool-700",
        ],
        light: [
          "bg-white",
          "text-gray-cool-700",
          "rounded-md",
          "px-lg py-md",
          "shadow-lg",
          "border border-gray-cool-200",
        ],
      },
      size: {
        sm: "px-sm py-xs text-xs",
        md: "px-lg py-md text-xs",
        lg: "px-xl py-lg text-sm",
      },
    },
    defaultVariants: {
      variant: "dark",
      size: "sm",
    },
  }
)

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipContentVariants> {
  /** Whether to show the arrow pointing to the trigger */
  showArrow?: boolean
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(
  (
    {
      className,
      sideOffset = 8,
      variant = "dark",
      size,
      showArrow = false,
      side = "top",
      children,
      ...props
    },
    ref
  ) => {
    const arrowColor = variant === "dark" ? "#30374F" : "#FFFFFF"
    
    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          side={side}
          sideOffset={sideOffset}
          className={cn(
            "relative",
            tooltipContentVariants({ variant, size }),
            className
          )}
          {...props}
        >
          {children}
          {showArrow && (
            <TooltipPrimitive.Arrow
              width={12}
              height={6}
              style={{ fill: arrowColor }}
            />
          )}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    )
  }
)
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Compound component for simpler usage
export interface TooltipProps {
  /** The content to show in the tooltip */
  content: React.ReactNode
  /** The element that triggers the tooltip */
  children: React.ReactNode
  /** Visual variant of the tooltip */
  variant?: "dark" | "light"
  /** Size of the tooltip */
  size?: "sm" | "md" | "lg"
  /** Whether to show the arrow */
  showArrow?: boolean
  /** Side of the trigger to show the tooltip */
  side?: "top" | "right" | "bottom" | "left"
  /** Alignment of the tooltip relative to the trigger */
  align?: "start" | "center" | "end"
  /** Distance from the trigger in pixels */
  sideOffset?: number
  /** Delay before showing tooltip in ms (default: 500ms) */
  delayDuration?: number
  /** Delay before hiding when moving between tooltips (default: 300ms) */
  skipDelayDuration?: number
  /** Whether the tooltip is open (controlled) */
  open?: boolean
  /** Callback when open state changes (controlled) */
  onOpenChange?: (open: boolean) => void
  /** Additional className for the content */
  contentClassName?: string
  /** Keyboard shortcut to display (e.g., "R", "E") */
  shortcut?: string
}

const Tooltip = ({
  content,
  children,
  variant = "dark",
  size = "sm",
  showArrow = false,
  side = "top",
  align = "center",
  sideOffset = 8,
  delayDuration = 500,
  skipDelayDuration = 300,
  open,
  onOpenChange,
  contentClassName,
  shortcut,
}: TooltipProps) => {
  return (
    <TooltipProvider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
      <TooltipRoot open={open} onOpenChange={onOpenChange}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          variant={variant}
          size={size}
          showArrow={showArrow}
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={contentClassName}
        >
          {shortcut ? (
            <span className="flex items-center gap-md">
              {content}
              <Shortcut keys={shortcut} showCommand={false} theme="dark" />
            </span>
          ) : (
            content
          )}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  )
}

export {
  Tooltip,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  tooltipContentVariants,
}
