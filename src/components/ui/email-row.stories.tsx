import type { Meta, StoryObj } from "@storybook/react"
import { EmailRow, EmailRowSkeleton } from "./email-row"
import { useState, useEffect } from "react"
import type { AvatarInfo } from "@/types/email"

const meta: Meta<typeof EmailRow> = {
  title: "Components/EmailRow",
  component: EmailRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "hover", "selected", "unread", "skeleton", "pending", "error"],
      description: "Visual variant of the email row",
    },
    userName: {
      control: "text",
      description: "User/sender name",
    },
    threadCount: {
      control: "number",
      description: "Thread count to display",
    },
    subject: {
      control: "text",
      description: "Email subject line",
    },
    preview: {
      control: "text",
      description: "Email preview text",
    },
    date: {
      control: "text",
      description: "Date to display",
    },
    label: {
      control: "text",
      description: "Optional label badge text",
    },
    status: {
      control: "select",
      options: [undefined, "draft", "done", "response-required", "need-response"],
      description: "Email status indicator",
    },
    isSelected: {
      control: "boolean",
      description: "Whether the row is selected",
    },
    showTaskIcon: {
      control: "boolean",
      description: "Whether to show task icon",
    },
    showCommentIcon: {
      control: "boolean",
      description: "Whether to show comment icon",
    },
    isLoading: {
      control: "boolean",
      description: "Whether in loading state",
    },
    isPending: {
      control: "boolean",
      description: "Whether there's a pending action",
    },
    isError: {
      control: "boolean",
      description: "Whether last action failed",
    },
    isRecentlyUpdated: {
      control: "boolean",
      description: "Whether email was just updated (real-time)",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[1200px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof EmailRow>

// Sample avatar data
const avatarUrls: AvatarInfo[] = [
  { 
    id: "1",
    src: "https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg", 
    name: "Yassir UX" 
  },
  { 
    id: "2",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", 
    name: "Maria Chen" 
  },
]

// ============================================================================
// Basic States
// ============================================================================

export const Default: Story = {
  args: {
    emailId: "email-1",
    variant: "default",
    userName: "James Chen",
    subject: "Subject line",
    preview: "Thank you for the information! Excited to participate. Please keep me posted with any changes regarding my workshop.",
    date: "Jan 15",
    label: "Label",
  },
}

export const Hover: Story = {
  args: {
    emailId: "email-2",
    variant: "hover",
    userName: "James Chen",
    subject: "Subject line",
    preview: "Thank you for the information! Excited to participate. Please keep me posted with any changes regarding my workshop.",
    date: "Jan 15",
    label: "Label",
  },
}

export const Selected: Story = {
  args: {
    emailId: "email-3",
    variant: "selected",
    userName: "James Chen",
    subject: "Subject line",
    preview: "Thank you for the information! Excited to participate. Please keep me posted with any changes regarding my workshop.",
    date: "Jan 15",
    label: "Label",
    isSelected: true,
  },
}

export const Unread: Story = {
  args: {
    emailId: "email-4",
    variant: "unread",
    userName: "James Chen",
    subject: "Subject line",
    preview: "Thank you for the information! Excited to participate. Please keep me posted with any changes regarding my workshop.",
    date: "Jan 15",
    label: "Label",
  },
}

// ============================================================================
// Loading & Pending States
// ============================================================================

export const Loading: Story = {
  args: {
    emailId: "email-5",
    isLoading: true,
    userName: "",
    subject: "",
    preview: "",
    date: "",
  },
  parameters: {
    docs: {
      description: {
        story: "Skeleton loading state for when email data is being fetched.",
      },
    },
  },
}

export const Pending: Story = {
  args: {
    emailId: "email-6",
    variant: "default",
    userName: "James Chen",
    subject: "Subject line",
    preview: "This email has a pending action...",
    date: "Jan 15",
    isPending: true,
    pendingAction: "archive",
  },
  parameters: {
    docs: {
      description: {
        story: "Pending state for optimistic updates - shows when an action is in progress.",
      },
    },
  },
}

export const Error: Story = {
  args: {
    emailId: "email-7",
    variant: "error",
    userName: "James Chen",
    subject: "Subject line",
    preview: "This action failed and needs attention...",
    date: "Jan 15",
    isError: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Error state shown when an action fails. User can retry or dismiss.",
      },
    },
  },
}

