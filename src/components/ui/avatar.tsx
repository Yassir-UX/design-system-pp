import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { User01 } from "@untitledui/icons"

// ============================================================================
// Avatar Root
// ============================================================================

const avatarVariants = cva(
  "relative inline-flex items-center justify-center shrink-0 overflow-hidden bg-gray-cool-100",
  {
    variants: {
      size: {
        xs: "size-[24px] rounded-sm",      // 6px radius
        sm: "size-[28px] rounded-sm",      // 6px radius
        md: "size-[32px] rounded-md",      // 8px radius
        lg: "size-[40px] rounded-lg",      // 10px radius
        xl: "size-[48px] rounded-xl",      // 12px radius
        "2xl": "size-[56px] rounded-2xl",  // 16px radius
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, className }))}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

// ============================================================================
// Avatar Image
// ============================================================================

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square size-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

// ============================================================================
// Avatar Fallback
// ============================================================================

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex size-full items-center justify-center bg-gray-cool-100 text-gray-cool-500",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// ============================================================================
// Avatar Status (Optional status indicator)
// ============================================================================

const statusVariants = cva(
  "absolute bottom-0 right-0 rounded-full ring-2 ring-white",
  {
    variants: {
      size: {
        xs: "size-[6px]",
        sm: "size-[8px]",
        md: "size-[8px]",
        lg: "size-[10px]",
        xl: "size-[12px]",
        "2xl": "size-[14px]",
      },
      status: {
        online: "bg-success-500",
        offline: "bg-gray-cool-400",
        away: "bg-warning-500",
        busy: "bg-error-500",
      },
    },
    defaultVariants: {
      size: "sm",
      status: "online",
    },
  }
)

interface AvatarStatusProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusVariants> {}

const AvatarStatus = React.forwardRef<HTMLSpanElement, AvatarStatusProps>(
  ({ className, size, status, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(statusVariants({ size, status, className }))}
      {...props}
    />
  )
)
AvatarStatus.displayName = "AvatarStatus"

// ============================================================================
// Icon sizes for fallback
// ============================================================================

const ICON_SIZES: Record<AvatarSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 28,
}

// Font sizes for initials in avatar fallback (using fixed sizes with no line-height)
const INITIALS_FONT_SIZE: Record<AvatarSize, string> = {
  xs: "text-[9px] leading-none",     // xs avatar (24px)
  sm: "text-[10px] leading-none",    // sm avatar (28px)
  md: "text-[11px] leading-none",    // md avatar (32px)
  lg: "text-[13px] leading-none",    // lg avatar (40px)
  xl: "text-[15px] leading-none",    // xl avatar (48px)
  "2xl": "text-[17px] leading-none", // 2xl avatar (56px)
}

// ============================================================================
// Avatar Initials (for text fallback with proper sizing)
// ============================================================================

interface AvatarInitialsProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize
}

const AvatarInitials = React.forwardRef<HTMLSpanElement, AvatarInitialsProps>(
  ({ className, size = "sm", children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        INITIALS_FONT_SIZE[size],
        "font-medium text-gray-cool-600",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
)
AvatarInitials.displayName = "AvatarInitials"

// ============================================================================
// AvatarStack Component
// ============================================================================

// Overlap amounts for stacked avatars (negative margin)
const STACK_OVERLAP: Record<AvatarSize, string> = {
  xs: "-ml-[8px]",
  sm: "-ml-[10px]",
  md: "-ml-[12px]",
  lg: "-ml-[14px]",
  xl: "-ml-[16px]",
  "2xl": "-ml-[20px]",
}

// Font sizes for the +N indicator (larger for better readability)
const STACK_COUNTER_FONT_SIZE: Record<AvatarSize, string> = {
  xs: "text-[10px] leading-none",    // xs avatar (24px)
  sm: "text-[11px] leading-none",    // sm avatar (28px)
  md: "text-[12px] leading-none",    // md avatar (32px)
  lg: "text-[14px] leading-none",    // lg avatar (40px)
  xl: "text-[16px] leading-none",    // xl avatar (48px)
  "2xl": "text-[18px] leading-none", // 2xl avatar (56px)
}

interface AvatarStackItem {
  /** Image URL to display */
  src?: string
  /** Alt text for the image */
  alt?: string
  /** Fallback initials or content */
  fallback?: React.ReactNode
}

interface AvatarStackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of avatar items to display */
  avatars: AvatarStackItem[]
  /** Size of the avatars */
  size?: AvatarSize
  /** Maximum number of avatars to display before showing +N indicator */
  max?: number
}

const AvatarStack = React.forwardRef<HTMLDivElement, AvatarStackProps>(
  ({ className, avatars, size = "sm", max = 4, ...props }, ref) => {
    const displayedAvatars = avatars.slice(0, max)
    const remainingCount = avatars.length - max
    const hasMore = remainingCount > 0

    const overlapClass = STACK_OVERLAP[size]
    const counterFontSize = STACK_COUNTER_FONT_SIZE[size]
    const iconSize = ICON_SIZES[size]

    return (
      <div
        ref={ref}
        className={cn("flex items-center", className)}
        {...props}
      >
        {displayedAvatars.map((avatar, index) => (
          <Avatar
            key={index}
            size={size}
            className={cn(
              "ring-2 ring-white",
              index !== 0 && overlapClass
            )}
            style={{ zIndex: displayedAvatars.length - index }}
          >
            {avatar.src && (
              <AvatarImage src={avatar.src} alt={avatar.alt ?? "Avatar"} />
            )}
            <AvatarFallback>
              {avatar.fallback ?? <User01 size={iconSize} />}
            </AvatarFallback>
          </Avatar>
        ))}

        {/* +N counter indicator - no overlap so number is visible */}
        {hasMore && (
          <div
            className={cn(
              avatarVariants({ size }),
              "flex items-center justify-center ml-xxs"
            )}
          >
            <span className={cn(counterFontSize, "font-medium text-gray-cool-700")}>
              +{remainingCount}
            </span>
          </div>
        )}
      </div>
    )
  }
)
AvatarStack.displayName = "AvatarStack"

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarInitials,
  AvatarStatus,
  AvatarStack,
  avatarVariants,
  ICON_SIZES,
  INITIALS_FONT_SIZE,
}
export type { AvatarProps, AvatarStackProps, AvatarStackItem, AvatarSize }
