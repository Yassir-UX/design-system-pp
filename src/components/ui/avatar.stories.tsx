import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarImage, AvatarFallback, AvatarInitials, AvatarStatus, AvatarStack, ICON_SIZES } from './avatar';
import { User01, Star01 } from '@untitledui/icons';

// ============================================================================
// Avatar Meta
// ============================================================================

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'The size of the avatar',
      table: {
        type: { summary: 'xs | sm | md | lg | xl | 2xl' },
        defaultValue: { summary: 'sm' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;
type StackStory = StoryObj<typeof AvatarStack>;

// ============================================================================
// SIZE VARIANTS
// ============================================================================

export const SizeXS: Story = {
  name: 'Size: XS (24px)',
  render: () => (
    <Avatar size="xs">
      <AvatarImage
        src="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg"
        alt="User"
      />
      <AvatarFallback>
        <AvatarInitials size="xs">YO</AvatarInitials>
      </AvatarFallback>
    </Avatar>
  ),
};

export const SizeSM: Story = {
  name: 'Size: SM (28px)',
  render: () => (
    <Avatar size="sm">
      <AvatarImage
        src="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg"
        alt="User"
      />
      <AvatarFallback>
        <AvatarInitials size="sm">YO</AvatarInitials>
      </AvatarFallback>
    </Avatar>
  ),
};

export const SizeMD: Story = {
  name: 'Size: MD (32px)',
  render: () => (
    <Avatar size="md">
      <AvatarImage
        src="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg"
        alt="User"
      />
      <AvatarFallback>
        <AvatarInitials size="md">YO</AvatarInitials>
      </AvatarFallback>
    </Avatar>
  ),
};

export const SizeLG: Story = {
  name: 'Size: LG (40px)',
  render: () => (
    <Avatar size="lg">
      <AvatarImage
        src="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg"
        alt="User"
      />
      <AvatarFallback>
        <AvatarInitials size="lg">YO</AvatarInitials>
      </AvatarFallback>
    </Avatar>
  ),
};

export const SizeXL: Story = {
  name: 'Size: XL (48px)',
  render: () => (
    <Avatar size="xl">
      <AvatarImage
        src="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg"
        alt="User"
      />
      <AvatarFallback>
        <AvatarInitials size="xl">YO</AvatarInitials>
      </AvatarFallback>
    </Avatar>
  ),
};

export const Size2XL: Story = {
  name: 'Size: 2XL (56px)',
  render: () => (
    <Avatar size="2xl">
      <AvatarImage
        src="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg"
        alt="User"
      />
      <AvatarFallback>
        <AvatarInitials size="2xl">YO</AvatarInitials>
      </AvatarFallback>
    </Avatar>
  ),
};

// All sizes comparison
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex items-end gap-lg">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-sm">
          <Avatar size={size}>
            <AvatarImage
              src="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg"
              alt="User"
            />
            <AvatarFallback>
              <AvatarInitials size={size}>YO</AvatarInitials>
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-cool-500">{size}</span>
        </div>
      ))}
    </div>
  ),
};

// ============================================================================
// FALLBACK TYPES
// ============================================================================

// With Image
export const WithImage: Story = {
  name: 'Fallback: Image',
  render: () => (
    <Avatar size="lg">
      <AvatarImage
        src="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg"
        alt="Yassir"
      />
      <AvatarFallback>
        <AvatarInitials size="lg">YO</AvatarInitials>
      </AvatarFallback>
    </Avatar>
  ),
};

// With Initials (all sizes)
export const WithInitials: Story = {
  name: 'Fallback: Initials',
  render: () => (
    <div className="flex items-end gap-lg">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-sm">
          <Avatar size={size}>
            <AvatarFallback>
              <AvatarInitials size={size}>YO</AvatarInitials>
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-cool-500">{size}</span>
        </div>
      ))}
    </div>
  ),
};

// With Icon Placeholder (all sizes)
export const WithIconPlaceholder: Story = {
  name: 'Fallback: Icon',
  render: () => (
    <div className="flex items-end gap-lg">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-sm">
          <Avatar size={size}>
            <AvatarFallback>
              <User01 size={ICON_SIZES[size]} />
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-cool-500">{size}</span>
        </div>
      ))}
    </div>
  ),
};

// Custom Fallback
export const CustomFallback: Story = {
  name: 'Fallback: Custom',
  render: () => (
    <div className="flex items-center gap-lg">
      <Avatar size="lg">
        <AvatarFallback>
          <Star01 size={20} className="text-warning-500" />
        </AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback className="bg-brand-100">
          <span className="text-brand-600 text-sm font-semibold">AI</span>
        </AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback className="bg-success-100">
          <span className="text-success-600 text-sm font-semibold">✓</span>
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

// ============================================================================
// STATUS INDICATORS
// ============================================================================

export const StatusOnline: Story = {
  name: 'Status: Online',
  render: () => (
    <div className="flex items-end gap-lg">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <div key={size} className="relative">
          <Avatar size={size}>
            <AvatarImage
              src="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg"
              alt="User"
            />
            <AvatarFallback>
              <AvatarInitials size={size}>YO</AvatarInitials>
            </AvatarFallback>
          </Avatar>
          <AvatarStatus size={size} status="online" />
        </div>
      ))}
    </div>
  ),
};

