import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

// Icon components (Untitled UI style - stroke icons)
// These accept strokeWidth prop which can be overridden by the Button component
interface IconProps {
  size?: number;
  strokeWidth?: number;
}

const CircleIcon = ({ size = 20, strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
  </svg>
);

const ArrowRightIcon = ({ size = 20, strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14m0 0-7-7m7 7-7 7"/>
  </svg>
);

const ArrowLeftIcon = ({ size = 20, strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5m0 0 7 7m-7-7 7-7"/>
  </svg>
);

const PlusIcon = ({ size = 20, strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14m-7-7h14"/>
  </svg>
);

const DownloadIcon = ({ size = 20, strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9m0 0-4-4m4 4 4-4"/>
  </svg>
);

const CheckIcon = ({ size = 20, strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

const XIcon = ({ size = 20, strokeWidth = 2 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>
);

// Icon options for Storybook controls
const iconOptions = {
  none: undefined,
  circle: <CircleIcon />,
  arrowRight: <ArrowRightIcon />,
  arrowLeft: <ArrowLeftIcon />,
  plus: <PlusIcon />,
  download: <DownloadIcon />,
  check: <CheckIcon />,
  x: <XIcon />,
};

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary-gray', 'tertiary-gray', 'link-gray', 'link-color', 'destructive'],
      description: 'The visual hierarchy of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    iconStart: {
      control: 'select',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: 'Icon displayed before the button text',
    },
    iconEnd: {
      control: 'select',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: 'Icon displayed after the button text',
    },
    shortcut: {
      control: 'text',
      description: 'Keyboard shortcut key to display (e.g., "G", "K")',
    },
    shortcutShowCommand: {
      control: 'boolean',
      description: 'Whether to show command (⌘) icon with shortcut',
    },
    iconStrokeWidth: {
      control: { type: 'number', min: 0.5, max: 3, step: 0.25 },
      description: 'Stroke width for icons (default: 2)',
    },
    children: {
      control: 'text',
      description: 'Button label text',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary button stories
export const Primary: Story = {
  args: {
    children: 'Button CTA',
    variant: 'primary',
  },
};

export const PrimaryWithIconStart: Story = {
  args: {
    children: 'Button CTA',
    variant: 'primary',
    iconStart: <CircleIcon />,
  },
};

export const PrimaryWithIconEnd: Story = {
  args: {
    children: 'Button CTA',
    variant: 'primary',
    iconEnd: <ArrowRightIcon />,
  },
};

export const PrimaryWithBothIcons: Story = {
  args: {
    children: 'Button CTA',
    variant: 'primary',
    iconStart: <CircleIcon />,
    iconEnd: <ArrowRightIcon />,
  },
};

export const PrimaryIconOnly: Story = {
  args: {
    variant: 'primary',
    iconStart: <PlusIcon />,
  },
};

// Secondary Gray button stories
export const SecondaryGray: Story = {
  args: {
    children: 'Button CTA',
    variant: 'secondary-gray',
  },
};

export const SecondaryGrayWithIcon: Story = {
  args: {
    children: 'Button CTA',
    variant: 'secondary-gray',
    iconStart: <CircleIcon />,
  },
};

// Tertiary Gray button stories
export const TertiaryGray: Story = {
  args: {
    children: 'Button CTA',
    variant: 'tertiary-gray',
  },
};

export const TertiaryGrayWithIcon: Story = {
  args: {
    children: 'Button CTA',
    variant: 'tertiary-gray',
    iconStart: <CircleIcon />,
  },
};

// Link button stories
export const LinkGray: Story = {
  args: {
    children: 'Button CTA',
    variant: 'link-gray',
  },
};

export const LinkColor: Story = {
  args: {
    children: 'Button CTA',
    variant: 'link-color',
  },
};

// Destructive button
export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

// Size variations
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Button CTA',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Button CTA',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Button CTA',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Button CTA',
  },
};

// Disabled with shortcut
export const DisabledWithShortcut: Story = {
  args: {
    disabled: true,
    children: 'Button CTA',
    shortcut: 'G',
  },
};

// Disabled states showcase
export const DisabledStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="primary" disabled>Primary</Button>
        <Button variant="secondary-gray" disabled>Secondary</Button>
        <Button variant="tertiary-gray" disabled>Tertiary</Button>
        <Button variant="link-gray" disabled>Link Gray</Button>
        <Button variant="link-color" disabled>Link Color</Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="primary" disabled iconStart={<CircleIcon />}>With Icon</Button>
        <Button variant="primary" disabled iconStart={<PlusIcon />} />
      </div>
    </div>
  ),
};

// Disabled with shortcuts showcase - demonstrates shortcut visibility in disabled state
export const DisabledWithShortcuts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '12px', color: '#7D89B0', fontWeight: 500 }}>ENABLED (for comparison)</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" shortcut="G">Primary</Button>
          <Button variant="destructive" shortcut="D">Destructive</Button>
          <Button variant="secondary-gray" shortcut="S">Secondary</Button>
          <Button variant="tertiary-gray" shortcut="T">Tertiary</Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '12px', color: '#7D89B0', fontWeight: 500 }}>DISABLED WITH SHORTCUTS</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" disabled shortcut="G">Primary</Button>
          <Button variant="destructive" disabled shortcut="D">Destructive</Button>
          <Button variant="secondary-gray" disabled shortcut="S">Secondary</Button>
          <Button variant="tertiary-gray" disabled shortcut="T">Tertiary</Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '12px', color: '#7D89B0', fontWeight: 500 }}>DISABLED WITH ICONS AND SHORTCUTS</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" disabled iconStart={<CircleIcon />} shortcut="G">With Icon</Button>
          <Button variant="secondary-gray" disabled iconStart={<DownloadIcon />} shortcut="D">Download</Button>
        </div>
      </div>
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary-gray">Secondary Gray</Button>
        <Button variant="tertiary-gray">Tertiary Gray</Button>
        <Button variant="link-gray">Link Gray</Button>
        <Button variant="link-color">Link Color</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </div>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// Icon buttons showcase
