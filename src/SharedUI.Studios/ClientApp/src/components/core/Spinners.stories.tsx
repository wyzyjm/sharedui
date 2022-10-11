import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CircularLoadingIndicator, CircularLoadingIndicatorPageWide } from './Spinners';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Spinners',
    subcomponents: { CircularLoadingIndicator, CircularLoadingIndicatorPageWide }
} as ComponentMeta<any>;

export const CircularLoading: ComponentStory<typeof CircularLoadingIndicator> = () => (
    <CircularLoadingIndicator />
);

export const CircularLoadingPageWide: ComponentStory<typeof CircularLoadingIndicatorPageWide> = () => (
    <CircularLoadingIndicatorPageWide />
);
