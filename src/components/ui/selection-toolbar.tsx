import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"
import {
  Bold01,
  Italic01,
  Strikethrough01,
  Link01,
  CheckDone01,
  ArrowLeft,
  Check,
} from "@untitledui/icons"
import { Tooltip } from "./tooltip"

// ============================================================================
// Types
// ============================================================================

export interface SelectionToolbarProps {
  /** Content that can have text selected */
  children: React.ReactNode
  /** Callback when bold is clicked */
  onBold?: () => void
  /** Callback when italic is clicked */
  onItalic?: () => void
  /** Callback when strikethrough is clicked */
  onStrikethrough?: () => void
  /** Callback after link is applied (link is applied automatically via execCommand) */
  onLink?: (url: string) => void
  /** Callback when checklist is clicked */
  onChecklist?: () => void
  /** Callback when Ask Puls is clicked */
  onAskPuls?: () => void
  /** Currently active formatting */
  activeFormats?: ("bold" | "italic" | "strikethrough")[]
  /** Whether to show the Ask Puls button */
  showAskPuls?: boolean
  /** Custom toolbar content - replaces default toolbar */
  toolbarContent?: React.ReactNode
  /** Additional className for the container */
  className?: string
  /** Additional className for the toolbar */
  toolbarClassName?: string
  /** Minimum selection length to show toolbar (default: 1) */
  minSelectionLength?: number
  /** Disable the selection toolbar */
  disabled?: boolean
}

// ============================================================================
// ToolbarButton Component
// ============================================================================

interface ToolbarButtonProps {
  icon: React.ElementType
  onClick?: () => void
  active?: boolean
  label: string
  /** Keyboard shortcut to display in tooltip (e.g., "B", "I") */
  shortcut?: string
}

const ToolbarButton = ({
  icon: Icon,
  onClick,
  active,
  label,
  shortcut,
}: ToolbarButtonProps) => {
  const button = (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick?.()
      }}
      onMouseDown={(e) => {
        // Prevent losing selection when clicking toolbar button
        e.preventDefault()
      }}
      className={cn(
        "flex items-center justify-center p-sm rounded-xs transition-colors",
        active ? "bg-gray-cool-100" : "hover:bg-gray-cool-50"
      )}
      aria-label={label}
      aria-pressed={active}
    >
      <Icon size={16} strokeWidth={2} className="text-gray-cool-700" />
    </button>
  )

  if (shortcut) {
    return (
      <Tooltip content={label} shortcut={shortcut} delayDuration={300}>
        {button}
      </Tooltip>
    )
  }

  return button
}

// ============================================================================
// DefaultToolbarContent Component
// ============================================================================

interface DefaultToolbarContentProps {
  onBold?: () => void
  onItalic?: () => void
  onStrikethrough?: () => void
  onLink?: (url: string) => void
  onChecklist?: () => void
  onAskPuls?: () => void
  activeFormats?: ("bold" | "italic" | "strikethrough")[]
  showAskPuls?: boolean
  showLinkInput: boolean
  onShowLinkInput: (show: boolean) => void
  linkUrl: string
  onLinkUrlChange: (url: string) => void
  onSaveSelection: () => void
  onRestoreSelection: () => void
}