export const RecentlyUpdated: Story = {
  args: {
    emailId: "email-8",
    variant: "default",
    userName: "James Chen",
    subject: "Just updated in real-time",
    preview: "This email was just updated via real-time subscription...",
    date: "Just now",
    isRecentlyUpdated: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Shows a visual indicator when email is updated in real-time.",
      },
    },
  },
}

// ============================================================================
// Status Variants
// ============================================================================

export const StatusDraft: Story = {
  args: {
    emailId: "email-9",
    variant: "default",
    userName: "James Chen",
    subject: "Subject line",
    preview: "Thank you for the information! Excited to participate. Please keep me posted with any changes regarding my workshop.",
    date: "Jan 15",
    status: "draft",
  },
}

export const StatusDone: Story = {
  args: {
    emailId: "email-10",
    variant: "default",
    userName: "James Chen",
    subject: "Subject line",
    preview: "Thank you for the information! Excited to participate. Please keep me posted with any changes regarding my workshop.",
    date: "Jan 15",
    status: "done",
  },
}

export const StatusResponseRequired: Story = {
  args: {
    emailId: "email-11",
    variant: "default",
    userName: "James Chen",
    subject: "Subject line",
    preview: "Thank you for the information! Excited to participate. Please keep me posted with any changes regarding my workshop.",
    date: "Jan 15",
    status: "response-required",
  },
}

export const StatusNeedResponse: Story = {
  args: {
    emailId: "email-12",
    variant: "default",
    userName: "James Chen",
    subject: "Subject line",
    preview: "Thank you for the information! Excited to participate. Please keep me posted with any changes regarding my workshop.",
    date: "Jan 15",
    status: "need-response",
  },
}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-0 w-full bg-white">
      <EmailRow
        emailId="status-1"
        variant="default"
        userName="James Chen"
        subject="Draft Email"
        preview="This is a draft email that hasn't been sent yet..."
        date="Jan 15"
        status="draft"
      />
      <EmailRow
        emailId="status-2"
        variant="default"
        userName="Sarah Miller"
        subject="Completed Task"
        preview="This conversation is done and closed..."
        date="Jan 14"
        status="done"
      />
      <EmailRow
        emailId="status-3"
        variant="default"
        userName="Alex Johnson"
        subject="Urgent: Client Request"
        preview="The client is waiting for your response..."
        date="Jan 13"
        status="response-required"
      />
      <EmailRow
        emailId="status-4"
        variant="default"
        userName="Emily Davis"
        subject="Waiting on Reply"
        preview="I sent this and I'm waiting for them to respond..."
        date="Jan 12"
        status="need-response"
      />
    </div>
  ),
}

// ============================================================================
// With Metadata
// ============================================================================

export const WithAvatars: Story = {
  args: {
    emailId: "email-13",
    variant: "default",
    userName: "James Chen",
    subject: "Subject line",
    preview: "Thank you for the information! Excited to participate. Please keep me posted with any changes regarding my workshop.",
    date: "Jan 15",
    label: "Label",
    avatars: avatarUrls,
  },
}

export const WithThreadCount: Story = {
  args: {
    emailId: "email-14",
    variant: "default",
    userName: "James Chen",
    threadCount: 4,
    subject: "Subject line",
    preview: "Thank you for the information! Excited to participate. Please keep me posted with any changes regarding my workshop.",
    date: "Jan 15",
    label: "Label",
  },
}

export const WithIcons: Story = {
  args: {
    emailId: "email-15",
    variant: "default",
    userName: "James Chen",
    subject: "Subject line",
    preview: "Thank you for the information! Excited to participate. Please keep me posted with any changes regarding my workshop.",
    date: "Jan 15",
    label: "Label",
    showTaskIcon: true,
    showCommentIcon: true,
  },
}

