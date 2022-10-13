import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CircularLoadingIndicator, CircularLoadingIndicatorPageWide } from './Spinners';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { defaultTheme } from "../../themes";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Spinners',
    subcomponents: { CircularLoadingIndicator, CircularLoadingIndicatorPageWide }
} as ComponentMeta<any>;

export const CircularLoading: ComponentStory<typeof CircularLoadingIndicator> = () => (
    <ThemeProvider theme={defaultTheme.body}>
        <CircularLoadingIndicator />
    </ThemeProvider>
);

export const CircularLoadingPageWide: ComponentStory<typeof CircularLoadingIndicatorPageWide> = () => (
    <ThemeProvider theme={defaultTheme.body}>
        <CircularLoadingIndicatorPageWide />
    </ThemeProvider>
);
