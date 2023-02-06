import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { defaultTheme } from "../../../themes";
import {
    ThemeProvider
} from "@fluentui/react";
import { FilterableComboBox, IFilterableComboBoxProps } from './FilterableComboBox';
import { SharedComponentsContext } from '../SharedComponentsContext';

export default {
    title: 'FilterableComboBox',
    component: FilterableComboBox,
    parameters: { actions: { argTypesRegex: '^onChange.*' } },
} as ComponentMeta<typeof FilterableComboBox>;

const Template: ComponentStory<typeof FilterableComboBox> = (args) => (
    <ThemeProvider theme={defaultTheme.body}>
        <SharedComponentsContext.Provider value={{ locale: 'en' }}>
            <FilterableComboBox {...args} />
        </SharedComponentsContext.Provider>
    </ThemeProvider>
);

export const FilterableLanguageComboBox = Template.bind({});
const widthProps = {
    root: { width: "25rem" },
};

FilterableLanguageComboBox.args = {
    options: [
        {
            key: "en",
            text: "English"
        },
        {
            key: "es",
            text: "Spanish"
        },
        {
            key: "ko",
            text: "Korean"
        }
    ],
    required: true,
    label: "Choose the language displayed in the portal",
    placeholder: "Select a language",
    selectedKey: "en",
    styles: widthProps,
    onChange: selectedKey => console.log("changed to: " + selectedKey),
    filterable: true
} as IFilterableComboBoxProps;