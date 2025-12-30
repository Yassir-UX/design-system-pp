import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"
import { useState } from "react"

// Icon components (Untitled UI style - stroke icons)
const CircleIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
  </svg>
)

const MailIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const LockIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const SearchIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
)

const EyeIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const EyeOffIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
    <line x1="2" x2="22" y1="2" y2="22"/>
  </svg>
)

const AlertCircleIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" x2="12" y1="8" y2="12"/>
    <line x1="12" x2="12.01" y1="16" y2="16"/>
  </svg>
)

const CheckCircleIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
)

const UserIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

// Icon options for Storybook controls
const iconOptions = {
  none: undefined,
  circle: <CircleIcon />,
  mail: <MailIcon />,
  lock: <LockIcon />,
  search: <SearchIcon />,
  user: <UserIcon />,
  alertCircle: <AlertCircleIcon />,
  checkCircle: <CheckCircleIcon />,
}

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A flexible input component matching the Figma design system with multiple variants, sizes, and support for icons, labels, help icons, shortcuts, and validation states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "focus", "filled", "error", "disabled"],
      description: "Visual variant of the input",
    },
    inputSize: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the input (sm: 36px, md: 40px, lg: 44px)",
    },
    label: {
      control: "text",
      description: "Label text displayed above the input",
    },
    hint: {
      control: "text",
      description: "Hint text displayed below the input",
    },
    error: {
      control: "text",
      description: "Error message displayed below the input (triggers error variant)",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required (shows asterisk)",
    },
    helpIcon: {
      control: "boolean",
      description: "Whether to show a help icon",
    },
    helpTooltip: {
      control: "text",
      description: "Tooltip content for the help icon",
    },
    shortcut: {
      control: "text",
      description: "Keyboard shortcut to display",
    },
    iconStart: {
      control: "select",
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: "Icon displayed at the start of the input",
    },
    iconEnd: {
      control: "select",
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: "Icon displayed at the end of the input",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Input>

// ======================
// FIGMA MATCHING STORIES
// ======================

// Default state (matches Figma Type=Default, Size=Lg)
export const FigmaDefault: Story = {
  name: "Figma: Default (Lg)",
  args: {
    label: "Email",
    required: true,
    placeholder: "olivia@untitledui.com",
    iconStart: <CircleIcon />,
    iconEnd: <CircleIcon />,
    helpIcon: true,
    hint: "Hint text",
    inputSize: "lg",
  },
}

// With shortcut
export const FigmaWithShortcut: Story = {
  name: "Figma: With Shortcut",
  args: {
    label: "Email",
    required: true,
    placeholder: "olivia@untitledui.com",
    iconStart: <CircleIcon />,
    shortcut: "N",
    hint: "Hint text",
    inputSize: "lg",
  },
}

// Error state
export const FigmaError: Story = {
  name: "Figma: Error State",
  args: {
    label: "Email",
    required: true,
    placeholder: "olivia@untitledui.com",
    iconStart: <CircleIcon />,
    iconEnd: <CircleIcon />,
    helpIcon: true,
    error: "This is an error message",
    inputSize: "lg",
  },
}

// Disabled state
export const FigmaDisabled: Story = {
  name: "Figma: Disabled State",
  args: {
    label: "Email",
    required: true,
    placeholder: "olivia@untitledui.com",
    iconStart: <CircleIcon />,
    iconEnd: <CircleIcon />,
    helpIcon: true,
    hint: "Hint text",
    disabled: true,
    inputSize: "lg",
  },
}

// ======================
// SIZE VARIATIONS
// ======================

export const SizeSmall: Story = {
  name: "Size: Small (36px)",
  args: {
    label: "Email",
    placeholder: "olivia@untitledui.com",
    iconStart: <MailIcon size={20} />,
    helpIcon: true,
    inputSize: "sm",
  },
}

export const SizeMedium: Story = {
  name: "Size: Medium (40px)",
  args: {
    label: "Email",
    placeholder: "olivia@untitledui.com",
    iconStart: <MailIcon size={20} />,
    helpIcon: true,
    inputSize: "md",
  },
}

export const SizeLarge: Story = {
  name: "Size: Large (44px)",
  args: {
    label: "Email",
    placeholder: "olivia@untitledui.com",
    iconStart: <MailIcon />,
    helpIcon: true,
    inputSize: "lg",
  },
}

// ======================
// COMMON USE CASES
// ======================

export const Default: Story = {
  args: {
    placeholder: "Enter your text...",
  },
}

export const WithLabel: Story = {
  args: {
    label: "Email",
    placeholder: "you@company.com",
    type: "email",
  },
}

export const WithLabelAndHint: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    hint: "Must be at least 8 characters",
    type: "password",
  },
}

export const Required: Story = {
  args: {
    label: "Email address",
    placeholder: "you@company.com",
    required: true,
  },
}

export const WithStartIcon: Story = {
  args: {
    label: "Email",
    placeholder: "you@company.com",
    iconStart: <MailIcon />,
  },
}

export const WithEndIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    iconEnd: <SearchIcon />,
  },
}

export const WithBothIcons: Story = {
  args: {
    label: "Email",
    placeholder: "you@company.com",
    iconStart: <MailIcon />,
    iconEnd: <CheckCircleIcon />,
  },
}

export const WithHelpIcon: Story = {
  args: {
    label: "What is this?",
    placeholder: "Enter value...",
    helpIcon: true,
    hint: "Click the help icon for more info",
  },
}

export const WithHelpTooltip: Story = {
  args: {
    label: "Email",
    placeholder: "you@company.com",
    helpIcon: true,
    helpTooltip: "Enter your primary email address for account notifications",
    iconStart: <MailIcon />,
  },
}

