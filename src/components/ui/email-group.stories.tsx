import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { EmailGroup } from "./email-group"
import { EmailRow } from "./email-row"

const meta: Meta<typeof EmailGroup> = {
  title: "Components/EmailGroup",
  component: EmailGroup,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof EmailGroup>

// Sample email data
const todayEmails = [
  {
    id: "1",
    userName: "Sarah Chen",
    subject: "Q4 Marketing Report",
    preview: "Here's the final version of the Q4 report with all the updates...",
    date: "10:32 AM",
    label: "Marketing",
    labelColor: "blue" as const,
  },
  {
    id: "2",
    userName: "Michael Torres",
    subject: "Design Review Meeting",
    preview: "Can we reschedule the design review to Thursday afternoon?",
    date: "9:15 AM",
    showReadIndicator: true,
  },
  {
    id: "3",
    userName: "Emily Johnson",
    subject: "Invoice #4521",
    preview: "Please find attached the invoice for the consulting services...",
    date: "8:45 AM",
    label: "Finance",
    labelColor: "purple" as const,
  },
]

const yesterdayEmails = [
  {
    id: "4",
    userName: "Alex Rivera",
    subject: "Project Update",
    preview: "The development team has completed the first milestone...",
    date: "Yesterday",
    label: "Development",
    labelColor: "green" as const,
    showTaskIcon: true,
  },
  {
    id: "5",
    userName: "Jordan Lee",
    subject: "Feedback Request",
    preview: "Could you review the latest mockups when you have a moment?",
    date: "Yesterday",
    showCommentIcon: true,
  },
]

// Interactive story with state management
const InteractiveEmailGroups = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const handleSelectAll = (ids: string[], selected: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (selected) {
        ids.forEach(id => next.add(id))
      } else {
        ids.forEach(id => next.delete(id))
      }
      return next
    })
  }

  const handleSelectRow = (id: string, selected: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (selected) {
        next.add(id)
      } else {
        next.delete(id)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col bg-white rounded-lg border border-gray-cool-200 overflow-hidden max-w-4xl">
      <EmailGroup
        dateLabel="Today"
        itemIds={todayEmails.map(e => e.id)}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
      >
        {todayEmails.map(email => (
          <EmailRow
            key={email.id}
            userName={email.userName}
            subject={email.subject}
            preview={email.preview}
            date={email.date}
            label={email.label}
            labelColor={email.labelColor}
            showReadIndicator={email.showReadIndicator}
            isSelected={selectedIds.has(email.id)}
            onSelect={(selected) => handleSelectRow(email.id, selected)}
          />
        ))}
      </EmailGroup>

      <EmailGroup
        dateLabel="Yesterday"
        itemIds={yesterdayEmails.map(e => e.id)}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
      >
        {yesterdayEmails.map(email => (
          <EmailRow
            key={email.id}
            userName={email.userName}
            subject={email.subject}
            preview={email.preview}
            date={email.date}
            label={email.label}
            labelColor={email.labelColor}
            showTaskIcon={email.showTaskIcon}
            showCommentIcon={email.showCommentIcon}
            isSelected={selectedIds.has(email.id)}
            onSelect={(selected) => handleSelectRow(email.id, selected)}
          />
        ))}
      </EmailGroup>
    </div>
  )
}

export const Default: Story = {
  render: () => <InteractiveEmailGroups />,
}

// Story showing partial selection (indeterminate state)
const PartialSelectionStory = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(["1", "3"]))

  const handleSelectAll = (ids: string[], selected: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (selected) {
        ids.forEach(id => next.add(id))
      } else {
        ids.forEach(id => next.delete(id))
      }
      return next
    })
  }

  const handleSelectRow = (id: string, selected: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (selected) {
        next.add(id)
      } else {
        next.delete(id)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col bg-white rounded-lg border border-gray-cool-200 overflow-hidden max-w-4xl">
      <EmailGroup
        dateLabel="Today"
        itemIds={todayEmails.map(e => e.id)}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
      >
        {todayEmails.map(email => (
          <EmailRow
            key={email.id}
            userName={email.userName}
            subject={email.subject}
            preview={email.preview}
            date={email.date}
            label={email.label}
            labelColor={email.labelColor}
            showReadIndicator={email.showReadIndicator}
            isSelected={selectedIds.has(email.id)}
            onSelect={(selected) => handleSelectRow(email.id, selected)}
          />
        ))}
      </EmailGroup>
    </div>
  )
}

