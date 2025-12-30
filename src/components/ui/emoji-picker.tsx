import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { EmojiPicker as FrimousseEmojiPicker } from "frimousse"
import { cn } from "@/lib/utils"
import { FaceSmile, SearchMd } from "@untitledui/icons"

// ============================================================================
// Reaction Badge Component
// ============================================================================

export interface ReactionBadgeProps {
  /** The emoji to display */
  emoji: string
  /** The reaction count */
  count?: number
  /** Click handler - typically used to toggle the reaction */
  onClick?: () => void
  /** Whether the current user has reacted (for internal logic, not visual) */
  hasReacted?: boolean
  /** Additional className */
  className?: string
}

const ReactionBadge = React.forwardRef<HTMLButtonElement, ReactionBadgeProps>(
  ({ emoji, count, onClick, hasReacted, className }, ref) => (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      title={hasReacted ? "Click to remove your reaction" : "Click to react"}
      className={cn(
        "inline-flex items-center gap-xs",
        "px-md py-xs rounded-full",
        "bg-gray-cool-100 hover:bg-gray-cool-200",
        "transition-all duration-150",
        className
      )}
    >
      <span className="text-[18px] leading-none">{emoji}</span>
      {count !== undefined && count > 0 && (
        <span className="text-sm font-medium text-gray-cool-600">{count}</span>
      )}
    </button>
  )
)
ReactionBadge.displayName = "ReactionBadge"

// ============================================================================
// Types
// ============================================================================

export interface EmojiPickerProps {
  /** Callback when an emoji is selected */
  onEmojiSelect: (emoji: string) => void
  /** Whether the picker is open */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** The trigger element */
  children?: React.ReactNode
  /** Alignment of the popover */
  align?: "start" | "center" | "end"
  /** Side of the popover */
  side?: "top" | "right" | "bottom" | "left"
}

// ============================================================================
// Most Used Emojis
// ============================================================================

const DEFAULT_EMOJIS = [
  "👍",
  "❤️",
  "😂",
  "🎉",
  "🔥",
  "👀",
  "✨",
  "🙌",
  "💯",
  "👏",
  "😍",
  "🤔",
  "😊",
  "🚀",
  "💪",
  "🙏",
]

const STORAGE_KEY = "emoji-picker-most-used"
const MAX_MOST_USED = 16

/** Get most used emojis from localStorage */
const getMostUsedEmojis = (): string[] => {
  if (typeof window === "undefined") return DEFAULT_EMOJIS
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.slice(0, MAX_MOST_USED)
      }
    }
  } catch {
    // Ignore errors
  }
  return DEFAULT_EMOJIS
}

/** Add emoji to most used list */
const addToMostUsed = (emoji: string): void => {
  if (typeof window === "undefined") return
  try {
    const current = getMostUsedEmojis()
    // Remove if already exists
    const filtered = current.filter((e) => e !== emoji)
    // Add to front
    const updated = [emoji, ...filtered].slice(0, MAX_MOST_USED)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // Ignore errors
  }
}

// ============================================================================
// Emoji Picker Content Component
// ============================================================================

interface EmojiPickerContentProps {
  onEmojiSelect: (emoji: string) => void
}

