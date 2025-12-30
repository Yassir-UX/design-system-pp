import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select, Account } from './select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selectSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the select input',
    },
    multiSelect: {
      control: 'boolean',
      description: 'Enable multi-select mode',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    hint: {
      control: 'text',
      description: 'Hint text below the select',
    },
    error: {
      control: 'text',
      description: 'Error message below the select',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

const defaultAccounts: Account[] = [
  { id: '1', name: 'Personal', email: 'personal@email.com' },
  { id: '2', name: 'Work', email: 'work@company.com' },
  { id: '3', name: 'Team', email: 'team@company.com' },
];

const accountsWithAvatars: Account[] = [
  {
    id: '1',
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'Phoenix Baker',
    email: 'phoenix@untitledui.com',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Lana Steiner',
    email: 'lana@untitledui.com',
    avatarUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '4',
    name: 'Demi Wilkinson',
    email: 'demi@untitledui.com',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '5',
    name: 'Candice Wu',
    email: 'candice@untitledui.com',
    avatarUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
  },
];

// Interactive story with single select
const InteractiveSelect = ({
  accounts,
  multiSelect = false,
  initialSelected = 1,
  ...props
}: {
  accounts: Account[];
  multiSelect?: boolean;
  initialSelected?: number;
  selectSize?: 'sm' | 'md' | 'lg';
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
}) => {
  const [selected, setSelected] = useState<Account[]>(
    accounts.slice(0, initialSelected)
  );

  return (
    <Select
      selectedAccounts={selected}
      accounts={accounts}
      onAccountChange={setSelected}
      multiSelect={multiSelect}
      {...props}
    />
  );
};

// === Size Variants ===
export const SizeSmall: Story = {
  render: () => (
    <InteractiveSelect 
      accounts={accountsWithAvatars} 
      selectSize="sm"
      label="Account"
    />
  ),
};

export const SizeMedium: Story = {
  render: () => (
    <InteractiveSelect 
      accounts={accountsWithAvatars} 
      selectSize="md"
      label="Account"
    />
  ),
};

export const SizeLarge: Story = {
  render: () => (
    <InteractiveSelect 
      accounts={accountsWithAvatars} 
      selectSize="lg"
      label="Account"
    />
  ),
};

// === All Sizes ===
export const AllSizes: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-xl">
      <InteractiveSelect 
        accounts={accountsWithAvatars} 
        selectSize="sm"
        label="Small (36px)"
      />
      <InteractiveSelect 
        accounts={accountsWithAvatars} 
        selectSize="md"
        label="Medium (40px)"
      />
      <InteractiveSelect 
        accounts={accountsWithAvatars} 
        selectSize="lg"
        label="Large (44px)"
      />
    </div>
  ),
};

// === Default ===
export const Default: Story = {
  render: () => <InteractiveSelect accounts={defaultAccounts} />,
};

// === With Avatars ===
export const WithAvatars: Story = {
  render: () => <InteractiveSelect accounts={accountsWithAvatars} />,
};

// === With Label ===
export const WithLabel: Story = {
  render: () => (
    <InteractiveSelect 
      accounts={accountsWithAvatars} 
      label="Select account"
    />
  ),
};

// === With Label and Required ===
export const WithLabelRequired: Story = {
  render: () => (
    <InteractiveSelect 
      accounts={accountsWithAvatars} 
      label="Select account"
    />
  ),
};

// === With Hint ===
export const WithHint: Story = {
  render: () => (
    <InteractiveSelect 
      accounts={accountsWithAvatars} 
      label="Account"
      hint="Choose the account to send from"
    />
  ),
};

// === With Error ===
export const WithError: Story = {
  render: () => (
    <InteractiveSelect 
      accounts={accountsWithAvatars} 
      label="Account"
      error="Please select an account"
      initialSelected={0}
    />
  ),
};

// === Disabled ===
export const Disabled: Story = {
  render: () => (
    <InteractiveSelect 
      accounts={accountsWithAvatars} 
      label="Account"
      disabled
    />
  ),
};

// === Multi Select ===
export const MultiSelect: Story = {
  render: () => (
    <InteractiveSelect 
      accounts={accountsWithAvatars} 
      multiSelect 
    />
  ),
};

// === Multi Select with Multiple Selected ===
export const MultiSelectWithMultiple: Story = {
  render: () => (
    <InteractiveSelect 
      accounts={accountsWithAvatars} 
      multiSelect
      initialSelected={3}
      label="Select accounts"
    />
  ),
};

// === Placeholder ===
export const WithPlaceholder: Story = {
  render: () => (
    <InteractiveSelect 
      accounts={accountsWithAvatars} 
      placeholder="Choose an account..."
      initialSelected={0}
      label="Account"
    />
  ),
};

// === Custom Width ===
export const WithCustomWidth: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <InteractiveSelect 
      accounts={accountsWithAvatars} 
      multiSelect
      initialSelected={3}
      label="Select accounts"
    />
  ),
};