export const PartialSelection: Story = {
  render: () => <PartialSelectionStory />,
  parameters: {
    docs: {
      description: {
        story: "Shows the indeterminate state when some items are selected (displays minus icon).",
      },
    },
  },
}

// Story showing all selected
const AllSelectedStory = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(todayEmails.map(e => e.id))
  )

  const handleSelectAll = (ids: string[], selected: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (selected) {
        ids.forEach(id => next.add(id))
      } else {
        ids.forEach(id => next.delete(id))
      }
      return next
    })
  }

  const handleSelectRow = (id: string, selected: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (selected) {
        next.add(id)
      } else {
        next.delete(id)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col bg-white rounded-lg border border-gray-cool-200 overflow-hidden max-w-4xl">
      <EmailGroup
        dateLabel="Today"
        itemIds={todayEmails.map(e => e.id)}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
      >
        {todayEmails.map(email => (
          <EmailRow
            key={email.id}
            userName={email.userName}
            subject={email.subject}
            preview={email.preview}
            date={email.date}
            label={email.label}
            labelColor={email.labelColor}
            showReadIndicator={email.showReadIndicator}
            isSelected={selectedIds.has(email.id)}
            onSelect={(selected) => handleSelectRow(email.id, selected)}
          />
        ))}
      </EmailGroup>
    </div>
  )
}

export const AllSelected: Story = {
  render: () => <AllSelectedStory />,
  parameters: {
    docs: {
      description: {
        story: "Shows the fully selected state with checkmark.",
      },
    },
  },
}

// Multiple groups story
const MultipleGroupsStory = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const handleSelectAll = (ids: string[], selected: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (selected) {
        ids.forEach(id => next.add(id))
      } else {
        ids.forEach(id => next.delete(id))
      }
      return next
    })
  }

  const handleSelectRow = (id: string, selected: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (selected) {
        next.add(id)
      } else {
        next.delete(id)
      }
      return next
    })
  }

  const dec22Emails = [
    {
      id: "6",
      userName: "Chris Martinez",
      subject: "Holiday Schedule",
      preview: "Please note the office will be closed from Dec 24th...",
      date: "Dec 22",
    },
    {
      id: "7",
      userName: "Lisa Wang",
      subject: "Year-end Review",
      preview: "Time to submit your annual self-assessment...",
      date: "Dec 22",
      label: "HR",
      labelColor: "orange" as const,
    },
  ]

  return (
    <div className="flex flex-col bg-white rounded-lg border border-gray-cool-200 overflow-hidden max-w-4xl">
      <EmailGroup
        dateLabel="Today"
        itemIds={todayEmails.map(e => e.id)}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
      >
        {todayEmails.map(email => (
          <EmailRow
            key={email.id}
            userName={email.userName}
            subject={email.subject}
            preview={email.preview}
            date={email.date}
            label={email.label}
            labelColor={email.labelColor}
            showReadIndicator={email.showReadIndicator}
            isSelected={selectedIds.has(email.id)}
            onSelect={(selected) => handleSelectRow(email.id, selected)}
          />
        ))}
      </EmailGroup>

      <EmailGroup
        dateLabel="Yesterday"
        itemIds={yesterdayEmails.map(e => e.id)}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
      >
        {yesterdayEmails.map(email => (
          <EmailRow
            key={email.id}
            userName={email.userName}
            subject={email.subject}
            preview={email.preview}
            date={email.date}
            label={email.label}
            labelColor={email.labelColor}
            showTaskIcon={email.showTaskIcon}
            showCommentIcon={email.showCommentIcon}
            isSelected={selectedIds.has(email.id)}
            onSelect={(selected) => handleSelectRow(email.id, selected)}
          />
        ))}
      </EmailGroup>

      <EmailGroup
        dateLabel="December 22"
        itemIds={dec22Emails.map(e => e.id)}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
      >
        {dec22Emails.map(email => (
          <EmailRow
            key={email.id}
            userName={email.userName}
            subject={email.subject}
            preview={email.preview}
            date={email.date}
            label={email.label}
            labelColor={email.labelColor}
            isSelected={selectedIds.has(email.id)}
            onSelect={(selected) => handleSelectRow(email.id, selected)}
          />
        ))}
      </EmailGroup>
    </div>
  )
}

export const MultipleGroups: Story = {
  render: () => <MultipleGroupsStory />,
  parameters: {
    docs: {
      description: {
        story: "Multiple date groups with independent selection states.",
      },
    },
  },
}