export const IconButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button iconStart={<PlusIcon />} variant="primary" />
      <Button iconStart={<CheckIcon />} variant="secondary-gray" />
      <Button iconStart={<XIcon />} variant="tertiary-gray" />
    </div>
  ),
};

// Complete showcase matching Figma
export const FigmaShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Primary Row */}
      <div>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '12px', color: '#7D89B0', fontWeight: 500 }}>PRIMARY</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variant="primary" size="sm">Button CTA</Button>
          <Button variant="primary" size="md">Button CTA</Button>
          <Button variant="primary" size="lg">Button CTA</Button>
          <Button variant="primary" size="sm" iconStart={<CircleIcon size={16} />} />
          <Button variant="primary" size="md" iconStart={<CircleIcon />} />
          <Button variant="primary" size="lg" iconStart={<CircleIcon />} />
        </div>
      </div>
      
      {/* Secondary Gray Row */}
      <div>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '12px', color: '#7D89B0', fontWeight: 500 }}>SECONDARY GRAY</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variant="secondary-gray" size="sm">Button CTA</Button>
          <Button variant="secondary-gray" size="md">Button CTA</Button>
          <Button variant="secondary-gray" size="lg">Button CTA</Button>
          <Button variant="secondary-gray" size="sm" iconStart={<CircleIcon size={16} />} />
          <Button variant="secondary-gray" size="md" iconStart={<CircleIcon />} />
          <Button variant="secondary-gray" size="lg" iconStart={<CircleIcon />} />
        </div>
      </div>
      
      {/* Tertiary Gray Row */}
      <div>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '12px', color: '#7D89B0', fontWeight: 500 }}>TERTIARY GRAY</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variant="tertiary-gray" size="sm">Button CTA</Button>
          <Button variant="tertiary-gray" size="md">Button CTA</Button>
          <Button variant="tertiary-gray" size="lg">Button CTA</Button>
          <Button variant="tertiary-gray" size="sm" iconStart={<CircleIcon size={16} />} />
          <Button variant="tertiary-gray" size="md" iconStart={<CircleIcon />} />
          <Button variant="tertiary-gray" size="lg" iconStart={<CircleIcon />} />
        </div>
      </div>
      
      {/* Link Variants */}
      <div>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '12px', color: '#7D89B0', fontWeight: 500 }}>LINK</h3>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Button variant="link-gray" size="sm">Button CTA</Button>
          <Button variant="link-gray" size="md">Button CTA</Button>
          <Button variant="link-gray" size="lg">Button CTA</Button>
          <Button variant="link-color" size="sm">Button CTA</Button>
          <Button variant="link-color" size="md">Button CTA</Button>
          <Button variant="link-color" size="lg">Button CTA</Button>
        </div>
      </div>
      
      {/* With Icons */}
      <div>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '12px', color: '#7D89B0', fontWeight: 500 }}>WITH ICONS</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" iconStart={<CircleIcon />}>Button CTA</Button>
          <Button variant="primary" iconEnd={<ArrowRightIcon />}>Button CTA</Button>
          <Button variant="primary" iconStart={<CircleIcon />} iconEnd={<ArrowRightIcon />}>Button CTA</Button>
          <Button variant="secondary-gray" iconStart={<DownloadIcon />}>Download</Button>
          <Button variant="tertiary-gray" iconStart={<PlusIcon />}>Add Item</Button>
        </div>
      </div>
      
      {/* With Shortcuts */}
      <div>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '12px', color: '#7D89B0', fontWeight: 500 }}>WITH SHORTCUTS</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" shortcut="G">Button CTA</Button>
          <Button variant="primary" iconStart={<CircleIcon />} shortcut="K">Button CTA</Button>
          <Button variant="secondary-gray" shortcut="S">Button CTA</Button>
          <Button variant="secondary-gray" iconStart={<DownloadIcon />} shortcut="D">Download</Button>
          <Button variant="tertiary-gray" shortcut="T">Button CTA</Button>
        </div>
      </div>
    </div>
  ),
};

