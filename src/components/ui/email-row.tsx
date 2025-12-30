import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Checkbox } from "./checkbox"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"
import { User01 } from "@untitledui/icons"
import { Button } from "./button"
import { Label, type LabelProps } from "./label"
import { 
  UserPlus01, 
  Mail04, 
  Archive, 
  CheckCircle,
  CheckSquare,
  MessageTextCircle01
} from "@untitledui/icons"
import { Tooltip } from "./tooltip"
import type { AvatarInfo, PendingAction, ResponseStatus } from "@/types/email"

// ============================================================================
// Variants
// ============================================================================

const emailRowVariants = cva(
  [
    "relative flex items-center gap-md",
    "pl-md pr-4xl",
    "border-b border-gray-cool-100",
    "cursor-pointer select-none",
    "transition-all duration-200 ease-out",
    "group",
    "outline-none",
    // Focus-visible ring for keyboard navigation
    "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500/40",
  ],
  {
    variants: {
      variant: {
        // Read state - email has been read, off-white background
        default: "bg-gray-cool-25",
        // Hover state
        hover: "bg-gray-cool-50 rounded-sm overflow-hidden",
        // Selected state - with subtle ring
        selected: [
          "bg-blue-50 rounded-sm overflow-hidden",
          "ring-1 ring-inset ring-blue-200/60",
        ],
        // Unread state - email not yet read, white background with blue dot
        unread: "bg-white",
        // Loading skeleton state
        skeleton: "bg-gray-cool-25 pointer-events-none",
        // Pending optimistic update
        pending: "bg-gray-cool-25 opacity-60 pointer-events-none",
        // Error state
        error: [
          "bg-error-50 rounded-sm overflow-hidden",
          "ring-1 ring-inset ring-error-200",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ============================================================================
// Sub-components (Memoized)
// ============================================================================

interface UserInfoProps {
  name: string
  threadCount?: number
  isUnread?: boolean
  showTaskIcon?: boolean
  showCommentIcon?: boolean
}

const UserInfo = React.memo(function UserInfo({ 
  name, 
  threadCount, 
  isUnread = false,
  showTaskIcon = false,
  showCommentIcon = false 
}: UserInfoProps) {
  return (
    <div className="flex items-center gap-sm w-[180px] shrink-0">
      <p className="text-sm font-medium text-gray-cool-700 truncate">
        {name}
      </p>
      {threadCount !== undefined && threadCount > 0 && (
        <span className="text-sm font-normal text-gray-cool-400">
          {threadCount}
        </span>
      )}
      {isUnread && (
        <span 
          className="w-2 h-2 rounded-full shrink-0 bg-blue-500"
          role="status"
          aria-label="Unread email"
        />
      )}
      {showTaskIcon && (
        <CheckSquare size={18} className="text-gray-cool-300 shrink-0" aria-hidden="true" />
      )}
      {showCommentIcon && (
        <MessageTextCircle01 size={18} className="text-gray-cool-300 shrink-0" aria-hidden="true" />
      )}
    </div>
  )
})

interface AvatarStackProps {
  avatars: AvatarInfo[]
  max?: number
}

const AvatarStack = React.memo(function AvatarStack({ avatars, max = 2 }: AvatarStackProps) {
  const displayAvatars = avatars.slice(0, max)
  const remainingCount = avatars.length - max
  
  return (
    <div className="flex items-center" role="group" aria-label={`Assigned to ${avatars.map(a => a.name).join(', ')}`}>
      {displayAvatars.map((avatar, index) => (
        <Tooltip key={avatar.id || index} content={avatar.name}>
          <div
            className={cn(
              "relative shrink-0 flex items-center justify-center",
              "transition-transform duration-150",
              "hover:scale-110 hover:z-10",
              index > 0 && "-ml-[8px]"
            )}
            style={{ zIndex: displayAvatars.length - index }}
          >
            <Avatar
              size="xs"
              className="ring-[1.5px] ring-white"
            >
              <AvatarImage src={avatar.src} alt={avatar.name} />
              <AvatarFallback>
                <User01 size={12} />
              </AvatarFallback>
            </Avatar>
          </div>
        </Tooltip>
      ))}
      {remainingCount > 0 && (
        <div 
          className={cn(
            "relative shrink-0 flex items-center justify-center",
            "-ml-[8px] w-[20px] h-[20px] rounded-full",
            "bg-gray-cool-100 ring-[1.5px] ring-white",
            "text-2xs font-medium text-gray-cool-600"
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  )
})

// Skeleton shimmer block component
const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={cn("skeleton-shimmer rounded-xs", className)} />
)

// Skeleton component for loading state - matches exact EmailRow layout
const EmailRowSkeleton = React.memo(function EmailRowSkeleton() {
  return (
    <div 
      className={cn(
        "relative flex items-center gap-md",
        "pl-md pr-4xl",
        "border-b border-gray-cool-100",
        "bg-gray-cool-25"
      )}
      role="status" 
      aria-label="Loading email"
    >
      {/* Checkbox skeleton */}
      <SkeletonBlock className="w-4 h-4 shrink-0" />

      {/* Email content container - matches exact structure */}
      <div className="flex-1 flex flex-col py-xl min-w-0 relative">
        <div className="flex items-center h-[28px] w-full">
          {/* User info skeleton - matches w-[180px] */}
          <div className="flex items-center gap-sm w-[180px] shrink-0">
            <SkeletonBlock className="h-4 w-24" />
          </div>

          {/* Message content skeleton */}
          <div className="flex-1 flex items-center gap-md min-w-0 ml-md">
            {/* Subject skeleton */}
            <SkeletonBlock className="h-4 w-28 shrink-0" />
            {/* Preview skeleton */}
            <SkeletonBlock className="h-4 flex-1 max-w-[400px]" />
          </div>

          {/* Right side: Label + Date/Actions skeleton */}
          <div className="flex items-center gap-md shrink-0 ml-md">
            {/* Label skeleton */}
            <SkeletonBlock className="h-5 w-16 rounded-full" />
            
            {/* Date/Actions container - fixed width to match */}
            <div className="w-[140px] flex items-center justify-end shrink-0">
              <SkeletonBlock className="h-4 w-14" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

// Action buttons component (memoized)
interface ActionButtonsProps {
  onAssign?: () => void
  onReply?: () => void
  onArchive?: () => void
  onMarkDone?: () => void
}

const ActionButtons = React.memo(function ActionButtons({
  onAssign,
  onReply,
  onArchive,
  onMarkDone,
}: ActionButtonsProps) {
  return (
    <div 
      className={cn(
        "flex items-center gap-xxs",
        "bg-white rounded-sm p-xxs",
        "shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]",
        "animate-in fade-in-0 zoom-in-95 duration-150"
      )}
      role="toolbar"
      aria-label="Email actions"
    >
      <Tooltip content="Assign" shortcut="A">
        <Button
          variant="tertiary-gray"
          size="sm"
          iconStart={<UserPlus01 size={20} />}
          className="h-[32px] w-[32px] p-0 transition-transform duration-150 hover:scale-105 active:scale-95"
          onClick={(e) => {
            e.stopPropagation()
            onAssign?.()
          }}
          aria-label="Assign email"
        />
      </Tooltip>
      <Tooltip content="Reply" shortcut="R">
        <Button
          variant="tertiary-gray"
          size="sm"
          iconStart={<Mail04 size={20} />}
          className="h-[32px] w-[32px] p-0 transition-transform duration-150 hover:scale-105 active:scale-95"
          onClick={(e) => {
            e.stopPropagation()
            onReply?.()
          }}
          aria-label="Reply to email"
        />
      </Tooltip>
      <Tooltip content="Archive" shortcut="E">
        <Button
          variant="tertiary-gray"
          size="sm"
          iconStart={<Archive size={20} />}
          className="h-[32px] w-[32px] p-0 transition-transform duration-150 hover:scale-105 active:scale-95"
          onClick={(e) => {
            e.stopPropagation()
            onArchive?.()
          }}
          aria-label="Archive email"
        />
      </Tooltip>
      <Tooltip content="Done" shortcut="D">
        <Button
          variant="tertiary-gray"
          size="sm"
          iconStart={<CheckCircle size={20} />}
          className="h-[32px] w-[32px] p-0 transition-transform duration-150 hover:scale-105 active:scale-95"
          onClick={(e) => {
            e.stopPropagation()
            onMarkDone?.()
          }}
          aria-label="Mark as done"
        />
      </Tooltip>
    </div>
  )
})

// ============================================================================
// Status Configuration
// ============================================================================

type EmailStatusDisplay = "draft" | "done" | "response-required" | "need-response"

const statusConfig: Record<EmailStatusDisplay, { label: string; className: string }> = {
  "draft": {
    label: "Draft",
    className: "text-warning-500"
  },
  "done": {
    label: "Done",
    className: "text-success-500"
  },
  "response-required": {
    label: "Response Required",
    className: "text-error-500"
  },
  "need-response": {
    label: "Need Response",
    className: "text-brand-500"
  }
}

// ============================================================================
// Main Component
// ============================================================================

export interface EmailRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">,
    VariantProps<typeof emailRowVariants> {
  /** Unique email identifier */
  emailId?: string
  /** User/sender name */
  userName: string
  /** Thread count to display */
  threadCount?: number
  /** Subject line */
  subject: string
  /** Message preview text */
  preview: string
  /** Date to display */
  date: string
  /** Optional label badge text */
  label?: string
  /** Label color variant */
  labelColor?: LabelProps["color"]
  /** Avatar info for assignees (with src and name) */
  avatars?: AvatarInfo[]
  /** Email status indicator (draft, done, response-required, need-response) */
  status?: EmailStatusDisplay | ResponseStatus
  /** Whether the row is selected */
  isSelected?: boolean
  /** Whether to show task icon */
  showTaskIcon?: boolean
  /** Whether to show comment icon */
  showCommentIcon?: boolean
  /** Whether the row is in loading state */
  isLoading?: boolean
  /** Whether there's a pending optimistic update */
  isPending?: boolean
  /** The type of pending action */
  pendingAction?: PendingAction
  /** Whether the last action failed */
  isError?: boolean
  /** Whether this email was recently updated (real-time) */
  isRecentlyUpdated?: boolean
  /** Callback when selection changes - receives emailId and selected state */
  onSelect?: (emailId: string, selected: boolean) => void
  /** Callback when row is clicked - receives emailId */
  onRowClick?: (emailId?: string) => void
  /** Callback for archive action */
  onArchive?: (emailId?: string) => void
  /** Callback for reply action */
  onReply?: (emailId?: string) => void
  /** Callback for mark done action */
  onMarkDone?: (emailId?: string) => void
  /** Callback for assign action */
  onAssign?: (emailId?: string) => void
  /** Callback for mark as read */
  onMarkRead?: (emailId?: string) => void
}

const EmailRow = React.memo(
  React.forwardRef<HTMLDivElement, EmailRowProps>(
    (
      {
        className,
        variant,
        emailId,
        userName,
        threadCount,
        subject,
        preview,
        date,
        label,
        labelColor = "blue",
        avatars,
        status,
        isSelected = false,
        showTaskIcon = false,
        showCommentIcon = false,
        isLoading = false,
        isPending = false,
        pendingAction,
        isError = false,
        isRecentlyUpdated = false,
        onSelect,
        onRowClick,
        onArchive,
        onReply,
        onMarkDone,
        onAssign,
        onMarkRead,
        ...props
      },
      ref
    ) => {
      const [isHovered, setIsHovered] = React.useState(false)
      
      // ========================================================================
      // Computed State
      // ========================================================================
      
      // Determine actual variant based on state
      const getVariant = React.useCallback(() => {
        if (isLoading) return "skeleton"
        if (isPending) return "pending"
        if (isError) return "error"
        if (isSelected) return "selected"
        if (isHovered || variant === "hover") return "hover"
        return variant || "default"
      }, [isLoading, isPending, isError, isSelected, isHovered, variant])
      
      const actualVariant = getVariant()
      
      // Show checkbox when hovering, selected, or variant is explicitly hover
      const showCheckbox = isHovered || isSelected || variant === "hover"
      
      // Show action buttons on hover or when variant is explicitly hover (not when selected)
      const showActions = (isHovered || variant === "hover") && !isSelected && !isLoading && !isPending
      
      // Map ResponseStatus to display status if needed
      const displayStatus = status === "none" ? undefined : status as EmailStatusDisplay

      // ========================================================================
      // Memoized Event Handlers
      // ========================================================================
      
      const handleMouseEnter = React.useCallback(() => setIsHovered(true), [])
      const handleMouseLeave = React.useCallback(() => setIsHovered(false), [])
      
      const handleRowClick = React.useCallback(() => {
        if (variant === "unread" && onMarkRead) {
          onMarkRead(emailId)
        }
        onRowClick?.(emailId)
      }, [onRowClick, onMarkRead, emailId, variant])
      
      const handleSelect = React.useCallback((checked: boolean | "indeterminate") => {
        if (emailId) {
          onSelect?.(emailId, checked === true)
        }
      }, [onSelect, emailId])
      
      const handleArchive = React.useCallback(() => {
        onArchive?.(emailId)
      }, [onArchive, emailId])
      
      const handleReply = React.useCallback(() => {
        onReply?.(emailId)
      }, [onReply, emailId])
      
      const handleMarkDone = React.useCallback(() => {
        onMarkDone?.(emailId)
      }, [onMarkDone, emailId])
      
      const handleAssign = React.useCallback(() => {
        onAssign?.(emailId)
      }, [onAssign, emailId])
      
      // Keyboard navigation handler
      const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
        // Prevent if loading or pending
        if (isLoading || isPending) return
        
        switch (e.key) {
          case "Enter":
          case " ":
            e.preventDefault()
            handleRowClick()
            break
          case "x":
          case "X":
            e.preventDefault()
            if (emailId) {
              onSelect?.(emailId, !isSelected)
            }
            break
          case "e":
          case "E":
            e.preventDefault()
            handleArchive()
            break
          case "r":
          case "R":
            e.preventDefault()
            handleReply()
            break
          case "d":
          case "D":
            e.preventDefault()
            handleMarkDone()
            break
          case "a":
          case "A":
            e.preventDefault()
            handleAssign()
            break
        }
      }, [
        isLoading, 
        isPending, 
        handleRowClick, 
        handleArchive, 
        handleReply, 
        handleMarkDone, 
        handleAssign, 
        onSelect, 
        emailId, 
        isSelected
      ])

      // ========================================================================
      // Render
      // ========================================================================
      
      // Loading state
      if (isLoading) {
        return (
          <div
            ref={ref}
            className={cn(emailRowVariants({ variant: "skeleton" }), className)}
            {...props}
          >
            <EmailRowSkeleton />
          </div>
        )
      }

      return (
        <div
          ref={ref}
          role="row"
          tabIndex={0}
          aria-selected={isSelected}
          aria-busy={isPending}
          aria-invalid={isError}
          aria-label={`${variant === "unread" ? "Unread: " : ""}${userName}: ${subject}`}
          data-email-id={emailId}
          data-pending-action={pendingAction}
          className={cn(emailRowVariants({ variant: actualVariant }), className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleRowClick}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {/* Real-time update indicator */}
          {isRecentlyUpdated && (
            <span 
              className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-500 animate-pulse"
              aria-hidden="true"
            />
          )}
          
          {/* Pending action indicator */}
          {isPending && pendingAction && (
            <span className="sr-only" aria-live="polite">
              {`${pendingAction} action in progress`}
            </span>
          )}

          {/* Checkbox */}
          <Checkbox
            checked={isSelected}
            onCheckedChange={handleSelect}
            className={cn(
              "transition-opacity duration-150",
              showCheckbox ? "opacity-100" : "opacity-0"
            )}
            aria-label={`Select email from ${userName}`}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Email content container */}
          <div className="flex-1 flex flex-col py-xl min-w-0 relative">
            <div className="flex items-center h-[28px] w-full">
              {/* User info */}
              <UserInfo
                name={userName}
                threadCount={threadCount}
                isUnread={variant === "unread"}
                showTaskIcon={showTaskIcon}
                showCommentIcon={showCommentIcon}
              />

              {/* Message content */}
              <div className="flex-1 flex items-center gap-md min-w-0 text-sm ml-md">
                {displayStatus && statusConfig[displayStatus] && (
                  <span className={cn("font-medium shrink-0", statusConfig[displayStatus].className)}>
                    {statusConfig[displayStatus].label}
                  </span>
                )}
                <span className="font-medium text-gray-cool-700 shrink-0">
                  {subject}
                </span>
                <span className="font-normal text-gray-cool-500 truncate flex-1">
                  {preview}
                </span>
              </div>

              {/* Right side: Label + Avatars + Date OR Action buttons on hover */}
              <div className="flex items-center gap-md shrink-0 ml-md">
                {label && <Label size="sm" color={labelColor}>{label}</Label>}
                {avatars && avatars.length > 0 && (
                  <AvatarStack avatars={avatars} />
                )}
                
                {/* Date or Actions container - fixed width to prevent layout shift */}
                <div className="w-[140px] flex items-center justify-end shrink-0">
                  {showActions ? (
                    <ActionButtons
                      onAssign={handleAssign}
                      onReply={handleReply}
                      onArchive={handleArchive}
                      onMarkDone={handleMarkDone}
                    />
                  ) : (
                    <span className="text-sm font-medium text-gray-cool-400 text-right">
                      {date}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ),
  // Custom comparison function for React.memo
  (prevProps, nextProps) => {
    // Always re-render if these change
    if (prevProps.isSelected !== nextProps.isSelected) return false
    if (prevProps.isLoading !== nextProps.isLoading) return false
    if (prevProps.isPending !== nextProps.isPending) return false
    if (prevProps.isError !== nextProps.isError) return false
    if (prevProps.isRecentlyUpdated !== nextProps.isRecentlyUpdated) return false
    if (prevProps.variant !== nextProps.variant) return false
    
    // Check data changes
    if (prevProps.emailId !== nextProps.emailId) return false
    if (prevProps.userName !== nextProps.userName) return false
    if (prevProps.subject !== nextProps.subject) return false
    if (prevProps.preview !== nextProps.preview) return false
    if (prevProps.date !== nextProps.date) return false
    if (prevProps.status !== nextProps.status) return false
    if (prevProps.label !== nextProps.label) return false
    if (prevProps.threadCount !== nextProps.threadCount) return false
    if (prevProps.showTaskIcon !== nextProps.showTaskIcon) return false
    if (prevProps.showCommentIcon !== nextProps.showCommentIcon) return false
    
    // Check avatars array
    const prevAvatars = prevProps.avatars || []
    const nextAvatars = nextProps.avatars || []
    if (prevAvatars.length !== nextAvatars.length) return false
    for (let i = 0; i < prevAvatars.length; i++) {
      if (prevAvatars[i].src !== nextAvatars[i].src) return false
      if (prevAvatars[i].name !== nextAvatars[i].name) return false
    }
    
    // Callbacks don't need comparison - they should be stable via useCallback
    return true
  }
)

EmailRow.displayName = "EmailRow"

export { 
  EmailRow, 
  emailRowVariants, 
  EmailRowSkeleton,
  type EmailStatusDisplay as EmailStatus,
  type AvatarInfo 
}
