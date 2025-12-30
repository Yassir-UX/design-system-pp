import type { Meta, StoryObj } from "@storybook/react"
import { EmailCompose, RecipientTag } from "./email-compose"
import { BorderlessInput } from "./input"

const meta: Meta<typeof EmailCompose> = {
  title: "Components/EmailCompose",
  component: EmailCompose,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "gray",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "gray", value: "#f6f6f9" },
      ],
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof EmailCompose>

// ============================================================================
// Default Story - matches Figma design (SelectionToolbar is now internal)
// ============================================================================

export const Default: Story = {
  args: {
    recipients: [{ id: "1", name: "tldv Team" }],
    subject: "NDIS Funding Review – Constituent Inquiry from Margaret Chen",
    isReply: true,
    defaultMessage: "Hi Yassir! 👋\n\nIt seems you're trying to record more simultaneous meetings than your current plan allows. Please check our Terms of Service to find the limits that apply to you.\n\nYou can upgrade your plan if you want to have more meetings recorded at the same time.\n\nHave a productive day,\n\nThe tl;dv team",
    hasThread: true,
  },
  render: (args) => (
    <div className="w-full max-w-[780px]">
      <EmailCompose {...args} />
    </div>
  ),
}

// ============================================================================
// Without Thread (dots hidden)
// ============================================================================

export const WithoutThread: Story = {
  args: {
    recipients: [{ id: "1", name: "tldv Team" }],
    subject: "NDIS Funding Review – Constituent Inquiry from Margaret Chen",
    isReply: true,
    defaultMessage: "Hi Yassir! 👋\n\nIt seems you're trying to record more simultaneous meetings than your current plan allows.",
    hasThread: false,
  },
  render: (args) => (
    <div className="w-full max-w-[780px]">
      <EmailCompose {...args} />
    </div>
  ),
}

// ============================================================================
// With Thread (dots visible)
// ============================================================================

export const WithThread: Story = {
  args: {
    recipients: [{ id: "1", name: "Support Team" }],
    subject: "Re: Issue with my account",
    isReply: true,
    defaultMessage: "",
    hasThread: true,
  },
  render: (args) => (
    <div className="w-full max-w-[780px]">
      <EmailCompose {...args} />
    </div>
  ),
}

// ============================================================================
// Empty State (no dots)
// ============================================================================

export const EmptyCompose: Story = {
  args: {
    recipients: [],
    subject: "",
    isReply: false,
    defaultMessage: "",
    hasThread: false,
  },
  render: (args) => (
    <div className="w-full max-w-[780px]">
      <EmailCompose {...args} />
    </div>
  ),
}

// ============================================================================
// New Email (not a reply)
// ============================================================================

export const NewEmail: Story = {
  args: {
    recipients: [
      { id: "1", name: "John Doe" },
      { id: "2", name: "Jane Smith" },
    ],
    subject: "Project Update - Q4 Planning",
    isReply: false,
    defaultMessage: "",
    hasThread: false,
  },
  render: (args) => (
    <div className="w-full max-w-[780px]">
      <EmailCompose {...args} />
    </div>
  ),
}

// ============================================================================
// Without Cc/Bcc
// ============================================================================

export const WithoutCcBcc: Story = {
  args: {
    recipients: [{ id: "1", name: "Support Team" }],
    subject: "Feature Request",
    isReply: false,
    defaultMessage: "",
    showCcBcc: false,
    hasThread: false,
  },
  render: (args) => (
    <div className="w-full max-w-[780px]">
      <EmailCompose {...args} />
    </div>
  ),
}

// ============================================================================
// Sub-components
// ============================================================================

export const RecipientTagComponent: StoryObj<typeof RecipientTag> = {
  render: () => (
    <div className="p-8 bg-white">
      <div className="flex gap-2">
        <RecipientTag name="tldv Team" onRemove={() => {}} />
        <RecipientTag name="John Doe" onRemove={() => {}} />
        <RecipientTag name="support@example.com" onRemove={() => {}} />
      </div>
    </div>
  ),
}

// ============================================================================
// BorderlessInput Component Stories
// ============================================================================

export const BorderlessInputSingleLine: StoryObj<typeof BorderlessInput> = {
  render: () => (
    <div className="p-8 bg-white w-[400px] space-y-4">
      <div className="border-b border-gray-cool-100 pb-4">
        <p className="text-xs text-gray-cool-400 mb-2">With prefix (Reply)</p>
        <BorderlessInput 
          placeholder="Subject..." 
          prefix="Re:" 
          defaultValue="NDIS Funding Review"
        />
      </div>
      <div className="border-b border-gray-cool-100 pb-4">
        <p className="text-xs text-gray-cool-400 mb-2">Without prefix</p>
        <BorderlessInput 
          placeholder="Subject..." 
        />
      </div>
      <div>
        <p className="text-xs text-gray-cool-400 mb-2">With value</p>
        <BorderlessInput 
          placeholder="Subject..." 
          defaultValue="Project Update - Q4 Planning"
        />
      </div>
    </div>
  ),
}

export const BorderlessInputMultiline: StoryObj<typeof BorderlessInput> = {
  render: () => (
    <div className="p-8 bg-white w-[500px] space-y-4">
      <div className="border-b border-gray-cool-100 pb-4">
        <p className="text-xs text-gray-cool-400 mb-2">Empty (with placeholder)</p>
        <BorderlessInput 
          multiline 
          placeholder="email..." 
        />
      </div>
      <div>
        <p className="text-xs text-gray-cool-400 mb-2">With content</p>
        <BorderlessInput 
          multiline 
          placeholder="email..." 
          defaultValue="Hi there! 👋

This is a multiline input that grows with content.

Best regards,
The Team"
        />
      </div>
    </div>
  ),
}