// Shortcut examples
export const WithShortcut: Story = {
  args: {
    children: 'Button CTA',
    variant: 'primary',
    shortcut: 'G',
  },
};

export const WithShortcutAndIcon: Story = {
  args: {
    children: 'Button CTA',
    variant: 'primary',
    iconStart: <CircleIcon />,
    shortcut: 'K',
  },
};

export const ShortcutWithoutCommand: Story = {
  args: {
    children: 'Button CTA',
    variant: 'primary',
    shortcut: 'w',
    shortcutShowCommand: false,
  },
};

export const SecondaryWithShortcut: Story = {
  args: {
    children: 'Button CTA',
    variant: 'secondary-gray',
    shortcut: 'S',
  },
};

export const ShortcutShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Primary shortcuts */}
      <div>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '12px', color: '#7D89B0', fontWeight: 500 }}>PRIMARY WITH SHORTCUTS</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" shortcut="G">Button CTA</Button>
          <Button variant="primary" shortcut="w" shortcutShowCommand={false}>Button CTA</Button>
          <Button variant="primary" iconStart={<CircleIcon />} shortcut="K">With Icon</Button>
        </div>
      </div>
      
      {/* Secondary shortcuts */}
      <div>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '12px', color: '#7D89B0', fontWeight: 500 }}>SECONDARY WITH SHORTCUTS</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="secondary-gray" shortcut="S">Button CTA</Button>
          <Button variant="secondary-gray" shortcut="w" shortcutShowCommand={false}>Button CTA</Button>
          <Button variant="secondary-gray" iconStart={<DownloadIcon />} shortcut="D">Download</Button>
        </div>
      </div>
      
      {/* Tertiary shortcuts */}
      <div>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '12px', color: '#7D89B0', fontWeight: 500 }}>TERTIARY WITH SHORTCUTS</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="tertiary-gray" shortcut="T">Button CTA</Button>
          <Button variant="tertiary-gray" shortcut="w" shortcutShowCommand={false}>Button CTA</Button>
        </div>
      </div>
    </div>
  ),
};