const DefaultToolbarContent = ({
  onBold,
  onItalic,
  onStrikethrough,
  onLink,
  onChecklist,
  onAskPuls,
  activeFormats = [],
  showAskPuls = true,
  showLinkInput,
  onShowLinkInput,
  linkUrl,
  onLinkUrlChange,
  onSaveSelection,
  onRestoreSelection,
}: DefaultToolbarContentProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const isActive = (format: string) =>
    activeFormats.includes(format as "bold" | "italic" | "strikethrough")

  const handleLinkClick = () => {
    // Save the current selection before showing the input
    onSaveSelection()
    onShowLinkInput(true)
    onLinkUrlChange("")
    // Focus input after render
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleLinkSubmit = () => {
    if (linkUrl.trim()) {
      // Add https:// if no protocol specified
      let url = linkUrl.trim()
      if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url
      }
      // Restore the selection and apply link synchronously
      onRestoreSelection()
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        // Apply the link using execCommand directly
        document.execCommand('createLink', false, url)
        // Also call the callback if provided
        onLink?.(url)
        // Close the input after applying
        onShowLinkInput(false)
        onLinkUrlChange("")
      })
      return
    }
    onShowLinkInput(false)
    onLinkUrlChange("")
  }

  const handleLinkBack = () => {
    onShowLinkInput(false)
    onLinkUrlChange("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleLinkSubmit()
    } else if (e.key === "Escape") {
      e.preventDefault()
      handleLinkBack()
    }
  }

  // Focus input when link input mode is shown
  React.useEffect(() => {
    if (showLinkInput) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [showLinkInput])

  // Show link input mode
  if (showLinkInput) {
    return (
      <div className="flex items-center gap-xs">
        <button
          type="button"
          onClick={handleLinkBack}
          onMouseDown={(e) => e.preventDefault()}
          className="flex items-center justify-center p-sm rounded-xs hover:bg-gray-cool-50 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft size={16} strokeWidth={2} className="text-gray-cool-700" />
        </button>
        
        <div className="flex items-center bg-gray-cool-50 rounded-sm px-sm py-xs">
          <input
            ref={inputRef}
            type="url"
            value={linkUrl}
            onChange={(e) => onLinkUrlChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onMouseDown={(e) => e.stopPropagation()}
            placeholder="Enter URL..."
            className="bg-transparent text-sm text-gray-cool-900 placeholder:text-gray-cool-400 outline-none w-[180px]"
          />
        </div>

        <button
          type="button"
          onClick={handleLinkSubmit}
          onMouseDown={(e) => e.preventDefault()}
          disabled={!linkUrl.trim()}
          className={cn(
            "flex items-center justify-center p-sm rounded-xs transition-colors",
            linkUrl.trim()
              ? "bg-brand-500 hover:bg-brand-600 text-white"
              : "bg-gray-cool-100 text-gray-cool-400 cursor-not-allowed"
          )}
          aria-label="Apply link"
        >
          <Check size={16} strokeWidth={2} />
        </button>
      </div>
    )
  }

  return (
    <>
      <ToolbarButton
        icon={Bold01}
        onClick={onBold}
        active={isActive("bold")}
        label="Bold"
        shortcut="B"
      />
      <ToolbarButton
        icon={Italic01}
        onClick={onItalic}
        active={isActive("italic")}
        label="Italic"
        shortcut="I"
      />
      <ToolbarButton
        icon={Strikethrough01}
        onClick={onStrikethrough}
        active={isActive("strikethrough")}
        label="Strikethrough"
        shortcut="U"
      />
      <ToolbarButton
        icon={Link01}
        onClick={handleLinkClick}
        label="Insert link"
        shortcut="K"
      />

      {/* Divider */}
      <div className="w-px h-[20px] bg-gray-cool-100 rounded-full" />

      <ToolbarButton
        icon={CheckDone01}
        onClick={onChecklist}
        label="Checklist"
      />

      {/* Ask Puls button */}
      {showAskPuls && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onAskPuls?.()
          }}
          onMouseDown={(e) => e.preventDefault()}
          className="flex items-center justify-center px-lg py-xs rounded-sm bg-brand-50 hover:bg-brand-100 transition-colors"
        >
          <span className="text-sm font-medium text-brand-600">Ask Puls</span>
        </button>
      )}
    </>
  )
}

// ============================================================================
// SelectionToolbar Component
// ============================================================================