// ============================================================================
// All Variants Display
// ============================================================================

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-0 w-full bg-white">
      <div className="px-md py-sm text-xs text-gray-cool-500 font-medium bg-gray-cool-50">Default (Read)</div>
      <EmailRow
        emailId="var-1"
        variant="default"
        userName="James Chen"
        subject="Subject line"
        preview="Thank you for the information! Excited to participate. Please keep me posted with any changes regarding my workshop."
        date="Jan 15"
        label="Label"
      />
      
      <div className="px-md py-sm text-xs text-gray-cool-500 font-medium bg-gray-cool-50">Unread</div>
      <EmailRow
        emailId="var-2"
        variant="unread"
        userName="James Chen"
        subject="Subject line"
        preview="Thank you for the information! Excited to participate. Please keep me posted with any changes regarding my workshop."
        date="Jan 15"
        label="Label"
        threadCount={4}
      />
      
      <div className="px-md py-sm text-xs text-gray-cool-500 font-medium bg-gray-cool-50">Hover (action buttons visible)</div>
      <EmailRow
        emailId="var-3"
        variant="hover"
        userName="James Chen"
        subject="Subject line"
        preview="Thank you for the information! Excited to participate. Please keep me posted with any changes regarding my workshop."
        date="Jan 15"
        label="Label"
      />
      
      <div className="px-md py-sm text-xs text-gray-cool-500 font-medium bg-gray-cool-50">Selected</div>
      <EmailRow
        emailId="var-4"
        variant="selected"
        userName="James Chen"
        subject="Subject line"
        preview="Thank you for the information! Excited to participate. Please keep me posted with any changes regarding my workshop."
        date="Jan 15"
        label="Label"
        isSelected={true}
      />
      
      <div className="px-md py-sm text-xs text-gray-cool-500 font-medium bg-gray-cool-50">Loading</div>
      <EmailRow
        emailId="var-5"
        isLoading={true}
        userName=""
        subject=""
        preview=""
        date=""
      />
      
      <div className="px-md py-sm text-xs text-gray-cool-500 font-medium bg-gray-cool-50">Pending Action</div>
      <EmailRow
        emailId="var-6"
        variant="default"
        userName="James Chen"
        subject="Subject line"
        preview="Archiving this email..."
        date="Jan 15"
        isPending={true}
        pendingAction="archive"
      />
      
      <div className="px-md py-sm text-xs text-gray-cool-500 font-medium bg-gray-cool-50">Error State</div>
      <EmailRow
        emailId="var-7"
        variant="error"
        userName="James Chen"
        subject="Subject line"
        preview="Failed to archive - tap to retry"
        date="Jan 15"
        isError={true}
      />
      
      <div className="px-md py-sm text-xs text-gray-cool-500 font-medium bg-gray-cool-50">Recently Updated (real-time)</div>
      <EmailRow
        emailId="var-8"
        variant="default"
        userName="James Chen"
        subject="Just updated"
        preview="This email was just synced..."
        date="Just now"
        isRecentlyUpdated={true}
      />
    </div>
  ),
}

// ============================================================================
// Loading States Demo
// ============================================================================

export const LoadingList: Story = {
  render: () => (
    <div className="flex flex-col gap-0 w-full bg-white">
      <EmailRow emailId="load-1" isLoading userName="" subject="" preview="" date="" />
      <EmailRow emailId="load-2" isLoading userName="" subject="" preview="" date="" />
      <EmailRow emailId="load-3" isLoading userName="" subject="" preview="" date="" />
      <EmailRow emailId="load-4" isLoading userName="" subject="" preview="" date="" />
      <EmailRow emailId="load-5" isLoading userName="" subject="" preview="" date="" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple skeleton rows for loading an email list.",
      },
    },
  },
}

// ============================================================================
// Keyboard Navigation Demo
// ============================================================================

