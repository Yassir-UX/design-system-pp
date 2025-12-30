import type { Meta, StoryObj } from '@storybook/react';
import { Shortcut } from './shortcut';

const meta = {
  title: 'Components/Shortcut',
  component: Shortcut,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    keys: {
      control: 'text',
      description: 'The keyboard key to display',
    },
    showCommand: {
      control: 'boolean',
      description: 'Whether to show the command (⌘) icon',
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
      description: 'Theme variant (dark for primary buttons, light for secondary)',
    },
  },
} satisfies Meta<typeof Shortcut>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    keys: 'G',
    showCommand: true,
    theme: 'dark',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', background: '#43389B', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutCommand: Story = {
  args: {
    keys: 'w',
    showCommand: false,
    theme: 'dark',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', background: '#43389B', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LightTheme: Story = {
  args: {
    keys: 'S',
    showCommand: true,
    theme: 'light',
  },
};

export const LightWithoutCommand: Story = {
  args: {
    keys: 'w',
    showCommand: false,
    theme: 'light',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Dark theme (for primary buttons) */}
      <div>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '12px', color: '#7D89B0', fontWeight: 500 }}>DARK THEME (Primary Buttons)</h3>
        <div style={{ padding: '1rem', background: '#43389B', borderRadius: '8px', display: 'flex', gap: '1rem' }}>
          <Shortcut keys="G" theme="dark" />
          <Shortcut keys="K" theme="dark" />
          <Shortcut keys="w" theme="dark" showCommand={false} />
          <Shortcut keys="Enter" theme="dark" showCommand={false} />
        </div>
      </div>
      
      {/* Light theme (for secondary buttons) */}
      <div>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '12px', color: '#7D89B0', fontWeight: 500 }}>LIGHT THEME (Secondary Buttons)</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Shortcut keys="S" theme="light" />
          <Shortcut keys="D" theme="light" />
          <Shortcut keys="w" theme="light" showCommand={false} />
          <Shortcut keys="Esc" theme="light" showCommand={false} />
        </div>
      </div>
    </div>
  ),
};


