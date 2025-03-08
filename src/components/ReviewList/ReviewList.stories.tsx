import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ReviewList from './ReviewList';

const meta: Meta<typeof ReviewList> = {
  title: 'Components/ReviewList',
  component: ReviewList,
};

export default meta;
type Story = StoryObj<typeof ReviewList>;

export const Default: Story = {};

