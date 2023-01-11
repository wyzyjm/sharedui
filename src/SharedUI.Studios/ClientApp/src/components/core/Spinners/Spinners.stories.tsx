import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ISpinnerProps, CircularLoadingIndicator, CircularLoadingIndicatorPageWide } from './Spinners';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { defaultTheme } from "../../../themes";
import { SharedComponentsContext } from '../SharedComponentsContext';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Spinners',
    subcomponents: { CircularLoadingIndicator, CircularLoadingIndicatorPageWide }
} as ComponentMeta<any>;

const CircularLoadingTemplate: ComponentStory<typeof CircularLoadingIndicator> = (args) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <CircularLoadingIndicator {...args} />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

const CircularLoadingPageWideTemplate: ComponentStory<typeof CircularLoadingIndicatorPageWide> = (args) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <CircularLoadingIndicatorPageWide {...args} />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

export const CircularLoading = CircularLoadingTemplate.bind({});

CircularLoading.args = {
    hideLabel: false,
    label: ""
} as ISpinnerProps;

export const CircularLoadingPageWide = CircularLoadingPageWideTemplate.bind({});

CircularLoadingPageWide.args = {
    hideLabel: false,
    label: ""
} as ISpinnerProps;