export const WithShortcut: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    iconStart: <SearchIcon />,
    shortcut: "K",
  },
}

export const Error: Story = {
  args: {
    label: "Email",
    placeholder: "you@company.com",
    error: "Please enter a valid email address",
    defaultValue: "invalid-email",
    iconStart: <MailIcon />,
  },
}

export const Disabled: Story = {
  args: {
    label: "Email",
    placeholder: "you@company.com",
    disabled: true,
    iconStart: <MailIcon />,
  },
}

export const DisabledWithValue: Story = {
  args: {
    label: "Email",
    defaultValue: "user@company.com",
    disabled: true,
    iconStart: <MailIcon />,
  },
}

export const DisabledWithShortcut: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    disabled: true,
    iconStart: <SearchIcon />,
    shortcut: "K",
  },
}

// ======================
// INTERACTIVE EXAMPLES
// ======================

// Password input with toggle
const PasswordInputWithToggle = () => {
  const [showPassword, setShowPassword] = useState(false)
  
  return (
    <div className="relative w-full">
      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        iconStart={<LockIcon />}
        hint="Must be at least 8 characters"
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-lg top-[38px] text-gray-cool-400 hover:text-gray-cool-600 transition-colors"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
      </button>
    </div>
  )
}

export const PasswordWithToggle: Story = {
  render: () => <PasswordInputWithToggle />,
}

// ======================
// SHOWCASE
// ======================

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-xl w-full">
      <Input 
        inputSize="sm" 
        label="Small (36px)"
        placeholder="Small input" 
        iconStart={<MailIcon size={20} />} 
        helpIcon
      />
      <Input 
        inputSize="md" 
        label="Medium (40px)"
        placeholder="Medium input" 
        iconStart={<MailIcon size={20} />} 
        helpIcon
      />
      <Input 
        inputSize="lg" 
        label="Large (44px)"
        placeholder="Large input" 
        iconStart={<MailIcon />} 
        helpIcon
      />
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <div className="flex flex-col gap-xl w-full">
      <Input
        label="Full name"
        placeholder="John Doe"
        required
        iconStart={<UserIcon />}
      />
      <Input
        label="Email address"
        placeholder="you@company.com"
        type="email"
        iconStart={<MailIcon />}
        helpIcon
        required
      />
      <Input
        label="Password"
        placeholder="Create a password"
        type="password"
        iconStart={<LockIcon />}
        hint="Must be at least 8 characters"
        required
      />
    </div>
  ),
}

export const ValidationStates: Story = {
  render: () => (
    <div className="flex flex-col gap-xl w-full">
      <Input
        label="Default"
        placeholder="Enter value..."
        helpIcon
      />
      <Input
        label="With value"
        defaultValue="Valid input"
        iconEnd={<CheckCircleIcon className="text-success-500" />}
      />
      <Input
        label="With error"
        placeholder="Enter value..."
        error="This field is required"
        iconEnd={<AlertCircleIcon />}
      />
      <Input
        label="Disabled"
        placeholder="Cannot edit"
        disabled
      />
    </div>
  ),
}

// Complete Figma showcase
export const FigmaShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-[2rem] w-full">
      {/* Type=Default, Size=Lg */}
      <div>
        <h3 className="mb-lg text-xs text-gray-cool-400 font-medium uppercase tracking-wide">DEFAULT (Lg)</h3>
        <Input
          label="Email"
          required
          placeholder="olivia@untitledui.com"
          iconStart={<CircleIcon />}
          iconEnd={<CircleIcon />}
          helpIcon
          hint="Hint text"
          inputSize="lg"
        />
      </div>
      
      {/* With shortcut */}
      <div>
        <h3 className="mb-lg text-xs text-gray-cool-400 font-medium uppercase tracking-wide">WITH SHORTCUT</h3>
        <Input
          label="Search"
          placeholder="Search..."
          iconStart={<SearchIcon />}
          shortcut="K"
          inputSize="lg"
        />
      </div>
      
      {/* All sizes */}
      <div>
        <h3 className="mb-lg text-xs text-gray-cool-400 font-medium uppercase tracking-wide">SIZES</h3>
        <div className="flex flex-col gap-lg">
          <Input 
            inputSize="sm" 
            placeholder="Small (36px)" 
            iconStart={<MailIcon size={20} />} 
            helpIcon
          />
          <Input 
            inputSize="md" 
            placeholder="Medium (40px)" 
            iconStart={<MailIcon size={20} />} 
            helpIcon
          />
          <Input 
            inputSize="lg" 
            placeholder="Large (44px)" 
            iconStart={<MailIcon />} 
            helpIcon
          />
        </div>
      </div>
      
      {/* States */}
      <div>
        <h3 className="mb-lg text-xs text-gray-cool-400 font-medium uppercase tracking-wide">STATES</h3>
        <div className="flex flex-col gap-lg">
          <Input
            label="Default"
            placeholder="olivia@untitledui.com"
            iconStart={<CircleIcon />}
            iconEnd={<CircleIcon />}
            helpIcon
            hint="Hint text"
          />
          <Input
            label="Error"
            placeholder="olivia@untitledui.com"
            iconStart={<CircleIcon />}
            iconEnd={<CircleIcon />}
            helpIcon
            error="This is an error message"
          />
          <Input
            label="Disabled"
            placeholder="olivia@untitledui.com"
            iconStart={<CircleIcon />}
            iconEnd={<CircleIcon />}
            helpIcon
            hint="Hint text"
            disabled
          />
        </div>
      </div>
    </div>
  ),
}
