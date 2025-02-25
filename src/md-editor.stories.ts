import type { Meta, StoryObj } from '@storybook/react';

import { MdEditor as Component } from './md-editor';

const meta = {
  title: 'Components/MdEditor',
  component: Component,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MdEditor: Story = {
  args: {
    children: 'This is a example component',
  },
};
