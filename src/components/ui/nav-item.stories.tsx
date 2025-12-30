import type { Meta, StoryObj } from '@storybook/react';
import { NavItem } from './nav-item';
import { 
  Inbox01, 
  Edit04, 
  CheckCircle, 
  Copy03,
  Grid01,
  Cryptocurrency01,
  Home01,
  Settings01,
  User01,
  Mail01,
  Star01,
  Heart,
  Folder,
  File06,
  SearchLg,
  Bell01
} from '@untitledui/icons';

// Icon mapping for Storybook controls (colors are handled automatically by NavItem)
const iconOptions = {
  Inbox: <Inbox01 size={19} />,
  Edit: <Edit04 size={19} />,
  CheckCircle: <CheckCircle size={19} />,
  Copy: <Copy03 size={19} />,
  Grid: <Grid01 size={19} />,
  Crypto: <Cryptocurrency01 size={19} />,
  Home: <Home01 size={19} />,
  Settings: <Settings01 size={19} />,
  User: <User01 size={19} />,
  Mail: <Mail01 size={19} />,
  Star: <Star01 size={19} />,
  Heart: <Heart size={19} />,
  Folder: <Folder size={19} />,
  File: <File06 size={19} />,
  Search: <SearchLg size={19} />,
  Bell: <Bell01 size={19} />,
};

type IconName = keyof typeof iconOptions;

const meta: Meta<typeof NavItem> = {
  title: 'Components/NavItem',
  component: NavItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text for the nav item',
    },
    isActive: {
      control: 'boolean',
      description: 'Whether this item is currently active/selected',
    },
    avatarUrl: {
      control: 'text',
      description: 'Avatar image URL (for team member variant)',
    },
    showAvatarPlaceholder: {
      control: 'boolean',
      description: 'Show placeholder avatar with user icon',
    },
    icon: {
      control: 'select',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: 'Icon to display (for navigation variant)',
    },
    shortcut: {
      control: 'text',
      description: 'Keyboard shortcut to display',
    },
    shortcutShowCommand: {
      control: 'boolean',
      description: 'Whether to show the command (⌘) icon with the shortcut',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 250 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavItem & { iconName?: IconName }>;

// Icon variants
export const Default: Story = {
  args: {
    label: 'Inbox',
    icon: iconOptions.Inbox,
  },
};

export const Active: Story = {
  args: {
    label: 'Inbox',
    icon: iconOptions.Inbox,
    isActive: true,
  },
};

export const WithDifferentIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-xxs w-full">
      <NavItem 
        icon={<Inbox01 size={19} />} 
        label="Inbox" 
        isActive 
      />
      <NavItem 
        icon={<Cryptocurrency01 size={19} />} 
        label="Assigned to me" 
      />
      <NavItem 
        icon={<Edit04 size={19} />} 
        label="Drafts" 
      />
      <NavItem 
        icon={<CheckCircle size={19} />} 
        label="Done" 
      />
      <NavItem 
        icon={<Copy03 size={19} />} 
        label="Views" 
      />
      <NavItem 
        icon={<Grid01 size={19} />} 
        label="Approval needed" 
      />
    </div>
  ),
};

export const WithShortcuts: Story = {
  render: () => (
    <div className="flex flex-col gap-xxs w-full">
      <NavItem 
        icon={<Inbox01 size={19} />} 
        label="Inbox" 
        shortcut="I"
        isActive 
      />
      <NavItem 
        icon={<Cryptocurrency01 size={19} />} 
        label="Assigned to me" 
        shortcut="A"
      />
      <NavItem 
        icon={<Edit04 size={19} />} 
        label="Drafts" 
        shortcut="D"
      />
      <NavItem 
        icon={<CheckCircle size={19} />} 
        label="Done" 
        shortcut="X"
      />
      <NavItem 
        icon={<Copy03 size={19} />} 
        label="Views" 
        shortcut="V"
      />
    </div>
  ),
};

export const WithShortcutNoCommand: Story = {
  args: {
    label: 'Inbox',
    icon: iconOptions.Inbox,
    shortcut: 'I',
    shortcutShowCommand: false,
  },
};

// Avatar variants (Team Members)
export const WithAvatar: Story = {
  args: {
    label: 'Yassir UX',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg',
  },
};

export const WithAvatarPlaceholder: Story = {
  args: {
    label: 'Maria',
    showAvatarPlaceholder: true,
  },
};

export const TeamMembers: Story = {
  render: () => (
    <div className="flex flex-col w-full">
      <NavItem 
        label="Yassir UX" 
        avatarUrl="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg" 
      />
      <NavItem 
        label="Maria" 
        showAvatarPlaceholder 
      />
      <NavItem 
        label="Liam" 
        showAvatarPlaceholder 
      />
    </div>
  ),
};

// All variants together
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-lg w-full">
      <div className="flex flex-col gap-xxs w-full">
        <NavItem 
          icon={<Inbox01 size={19} />} 
          label="Inbox" 
          isActive 
        />
        <NavItem 
          icon={<Cryptocurrency01 size={19} />} 
          label="Assigned to me" 
        />
        <NavItem 
          icon={<Edit04 size={19} />} 
          label="Drafts" 
        />
      </div>
      
      <div className="flex items-center gap-md w-full">
        <span className="text-xs font-medium text-gray-cool-300 shrink-0">Teams</span>
        <div className="grow h-[1px] bg-gray-cool-100" />
      </div>
      
      <div className="flex flex-col w-full">
        <NavItem 
          label="Yassir UX" 
          avatarUrl="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg" 
        />
        <NavItem 
          label="Maria" 
          showAvatarPlaceholder 
        />
      </div>
    </div>
  ),
};

