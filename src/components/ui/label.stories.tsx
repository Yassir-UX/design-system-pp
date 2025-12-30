import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "./label"
import { Check, XClose, Star01, AlertCircle, Clock } from "@untitledui/icons"

const meta = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: [
        "brand",
        "gray",
        "blue",
        "success",
        "error",
        "warning",
        "indigo",
        "purple",
        "pink",
        "cyan",
        "teal",
        "orange",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    outline: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

// Default Label
export const Default: Story = {
  args: {
    children: "Label",
    color: "blue",
    size: "md",
  },
}

// All Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-lg">
      <Label size="sm">Small</Label>
      <Label size="md">Medium</Label>
      <Label size="lg">Large</Label>
    </div>
  ),
}

// All Colors - Filled
export const ColorsFilled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Label color="brand">Brand</Label>
      <Label color="gray">Gray</Label>
      <Label color="blue">Blue</Label>
      <Label color="success">Success</Label>
      <Label color="error">Error</Label>
      <Label color="warning">Warning</Label>
      <Label color="indigo">Indigo</Label>
      <Label color="purple">Purple</Label>
      <Label color="pink">Pink</Label>
      <Label color="cyan">Cyan</Label>
      <Label color="teal">Teal</Label>
      <Label color="orange">Orange</Label>
    </div>
  ),
}

// All Colors - Outline
export const ColorsOutline: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Label color="brand" outline>Brand</Label>
      <Label color="gray" outline>Gray</Label>
      <Label color="blue" outline>Blue</Label>
      <Label color="success" outline>Success</Label>
      <Label color="error" outline>Error</Label>
      <Label color="warning" outline>Warning</Label>
      <Label color="indigo" outline>Indigo</Label>
      <Label color="purple" outline>Purple</Label>
      <Label color="pink" outline>Pink</Label>
      <Label color="cyan" outline>Cyan</Label>
      <Label color="teal" outline>Teal</Label>
      <Label color="orange" outline>Orange</Label>
    </div>
  ),
}

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Label color="success" iconStart={<Check size={12} />}>
        Approved
      </Label>
      <Label color="error" iconStart={<XClose size={12} />}>
        Rejected
      </Label>
      <Label color="warning" iconStart={<AlertCircle size={12} />}>
        Pending
      </Label>
      <Label color="brand" iconStart={<Star01 size={12} />}>
        Featured
      </Label>
      <Label color="gray" iconEnd={<Clock size={12} />}>
        2h ago
      </Label>
    </div>
  ),
}

// Semantic Usage Examples
export const SemanticExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div className="flex items-center gap-md">
        <span className="text-sm text-gray-cool-600 w-24">Status:</span>
        <Label color="success" size="sm">Active</Label>
        <Label color="warning" size="sm">Pending</Label>
        <Label color="error" size="sm">Inactive</Label>
      </div>
      <div className="flex items-center gap-md">
        <span className="text-sm text-gray-cool-600 w-24">Priority:</span>
        <Label color="error" size="sm">High</Label>
        <Label color="warning" size="sm">Medium</Label>
        <Label color="gray" size="sm">Low</Label>
      </div>
      <div className="flex items-center gap-md">
        <span className="text-sm text-gray-cool-600 w-24">Category:</span>
        <Label color="blue" size="sm">Design</Label>
        <Label color="purple" size="sm">Development</Label>
        <Label color="cyan" size="sm">Marketing</Label>
      </div>
    </div>
  ),
}

// Email Row Context
export const EmailRowContext: Story = {
  render: () => (
    <div className="flex items-center gap-md p-lg bg-gray-cool-25 rounded-md">
      <span className="text-sm text-gray-cool-700">Sarah Johnson</span>
      <span className="text-sm font-medium text-gray-cool-700">Project Update</span>
      <span className="text-sm text-gray-cool-500 truncate">Here's the latest update on the project...</span>
      <Label color="blue" size="sm">Figma</Label>
      <span className="text-sm text-gray-cool-400">2:34 PM</span>
    </div>
  ),
}

// Size Comparison with Icons
export const SizeComparisonWithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div className="flex items-center gap-md">
        <Label size="sm" color="success" iconStart={<Check size={12} />}>
          Small with icon
        </Label>
      </div>
      <div className="flex items-center gap-md">
        <Label size="md" color="success" iconStart={<Check size={12} />}>
          Medium with icon
        </Label>
      </div>
      <div className="flex items-center gap-md">
        <Label size="lg" color="success" iconStart={<Check size={14} />}>
          Large with icon
        </Label>
      </div>
    </div>
  ),
}

