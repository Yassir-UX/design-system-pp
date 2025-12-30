import type { LabelProps } from "@/components/ui/label"

// ============================================================================
// Core Email Types for Backend Integration
// ============================================================================

/**
 * Email status representing the current state in the workflow
 */
export type EmailStatus = "inbox" | "draft" | "done" | "archived" | "sent"

/**
 * Email priority levels
 */
export type EmailPriority = "low" | "normal" | "high" | "urgent"

/**
 * Response status for tracking email conversations
 */
export type ResponseStatus = 
  | "none"
  | "response-required"  // Needs your response
  | "need-response"      // Waiting for their response
  | "done"               // Conversation complete

/**
 * Pending action for optimistic updates
 */
export type PendingAction = "archive" | "done" | "read" | "delete" | "assign" | null

// ============================================================================
// Sub-entity Types
// ============================================================================

/**
 * Assignee information for email assignments
 */
export interface Assignee {
  id: string
  name: string
  avatarUrl: string
  email?: string
}

/**
 * Email label/tag for categorization
 */
export interface EmailLabel {
  id: string
  name: string
  color: LabelProps["color"]
}

/**
 * Sender/participant information
 */
export interface EmailParticipant {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

// ============================================================================
// Main Email Interface
// ============================================================================

/**
 * Complete Email entity matching backend data structure
 * Designed for real-time updates (Supabase/WebSocket)
 */
export interface Email {
  /** Unique identifier */
  id: string
  
  /** Thread identifier for grouped conversations */
  threadId?: string
  
  /** Number of messages in thread */
  threadCount?: number
  
  // Sender information
  senderId: string
  senderName: string
  senderEmail: string
  senderAvatar?: string
  
  // Content
  subject: string
  preview: string
  body?: string
  
  // State
  status: EmailStatus
  responseStatus?: ResponseStatus
  priority: EmailPriority
  isRead: boolean
  isStarred?: boolean
  
  // Metadata indicators
  hasTask: boolean
  hasComments: boolean
  hasAttachments?: boolean
  
  // Relationships
  labels: EmailLabel[]
  assignees: Assignee[]
  participants?: EmailParticipant[]
  
  // Timestamps (ISO strings from backend, can convert to Date)
  createdAt: string
  updatedAt: string
  receivedAt?: string
}

// ============================================================================
// Component-Specific Types
// ============================================================================

/**
 * Avatar info for the AvatarStack component
 */
export interface AvatarInfo {
  src: string
  name: string
  id?: string
}

/**
 * Simplified email data for EmailRow component
 * Can be derived from full Email or passed directly
 */
export interface EmailRowData {
  id: string
  userName: string
  userAvatar?: string
  threadCount?: number
  subject: string
  preview: string
  date: string
  label?: string
  labelColor?: LabelProps["color"]
  avatars?: AvatarInfo[]
  status?: ResponseStatus
  isRead: boolean
  showTaskIcon?: boolean
  showCommentIcon?: boolean
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Convert full Email to EmailRowData for component consumption
 */
export function emailToRowData(email: Email): EmailRowData {
  return {
    id: email.id,
    userName: email.senderName,
    userAvatar: email.senderAvatar,
    threadCount: email.threadCount,
    subject: email.subject,
    preview: email.preview,
    date: formatEmailDate(email.receivedAt || email.createdAt),
    label: email.labels[0]?.name,
    labelColor: email.labels[0]?.color,
    avatars: email.assignees.map(a => ({
      id: a.id,
      src: a.avatarUrl,
      name: a.name,
    })),
    status: email.responseStatus,
    isRead: email.isRead,
    showTaskIcon: email.hasTask,
    showCommentIcon: email.hasComments,
  }
}

/**
 * Format date for display in EmailRow
 */
export function formatEmailDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  // Today - show time
  if (diffDays === 0) {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }
  
  // Yesterday
  if (diffDays === 1) {
    return 'Yesterday'
  }
  
  // Within 7 days - show day name
  if (diffDays < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'long' })
  }
  
  // Older - show date
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
}

/**
 * Check if an email was recently updated (within last 5 seconds)
 * Useful for showing real-time update indicators
 */
export function isRecentlyUpdated(updatedAt: string, thresholdMs = 5000): boolean {
  const updated = new Date(updatedAt).getTime()
  const now = Date.now()
  return now - updated < thresholdMs
}


