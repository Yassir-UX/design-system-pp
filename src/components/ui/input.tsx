import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Tooltip } from "./tooltip"

// Help circle icon component
const HelpCircleIcon = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <path d="M12 17h.01"/>
  </svg>
)

const inputContainerVariants = cva(
  // Base styles for input container matching Figma:
  // background: var(--Colors-Background-bg-primary, #FFF)
  // border-radius: var(--radius-md, 8px)
  // box-shadow: 0 1px 2px 0 var(--Colors-Effects-Shadows-shadow-xs, rgba(10, 13, 18, 0.05))
  [
    "bg-white",                                        // bg-primary: #FFFFFF
    "flex items-center",
    "overflow-hidden",
    "transition-all duration-200",
    "w-full",
  ],
  {
    variants: {
      variant: {
        // Default state - border: 1px solid var(--Colors-Border-border-secondary, #DCDFEA)
        default: [
          "border border-[#DCDFEA]",                   // border-secondary: #DCDFEA
          "shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]", // shadow-xs
          "hover:border-gray-cool-300",
          "focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20",
        ],
        // Focus state - border: 1px solid var(--Colors-Border-border-brand, #43389B)
        focus: [
          "border border-brand-500",                   // border-brand: #43389B
          "shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]", // shadow-xs
          "ring-2 ring-brand-500/20",
        ],
        // Filled state - same as default
        filled: [
          "border border-[#DCDFEA]",                   // border-secondary: #DCDFEA
          "shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]", // shadow-xs
          "hover:border-gray-cool-300",
          "focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20",
        ],
        // Error state - border: 1px solid var(--Colors-Border-border-error, #F04438)
        error: [
          "border border-error-500",                   // border-error: #F04438
          "shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]", // shadow-xs
          "hover:border-error-600",
          "focus-within:border-error-500 focus-within:ring-2 focus-within:ring-error-500/20",
        ],
        // Disabled state - background: var(--Colors-Background-bg-disabled-subtle, #F6F6F9)
        disabled: [
          "border border-[#DCDFEA]",                   // border-secondary: #DCDFEA
          "bg-gray-cool-50",                           // bg-disabled-subtle: #F6F6F9
          "cursor-not-allowed",
          "shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]", // shadow-xs
        ],
      },
      inputSize: {
        // Small: 36px height, padding 10px (spacing.md-10px)
        sm: "h-[36px] px-[10px] py-[8px] rounded-md gap-md",
        // Medium: 40px height, padding 12px (spacing.lg)
        md: "h-[40px] px-[12px] py-[10px] rounded-md gap-md",
        // Large: 44px height, padding 14px (spacing.lg-14px)
        lg: "h-[44px] px-[14px] py-[10px] rounded-md gap-md",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "lg",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputContainerVariants> {
  /** Icon displayed at the start of the input */
  iconStart?: React.ReactNode
  /** Icon displayed at the end of the input */
  iconEnd?: React.ReactNode
  /** Show help icon at the end of input */
  helpIcon?: boolean
  /** Tooltip content for the help icon */
  helpTooltip?: React.ReactNode
  /** Callback when help icon is clicked */
  onHelpClick?: () => void
  /** Error message to display below the input */
  error?: string
  /** Hint text to display below the input */
  hint?: string
  /** Label for the input */
  label?: string
  /** Whether the input is required */
  required?: boolean
  /** Keyboard shortcut to display */
  shortcut?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      variant,
      inputSize,
      iconStart,
      iconEnd,
      helpIcon,
      helpTooltip,
      onHelpClick,
      error,
      hint,
      label,
      required,
      shortcut,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if not provided
    const inputId = id || React.useId()
    
    // If there's an error, force the error variant
    // If disabled, force the disabled variant
    const resolvedVariant = disabled ? "disabled" : error ? "error" : variant

    // Icon sizes based on input size
    const getIconSize = () => {
      switch (inputSize) {
        case "sm": return 20
        case "md": return 22
        case "lg": return 24
        default: return 24
      }
    }

    // Text size based on input size: sm uses text-sm, md/lg use text-md
    const getTextSizeClass = () => {
      switch (inputSize) {
        case "sm": return "text-sm"
        case "md": return "text-md"
        case "lg": return "text-md"
        default: return "text-md"
      }
    }

    const iconSize = getIconSize()
    const helpIconSize = 16
    const textSizeClass = getTextSizeClass()

    return (
      <div className="flex flex-col gap-sm w-full">
        {/* Label */}
        {label && (
          <div className="flex items-start gap-xxs">
            <label
              htmlFor={inputId}
              className={cn(
                "text-sm font-medium text-gray-cool-700",
                disabled && "text-gray-cool-400"
              )}
            >
              {label}
            </label>
            {required && (
              <span className="text-sm font-medium text-brand-700">*</span>
            )}
          </div>
        )}

        {/* Input container */}
        <div
          className={cn(
            inputContainerVariants({ variant: resolvedVariant, inputSize }),
            className
          )}
        >
          {/* Start icon */}
          {iconStart && (
            <span
              className={cn(
                "shrink-0 flex items-center justify-center text-gray-cool-400",
                disabled && "text-gray-cool-300"
              )}
              style={{ width: iconSize, height: iconSize }}
            >
              {iconStart}
            </span>
          )}

          {/* Input element */}
          <input
            type={type}
            id={inputId}
            className={cn(
              "flex-1 min-w-0",
              "bg-transparent border-0 outline-none",
              "font-body font-normal",
              textSizeClass,
              "text-gray-cool-900",
              "placeholder:text-gray-cool-400",
              disabled && "cursor-not-allowed text-gray-cool-400 placeholder:text-gray-cool-300"
            )}
            ref={ref}
            disabled={disabled}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />

          {/* End icon */}
          {iconEnd && (
            <span
              className={cn(
                "shrink-0 flex items-center justify-center text-gray-cool-400",
                disabled && "text-gray-cool-300",
                error && "text-error-500"
              )}
              style={{ width: iconSize, height: iconSize }}
            >
              {iconEnd}
            </span>
          )}

          {/* Help icon - red in error state */}
          {helpIcon && (
            helpTooltip ? (
              <Tooltip content={helpTooltip} side="right" showArrow variant="dark">
                <button
                  type="button"
                  onClick={onHelpClick}
                  disabled={disabled}
                  className={cn(
                    "shrink-0 flex items-center justify-center",
                    "transition-colors",
                    // Default: gray, Error: red, Disabled: light gray
                    error 
                      ? "text-error-500 hover:text-error-600" 
                      : "text-gray-cool-300 hover:text-gray-cool-400",
                    disabled && "cursor-not-allowed text-gray-cool-300 hover:text-gray-cool-300"
                  )}
                  aria-label="Help"
                >
                  <HelpCircleIcon size={helpIconSize} />
                </button>
              </Tooltip>
            ) : (
              <button
                type="button"
                onClick={onHelpClick}
                disabled={disabled}
                className={cn(
                  "shrink-0 flex items-center justify-center",
                  "transition-colors",
                  // Default: gray, Error: red, Disabled: light gray
                  error 
                    ? "text-error-500 hover:text-error-600" 
                    : "text-gray-cool-300 hover:text-gray-cool-400",
                  disabled && "cursor-not-allowed text-gray-cool-300 hover:text-gray-cool-300"
                )}
                aria-label="Help"
              >
                <HelpCircleIcon size={helpIconSize} />
              </button>
            )
          )}

          {/* Shortcut */}
          {shortcut && (
            <div className={cn(
              "shrink-0 flex items-center gap-xs rounded-xs px-xs py-0 overflow-hidden",
              disabled 
                ? "bg-white border border-gray-cool-200" 
                : "bg-gray-cool-50 border border-gray-cool-100"
            )}>
              <svg 
                width={12} 
                height={12} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={cn(
                  disabled ? "text-gray-cool-400" : "text-gray-cool-500"
                )}
              >
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
              </svg>
              <span className={cn(
                "text-xs font-normal w-[10px] text-center",
                disabled ? "text-gray-cool-400" : "text-gray-cool-500"
              )}>
                {shortcut}
              </span>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm font-normal text-error-600"
          >
            {error}
          </p>
        )}

        {/* Hint text (only show if no error) */}
        {hint && !error && (
          <p
            id={`${inputId}-hint`}
            className="text-sm font-normal text-gray-cool-500"
          >
            {hint}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

// ============================================================================
// BorderlessInput Component
// ============================================================================

export interface BorderlessInputProps {
  /** The input value */
  value?: string
  /** Default value (for uncontrolled mode) */
  defaultValue?: string
  /** Placeholder text */
  placeholder?: string
  /** Whether this is a multiline input (uses contentEditable div) */
  multiline?: boolean
  /** Callback when value changes */
  onChange?: (value: string) => void
  /** Prefix text (e.g., "Re:" for reply subjects) */
  prefix?: string
  /** Additional className */
  className?: string
  /** Whether the input is disabled */
  disabled?: boolean
  /** Auto focus on mount */
  autoFocus?: boolean
}

const BorderlessInput = React.forwardRef<
  HTMLInputElement | HTMLDivElement,
  BorderlessInputProps
>(
  (
    {
      value,
      defaultValue = "",
      placeholder,
      multiline = false,
      onChange,
      prefix,
      className,
      disabled = false,
      autoFocus = false,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const contentEditableRef = React.useRef<HTMLDivElement | null>(null)
    
    // Use controlled or uncontrolled value
    const currentValue = value !== undefined ? value : internalValue

    const handleChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }

    // Set initial content for contentEditable
    React.useEffect(() => {
      if (multiline && contentEditableRef.current && defaultValue && !contentEditableRef.current.textContent) {
        contentEditableRef.current.textContent = defaultValue
      }
    }, [multiline, defaultValue])

    // Auto focus
    React.useEffect(() => {
      if (autoFocus) {
        if (multiline && contentEditableRef.current) {
          contentEditableRef.current.focus()
        }
      }
    }, [autoFocus, multiline])

    const baseStyles = cn(
      "w-full",
      "text-sm font-normal text-gray-cool-700",
      "bg-transparent border-0 outline-none",
      "placeholder:text-gray-cool-400",
      disabled && "opacity-50 cursor-not-allowed",
      className
    )

    // Multiline variant using contentEditable
    if (multiline) {
      return (
        <div
          ref={(node) => {
            // Handle both refs
            contentEditableRef.current = node
            if (typeof ref === "function") {
              ref(node)
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
            }
          }}
          contentEditable={!disabled}
          suppressContentEditableWarning
          onInput={(e) => handleChange(e.currentTarget.textContent || "")}
          data-placeholder={placeholder}
          className={cn(
            baseStyles,
            "min-h-[24px]",
            "whitespace-pre-wrap break-words",
            // Placeholder styling when empty
            "empty:before:content-[attr(data-placeholder)] empty:before:text-gray-cool-400"
          )}
        />
      )
    }

    // Single-line variant using input
    return (
      <div className="flex items-center gap-xs w-full">
        {prefix && (
          <span className="text-sm font-medium text-gray-cool-400 shrink-0">
            {prefix}
          </span>
        )}
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          type="text"
          value={currentValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          className={cn(baseStyles, "font-medium")}
        />
      </div>
    )
  }
)

BorderlessInput.displayName = "BorderlessInput"

export { Input, inputContainerVariants, BorderlessInput }
