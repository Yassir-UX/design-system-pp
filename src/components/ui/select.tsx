import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ChevronDown, Check } from '@untitledui/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback, AvatarStack } from './avatar';

const selectTriggerVariants = cva(
  // Base styles matching Input component
  [
    "bg-white",
    "flex items-center",
    "overflow-hidden",
    "transition-all duration-200",
    "w-full",
    "cursor-pointer",
    "focus:outline-none",
  ],
  {
    variants: {
      variant: {
        // Default state - same as Input default
        default: [
          "border border-[#DCDFEA]",
          "shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]",
          "hover:border-gray-cool-300",
          "focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
          "data-[state=open]:border-brand-500 data-[state=open]:ring-2 data-[state=open]:ring-brand-500/20",
        ],
        // Error state
        error: [
          "border border-error-500",
          "shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]",
          "hover:border-error-600",
          "focus:border-error-500 focus:ring-2 focus:ring-error-500/20",
        ],
        // Disabled state
        disabled: [
          "border border-[#DCDFEA]",
          "bg-gray-cool-50",
          "cursor-not-allowed",
          "shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]",
        ],
      },
      selectSize: {
        // Small: 36px height, equal padding on all sides
        sm: "h-[36px] p-md rounded-md gap-md",
        // Medium: 40px height, equal padding on all sides
        md: "h-[40px] p-[10px] rounded-md gap-md",
        // Large: 44px height, equal padding on all sides
        lg: "h-[44px] p-lg rounded-md gap-md",
      },
    },
    defaultVariants: {
      variant: "default",
      selectSize: "lg",
    },
  }
);

export interface Account {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface SelectProps extends VariantProps<typeof selectTriggerVariants> {
  /** Currently selected account(s) */
  selectedAccounts: Account[];
  /** List of available accounts */
  accounts: Account[];
  /** Callback when account selection changes */
  onAccountChange?: (accounts: Account[]) => void;
  /** Enable multi-select mode */
  multiSelect?: boolean;
  /** Placeholder text when no account is selected */
  placeholder?: string;
  /** Label for the select */
  label?: string;
  /** Whether the select is required */
  required?: boolean;
  /** Error message to display below the select */
  error?: string;
  /** Hint text to display below the select */
  hint?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
}

export function Select({
  selectedAccounts,
  accounts,
  onAccountChange,
  multiSelect = false,
  placeholder = "Select account...",
  label,
  required,
  error,
  hint,
  disabled = false,
  variant,
  selectSize,
  className,
}: SelectProps) {
  const handleAccountClick = (account: Account) => {
    if (disabled) return;
    
    if (multiSelect) {
      // Toggle account in selection
      const isSelected = selectedAccounts.some((a) => a.id === account.id);
      if (isSelected) {
        // Remove from selection (but keep at least one selected)
        if (selectedAccounts.length > 1) {
          onAccountChange?.(selectedAccounts.filter((a) => a.id !== account.id));
        }
      } else {
        // Add to selection
        onAccountChange?.([...selectedAccounts, account]);
      }
    } else {
      // Single select mode
      onAccountChange?.([account]);
    }
  };

  const isAccountSelected = (account: Account) =>
    selectedAccounts.some((a) => a.id === account.id);

  // Prepare avatars for stack
  const stackAvatars = selectedAccounts.map((account) => ({
    src: account.avatarUrl,
    alt: account.name,
    fallback: account.name.charAt(0).toUpperCase(),
  }));

  // Resolve variant based on state
  const resolvedVariant = disabled ? "disabled" : error ? "error" : variant;

  // Get avatar size based on select size
  const getAvatarSize = () => {
    switch (selectSize) {
      case "sm": return "xs";
      case "md": return "sm";
      case "lg": return "sm";
      default: return "sm";
    }
  };

  // Get icon size based on select size
  const getIconSize = () => {
    switch (selectSize) {
      case "sm": return 16;
      case "md": return 18;
      case "lg": return 20;
      default: return 20;
    }
  };

  // Get text size class based on select size
  const getTextSizeClass = () => {
    switch (selectSize) {
      case "sm": return "text-sm";
      case "md": return "text-md";
      case "lg": return "text-md";
      default: return "text-md";
    }
  };

  const avatarSize = getAvatarSize();
  const iconSize = getIconSize();
  const textSizeClass = getTextSizeClass();

  // Generate a unique ID for accessibility
  const selectId = React.useId();

  return (
    <div className="flex flex-col gap-sm w-full">
      {/* Label */}
      {label && (
        <div className="flex items-start gap-xxs">
          <label
            htmlFor={selectId}
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

      {/* Select trigger */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <button
            id={selectId}
            className={cn(
              selectTriggerVariants({ variant: resolvedVariant, selectSize }),
              className
            )}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={
              error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined
            }
          >
            {/* Avatar Stack - max 2 visible */}
            {selectedAccounts.length === 0 ? (
              <Avatar size={avatarSize}>
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
            ) : (
              <AvatarStack avatars={stackAvatars} size={avatarSize} max={2} />
            )}

            {/* Account name + others count or placeholder */}
            <span
              className={cn(
                "truncate grow text-left font-medium",
                textSizeClass,
                selectedAccounts.length > 0
                  ? disabled
                    ? "text-gray-cool-400"
                    : "text-gray-cool-700"
                  : "text-gray-cool-400"
              )}
            >
              {selectedAccounts.length > 0 ? (
                <>
                  {selectedAccounts[0].name}
                  {selectedAccounts.length > 1 && (
                    <span className="text-gray-cool-400 font-normal">
                      {" "}
                      +{selectedAccounts.length - 1}
                    </span>
                  )}
                </>
              ) : (
                placeholder
              )}
            </span>

            {/* Chevron */}
            <ChevronDown
              size={iconSize}
              className={cn(
                "shrink-0 transition-transform",
                disabled ? "text-gray-cool-300" : "text-gray-cool-400"
              )}
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-[var(--radix-dropdown-menu-trigger-width)]"
        >
          {accounts.map((account) => {
            const isSelected = isAccountSelected(account);
            return (
              <DropdownMenuItem
                key={account.id}
                onClick={() => handleAccountClick(account)}
                className="flex items-center gap-md"
              >
                {/* Avatar */}
                <Avatar size="sm">
                  {account.avatarUrl && (
                    <AvatarImage src={account.avatarUrl} alt={account.name} />
                  )}
                  <AvatarFallback>
                    {account.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Account Name & Email */}
                <div className="flex flex-col items-start grow min-w-0">
                  <span className="text-sm font-medium text-gray-cool-700 truncate w-full">
                    {account.name}
                  </span>
                  <span className="text-xs text-gray-cool-500 truncate w-full">
                    {account.email}
                  </span>
                </div>

                {/* Check mark for selected */}
                {isSelected && (
                  <Check size={16} className="text-brand-500 shrink-0" />
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Error message */}
      {error && (
        <p
          id={`${selectId}-error`}
          className="text-sm font-normal text-error-600"
        >
          {error}
        </p>
      )}

      {/* Hint text (only show if no error) */}
      {hint && !error && (
        <p
          id={`${selectId}-hint`}
          className="text-sm font-normal text-gray-cool-500"
        >
          {hint}
        </p>
      )}
    </div>
  );
}

export { selectTriggerVariants };
export default Select;

