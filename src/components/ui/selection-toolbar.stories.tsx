import type { Meta, StoryObj } from "@storybook/react"
import { SelectionToolbar } from "./selection-toolbar"

const meta: Meta<typeof SelectionToolbar> = {
  title: "Components/SelectionToolbar",
  component: SelectionToolbar,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "gray", value: "#f6f6f9" },
      ],
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof SelectionToolbar>

// ============================================================================
// Default - Select text to see the toolbar
// ============================================================================

export const Default: Story = {
  args: {
    onBold: () => console.log("Bold clicked"),
    onItalic: () => console.log("Italic clicked"),
    onStrikethrough: () => console.log("Strikethrough clicked"),
    onLink: () => console.log("Link clicked"),
    onChecklist: () => console.log("Checklist clicked"),
    onAskPuls: () => console.log("Ask Puls clicked"),
    showAskPuls: true,
  },
  render: (args) => (
    <SelectionToolbar {...args}>
      <div className="p-8 bg-white border border-gray-cool-200 rounded-lg max-w-[600px]">
        <h2 className="text-lg font-semibold text-gray-cool-900 mb-4">
          Select any text to see the toolbar
        </h2>
        <p className="text-sm text-gray-cool-700 mb-4">
          This is a paragraph of text that you can select. Try highlighting any
          portion of this text with your mouse or keyboard (Shift + Arrow keys)
          to see the floating toolbar appear above your selection.
        </p>
        <p className="text-sm text-gray-cool-700 mb-4">
          The toolbar includes formatting options like <strong>Bold</strong>,{" "}
          <em>Italic</em>, <span className="line-through">Strikethrough</span>,
          and more. You can customize which buttons appear and what actions they
          trigger.
        </p>
        <p className="text-sm text-gray-cool-700">
          This component is designed to be generic and reusable. You can wrap
          any content with it to add text selection formatting capabilities.
        </p>
      </div>
    </SelectionToolbar>
  ),
}

// ============================================================================
// Without Ask Puls Button
// ============================================================================

export const WithoutAskPuls: Story = {
  args: {
    onBold: () => console.log("Bold clicked"),
    onItalic: () => console.log("Italic clicked"),
    onStrikethrough: () => console.log("Strikethrough clicked"),
    onLink: () => console.log("Link clicked"),
    onChecklist: () => console.log("Checklist clicked"),
    showAskPuls: false,
  },
  render: (args) => (
    <SelectionToolbar {...args}>
      <div className="p-8 bg-white border border-gray-cool-200 rounded-lg max-w-[600px]">
        <h2 className="text-lg font-semibold text-gray-cool-900 mb-4">
          Toolbar without Ask Puls
        </h2>
        <p className="text-sm text-gray-cool-700">
          This version of the toolbar doesn't include the "Ask Puls" button. Select
          any text to see the simplified toolbar with just formatting options.
        </p>
      </div>
    </SelectionToolbar>
  ),
}

// ============================================================================
// With Active Formats
// ============================================================================

export const WithActiveFormats: Story = {
  args: {
    onBold: () => console.log("Bold clicked"),
    onItalic: () => console.log("Italic clicked"),
    onStrikethrough: () => console.log("Strikethrough clicked"),
    onLink: () => console.log("Link clicked"),
    onChecklist: () => console.log("Checklist clicked"),
    onAskPuls: () => console.log("Ask Puls clicked"),
    activeFormats: ["bold", "italic"],
  },
  render: (args) => (
    <SelectionToolbar {...args}>
      <div className="p-8 bg-white border border-gray-cool-200 rounded-lg max-w-[600px]">
        <h2 className="text-lg font-semibold text-gray-cool-900 mb-4">
          Active Formatting States
        </h2>
        <p className="text-sm text-gray-cool-700">
          <strong>
            <em>This text is bold and italic.</em>
          </strong>{" "}
          When you select this text, the toolbar will show Bold and Italic as
          active (highlighted) buttons to indicate the current formatting state.
        </p>
      </div>
    </SelectionToolbar>
  ),
}

// ============================================================================
// Disabled
// ============================================================================

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <SelectionToolbar {...args}>
      <div className="p-8 bg-white border border-gray-cool-200 rounded-lg max-w-[600px]">
        <h2 className="text-lg font-semibold text-gray-cool-900 mb-4">
          Disabled Selection Toolbar
        </h2>
        <p className="text-sm text-gray-cool-700">
          When disabled, the toolbar will not appear even when text is selected.
          Try selecting this text - nothing will happen because the toolbar is
          disabled.
        </p>
      </div>
    </SelectionToolbar>
  ),
}

// ============================================================================
// Minimum Selection Length
// ============================================================================

export const MinSelectionLength: Story = {
  args: {
    minSelectionLength: 10,
    onBold: () => console.log("Bold clicked"),
    onItalic: () => console.log("Italic clicked"),
  },
  render: (args) => (
    <SelectionToolbar {...args}>
      <div className="p-8 bg-white border border-gray-cool-200 rounded-lg max-w-[600px]">
        <h2 className="text-lg font-semibold text-gray-cool-900 mb-4">
          Minimum 10 Characters Required
        </h2>
        <p className="text-sm text-gray-cool-700">
          This toolbar requires at least 10 characters to be selected before it
          appears. Try selecting just a few characters - the toolbar won't show.
          Then try selecting a longer phrase to see it appear.
        </p>
      </div>
    </SelectionToolbar>
  ),
}

// ============================================================================
// In a Rich Text Editor Context
// ============================================================================

export const RichTextEditorContext: Story = {
  args: {
    onBold: () => document.execCommand("bold"),
    onItalic: () => document.execCommand("italic"),
    onStrikethrough: () => document.execCommand("strikethrough"),
    onLink: () => {
      const url = prompt("Enter URL:")
      if (url) document.execCommand("createLink", false, url)
    },
    onAskPuls: () => console.log("Ask Puls clicked"),
  },
  render: (args) => (
    <SelectionToolbar {...args}>
      <div
        contentEditable
        suppressContentEditableWarning
        className="p-8 bg-white border border-gray-cool-200 rounded-lg max-w-[600px] min-h-[200px] outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        style={{ whiteSpace: "pre-wrap" }}
      >
        <p className="text-sm text-gray-cool-700 mb-4">
          This is an editable area. Select any text and use the toolbar to apply
          actual formatting!
        </p>
        <p className="text-sm text-gray-cool-700">
          Try selecting some text and clicking Bold or Italic to see the
          formatting applied in real-time.
        </p>
      </div>
    </SelectionToolbar>
  ),
}

// ============================================================================
// Custom Styled Toolbar
// ============================================================================

export const CustomStyledToolbar: Story = {
  args: {
    onBold: () => console.log("Bold clicked"),
    onItalic: () => console.log("Italic clicked"),
    toolbarClassName: "bg-gray-cool-900 border-gray-cool-800",
  },
  render: (args) => (
    <SelectionToolbar {...args}>
      <div className="p-8 bg-white border border-gray-cool-200 rounded-lg max-w-[600px]">
        <h2 className="text-lg font-semibold text-gray-cool-900 mb-4">
          Custom Styled Toolbar
        </h2>
        <p className="text-sm text-gray-cool-700">
          The toolbar can be customized with additional CSS classes via the
          toolbarClassName prop. Select this text to see a dark-themed toolbar.
        </p>
      </div>
    </SelectionToolbar>
  ),
}



