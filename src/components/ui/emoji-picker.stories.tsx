import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { EmojiPicker, EmojiPickerContent, ReactionBadge } from "./emoji-picker"
import { FaceSmile } from "@untitledui/icons"

const meta: Meta<typeof EmojiPicker> = {
  title: "Components/EmojiPicker",
  component: EmojiPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Alignment of the popover",
    },
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Side where the popover appears",
    },
    onEmojiSelect: { action: "emoji selected" },
    onOpenChange: { action: "open changed" },
  },
}

export default meta
type Story = StoryObj<typeof EmojiPicker>

// ============================================================================
// Stories
// ============================================================================

/**
 * Default emoji picker
 */
export const Default: Story = {
  args: {
    align: "start",
    side: "bottom",
  },
  render: (args) => (
    <div className="p-xl">
      <EmojiPicker {...args}>
        <button
          type="button"
          className="inline-flex items-center justify-center px-md py-xs rounded-full bg-gray-cool-100 hover:bg-gray-cool-200 transition-colors"
        >
          <FaceSmile size={20} className="text-gray-cool-500" />
        </button>
      </EmojiPicker>
    </div>
  ),
}

/**
 * Standalone picker content
 */
export const StandaloneContent: Story = {
  render: () => (
    <div className="p-xl">
      <EmojiPickerContent
        onEmojiSelect={(emoji) => console.log("Selected:", emoji)}
      />
    </div>
  ),
}

/**
 * Interactive example with reaction state
 */
export const InteractiveReactions: Story = {
  render: function InteractiveReactionsStory() {
    const [reactions, setReactions] = React.useState<
      { emoji: string; count: number; hasReacted: boolean }[]
    >([{ emoji: "👋", count: 2, hasReacted: false }])

    const handleEmojiSelect = (emoji: string) => {
      setReactions((prev) => {
        const existingIndex = prev.findIndex((r) => r.emoji === emoji)
        if (existingIndex >= 0) {
          const existing = prev[existingIndex]
          if (existing.hasReacted) {
            // Already reacted, do nothing
            return prev
          }
          // Add reaction to existing
          return prev.map((r, i) =>
            i === existingIndex
              ? { ...r, count: r.count + 1, hasReacted: true }
              : r
          )
        }
        // Add new reaction
        return [...prev, { emoji, count: 1, hasReacted: true }]
      })
    }

    const handleReactionClick = (emoji: string) => {
      setReactions((prev) => {
        const existingIndex = prev.findIndex((r) => r.emoji === emoji)
        if (existingIndex < 0) return prev

        const existing = prev[existingIndex]

        if (existing.hasReacted) {
          // Remove user's reaction
          if (existing.count <= 1) {
            return prev.filter((_, i) => i !== existingIndex)
          }
          return prev.map((r, i) =>
            i === existingIndex
              ? { ...r, count: r.count - 1, hasReacted: false }
              : r
          )
        } else {
          // Add user's reaction
          return prev.map((r, i) =>
            i === existingIndex
              ? { ...r, count: r.count + 1, hasReacted: true }
              : r
          )
        }
      })
    }

    return (
      <div className="p-xl bg-white rounded-xl border border-gray-cool-200 w-[400px]">
        <div className="flex flex-col gap-md">
          <p className="text-sm text-gray-cool-700">
            Click the button to add reactions. Click a reaction to toggle your
            reaction.
          </p>

          {/* Reactions */}
          <div className="flex items-center gap-xs flex-wrap">
            {reactions.map((reaction) => (
              <ReactionBadge
                key={reaction.emoji}
                emoji={reaction.emoji}
                count={reaction.count}
                hasReacted={reaction.hasReacted}
                onClick={() => handleReactionClick(reaction.emoji)}
              />
            ))}

            {/* Add reaction button */}
            <EmojiPicker onEmojiSelect={handleEmojiSelect}>
              <button
                type="button"
                className="inline-flex items-center justify-center px-md py-xs rounded-full bg-gray-cool-100 hover:bg-gray-cool-200 transition-colors"
              >
                <FaceSmile size={20} className="text-gray-cool-400" />
              </button>
            </EmojiPicker>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Different positions
 */
export const Positions: Story = {
  render: () => (
    <div className="flex gap-xl p-xl">
      <div className="flex flex-col items-center gap-sm">
        <span className="text-xs text-gray-cool-500">Bottom (default)</span>
        <EmojiPicker
          onEmojiSelect={(emoji) => console.log(emoji)}
          side="bottom"
        >
          <button
            type="button"
            className="px-lg py-md rounded-md bg-gray-cool-100 hover:bg-gray-cool-200 text-sm"
          >
            Bottom
          </button>
        </EmojiPicker>
      </div>

      <div className="flex flex-col items-center gap-sm">
        <span className="text-xs text-gray-cool-500">Top</span>
        <EmojiPicker onEmojiSelect={(emoji) => console.log(emoji)} side="top">
          <button
            type="button"
            className="px-lg py-md rounded-md bg-gray-cool-100 hover:bg-gray-cool-200 text-sm"
          >
            Top
          </button>
        </EmojiPicker>
      </div>

      <div className="flex flex-col items-center gap-sm">
        <span className="text-xs text-gray-cool-500">Right</span>
        <EmojiPicker onEmojiSelect={(emoji) => console.log(emoji)} side="right">
          <button
            type="button"
            className="px-lg py-md rounded-md bg-gray-cool-100 hover:bg-gray-cool-200 text-sm"
          >
            Right
          </button>
        </EmojiPicker>
      </div>

      <div className="flex flex-col items-center gap-sm">
        <span className="text-xs text-gray-cool-500">Left</span>
        <EmojiPicker onEmojiSelect={(emoji) => console.log(emoji)} side="left">
          <button
            type="button"
            className="px-lg py-md rounded-md bg-gray-cool-100 hover:bg-gray-cool-200 text-sm"
          >
            Left
          </button>
        </EmojiPicker>
      </div>
    </div>
  ),
}
