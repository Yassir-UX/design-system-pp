import type { Meta, StoryObj } from "@storybook/react"
import { CommentThread, Mention } from "./comment-thread"

// Sample avatar images (using reliable external URLs)
const avatarYassir =
  "https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg"
const avatarPhoenix =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
const avatarWilliam =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
const avatarOlivia =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"

const meta: Meta<typeof CommentThread> = {
  title: "Components/CommentThread",
  component: CommentThread,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "white",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    date: {
      control: "text",
      description: "Date displayed in the thread header",
    },
    onReply: { action: "reply" },
    onViewReplies: { action: "view replies" },
    onReactionsChange: { action: "reactions changed" },
  },
}

export default meta
type Story = StoryObj<typeof CommentThread>

// ============================================================================
// Stories
// ============================================================================

/**
 * Default comment thread - simple comment without reactions or replies.
 * - Hover over a comment to see the action buttons (add reaction, reply)
 * - Click the smile icon to open the emoji picker and add reactions
 */
export const Default: Story = {
  args: {
    date: "Dec 22",
    comments: [
      {
        id: "1",
        author: {
          name: "Yassir UX",
          avatarUrl: avatarYassir,
          initials: "YU",
        },
        content: (
          <>
            The NDIS plan was recently reviewed by <Mention>william</Mention>{" "}
            right?
          </>
        ),
        date: "Dec 22",
      },
    ],
  },
}

/**
 * Comment with reactions and replies - matches the Figma design
 */
export const WithReactionsAndReplies: Story = {
  args: {
    date: "Dec 22",
    comments: [
      {
        id: "1",
        author: {
          name: "Yassir UX",
          avatarUrl: avatarYassir,
          initials: "YU",
        },
        content: (
          <>
            The NDIS plan was recently reviewed by <Mention>william</Mention>{" "}
            right?
          </>
        ),
        date: "Dec 22",
        reactions: [{ emoji: "👋", count: 2, hasReacted: false }],
        replies: [
          {
            author: {
              name: "Phoenix Baker",
              avatarUrl: avatarPhoenix,
              initials: "PB",
            },
          },
          {
            author: {
              name: "William Smith",
              avatarUrl: avatarWilliam,
              initials: "WS",
            },
          },
        ],
        repliesDate: "Dec 11",
      },
    ],
  },
}

/**
 * Comment without reactions or replies - hover to see action buttons
 */
export const SimpleComment: Story = {
  args: {
    date: "Dec 20",
    comments: [
      {
        id: "1",
        author: {
          name: "Phoenix Baker",
          avatarUrl: avatarPhoenix,
          initials: "PB",
        },
        content:
          "This looks great! I'll review the documents and get back to you.",
        date: "Dec 20",
      },
    ],
  },
}

/**
 * Comment with multiple reactions - some you've reacted to (highlighted)
 */
export const WithMultipleReactions: Story = {
  args: {
    date: "Dec 18",
    comments: [
      {
        id: "1",
        author: {
          name: "William Smith",
          avatarUrl: avatarWilliam,
          initials: "WS",
        },
        content: "The project milestone has been completed! 🎉",
        date: "Dec 18",
        reactions: [
          { emoji: "🎉", count: 5, hasReacted: true },
          { emoji: "👏", count: 3, hasReacted: false },
          { emoji: "❤️", count: 2, hasReacted: true },
        ],
      },
    ],
  },
}

/**
 * Comment with many replies
 */
export const WithManyReplies: Story = {
  args: {
    date: "Dec 15",
    comments: [
      {
        id: "1",
        author: {
          name: "Olivia Martin",
          avatarUrl: avatarOlivia,
          initials: "OM",
        },
        content:
          "Team meeting notes have been uploaded. Please review before EOD.",
        date: "Dec 15",
        reactions: [{ emoji: "👍", count: 4, hasReacted: false }],
        replies: [
          {
            author: {
              name: "Phoenix Baker",
              avatarUrl: avatarPhoenix,
              initials: "PB",
            },
          },
          {
            author: {
              name: "William Smith",
              avatarUrl: avatarWilliam,
              initials: "WS",
            },
          },
          {
            author: {
              name: "Yassir UX",
              avatarUrl: avatarYassir,
              initials: "YU",
            },
          },
        ],
        repliesDate: "Dec 15",
      },
    ],
  },
}

/**
 * Multiple comments in a thread
 */
export const MultipleComments: Story = {
  args: {
    date: "Dec 22",
    comments: [
      {
        id: "1",
        author: {
          name: "Yassir UX",
          avatarUrl: avatarYassir,
          initials: "YU",
        },
        content: (
          <>
            The NDIS plan was recently reviewed by <Mention>william</Mention>{" "}
            right?
          </>
        ),
        date: "Dec 22",
        reactions: [{ emoji: "👋", count: 2, hasReacted: false }],
        replies: [
          {
            author: {
              name: "Phoenix Baker",
              avatarUrl: avatarPhoenix,
              initials: "PB",
            },
          },
          {
            author: {
              name: "William Smith",
              avatarUrl: avatarWilliam,
              initials: "WS",
            },
          },
        ],
        repliesDate: "Dec 11",
      },
      {
        id: "2",
        author: {
          name: "William Smith",
          avatarUrl: avatarWilliam,
          initials: "WS",
        },
        content:
          "Yes, I reviewed it last week. All updates have been applied as requested.",
        date: "Dec 22",
        reactions: [{ emoji: "✅", count: 1, hasReacted: true }],
      },
    ],
  },
}

/**
 * Comment with avatar fallback (no image)
 */
export const WithAvatarFallback: Story = {
  args: {
    date: "Dec 10",
    comments: [
      {
        id: "1",
        author: {
          name: "New User",
          initials: "NU",
        },
        content: "This is my first comment in the system!",
        date: "Dec 10",
      },
    ],
  },
}

/**
 * Long comment content
 */
export const LongContent: Story = {
  args: {
    date: "Dec 8",
    comments: [
      {
        id: "1",
        author: {
          name: "Phoenix Baker",
          avatarUrl: avatarPhoenix,
          initials: "PB",
        },
        content: (
          <>
            I've completed the comprehensive review of the documentation. There
            are several key points we need to address before the next sprint
            planning session. First, the API specifications need to be updated
            to reflect the latest changes. Second, we should consider
            implementing the caching mechanism that <Mention>william</Mention>{" "}
            suggested earlier. Finally, the performance benchmarks need to be
            re-run with the new configuration.
          </>
        ),
        date: "Dec 8",
        reactions: [
          { emoji: "👍", count: 3, hasReacted: false },
          { emoji: "📝", count: 1, hasReacted: true },
        ],
        replies: [
          {
            author: {
              name: "Yassir UX",
              avatarUrl: avatarYassir,
              initials: "YU",
            },
          },
        ],
        repliesDate: "Dec 9",
      },
    ],
  },
}

/**
 * Single reply
 */
export const SingleReply: Story = {
  args: {
    date: "Dec 5",
    comments: [
      {
        id: "1",
        author: {
          name: "Olivia Martin",
          avatarUrl: avatarOlivia,
          initials: "OM",
        },
        content: "Can someone help me with this task?",
        date: "Dec 5",
        replies: [
          {
            author: {
              name: "Phoenix Baker",
              avatarUrl: avatarPhoenix,
              initials: "PB",
            },
          },
        ],
        repliesDate: "Dec 5",
      },
    ],
  },
}