function KeyboardNavigationDemo() {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  
  const emails = [
    { id: "kb-1", userName: "James Chen", subject: "Project Update", preview: "The latest sprint...", date: "4:52 PM" },
    { id: "kb-2", userName: "Sarah Miller", subject: "Meeting Notes", preview: "Here are the notes...", date: "3:30 PM" },
    { id: "kb-3", userName: "Alex Johnson", subject: "Review Request", preview: "Please review...", date: "2:15 PM" },
  ]
  
  const handleSelect = (emailId: string, selected: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (selected) {
        next.add(emailId)
      } else {
        next.delete(emailId)
      }
      return next
    })
  }
  
  return (
    <div className="flex flex-col gap-lg">
      <div className="p-lg bg-gray-cool-50 rounded-md text-sm text-gray-cool-600">
        <p className="font-semibold mb-md">Keyboard Shortcuts:</p>
        <ul className="space-y-xs">
          <li><kbd className="px-xs py-xxs bg-white rounded text-xs">Tab</kbd> / <kbd className="px-xs py-xxs bg-white rounded text-xs">Shift+Tab</kbd> - Navigate between rows</li>
          <li><kbd className="px-xs py-xxs bg-white rounded text-xs">Enter</kbd> / <kbd className="px-xs py-xxs bg-white rounded text-xs">Space</kbd> - Open email</li>
          <li><kbd className="px-xs py-xxs bg-white rounded text-xs">X</kbd> - Toggle selection</li>
          <li><kbd className="px-xs py-xxs bg-white rounded text-xs">E</kbd> - Archive</li>
          <li><kbd className="px-xs py-xxs bg-white rounded text-xs">R</kbd> - Reply</li>
          <li><kbd className="px-xs py-xxs bg-white rounded text-xs">D</kbd> - Mark as done</li>
          <li><kbd className="px-xs py-xxs bg-white rounded text-xs">A</kbd> - Assign</li>
        </ul>
      </div>
      
      <div className="flex flex-col bg-white border border-gray-cool-200 rounded-md overflow-hidden">
        {emails.map((email, index) => (
          <EmailRow
            key={email.id}
            emailId={email.id}
            variant={selectedIds.has(email.id) ? "selected" : "default"}
            userName={email.userName}
            subject={email.subject}
            preview={email.preview}
            date={email.date}
            isSelected={selectedIds.has(email.id)}
            onSelect={handleSelect}
            onRowClick={(id) => console.log(`Opened: ${id}`)}
            onArchive={(id) => console.log(`Archive: ${id}`)}
            onReply={(id) => console.log(`Reply: ${id}`)}
            onMarkDone={(id) => console.log(`Done: ${id}`)}
            onAssign={(id) => console.log(`Assign: ${id}`)}
          />
        ))}
      </div>
      
      <p className="text-xs text-gray-cool-500">
        Selected: {selectedIds.size > 0 ? Array.from(selectedIds).join(", ") : "None"} 
        (check console for action logs)
      </p>
    </div>
  )
}

export const KeyboardNavigation: Story = {
  render: () => <KeyboardNavigationDemo />,
  parameters: {
    docs: {
      description: {
        story: "Interactive demo showing keyboard navigation and shortcuts. Focus a row and try the keyboard shortcuts.",
      },
    },
  },
}

// ============================================================================
// Optimistic Updates Demo
// ============================================================================

