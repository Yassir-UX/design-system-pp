import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarStack,
  type AvatarStackItem,
} from "./avatar"
import { EmojiPicker, ReactionBadge } from "./emoji-picker"
import {
  MessageTextCircle01,
  FaceSmile,
  ChevronRight,
} from "@untitledui/icons"

// ============================================================================
// Types
// ============================================================================

export interface CommentAuthor {
  name: string
  avatarUrl?: string
  initials?: string
}

export interface CommentReaction {
  emoji: string
  count: number
  /** Whether the current user has reacted with this emoji */
  hasReacted?: boolean
}

export interface CommentReply {
  author: CommentAuthor
}

export interface Comment {
  id: string
  author: CommentAuthor
  content: React.ReactNode
  date: string
  reactions?: CommentReaction[]
  replies?: CommentReply[]
  repliesDate?: string
}

export interface CommentThreadProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Main date for the thread header */
  date: string
  /** Array of comments in the thread */
  comments: Comment[]
  /** Handler for reply button */
  onReply?: (commentId: string) => void
  /** Handler for viewing replies */
  onViewReplies?: (commentId: string) => void
  /** Callback when reactions change (for external state sync) */
  onReactionsChange?: (commentId: string, reactions: CommentReaction[]) => void
}

// ============================================================================
// Sub-components
// ============================================================================

const Dot = ({ className }: { className?: string }) => (
  <span
    className={cn(
      "size-[4px] rounded-full bg-gray-cool-300 shrink-0",
      className
    )}
  />
)

interface AddReactionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
}

const AddReactionButton = React.forwardRef<
  HTMLButtonElement,
  AddReactionButtonProps
>(({ onClick, className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    onClick={onClick}
    className={cn(
      "inline-flex items-center justify-center",
      "bg-gray-cool-100 hover:bg-gray-cool-200",
      "px-md py-xs rounded-full",
      "transition-colors duration-150",
      className
    )}
    {...props}
  >
    <FaceSmile size={20} className="text-gray-cool-400" />
  </button>
))
AddReactionButton.displayName = "AddReactionButton"

interface ReplyButtonProps {
  onClick?: () => void
}

const ReplyButton = ({ onClick }: ReplyButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "inline-flex items-center justify-center",
      "bg-gray-cool-100 hover:bg-gray-cool-200",
      "px-md py-xs rounded-full",
      "transition-colors duration-150"
    )}
  >
    <MessageTextCircle01 size={20} className="text-gray-cool-400" />
  </button>
)

interface RepliesIndicatorProps {
  replies: CommentReply[]
  date: string
  onClick?: () => void
}

const RepliesIndicator = ({ replies, date, onClick }: RepliesIndicatorProps) => {
  // Convert replies to AvatarStackItem format
  const avatarStackItems: AvatarStackItem[] = replies.slice(0, 2).map((reply) => ({
    src: reply.author.avatarUrl,
    alt: reply.author.name,
    fallback: reply.author.initials || reply.author.name.slice(0, 2).toUpperCase(),
  }))

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between",
        "bg-white border border-gray-cool-100 rounded-md",
        "p-md",
        "hover:bg-gray-cool-50",
        "transition-colors duration-150"
      )}
    >
      <div className="flex items-center gap-md">
        <div className="flex items-center gap-sm">
          {/* Stacked avatars using AvatarStack */}
          <AvatarStack avatars={avatarStackItems} size="xs" max={2} />
          <span className="text-sm font-medium text-gray-cool-600">
            {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
          </span>
        </div>
        <Dot />
        <span className="text-xs font-medium text-gray-cool-400">{date}</span>
      </div>
      <ChevronRight size={20} className="text-gray-cool-600" />
    </button>
  )
}

// ============================================================================
// Comment Card Component (with hover state and reaction management)
// ============================================================================

interface CommentCardProps {
  comment: Comment
  onReply?: (commentId: string) => void
  onViewReplies?: (commentId: string) => void
  onReactionsChange?: (commentId: string, reactions: CommentReaction[]) => void
}

