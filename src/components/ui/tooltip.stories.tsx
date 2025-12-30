import type { Meta, StoryObj } from "@storybook/react"
import { Tooltip, TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "./tooltip"
import { Button } from "./button"
import { Plus, Settings01, InfoCircle, HelpCircle, Copy01, Trash01 } from "@untitledui/icons"

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["dark", "light"],
      description: "Visual variant of the tooltip",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the tooltip",
    },
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Side of the trigger to show the tooltip",
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Alignment of the tooltip",
    },
    showArrow: {
      control: "boolean",
      description: "Whether to show the arrow",
    },
    delayDuration: {
      control: "number",
      description: "Delay before showing tooltip in ms",
    },
    shortcut: {
      control: "text",
      description: "Keyboard shortcut to display (e.g., 'R', 'E')",
    },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

// Default tooltip
export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: <Button>Hover me</Button>,
  },
}

// Variants
export const Dark: Story = {
  args: {
    content: "Dark tooltip style",
    variant: "dark",
    children: <Button variant="secondary-gray">Dark Tooltip</Button>,
  },
}

export const Light: Story = {
  args: {
    content: "Light tooltip style",
    variant: "light",
    children: <Button>Light Tooltip</Button>,
  },
}

// Sizes
export const Small: Story = {
  args: {
    content: "Small tooltip",
    size: "sm",
    children: <Button size="sm">Small</Button>,
  },
}

export const Medium: Story = {
  args: {
    content: "Medium tooltip",
    size: "md",
    children: <Button size="md">Medium</Button>,
  },
}

export const Large: Story = {
  args: {
    content: "Large tooltip with more content",
    size: "lg",
    children: <Button size="lg">Large</Button>,
  },
}

// Positions
export const TopPosition: Story = {
  args: {
    content: "Tooltip on top",
    side: "top",
    children: <Button>Top</Button>,
  },
}

export const RightPosition: Story = {
  args: {
    content: "Tooltip on right",
    side: "right",
    children: <Button>Right</Button>,
  },
}

export const BottomPosition: Story = {
  args: {
    content: "Tooltip on bottom",
    side: "bottom",
    children: <Button>Bottom</Button>,
  },
}

export const LeftPosition: Story = {
  args: {
    content: "Tooltip on left",
    side: "left",
    children: <Button>Left</Button>,
  },
}

// With Arrow
export const WithArrow: Story = {
  args: {
    content: "Tooltip with arrow",
    showArrow: true,
    children: <Button>With Arrow</Button>,
  },
}

// With Icon Buttons
export const WithIconButton: Story = {
  render: () => (
    <div className="flex gap-lg">
      <Tooltip content="Add new item">
        <Button variant="secondary-gray" size="icon">
          <Plus size={20} />
        </Button>
      </Tooltip>
      <Tooltip content="Settings">
        <Button variant="secondary-gray" size="icon">
          <Settings01 size={20} />
        </Button>
      </Tooltip>
      <Tooltip content="More information">
        <Button variant="tertiary-gray" size="icon">
          <InfoCircle size={20} />
        </Button>
      </Tooltip>
    </div>
  ),
}

// With Shortcut (using shortcut prop)
export const WithShortcut: Story = {
  args: {
    content: "Reply",
    shortcut: "R",
    children: <Button variant="secondary-gray">Reply</Button>,
  },
}

// Multiple Shortcuts
export const MultipleShortcuts: Story = {
  render: () => (
    <div className="flex gap-lg">
      <Tooltip content="Assign" shortcut="A">
        <Button variant="secondary-gray">Assign</Button>
      </Tooltip>
      <Tooltip content="Reply" shortcut="R">
        <Button variant="secondary-gray">Reply</Button>
      </Tooltip>
      <Tooltip content="Archive" shortcut="E">
        <Button variant="secondary-gray">Archive</Button>
      </Tooltip>
      <Tooltip content="Done" shortcut="D">
        <Button variant="secondary-gray">Done</Button>
      </Tooltip>
    </div>
  ),
}

// Shortcut with Icon Buttons
export const ShortcutWithIconButtons: Story = {
  render: () => (
    <div className="flex gap-lg">
      <Tooltip content="Copy" shortcut="C">
        <Button variant="secondary-gray" size="icon">
          <Copy01 size={20} />
        </Button>
      </Tooltip>
      <Tooltip content="Delete" shortcut="D">
        <Button variant="destructive" size="icon">
          <Trash01 size={20} />
        </Button>
      </Tooltip>
    </div>
  ),
}

// Rich Content
export const RichContent: Story = {
  args: {
    content: (
      <div className="flex flex-col gap-xs max-w-[200px]">
        <span className="font-semibold">Pro Tip</span>
        <span className="text-gray-cool-300">
          You can use keyboard shortcuts to speed up your workflow.
        </span>
      </div>
    ),
    size: "lg",
    children: (
      <Button variant="tertiary-gray" iconStart={<HelpCircle size={20} />}>
        Help
      </Button>
    ),
  },
}

// All Alignments
export const AllAlignments: Story = {
  render: () => (
    <div className="flex flex-col gap-4xl items-center py-6xl">
      <div className="flex gap-lg">
        <Tooltip content="Aligned to start" side="top" align="start">
          <Button variant="secondary-gray" size="sm">Start</Button>
        </Tooltip>
        <Tooltip content="Aligned to center" side="top" align="center">
          <Button variant="secondary-gray" size="sm">Center</Button>
        </Tooltip>
        <Tooltip content="Aligned to end" side="top" align="end">
          <Button variant="secondary-gray" size="sm">End</Button>
        </Tooltip>
      </div>
    </div>
  ),
}

// Long Content
export const LongContent: Story = {
  args: {
    content:
      "This is a longer tooltip message that demonstrates how the tooltip handles extended text content. It should wrap nicely.",
    size: "lg",
    children: <Button>Long Content</Button>,
  },
  decorators: [
    (Story) => (
      <div className="max-w-[300px]">
        <Story />
      </div>
    ),
  ],
}

// Using Primitive Components
export const UsingPrimitives: Story = {
  render: () => (
    <TooltipProvider delayDuration={100}>
      <TooltipRoot>
        <TooltipTrigger asChild>
          <Button variant="secondary-gray">Using Primitives</Button>
        </TooltipTrigger>
        <TooltipContent variant="dark" side="bottom">
          Full control with primitive components
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  ),
}

// Instant Tooltip (no delay)
export const InstantTooltip: Story = {
  args: {
    content: "I appear instantly!",
    delayDuration: 0,
    children: <Button>Instant (0ms)</Button>,
  },
}

// Default Delay (500ms)
export const DefaultDelay: Story = {
  args: {
    content: "Default 500ms delay",
    delayDuration: 500,
    children: <Button>Default (500ms)</Button>,
  },
}

// Longer Delay
export const LongerDelay: Story = {
  args: {
    content: "I take longer to appear",
    delayDuration: 800,
    children: <Button>Longer (800ms)</Button>,
  },
}

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => (
    <div className="flex flex-col gap-4xl items-center p-6xl">
      <h3 className="text-md font-semibold text-gray-cool-900">
        Hover over the buttons to see tooltips
      </h3>
      <div className="flex gap-md">
        <Tooltip content="Primary action" variant="dark">
          <Button>Primary</Button>
        </Tooltip>
        <Tooltip content="Secondary action" variant="light">
          <Button variant="secondary-gray">Secondary</Button>
        </Tooltip>
        <Tooltip content="Danger zone!" variant="dark">
          <Button variant="destructive">Delete</Button>
        </Tooltip>
      </div>
    </div>
  ),
}

