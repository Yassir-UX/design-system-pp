import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"
import { Copy01, Check } from "@untitledui/icons"
import { Tooltip } from "./tooltip"

// ============================================================================
// Types
// ============================================================================

export interface LinkPreviewProps {
  /** Content that contains links to preview */
  children: React.ReactNode
  /** Delay before showing preview after click in ms (default: 300) */
  delay?: number
  /** Additional className for the container */
  className?: string
  /** Whether link preview is disabled */
  disabled?: boolean
  /** Callback when a link is clicked in the preview */
  onLinkClick?: (url: string) => void
  /** Max width of the URL display (default: 240) */
  maxWidth?: number
}

// ============================================================================
// LinkPreview Component
// ============================================================================

const LinkPreview = ({
  children,
  delay = 300,
  className,
  disabled = false,
  onLinkClick,
  maxWidth = 240,
}: LinkPreviewProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const popoverRef = React.useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [linkUrl, setLinkUrl] = React.useState("")
  const [copied, setCopied] = React.useState(false)
  const [clickedLink, setClickedLink] = React.useState<HTMLAnchorElement | null>(null)
  const [isHoveringPopover, setIsHoveringPopover] = React.useState(false)
  const hoverTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const currentLinkRef = React.useRef<HTMLAnchorElement | null>(null)

  // Clear timeouts on unmount
  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  // Reset copied state when popover closes
  React.useEffect(() => {
    if (!isOpen) {
      setCopied(false)
    }
  }, [isOpen])

  // Handle closing with delay to allow moving to popover
  const scheduleClose = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    closeTimeoutRef.current = setTimeout(() => {
      if (!isHoveringPopover) {
        setClickedLink(null)
        currentLinkRef.current = null
        setIsOpen(false)
      }
    }, 150)
  }, [isHoveringPopover])

  // Cancel scheduled close
  const cancelClose = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }, [])

  // Handle click on a link - this activates the link for preview
  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return

      const target = e.target as HTMLElement
      const link = target.closest("a") as HTMLAnchorElement | null

      if (link) {
        // Prevent default navigation
        e.preventDefault()
        e.stopPropagation()

        // Set this link as clicked/activated
        setClickedLink(link)
        currentLinkRef.current = link

        // Start the delay timer to show preview
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
        }

        hoverTimeoutRef.current = setTimeout(() => {
          if (!containerRef.current || currentLinkRef.current !== link) return

          const href = link.getAttribute("href")
          if (!href) return

          const linkRect = link.getBoundingClientRect()
          const containerRect = containerRef.current.getBoundingClientRect()

          // Position above the link
          setPosition({
            x: linkRect.left + linkRect.width / 2 - containerRect.left,
            y: linkRect.top - containerRect.top,
          })
          setLinkUrl(href)
          setIsOpen(true)
        }, delay)
      }
    },
    [disabled, delay]
  )

  // Handle mouse move - only matters if a link was clicked
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !clickedLink) return

      const target = e.target as HTMLElement
      const link = target.closest("a") as HTMLAnchorElement | null

      // If we moved away from the clicked link, schedule close
      if (link !== clickedLink) {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
          hoverTimeoutRef.current = null
        }
        scheduleClose()
      } else {
        cancelClose()
      }
    },
    [disabled, clickedLink, scheduleClose, cancelClose]
  )

  // Handle mouse leave from container
  const handleMouseLeave = React.useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    scheduleClose()
  }, [scheduleClose])

  // Handle copy link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(linkUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  // Handle clicking the URL to open it
  const handleUrlClick = () => {
    window.open(linkUrl, "_blank", "noopener,noreferrer")
    onLinkClick?.(linkUrl)
    setIsOpen(false)
    setClickedLink(null)
    currentLinkRef.current = null
  }

  // Handle popover mouse enter
  const handlePopoverEnter = () => {
    setIsHoveringPopover(true)
    cancelClose()
  }

  // Handle popover mouse leave
  const handlePopoverLeave = () => {
    setIsHoveringPopover(false)
    scheduleClose()
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
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
            ref={popoverRef}
            side="top"
            align="center"
            sideOffset={8}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            onPointerDownOutside={() => {
              setIsOpen(false)
              setClickedLink(null)
              currentLinkRef.current = null
            }}
            onMouseEnter={handlePopoverEnter}
            onMouseLeave={handlePopoverLeave}
            className={cn(
              "z-50",
              "bg-white border border-gray-cool-100 rounded-md",
              "shadow-[0px_13.287px_37.963px_0px_rgba(39,44,48,0.05),0px_0px_0px_0.949px_rgba(39,44,48,0.04),0px_3px_4px_-3px_rgba(0,0,0,0.25)]",
              "animate-in fade-in-0 zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "data-[side=bottom]:slide-in-from-top-2",
              "data-[side=top]:slide-in-from-bottom-2"
            )}
          >
            <div className="flex items-center gap-xs p-xs">
              {/* URL display - clickable to open */}
              <button
                type="button"
                onClick={handleUrlClick}
                className={cn(
                  "flex items-center px-sm py-xs bg-gray-cool-50 rounded-sm",
                  "hover:bg-gray-cool-100 transition-colors cursor-pointer",
                  "text-left"
                )}
                style={{ maxWidth }}
              >
                <span className="text-sm text-brand-500 underline truncate">
                  {linkUrl}
                </span>
              </button>

              {/* Copy button */}
              <Tooltip content={copied ? "Copied!" : "Copy"} delayDuration={0}>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center justify-center p-sm rounded-xs hover:bg-gray-cool-50 transition-colors shrink-0"
                  aria-label="Copy link"
                >
                  {copied ? (
                    <Check size={16} strokeWidth={2} className="text-success-500" />
                  ) : (
                    <Copy01 size={16} strokeWidth={2} className="text-gray-cool-600" />
                  )}
                </button>
              </Tooltip>
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
        {children}
      </PopoverPrimitive.Root>
    </div>
  )
}

LinkPreview.displayName = "LinkPreview"

// ============================================================================
// Exports
// ============================================================================

export { LinkPreview }

