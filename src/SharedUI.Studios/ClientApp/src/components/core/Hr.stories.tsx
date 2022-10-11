import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Hr as CS_Hr } from './Hr';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Hr',
    component: CS_Hr
} as ComponentMeta<typeof CS_Hr>;

export const Hr: ComponentStory<typeof CS_Hr> = () => (
    <CS_Hr />
);