export const StatusOffline: Story = {
  name: 'Status: Offline',
  render: () => (
    <div className="flex items-end gap-lg">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <div key={size} className="relative">
          <Avatar size={size}>
            <AvatarImage
              src="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg"
              alt="User"
            />
            <AvatarFallback>
              <AvatarInitials size={size}>YO</AvatarInitials>
            </AvatarFallback>
          </Avatar>
          <AvatarStatus size={size} status="offline" />
        </div>
      ))}
    </div>
  ),
};

export const StatusAway: Story = {
  name: 'Status: Away',
  render: () => (
    <div className="flex items-end gap-lg">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <div key={size} className="relative">
          <Avatar size={size}>
            <AvatarImage
              src="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg"
              alt="User"
            />
            <AvatarFallback>
              <AvatarInitials size={size}>YO</AvatarInitials>
            </AvatarFallback>
          </Avatar>
          <AvatarStatus size={size} status="away" />
        </div>
      ))}
    </div>
  ),
};

export const StatusBusy: Story = {
  name: 'Status: Busy',
  render: () => (
    <div className="flex items-end gap-lg">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <div key={size} className="relative">
          <Avatar size={size}>
            <AvatarImage
              src="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg"
              alt="User"
            />
            <AvatarFallback>
              <AvatarInitials size={size}>YO</AvatarInitials>
            </AvatarFallback>
          </Avatar>
          <AvatarStatus size={size} status="busy" />
        </div>
      ))}
    </div>
  ),
};

export const AllStatusTypes: Story = {
  name: 'All Status Types',
  render: () => (
    <div className="flex items-center gap-xl">
      {(['online', 'offline', 'away', 'busy'] as const).map((status) => (
        <div key={status} className="flex flex-col items-center gap-sm">
          <div className="relative">
            <Avatar size="lg">
              <AvatarImage
                src="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg"
                alt="User"
              />
              <AvatarFallback>
                <AvatarInitials size="lg">YO</AvatarInitials>
              </AvatarFallback>
            </Avatar>
            <AvatarStatus size="lg" status={status} />
          </div>
          <span className="text-xs text-gray-cool-500 capitalize">{status}</span>
        </div>
      ))}
    </div>
  ),
};

// ============================================================================
// AVATAR STACK
// ============================================================================

const sampleAvatars = [
  { src: 'https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg', alt: 'Yassir' },
  { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', alt: 'Team member 1' },
  { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face', alt: 'Team member 2' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', alt: 'Team member 3' },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', alt: 'Team member 4' },
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', alt: 'Team member 5' },
];

export const StackDefault: StackStory = {
  name: 'Stack: Default',
  render: () => (
    <AvatarStack
      avatars={sampleAvatars.slice(0, 4)}
      size="md"
    />
  ),
};

export const StackWithOverflow: StackStory = {
  name: 'Stack: With Overflow (+N)',
  render: () => (
    <AvatarStack
      avatars={sampleAvatars}
      size="md"
      max={4}
    />
  ),
};

export const StackAllSizes: StackStory = {
  name: 'Stack: All Sizes',
  render: () => (
    <div className="flex flex-col gap-xl">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <div key={size} className="flex items-center gap-lg">
          <span className="text-sm text-gray-cool-600 w-[40px]">{size}</span>
          <AvatarStack avatars={sampleAvatars} size={size} max={4} />
        </div>
      ))}
    </div>
  ),
};

export const StackMaxVariants: StackStory = {
  name: 'Stack: Max Variants',
  render: () => (
    <div className="flex flex-col gap-xl">
      {[2, 3, 4, 5].map((maxVal) => (
        <div key={maxVal} className="flex items-center gap-lg">
          <span className="text-sm text-gray-cool-600 w-[80px]">max={maxVal}</span>
          <AvatarStack avatars={sampleAvatars} size="md" max={maxVal} />
        </div>
      ))}
    </div>
  ),
};

export const StackWithPlaceholders: StackStory = {
  name: 'Stack: With Placeholders',
  render: () => (
    <AvatarStack
      avatars={[
        { alt: 'User 1', fallback: 'U1' },
        { alt: 'User 2', fallback: 'U2' },
        { alt: 'User 3', fallback: 'U3' },
        { alt: 'User 4', fallback: 'U4' },
        { alt: 'User 5', fallback: 'U5' },
      ]}
      size="md"
      max={4}
    />
  ),
};

