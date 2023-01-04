import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CircularLoadingIndicator, CircularLoadingIndicatorPageWide } from './Spinners';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { defaultTheme } from "../../themes";
import { SharedComponentsContext } from './SharedComponentsContext';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Spinners',
    subcomponents: { CircularLoadingIndicator, CircularLoadingIndicatorPageWide }
} as ComponentMeta<any>;

export const CircularLoading: ComponentStory<typeof CircularLoadingIndicator> = () => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <CircularLoadingIndicator />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

export const CircularLoadingPageWide: ComponentStory<typeof CircularLoadingIndicatorPageWide> = () => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <CircularLoadingIndicatorPageWide />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}