function OptimisticUpdateDemo() {
  const [emails, setEmails] = useState([
    { id: "opt-1", userName: "James Chen", subject: "Project Update", preview: "The latest sprint...", date: "4:52 PM", isPending: false, pendingAction: null as string | null, isError: false },
    { id: "opt-2", userName: "Sarah Miller", subject: "Meeting Notes", preview: "Here are the notes...", date: "3:30 PM", isPending: false, pendingAction: null as string | null, isError: false },
    { id: "opt-3", userName: "Alex Johnson", subject: "Review Request", preview: "Please review...", date: "2:15 PM", isPending: false, pendingAction: null as string | null, isError: false },
  ])
  
  const simulateAction = (emailId: string | undefined, action: string, shouldFail = false) => {
    if (!emailId) return
    
    // Optimistically update
    setEmails(prev => prev.map(e => 
      e.id === emailId 
        ? { ...e, isPending: true, pendingAction: action, isError: false }
        : e
    ))
    
    // Simulate API call
    setTimeout(() => {
      setEmails(prev => prev.map(e => {
        if (e.id === emailId) {
          if (shouldFail) {
            return { ...e, isPending: false, pendingAction: null, isError: true }
          }
          // Success - remove from list for archive/done
          return { ...e, isPending: false, pendingAction: null }
        }
        return e
      }))
    }, 1500)
  }
  
  return (
    <div className="flex flex-col gap-lg">
      <div className="p-lg bg-gray-cool-50 rounded-md text-sm text-gray-cool-600">
        <p className="font-semibold mb-md">Optimistic Updates Demo:</p>
        <p>Hover over a row and click an action button. The first row will simulate a failure.</p>
      </div>
      
      <div className="flex flex-col bg-white border border-gray-cool-200 rounded-md overflow-hidden">
        {emails.map((email, index) => (
          <EmailRow
            key={email.id}
            emailId={email.id}
            variant={email.isError ? "error" : "default"}
            userName={email.userName}
            subject={email.subject}
            preview={email.isError ? "Action failed - tap to retry" : email.preview}
            date={email.date}
            isPending={email.isPending}
            pendingAction={email.pendingAction as "archive" | "done" | null}
            isError={email.isError}
            onArchive={(id) => simulateAction(id, "archive", index === 0)}
            onMarkDone={(id) => simulateAction(id, "done", index === 0)}
          />
        ))}
      </div>
    </div>
  )
}

export const OptimisticUpdates: Story = {
  render: () => <OptimisticUpdateDemo />,
  parameters: {
    docs: {
      description: {
        story: "Demo showing optimistic update patterns with pending and error states.",
      },
    },
  },
}

// ============================================================================
// Real-time Updates Demo
// ============================================================================

function RealTimeUpdateDemo() {
  const [emails, setEmails] = useState([
    { id: "rt-1", userName: "James Chen", subject: "Initial Subject", preview: "Original content...", date: "4:52 PM", isRecentlyUpdated: false },
    { id: "rt-2", userName: "Sarah Miller", subject: "Meeting Notes", preview: "Here are the notes...", date: "3:30 PM", isRecentlyUpdated: false },
  ])
  
  const simulateRealTimeUpdate = () => {
    // Simulate receiving a real-time update
    setEmails(prev => prev.map((e, i) => 
      i === 0 
        ? { ...e, subject: "Updated: " + e.subject.replace("Updated: ", ""), preview: "Just updated at " + new Date().toLocaleTimeString(), isRecentlyUpdated: true }
        : e
    ))
    
    // Clear the recently updated indicator after 5 seconds
    setTimeout(() => {
      setEmails(prev => prev.map(e => ({ ...e, isRecentlyUpdated: false })))
    }, 5000)
  }
  
  return (
    <div className="flex flex-col gap-lg">
      <div className="flex items-center gap-md">
        <button
          onClick={simulateRealTimeUpdate}
          className="px-lg py-md bg-brand-500 text-white rounded-md text-sm font-medium hover:bg-brand-600 transition-colors"
        >
          Simulate Real-time Update
        </button>
        <span className="text-xs text-gray-cool-500">Click to simulate receiving a WebSocket update</span>
      </div>
      
      <div className="flex flex-col bg-white border border-gray-cool-200 rounded-md overflow-hidden">
        {emails.map((email) => (
          <EmailRow
            key={email.id}
            emailId={email.id}
            variant="default"
            userName={email.userName}
            subject={email.subject}
            preview={email.preview}
            date={email.date}
            isRecentlyUpdated={email.isRecentlyUpdated}
          />
        ))}
      </div>
    </div>
  )
}

export const RealTimeUpdates: Story = {
  render: () => <RealTimeUpdateDemo />,
  parameters: {
    docs: {
      description: {
        story: "Demo showing real-time update indicator when emails are updated via WebSocket/Supabase.",
      },
    },
  },
}

// ============================================================================
// Interactive with Full State Management
// ============================================================================

