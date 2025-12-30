import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ResizeHandle } from './resize-handle';

const meta = {
  title: 'Components/ResizeHandle',
  component: ResizeHandle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of resize - horizontal (left/right) or vertical (up/down)',
    },
    positionOffset: {
      control: 'number',
      description: 'Offset from edge to calculate position (e.g., sidebar width)',
    },
    minValue: {
      control: 'number',
      description: 'Minimum value for resize',
    },
    maxValue: {
      control: 'number',
      description: 'Maximum value for resize',
    },
    isResizing: {
      control: 'boolean',
      description: 'Whether the handle is currently being dragged',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show tooltip with resize instructions (default: true)',
    },
    tooltipDelay: {
      control: 'number',
      description: 'Delay before showing tooltip in ms (default: 600)',
    },
  },
} satisfies Meta<typeof ResizeHandle>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default horizontal resize handle
export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '300px', display: 'flex', alignItems: 'stretch' }}>
        <Story />
      </div>
    ),
  ],
};

// Vertical resize handle
export const Vertical: Story = {
  args: {
    direction: 'vertical',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
};

// Interactive demo with horizontal panels and elastic effect
function HorizontalResizeDemo() {
  const DEFAULT_WIDTH = 250;
  const MIN_WIDTH = 150;
  const MAX_WIDTH = 300;

  const [leftWidth, setLeftWidth] = useState(DEFAULT_WIDTH);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleResize = (newWidth: number) => {
    setIsAnimating(false);
    setLeftWidth(newWidth);
  };

  const handleResizeEnd = () => {
    // Snap back to clamped value with animation
    setIsAnimating(true);
    setLeftWidth((current) => {
      if (current < MIN_WIDTH) return MIN_WIDTH;
      if (current > MAX_WIDTH) return MAX_WIDTH;
      return current;
    });
  };

  const handleReset = () => {
    setIsAnimating(true);
    setLeftWidth(DEFAULT_WIDTH);
  };

  return (
    <div
      style={{
        width: '600px',
        height: '400px',
        display: 'flex',
        border: '1px solid #E9EBF1',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Left Panel */}
      <div
        style={{
          width: leftWidth,
          backgroundColor: '#F6F6F9',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          flexShrink: 0,
          transition: isAnimating ? 'width 300ms cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#111322' }}>
          Left Panel
        </div>
        <div style={{ fontSize: '12px', color: '#5D6B98' }}>
          Width: {Math.round(leftWidth)}px
        </div>
        <div style={{ fontSize: '11px', color: '#7D89B0', marginTop: 'auto', lineHeight: '16px' }}>
          • Drag past limits for elastic effect<br />
          • Double-click to reset to {DEFAULT_WIDTH}px
        </div>
      </div>

      {/* Resize Handle */}
      <ResizeHandle
        direction="horizontal"
        minValue={MIN_WIDTH}
        maxValue={MAX_WIDTH}
        onResize={handleResize}
        onResizeEnd={handleResizeEnd}
        onReset={handleReset}
      />

      {/* Right Panel */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#111322' }}>
          Right Panel
        </div>
        <div style={{ fontSize: '12px', color: '#5D6B98' }}>
          Flexible width
        </div>
      </div>
    </div>
  );
}

export const InteractiveHorizontal: Story = {
  render: () => <HorizontalResizeDemo />,
};

// Interactive demo with vertical panels and elastic effect
function VerticalResizeDemo() {
  const DEFAULT_HEIGHT = 200;
  const MIN_HEIGHT = 100;
  const MAX_HEIGHT = 300;

  const [topHeight, setTopHeight] = useState(DEFAULT_HEIGHT);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleResize = (newHeight: number) => {
    setIsAnimating(false);
    setTopHeight(newHeight);
  };

  const handleResizeEnd = () => {
    setIsAnimating(true);
    setTopHeight((current) => {
      if (current < MIN_HEIGHT) return MIN_HEIGHT;
      if (current > MAX_HEIGHT) return MAX_HEIGHT;
      return current;
    });
  };

  const handleReset = () => {
    setIsAnimating(true);
    setTopHeight(DEFAULT_HEIGHT);
  };

  return (
    <div
      style={{
        width: '400px',
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #E9EBF1',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Top Panel */}
      <div
        style={{
          height: topHeight,
          backgroundColor: '#F6F6F9',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          flexShrink: 0,
          transition: isAnimating ? 'height 300ms cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#111322' }}>
          Top Panel
        </div>
        <div style={{ fontSize: '12px', color: '#5D6B98' }}>
          Height: {Math.round(topHeight)}px
        </div>
        <div style={{ fontSize: '11px', color: '#7D89B0', marginTop: 'auto', lineHeight: '16px' }}>
          • Drag past limits for elastic effect<br />
          • Double-click to reset to {DEFAULT_HEIGHT}px
        </div>
      </div>

      {/* Resize Handle */}
      <ResizeHandle
        direction="vertical"
        minValue={MIN_HEIGHT}
        maxValue={MAX_HEIGHT}
        onResize={handleResize}
        onResizeEnd={handleResizeEnd}
        onReset={handleReset}
      />

      {/* Bottom Panel */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#111322' }}>
          Bottom Panel
        </div>
        <div style={{ fontSize: '12px', color: '#5D6B98' }}>
          Flexible height
        </div>
      </div>
    </div>
  );
}

export const InteractiveVertical: Story = {
  render: () => <VerticalResizeDemo />,
};

// Email sidebar simulation (like the actual use case) with elastic effect
function EmailSidebarDemo() {
  const DEFAULT_WIDTH = 250;
  const MIN_WIDTH = 200;
  const MAX_WIDTH = 300;
  const SIDEBAR_OFFSET = 56;

  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_WIDTH);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleResize = (newWidth: number) => {
    setIsAnimating(false);
    setSidebarWidth(newWidth);
  };

  const handleResizeEnd = () => {
    setIsAnimating(true);
    setSidebarWidth((current) => {
      if (current < MIN_WIDTH) return MIN_WIDTH;
      if (current > MAX_WIDTH) return MAX_WIDTH;
      return current;
    });
  };

  const handleReset = () => {
    setIsAnimating(true);
    setSidebarWidth(DEFAULT_WIDTH);
  };

  return (
    <div
      style={{
        width: '800px',
        height: '500px',
        display: 'flex',
        backgroundColor: '#F6F6F9',
        padding: '16px 0 16px 0',
        gap: '0',
      }}
    >
      {/* Global Sidebar Placeholder */}
      <div
        style={{
          width: SIDEBAR_OFFSET,
          height: '100%',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#43389B',
            borderRadius: '8px',
          }}
        />
      </div>

      {/* Email List Panel */}
      <div
        style={{
          width: sidebarWidth,
          backgroundColor: '#FFFFFF',
          border: '1px solid #E9EBF1',
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flexShrink: 0,
          transition: isAnimating ? 'width 300ms cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#111322' }}>
          Email List
        </div>
        <div style={{ fontSize: '12px', color: '#5D6B98' }}>
          Width: {Math.round(sidebarWidth)}px
        </div>
        <div
          style={{
            fontSize: '11px',
            color: '#7D89B0',
            marginTop: 'auto',
            lineHeight: '16px',
          }}
        >
          • Drag past limits for elastic effect<br />
          • Double-click to reset to {DEFAULT_WIDTH}px
        </div>
      </div>

      {/* Resize Handle */}
      <ResizeHandle
        direction="horizontal"
        positionOffset={SIDEBAR_OFFSET}
        minValue={MIN_WIDTH}
        maxValue={MAX_WIDTH}
        onResize={handleResize}
        onResizeEnd={handleResizeEnd}
        onReset={handleReset}
      />

      {/* Main Content Panel */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          border: '1px solid #E9EBF1',
          borderRight: 'none',
          borderRadius: '16px 0 0 16px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#111322' }}>
          Email Content
        </div>
        <div style={{ fontSize: '12px', color: '#5D6B98' }}>
          Main content area with flexible width
        </div>
      </div>
    </div>
  );
}

export const EmailSidebarLayout: Story = {
  render: () => <EmailSidebarDemo />,
};

// Showcase all states
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3
          style={{
            marginBottom: '12px',
            fontSize: '12px',
            color: '#7D89B0',
            fontWeight: 500,
          }}
        >
          HORIZONTAL (Default State)
        </h3>
        <div
          style={{
            height: '100px',
            display: 'flex',
            border: '1px solid #E9EBF1',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              width: '150px',
              backgroundColor: '#F6F6F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: '#5D6B98',
            }}
          >
            Left Panel
          </div>
          <ResizeHandle direction="horizontal" />
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: '#5D6B98',
            }}
          >
            Right Panel
          </div>
        </div>
      </div>

      <div>
        <h3
          style={{
            marginBottom: '12px',
            fontSize: '12px',
            color: '#7D89B0',
            fontWeight: 500,
          }}
        >
          VERTICAL (Default State)
        </h3>
        <div
          style={{
            width: '300px',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #E9EBF1',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              height: '80px',
              backgroundColor: '#F6F6F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: '#5D6B98',
            }}
          >
            Top Panel
          </div>
          <ResizeHandle direction="vertical" />
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: '#5D6B98',
            }}
          >
            Bottom Panel
          </div>
        </div>
      </div>

      <div>
        <h3
          style={{
            marginBottom: '12px',
            fontSize: '12px',
            color: '#7D89B0',
            fontWeight: 500,
          }}
        >
          HORIZONTAL (Active/Resizing State)
        </h3>
        <div
          style={{
            height: '100px',
            display: 'flex',
            border: '1px solid #E9EBF1',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              width: '150px',
              backgroundColor: '#F6F6F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: '#5D6B98',
            }}
          >
            Left Panel
          </div>
          <ResizeHandle direction="horizontal" isResizing />
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: '#5D6B98',
            }}
          >
            Right Panel
          </div>
        </div>
      </div>
    </div>
  ),
};