export const StackMixed: StackStory = {
  name: 'Stack: Mixed (Images + Fallbacks)',
  render: () => (
    <AvatarStack
      avatars={[
        { src: 'https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg', alt: 'Yassir' },
        { alt: 'No image', fallback: 'NI' },
        { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face', alt: 'Team member' },
        { alt: 'No image', fallback: 'AB' },
        { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', alt: 'Team member' },
      ]}
      size="md"
      max={4}
    />
  ),
};

export const StackSmallGroups: StackStory = {
  name: 'Stack: Small Groups',
  render: () => (
    <div className="flex flex-col gap-xl">
      <div className="flex items-center gap-lg">
        <span className="text-sm text-gray-cool-600 w-[80px]">2 avatars</span>
        <AvatarStack avatars={sampleAvatars.slice(0, 2)} size="md" />
      </div>
      <div className="flex items-center gap-lg">
        <span className="text-sm text-gray-cool-600 w-[80px]">3 avatars</span>
        <AvatarStack avatars={sampleAvatars.slice(0, 3)} size="md" />
      </div>
      <div className="flex items-center gap-lg">
        <span className="text-sm text-gray-cool-600 w-[80px]">4 avatars</span>
        <AvatarStack avatars={sampleAvatars.slice(0, 4)} size="md" />
      </div>
    </div>
  ),
};

// ============================================================================
// EDGE CASES & EXAMPLES
// ============================================================================

export const BrokenImage: Story = {
  name: 'Edge Case: Broken Image',
  render: () => (
    <Avatar size="lg">
      <AvatarImage
        src="https://broken-url.com/image.jpg"
        alt="Broken"
      />
      <AvatarFallback>
        <AvatarInitials size="lg">BI</AvatarInitials>
      </AvatarFallback>
    </Avatar>
  ),
};

export const LongInitials: Story = {
  name: 'Edge Case: Long Initials',
  render: () => (
    <div className="flex items-center gap-lg">
      <Avatar size="lg">
        <AvatarFallback>
          <AvatarInitials size="lg">A</AvatarInitials>
        </AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>
          <AvatarInitials size="lg">AB</AvatarInitials>
        </AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>
          <AvatarInitials size="lg">ABC</AvatarInitials>
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const DifferentImages: Story = {
  name: 'Example: Different Users',
  render: () => (
    <div className="flex items-center gap-lg">
      <Avatar size="lg">
        <AvatarImage
          src="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg"
          alt="Yassir"
        />
        <AvatarFallback>
          <AvatarInitials size="lg">YO</AvatarInitials>
        </AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          alt="John"
        />
        <AvatarFallback>
          <AvatarInitials size="lg">JD</AvatarInitials>
        </AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
          alt="Sarah"
        />
        <AvatarFallback>
          <AvatarInitials size="lg">SW</AvatarInitials>
        </AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
          alt="Emily"
        />
        <AvatarFallback>
          <AvatarInitials size="lg">EM</AvatarInitials>
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

// Complete overview
export const CompleteOverview: Story = {
  name: 'Complete Overview',
  render: () => (
    <div className="flex flex-col gap-2xl">
      {/* Sizes with Images */}
      <div>
        <h3 className="text-sm font-semibold text-gray-cool-700 mb-md">Sizes (with image)</h3>
        <div className="flex items-end gap-lg">
          {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-sm">
              <Avatar size={size}>
                <AvatarImage
                  src="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg"
                  alt="User"
                />
                <AvatarFallback>
                  <AvatarInitials size={size}>YO</AvatarInitials>
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-cool-500">{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes with Initials */}
      <div>
        <h3 className="text-sm font-semibold text-gray-cool-700 mb-md">Sizes (with initials)</h3>
        <div className="flex items-end gap-lg">
          {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-sm">
              <Avatar size={size}>
                <AvatarFallback>
                  <AvatarInitials size={size}>YO</AvatarInitials>
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-cool-500">{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes with Icon */}
      <div>
        <h3 className="text-sm font-semibold text-gray-cool-700 mb-md">Sizes (with icon placeholder)</h3>
        <div className="flex items-end gap-lg">
          {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-sm">
              <Avatar size={size}>
                <AvatarFallback>
                  <User01 size={ICON_SIZES[size]} />
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-cool-500">{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Types */}
      <div>
        <h3 className="text-sm font-semibold text-gray-cool-700 mb-md">Status types</h3>
        <div className="flex items-center gap-xl">
          {(['online', 'offline', 'away', 'busy'] as const).map((status) => (
            <div key={status} className="flex flex-col items-center gap-sm">
              <div className="relative">
                <Avatar size="lg">
                  <AvatarImage
                    src="https://pbs.twimg.com/profile_images/1851690372218388480/EsNtrJG3_400x400.jpg"
                    alt="User"
                  />
                  <AvatarFallback>
                    <AvatarInitials size="lg">YO</AvatarInitials>
                  </AvatarFallback>
                </Avatar>
                <AvatarStatus size="lg" status={status} />
              </div>
              <span className="text-xs text-gray-cool-500 capitalize">{status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Avatar Stack */}
      <div>
        <h3 className="text-sm font-semibold text-gray-cool-700 mb-md">Avatar stack</h3>
        <div className="flex flex-col gap-md">
          <AvatarStack avatars={sampleAvatars} size="md" max={4} />
          <AvatarStack avatars={sampleAvatars} size="sm" max={3} />
        </div>
      </div>
    </div>
  ),
};