const EmojiPickerContent = ({ onEmojiSelect }: EmojiPickerContentProps) => {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [mostUsedEmojis, setMostUsedEmojis] = React.useState<string[]>(DEFAULT_EMOJIS)

  // Load most used emojis on mount
  React.useEffect(() => {
    setMostUsedEmojis(getMostUsedEmojis())
  }, [])

  const handleEmojiSelect = (emoji: string) => {
    addToMostUsed(emoji)
    setMostUsedEmojis(getMostUsedEmojis())
    onEmojiSelect(emoji)
  }

  return (
    <div
      className={cn(
        "w-[352px] rounded-xl",
        "border shadow-lg",
        "bg-white border-gray-cool-200"
      )}
    >
      <FrimousseEmojiPicker.Root
        onEmojiSelect={(emoji) => {
          handleEmojiSelect(emoji.emoji)
        }}
        className="flex flex-col h-[400px]"
      >
        {/* Search Input */}
        <div className="p-lg bg-white rounded-t-xl">
          <div
            className={cn(
              "flex items-center gap-md px-lg py-md rounded-lg border",
              "transition-all duration-200",
              "bg-gray-cool-50 border-gray-cool-200",
              "focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20"
            )}
          >
            <SearchMd size={20} className="text-gray-cool-400" />
            <FrimousseEmojiPicker.Search
              placeholder="Search all emoji"
              className="flex-1 bg-transparent border-0 outline-none text-sm font-medium text-gray-cool-900 placeholder:text-gray-cool-400"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Emoji Viewport */}
        <FrimousseEmojiPicker.Viewport
          className={cn(
            "flex-1 overflow-y-auto px-lg pb-lg bg-white rounded-b-xl",
            // Custom scrollbar styling
            "[&::-webkit-scrollbar]:w-2",
            "[&::-webkit-scrollbar-track]:bg-transparent",
            "[&::-webkit-scrollbar-track]:rounded-full",
            "[&::-webkit-scrollbar-track]:my-2",
            "[&::-webkit-scrollbar-thumb]:bg-gray-cool-200",
            "[&::-webkit-scrollbar-thumb]:rounded-full",
            "[&::-webkit-scrollbar-thumb]:border-2",
            "[&::-webkit-scrollbar-thumb]:border-transparent",
            "[&::-webkit-scrollbar-thumb]:bg-clip-padding",
            "hover:[&::-webkit-scrollbar-thumb]:bg-gray-cool-300"
          )}
        >
          <FrimousseEmojiPicker.Loading>
            <div className="flex items-center justify-center h-full text-gray-cool-500">
              <span className="text-sm font-medium">Loading...</span>
            </div>
          </FrimousseEmojiPicker.Loading>

          <FrimousseEmojiPicker.Empty>
            <div className="flex items-center justify-center h-full text-gray-cool-500">
              <span className="text-sm font-medium">No emoji found.</span>
            </div>
          </FrimousseEmojiPicker.Empty>

          {/* Most Used Section - Only show when not searching */}
          {!searchQuery && (
            <div className="mb-lg">
              <div className="text-xs font-semibold py-sm sticky top-0 text-gray-cool-600 bg-white">
                Most used
              </div>
              <div className="grid grid-cols-8 gap-xs">
                {mostUsedEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleEmojiSelect(emoji)}
                    className={cn(
                      "flex items-center justify-center w-[38px] h-[38px] rounded-md text-[24px]",
                      "transition-all duration-150",
                      "hover:bg-gray-cool-100 active:bg-gray-cool-200"
                    )}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          <FrimousseEmojiPicker.List
            className="flex flex-col gap-lg"
            components={{
              CategoryHeader: ({ category }) => (
                <div className="text-xs font-semibold py-sm sticky top-0 text-gray-cool-600 bg-white">
                  {category.label}
                </div>
              ),
              Row: ({ children, ...props }) => (
                <div className="grid grid-cols-8 gap-xs" {...props}>
                  {children}
                </div>
              ),
              Emoji: ({ emoji, ...props }) => (
                <button
                  type="button"
                  className={cn(
                    "flex items-center justify-center w-[38px] h-[38px] rounded-md text-[24px]",
                    "transition-all duration-150",
                    "hover:bg-gray-cool-100 active:bg-gray-cool-200",
                    emoji.isActive && "bg-gray-cool-100"
                  )}
                  {...props}
                >
                  {emoji.emoji}
                </button>
              ),
            }}
          />
        </FrimousseEmojiPicker.Viewport>
      </FrimousseEmojiPicker.Root>
    </div>
  )
}

// ============================================================================
// Main Emoji Picker Component with Popover
// ============================================================================

const EmojiPicker = ({
  onEmojiSelect,
  open,
  onOpenChange,
  children,
  align = "start",
  side = "bottom",
}: EmojiPickerProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  const handleEmojiSelect = (emoji: string) => {
    onEmojiSelect(emoji)
    handleOpenChange(false)
  }

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverPrimitive.Trigger asChild>
        {children || <EmojiPickerDefaultTrigger />}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={align}
          side={side}
          sideOffset={8}
          className={cn(
            "z-50",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2",
            "data-[side=top]:slide-in-from-bottom-2"
          )}
        >
          <EmojiPickerContent onEmojiSelect={handleEmojiSelect} />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

// ============================================================================
// Default Trigger Button
// ============================================================================

const EmojiPickerDefaultTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex items-center justify-center",
        "px-md py-xs rounded-full",
        "transition-colors duration-150",
        "bg-gray-cool-100 hover:bg-gray-cool-200 text-gray-cool-500",
        className
      )}
      {...props}
    >
      <FaceSmile size={20} />
    </button>
  )
})
EmojiPickerDefaultTrigger.displayName = "EmojiPickerDefaultTrigger"

// ============================================================================
// Standalone Trigger (for custom use)
// ============================================================================

const EmojiPickerTrigger = PopoverPrimitive.Trigger

export {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerTrigger,
  EmojiPickerDefaultTrigger,
  ReactionBadge,
}
