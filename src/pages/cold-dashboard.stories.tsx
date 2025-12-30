import type { Meta, StoryObj } from '@storybook/react';
import ColdDashboard from './cold-dashboard';

const meta: Meta<typeof ColdDashboard> = {
  title: 'Pages/Cold Dashboard',
  component: ColdDashboard,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ColdDashboard>;

export const Default: Story = {};


