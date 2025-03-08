import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Review from './Review';

const meta: Meta<typeof Review> = {
  title: 'Components/Review',
  component: Review,
};

export default meta;
type Story = StoryObj<typeof Review>;

export const Default: Story = {};