const CommentCard = ({
  comment,
  onReply,
  onViewReplies,
  onReactionsChange,
}: CommentCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const [reactions, setReactions] = React.useState<CommentReaction[]>(
    comment.reactions || []
  )

  // Sync with external state when comment.reactions changes
  React.useEffect(() => {
    setReactions(comment.reactions || [])
  }, [comment.reactions])

  // Add a new reaction or increment existing one
  const handleAddReaction = (emoji: string) => {
    setReactions((prev) => {
      const existingIndex = prev.findIndex((r) => r.emoji === emoji)

      let newReactions: CommentReaction[]

      if (existingIndex >= 0) {
        // Emoji already exists
        const existing = prev[existingIndex]
        if (existing.hasReacted) {
          // User already reacted with this emoji, do nothing
          return prev
        }
        // Add user's reaction to existing emoji
        newReactions = prev.map((r, i) =>
          i === existingIndex
            ? { ...r, count: r.count + 1, hasReacted: true }
            : r
        )
      } else {
        // Add new reaction
        newReactions = [...prev, { emoji, count: 1, hasReacted: true }]
      }

      // Notify parent of change
      onReactionsChange?.(comment.id, newReactions)
      return newReactions
    })
  }

  // Toggle reaction when clicking on existing reaction badge
  const handleReactionClick = (emoji: string) => {
    setReactions((prev) => {
      const existingIndex = prev.findIndex((r) => r.emoji === emoji)

      if (existingIndex < 0) return prev

      const existing = prev[existingIndex]
      let newReactions: CommentReaction[]

      if (existing.hasReacted) {
        // Remove user's reaction
        if (existing.count <= 1) {
          // Remove the reaction entirely
          newReactions = prev.filter((_, i) => i !== existingIndex)
        } else {
          // Decrement count
          newReactions = prev.map((r, i) =>
            i === existingIndex
              ? { ...r, count: r.count - 1, hasReacted: false }
              : r
          )
        }
      } else {
        // Add user's reaction
        newReactions = prev.map((r, i) =>
          i === existingIndex
            ? { ...r, count: r.count + 1, hasReacted: true }
            : r
        )
      }

      // Notify parent of change
      onReactionsChange?.(comment.id, newReactions)
      return newReactions
    })
  }

  return (
    <div
      className={cn(
        "w-full flex flex-col items-start",
        "bg-gray-cool-50 border border-gray-cool-100 rounded-md",
        "p-xl"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-md items-start w-full">
        {/* Avatar */}
        <Avatar size="md" className="rounded-full shrink-0">
          {comment.author.avatarUrl && (
            <AvatarImage
              src={comment.author.avatarUrl}
              alt={comment.author.name}
            />
          )}
          <AvatarFallback className="rounded-full">
            {comment.author.initials ||
              comment.author.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Comment content */}
        <div className="flex-1 flex flex-col gap-md justify-center min-w-0">
          {/* Author info with action buttons */}
          <div className="flex items-center justify-between py-sm w-full">
            <div className="flex items-center gap-md">
              <span className="text-sm font-semibold text-gray-cool-600">
                {comment.author.name}
              </span>
              <Dot />
              <span className="text-xs font-medium text-gray-cool-400">
                {comment.date}
              </span>
            </div>
            {/* Action buttons - visible on hover */}
            <div
              className={cn(
                "flex items-center gap-xs transition-opacity duration-150",
                isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              <EmojiPicker onEmojiSelect={handleAddReaction}>
                <AddReactionButton />
              </EmojiPicker>
              <ReplyButton onClick={() => onReply?.(comment.id)} />
            </div>
          </div>

          {/* Message */}
          <p className="text-sm font-medium text-gray-cool-600 w-full">
            {comment.content}
          </p>

          {/* Reactions */}
          {reactions.length > 0 && (
            <div className="flex items-start gap-xs flex-wrap">
              {reactions.map((reaction, index) => (
                <ReactionBadge
                  key={`${reaction.emoji}-${index}`}
                  emoji={reaction.emoji}
                  count={reaction.count}
                  hasReacted={reaction.hasReacted}
                  onClick={() => handleReactionClick(reaction.emoji)}
                />
              ))}
            </div>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <RepliesIndicator
              replies={comment.replies}
              date={comment.repliesDate || ""}
              onClick={() => onViewReplies?.(comment.id)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Main Component
// ============================================================================

const CommentThread = React.forwardRef<HTMLDivElement, CommentThreadProps>(
  (
    {
      className,
      date,
      comments,
      onReply,
      onViewReplies,
      onReactionsChange,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex gap-md items-start px-xl py-0 bg-white", className)}
        {...props}
      >
        {/* Left side - Icon and divider */}
        <div className="flex flex-col items-center justify-center self-stretch shrink-0">
          {/* Comment icon */}
          <div className="flex items-center justify-center size-[36px] rounded-full bg-gray-cool-50 p-[10px]">
            <MessageTextCircle01 size={20} className="text-gray-cool-600" />
          </div>
          {/* Vertical divider */}
          <div className="flex-1 w-px bg-gray-cool-200 min-h-[16px]" />
        </div>

        {/* Right side - Content */}
        <div className="flex-1 flex flex-col gap-md justify-center min-w-0">
          {/* Header - simplified without action buttons */}
          <div className="flex items-center gap-md py-md w-full">
            <span className="text-sm font-medium text-gray-cool-700">
              Comments
            </span>
            <Dot />
            <span className="text-xs font-medium text-gray-cool-400">
              {date}
            </span>
          </div>

          {/* Comments */}
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onReply={onReply}
              onViewReplies={onViewReplies}
              onReactionsChange={onReactionsChange}
            />
          ))}
        </div>
      </div>
    )
  }
)
CommentThread.displayName = "CommentThread"

// ============================================================================
// Mention component for text with @mentions
// ============================================================================

interface MentionProps {
  children: React.ReactNode
}

const Mention = ({ children }: MentionProps) => (
  <span className="text-blue-500">@{children}</span>
)

export { CommentThread, Mention, AddReactionButton, ReplyButton }
