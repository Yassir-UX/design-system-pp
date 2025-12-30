import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cn } from "@/lib/utils"
import { Check, Minus } from "@untitledui/icons"

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** Whether the checkbox is in an indeterminate state */
  indeterminate?: boolean
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, indeterminate, checked, onCheckedChange, ...props }, ref) => {
  // Handle indeterminate state
  const isIndeterminate = indeterminate && checked !== true
  const checkboxState = isIndeterminate ? "indeterminate" : checked

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={checkboxState}
      onCheckedChange={onCheckedChange}
      className={cn(
        // Base styles
        "peer relative inline-flex shrink-0 items-center justify-center",
        "size-4 rounded-xs",
        "transition-all duration-150 ease-out",
        "cursor-pointer",
        // Border and background - unchecked
        "border border-gray-cool-300 bg-white",
        // Hover state - unchecked
        "hover:border-blue-light-500 hover:bg-blue-light-50",
        // Checked state - filled with blue-light
        "data-[state=checked]:border-blue-light-500 data-[state=checked]:bg-blue-light-500",
        // Checked hover
        "data-[state=checked]:hover:border-blue-light-600 data-[state=checked]:hover:bg-blue-light-600",
        // Indeterminate state - outlined only (not filled)
        "data-[state=indeterminate]:border-blue-light-500 data-[state=indeterminate]:bg-white",
        // Indeterminate hover
        "data-[state=indeterminate]:hover:border-blue-light-600 data-[state=indeterminate]:hover:bg-blue-light-50",
        // Focus state
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-light-500/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        // Disabled state
        "disabled:cursor-not-allowed",
        "disabled:border-gray-cool-200 disabled:bg-gray-cool-50",
        "disabled:data-[state=checked]:bg-gray-cool-100 disabled:data-[state=checked]:border-gray-cool-200",
        "disabled:data-[state=indeterminate]:bg-white disabled:data-[state=indeterminate]:border-gray-cool-200",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          "flex items-center justify-center",
          // Checked state - white icon on filled background
          "text-white",
          // Indeterminate state - blue icon on white background
          "[[data-state=indeterminate]_&]:text-blue-light-500",
          // Disabled indicator color
          "[[data-disabled]_&]:text-gray-cool-400"
        )}
      >
        {isIndeterminate ? (
          <Minus size={12} strokeWidth={2.5} />
        ) : (
          <Check size={12} strokeWidth={2.5} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
