import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { BorderlessInput } from "./input"
import { SelectionToolbar } from "./selection-toolbar"
import { LinkPreview } from "./link-preview"
import {
  DotsHorizontal,
  ClockPlus,
  Trash03,
  XClose,
} from "@untitledui/icons"

// ============================================================================
// Types
// ============================================================================

export interface Recipient {
  id: string
  name: string
}

export interface EmailComposeProps {
  /** Recipients in the "To" field */
  recipients?: Recipient[]
  /** Email subject line */
  subject?: string
  /** Whether this is a reply (shows "Re:" prefix) */
  isReply?: boolean
  /** Initial message content */
  defaultMessage?: string
  /** Show Cc/Bcc button */
  showCcBcc?: boolean
  /** Whether this email has a thread (shows three dots) */
  hasThread?: boolean
  /** Callback when recipients change */
  onRecipientsChange?: (recipients: Recipient[]) => void
  /** Callback when removing a recipient */
  onRemoveRecipient?: (id: string) => void
  /** Callback when Cc/Bcc is clicked */
  onCcBccClick?: () => void
  /** Callback when subject changes */
  onSubjectChange?: (subject: string) => void
  /** Callback when sending */
  onSend?: (message: string) => void
  /** Callback when scheduling */
  onSchedule?: () => void
  /** Callback when deleting draft */
  onDelete?: () => void
  /** Callback when three dots is clicked */
  onMoreOptions?: () => void
  /** Additional class names */
  className?: string
}

// ============================================================================
// RecipientTag Component
// ============================================================================

interface RecipientTagProps {
  name: string
  onRemove?: () => void
}

const RecipientTag = ({ name, onRemove }: RecipientTagProps) => (
  <div className="bg-gray-cool-50 flex gap-xxs items-center justify-center pl-md pr-xs py-xs rounded-sm">
    <span className="text-sm font-normal text-gray-cool-700">{name}</span>
    <button
      type="button"
      onClick={onRemove}
      className="flex items-center justify-center size-[20px] text-gray-cool-700 hover:text-gray-cool-900 transition-colors"
      aria-label={`Remove ${name}`}
    >
      <XClose size={12} strokeWidth={2} />
    </button>
  </div>
)

// ============================================================================
// EmailCompose Component
// ============================================================================

const EmailCompose = React.forwardRef<HTMLDivElement, EmailComposeProps>(
  (
    {
      recipients = [],
      subject = "",
      isReply = false,
      defaultMessage = "",
      showCcBcc = true,
      hasThread = false,
      onRecipientsChange,
      onRemoveRecipient,
      onCcBccClick,
      onSubjectChange,
      onSend,
      onSchedule,
      onDelete,
      onMoreOptions,
      className,
    },
    ref
  ) => {
    const [message, setMessage] = React.useState(defaultMessage)
    const [currentSubject, setCurrentSubject] = React.useState(subject)

    const handleSend = () => {
      onSend?.(message)
    }

    const handleSubjectChange = (newSubject: string) => {
      setCurrentSubject(newSubject)
      onSubjectChange?.(newSubject)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "bg-white border border-gray-cool-100 rounded-md overflow-hidden",
          "flex flex-col",
          "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.03),0px_4px_20.6px_0px_rgba(0,0,0,0.05)]",
          className
        )}
      >
        {/* ================================================================ */}
        {/* Header - To field */}
        {/* ================================================================ */}
        <div className="flex items-center justify-between pl-xl pr-md py-md border-b border-gray-cool-100">
          <div className="flex items-center gap-md">
            <span className="text-sm font-normal text-gray-cool-400">To</span>
            {recipients.map((recipient) => (
              <RecipientTag
                key={recipient.id}
                name={recipient.name}
                onRemove={() => onRemoveRecipient?.(recipient.id)}
              />
            ))}
          </div>
          
          {showCcBcc && (
            <Button
              variant="tertiary-gray"
              size="sm"
              onClick={onCcBccClick}
              className="h-auto py-md px-lg"
            >
              Cc/Bcc
            </Button>
          )}
        </div>

        {/* ================================================================ */}
        {/* Subject line - now editable */}
        {/* ================================================================ */}
        <div className="flex items-center justify-between pl-xl pr-md py-xl border-b border-gray-cool-100">
          <BorderlessInput
            value={currentSubject}
            onChange={handleSubjectChange}
            placeholder="Subject..."
            prefix={isReply ? "Re:" : undefined}
          />
        </div>

        {/* ================================================================ */}
        {/* Message body - with SelectionToolbar and LinkPreview */}
        {/* ================================================================ */}
        <div className="p-xl flex flex-col gap-md">
          {/* SelectionToolbar wraps the content for text formatting */}
          <SelectionToolbar
            onBold={() => document.execCommand("bold")}
            onItalic={() => document.execCommand("italic")}
            onStrikethrough={() => document.execCommand("strikeThrough")}
            onChecklist={() => document.execCommand("insertUnorderedList")}
            onAskPuls={() => console.log("Ask Puls clicked")}
          >
            {/* LinkPreview shows URL popover on link hover */}
            <LinkPreview delay={400}>
              <BorderlessInput
                multiline
                defaultValue={defaultMessage}
                onChange={setMessage}
                placeholder="email..."
              />
            </LinkPreview>
          </SelectionToolbar>
          
          {/* More options - only visible if has thread */}
          {hasThread && (
            <Button
              variant="tertiary-gray"
              size="sm"
              iconStart={<DotsHorizontal size={20} />}
              onClick={onMoreOptions}
              className="w-fit h-auto p-sm"
            />
          )}
        </div>

        {/* ================================================================ */}
        {/* Footer */}
        {/* ================================================================ */}
        <div className="flex items-center justify-between p-xl border-t border-gray-cool-100">
          {/* Left actions */}
          <div className="flex items-center gap-xs">
            <Button
              variant="tertiary-gray"
              size="sm"
              iconStart={<ClockPlus size={20} />}
              onClick={onSchedule}
              className="h-auto p-md"
            />
          </div>
          
          {/* Right actions */}
          <div className="flex items-center gap-md">
            <Button
              variant="secondary-gray"
              size="sm"
              iconStart={<Trash03 size={20} />}
              onClick={onDelete}
              className="h-auto p-md"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={handleSend}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    )
  }
)
EmailCompose.displayName = "EmailCompose"

export { EmailCompose, RecipientTag }
