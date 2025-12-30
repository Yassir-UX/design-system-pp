import type { Meta, StoryObj } from "@storybook/react"
import { LinkPreview } from "./link-preview"

const meta: Meta<typeof LinkPreview> = {
  title: "Components/LinkPreview",
  component: LinkPreview,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A component that shows a preview popover when clicking on links. Click on a link and keep hovering to see the preview above the link. Click the URL to open it, or use the copy button.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    delay: {
      control: { type: "number", min: 0, max: 2000, step: 100 },
      description: "Delay in milliseconds before showing preview after click",
    },
    disabled: {
      control: "boolean",
      description: "Whether link preview is disabled",
    },
    maxWidth: {
      control: { type: "number", min: 100, max: 400, step: 20 },
      description: "Maximum width of the URL display in pixels",
    },
  },
}

export default meta
type Story = StoryObj<typeof LinkPreview>

// ============================================================================
// Stories
// ============================================================================

export const Default: Story = {
  args: {
    delay: 300,
    disabled: false,
    maxWidth: 240,
  },
  render: (args) => (
    <LinkPreview {...args}>
      <div className="p-xl max-w-md text-sm text-gray-cool-700 leading-relaxed">
        <p>
          This is a paragraph with a{" "}
          <a href="https://google.com" className="text-brand-500 underline">
            link to Google
          </a>{" "}
          that you can click to preview. Click on the link and keep hovering
          to see the preview popover above it. Then click the URL to open it.
        </p>
      </div>
    </LinkPreview>
  ),
}

export const MultipleLinks: Story = {
  args: {
    delay: 300,
  },
  render: (args) => (
    <LinkPreview {...args}>
      <div className="p-xl max-w-md text-sm text-gray-cool-700 leading-relaxed space-y-lg">
        <p>
          Here are multiple links you can preview:
        </p>
        <ul className="list-disc pl-xl space-y-sm">
          <li>
            <a href="https://github.com" className="text-brand-500 underline">
              GitHub
            </a>{" "}
            - Code hosting platform
          </li>
          <li>
            <a href="https://figma.com" className="text-brand-500 underline">
              Figma
            </a>{" "}
            - Design tool
          </li>
          <li>
            <a href="https://vercel.com" className="text-brand-500 underline">
              Vercel
            </a>{" "}
            - Deployment platform
          </li>
          <li>
            <a href="https://supabase.com" className="text-brand-500 underline">
              Supabase
            </a>{" "}
            - Backend as a service
          </li>
        </ul>
      </div>
    </LinkPreview>
  ),
}

export const LongUrl: Story = {
  args: {
    delay: 300,
  },
  render: (args) => (
    <LinkPreview {...args}>
      <div className="p-xl max-w-md text-sm text-gray-cool-700 leading-relaxed">
        <p>
          This link has a very long URL:{" "}
          <a
            href="https://www.example.com/very/long/path/to/some/resource?query=parameter&another=value&foo=bar"
            className="text-brand-500 underline"
          >
            Example with long URL
          </a>
        </p>
      </div>
    </LinkPreview>
  ),
}

export const InContentEditable: Story = {
  args: {
    delay: 300,
  },
  render: (args) => (
    <LinkPreview {...args}>
      <div
        contentEditable
        suppressContentEditableWarning
        className="p-xl max-w-md text-sm text-gray-cool-700 leading-relaxed border border-gray-cool-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        <p>
          This is an editable area with a{" "}
          <a href="https://react.dev" className="text-brand-500 underline">
            link to React docs
          </a>
          . Click on the link and keep hovering to see the preview.
        </p>
      </div>
    </LinkPreview>
  ),
}

export const WithCustomDelay: Story = {
  args: {
    delay: 800,
  },
  render: (args) => (
    <LinkPreview {...args}>
      <div className="p-xl max-w-md text-sm text-gray-cool-700 leading-relaxed">
        <p>
          This preview has a longer delay (800ms). Click on{" "}
          <a href="https://tailwindcss.com" className="text-brand-500 underline">
            Tailwind CSS
          </a>{" "}
          and keep hovering to see it.
        </p>
      </div>
    </LinkPreview>
  ),
}

export const Disabled: Story = {
  args: {
    delay: 300,
    disabled: true,
  },
  render: (args) => (
    <LinkPreview {...args}>
      <div className="p-xl max-w-md text-sm text-gray-cool-700 leading-relaxed">
        <p>
          Link preview is disabled. Clicking on{" "}
          <a href="https://google.com" className="text-brand-500 underline">
            this link
          </a>{" "}
          will navigate directly (in a real scenario).
        </p>
      </div>
    </LinkPreview>
  ),
}

export const EmailStyle: Story = {
  args: {
    delay: 300,
  },
  render: (args) => (
    <LinkPreview {...args}>
      <div className="p-xl max-w-lg text-sm text-gray-cool-700 leading-relaxed space-y-md">
        <p>Hi Team,</p>
        <p>
          Please review the latest design updates on{" "}
          <a href="https://figma.com/file/abc123" className="text-brand-500 underline">
            Figma
          </a>
          . I've also pushed the changes to our{" "}
          <a href="https://github.com/org/repo/pull/42" className="text-brand-500 underline">
            GitHub PR #42
          </a>
          .
        </p>
        <p>
          You can preview the live version at{" "}
          <a href="https://preview.example.com" className="text-brand-500 underline">
            preview.example.com
          </a>
          .
        </p>
        <p>
          Best regards,<br />
          John
        </p>
      </div>
    </LinkPreview>
  ),
}