const SelectionToolbar = ({
  children,
  onBold,
  onItalic,
  onStrikethrough,
  onLink,
  onChecklist,
  onAskPuls,
  activeFormats: externalActiveFormats = [],
  showAskPuls = true,
  toolbarContent,
  className,
  toolbarClassName,
  minSelectionLength = 1,
  disabled = false,
}: SelectionToolbarProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [selectedText, setSelectedText] = React.useState("")
  const [detectedFormats, setDetectedFormats] = React.useState<("bold" | "italic" | "strikethrough")[]>([])
  const [showLinkInput, setShowLinkInput] = React.useState(false)
  const [linkUrl, setLinkUrl] = React.useState("")
  const debounceTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const savedSelectionRef = React.useRef<Range | null>(null)

  // Save the current selection
  const saveSelection = React.useCallback(() => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      savedSelectionRef.current = selection.getRangeAt(0).cloneRange()
    }
  }, [])

  // Restore the saved selection
  const restoreSelection = React.useCallback(() => {
    if (savedSelectionRef.current) {
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(savedSelectionRef.current)
      }
    }
  }, [])

  // Combine external and detected formats
  const activeFormats = React.useMemo(() => {
    const combined = new Set([...externalActiveFormats, ...detectedFormats])
    return Array.from(combined) as ("bold" | "italic" | "strikethrough")[]
  }, [externalActiveFormats, detectedFormats])

  // Detect formatting of the selected text
  const detectFormatting = React.useCallback(() => {
    const formats: ("bold" | "italic" | "strikethrough")[] = []

    // Try using execCommand state (works in contenteditable)
    try {
      if (document.queryCommandState("bold")) {
        formats.push("bold")
      }
      if (document.queryCommandState("italic")) {
        formats.push("italic")
      }
      if (document.queryCommandState("strikethrough")) {
        formats.push("strikethrough")
      }
    } catch {
      // queryCommandState not supported, fall back to DOM inspection
    }

    // Also check by inspecting the DOM structure
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      let node: Node | null = range.commonAncestorContainer

      // If text node, get parent element
      if (node.nodeType === Node.TEXT_NODE) {
        node = node.parentElement
      }

      // Walk up the DOM tree to check for formatting elements
      while (node && node !== containerRef.current) {
        if (node instanceof HTMLElement) {
          const tagName = node.tagName.toLowerCase()
          const fontWeight = window.getComputedStyle(node).fontWeight
          const fontStyle = window.getComputedStyle(node).fontStyle
          const textDecoration = window.getComputedStyle(node).textDecorationLine

          // Check bold
          if (
            tagName === "b" ||
            tagName === "strong" ||
            parseInt(fontWeight) >= 700 ||
            fontWeight === "bold"
          ) {
            if (!formats.includes("bold")) formats.push("bold")
          }

          // Check italic
          if (tagName === "i" || tagName === "em" || fontStyle === "italic") {
            if (!formats.includes("italic")) formats.push("italic")
          }

          // Check strikethrough
          if (
            tagName === "s" ||
            tagName === "strike" ||
            tagName === "del" ||
            textDecoration.includes("line-through")
          ) {
            if (!formats.includes("strikethrough")) formats.push("strikethrough")
          }
        }
        node = node.parentNode
      }
    }

    return formats
  }, [])

  // Handle selection change with debounce
  const handleSelectionChange = React.useCallback(() => {
    if (disabled) return

    // Don't interfere when link input is shown
    if (showLinkInput) return

    // Clear any pending timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) {
      setIsOpen(false)
      setSelectedText("")
      setDetectedFormats([])
      return
    }

    const text = selection.toString()
    
    // Check if selection is within our container
    if (!containerRef.current) {
      setIsOpen(false)
      return
    }

    const range = selection.getRangeAt(0)
    const isWithinContainer = containerRef.current.contains(range.commonAncestorContainer)

    if (!isWithinContainer || text.length < minSelectionLength) {
      setIsOpen(false)
      setSelectedText("")
      setDetectedFormats([])
      return
    }

    // Get selection position
    const rect = range.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()

    // Position toolbar above the selection, centered
    const newPosition = {
      x: rect.left + rect.width / 2 - containerRect.left,
      y: rect.top - containerRect.top,
    }

    // Detect formatting
    const formats = detectFormatting()

    // Debounce showing the toolbar to prevent flashing during selection
    debounceTimerRef.current = setTimeout(() => {
      setPosition(newPosition)
      setSelectedText(text)
      setDetectedFormats(formats)
      setIsOpen(true)
    }, 150)
  }, [disabled, minSelectionLength, detectFormatting, showLinkInput])

  // Cleanup debounce timer on unmount
  React.useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  // Re-detect formatting after applying a format
  const refreshFormatting = React.useCallback(() => {
    // Small delay to allow the DOM to update
    setTimeout(() => {
      const formats = detectFormatting()
      setDetectedFormats(formats)
    }, 10)
  }, [detectFormatting])

  // Wrapped format handlers that refresh after action
  const handleBold = React.useCallback(() => {
    onBold?.()
    refreshFormatting()
  }, [onBold, refreshFormatting])

  const handleItalic = React.useCallback(() => {
    onItalic?.()
    refreshFormatting()
  }, [onItalic, refreshFormatting])

  const handleStrikethrough = React.useCallback(() => {
    onStrikethrough?.()
    refreshFormatting()
  }, [onStrikethrough, refreshFormatting])

  // Listen for mouse up to detect selection
  React.useEffect(() => {
    const handleMouseUp = () => {
      // Trigger selection change check (debounce is handled inside)
      handleSelectionChange()
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      // Handle selection via keyboard (Shift + Arrow keys)
      if (e.shiftKey) {
        handleSelectionChange()
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      // Close toolbar when starting a new selection (unless clicking on toolbar itself)
      const toolbar = document.querySelector("[data-selection-toolbar]")
      if (toolbar && toolbar.contains(e.target as Node)) {
        return // Don't close if clicking on toolbar
      }
      // Clear any pending debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      // Close the toolbar so it can reopen at the new position
      // Also reset link input mode
      setShowLinkInput(false)
      setLinkUrl("")
      setIsOpen(false)
    }

    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("keyup", handleKeyUp)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("selectionchange", handleSelectionChange)

    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("keyup", handleKeyUp)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("selectionchange", handleSelectionChange)
    }
  }, [handleSelectionChange])

  // Close when selection is cleared
  React.useEffect(() => {
    if (!selectedText) {
      setIsOpen(false)
    }
  }, [selectedText])

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <PopoverPrimitive.Anchor
          style={{
            position: "absolute",
            left: position.x,
            top: position.y,
            width: 0,
            height: 0,
          }}
        />
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            data-selection-toolbar
            side="top"
            align="center"
            sideOffset={8}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => {
              // Don't close if clicking on the content area (to allow re-selection)
              if (containerRef.current?.contains(e.target as Node)) {
                e.preventDefault()
              }
            }}
            className={cn(
              "z-50",
              "bg-white border border-gray-cool-100 rounded-md p-xs",
              "flex items-center gap-xs",
              "shadow-[0px_13.287px_37.963px_0px_rgba(39,44,48,0.05),0px_0px_0px_0.949px_rgba(39,44,48,0.04),0px_3px_4px_-3px_rgba(0,0,0,0.25)]",
              "animate-in fade-in-0 zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "data-[side=bottom]:slide-in-from-top-2",
              "data-[side=top]:slide-in-from-bottom-2",
              toolbarClassName
            )}
          >
            {toolbarContent || (
              <DefaultToolbarContent
                onBold={handleBold}
                onItalic={handleItalic}
                onStrikethrough={handleStrikethrough}
                onLink={onLink}
                onChecklist={onChecklist}
                onAskPuls={onAskPuls}
                activeFormats={activeFormats}
                showAskPuls={showAskPuls}
                showLinkInput={showLinkInput}
                onShowLinkInput={setShowLinkInput}
                linkUrl={linkUrl}
                onLinkUrlChange={setLinkUrl}
                onSaveSelection={saveSelection}
                onRestoreSelection={restoreSelection}
              />
            )}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
        {children}
      </PopoverPrimitive.Root>
    </div>
  )
}

SelectionToolbar.displayName = "SelectionToolbar"

// ============================================================================
// Exports
// ============================================================================

export { SelectionToolbar, DefaultToolbarContent, ToolbarButton }