function InteractiveEmailList() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const emails = [
    { id: "int-1", userName: "James Chen", subject: "Project Update", preview: "The latest sprint has been completed successfully...", date: "Jan 15", label: "Work", isUnread: false },
    { id: "int-2", userName: "Sarah Miller", subject: "Meeting Notes", preview: "Here are the notes from today's standup meeting...", date: "Jan 14", label: "Team", isUnread: false, status: "done" as const },
    { id: "int-3", userName: "Alex Johnson", subject: "Review Request", preview: "Could you please review the attached document?", date: "Jan 13", status: "draft" as const, isUnread: false },
    { id: "int-4", userName: "Emily Davis", subject: "Quick Question", preview: "I had a question about the implementation details...", date: "Jan 12", isUnread: true, status: "response-required" as const },
  ]

  const getVariant = (email: typeof emails[0]) => {
    if (selectedId === email.id) return "selected"
    if (email.isUnread) return "unread"
    return "default"
  }

  return (
    <div className="flex flex-col">
      {emails.map((email) => (
        <EmailRow
          key={email.id}
          emailId={email.id}
          variant={getVariant(email)}
          userName={email.userName}
          subject={email.subject}
          preview={email.preview}
          date={email.date}
          label={email.label}
          status={email.status}
          isSelected={selectedId === email.id}
          onSelect={(id, selected) => setSelectedId(selected ? id : null)}
          onRowClick={(id) => console.log(`Clicked: ${id}`)}
          onArchive={(id) => console.log(`Archive: ${id}`)}
          onReply={(id) => console.log(`Reply: ${id}`)}
          onMarkDone={(id) => console.log(`Mark Done: ${id}`)}
          onAssign={(id) => console.log(`Assign: ${id}`)}
        />
      ))}
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveEmailList />,
}

// ============================================================================
// Skeleton Component Export
// ============================================================================

export const SkeletonOnly: Story = {
  render: () => (
    <div className="flex flex-col bg-white border border-gray-cool-200 rounded-md overflow-hidden">
      <div className="pl-md pr-4xl border-b border-gray-cool-100">
        <EmailRowSkeleton />
      </div>
      <div className="pl-md pr-4xl border-b border-gray-cool-100">
        <EmailRowSkeleton />
      </div>
      <div className="pl-md pr-4xl">
        <EmailRowSkeleton />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "The EmailRowSkeleton component can be used independently for custom loading layouts.",
      },
    },
  },
}

// ============================================================================
// Loading to Content Transition Demo
// ============================================================================

function LoadingTransitionDemo() {
  const [isLoading, setIsLoading] = useState(false)
  
  const emails = [
    { id: "trans-1", userName: "James Chen", subject: "Project Update", preview: "The latest sprint has been completed successfully...", date: "4:52 PM", label: "Work" },
    { id: "trans-2", userName: "Sarah Miller", subject: "Meeting Notes", preview: "Here are the notes from today's standup meeting...", date: "3:30 PM", label: "Team", status: "done" as const },
    { id: "trans-3", userName: "Alex Johnson", subject: "Review Request", preview: "Could you please review the attached document?", date: "2:15 PM", status: "draft" as const },
  ]
  
  const simulateLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }
  
  return (
    <div className="flex flex-col gap-lg">
      <div className="flex items-center gap-md">
        <button
          onClick={simulateLoading}
          className="px-lg py-md bg-brand-500 text-white rounded-md text-sm font-medium hover:bg-brand-600 transition-colors"
        >
          Simulate Loading
        </button>
        <span className="text-xs text-gray-cool-500">
          {isLoading ? "Loading..." : "Content loaded!"}
        </span>
      </div>
      
      <div className="flex flex-col bg-white border border-gray-cool-200 rounded-md overflow-hidden">
        {emails.map((email) => (
          <EmailRow
            key={email.id}
            emailId={email.id}
            isLoading={isLoading}
            variant="default"
            userName={email.userName}
            subject={email.subject}
            preview={email.preview}
            date={email.date}
            label={email.label}
            status={email.status}
          />
        ))}
      </div>
    </div>
  )
}

export const LoadingTransition: Story = {
  render: () => <LoadingTransitionDemo />,
  parameters: {
    docs: {
      description: {
        story: "Interactive demo showing the skeleton to content loading transition. Click the button to simulate loading.",
      },
    },
  },
}
