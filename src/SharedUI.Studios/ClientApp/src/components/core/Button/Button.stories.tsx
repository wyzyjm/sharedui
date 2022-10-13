import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CSButtonProps, PrimaryButton, SecondaryButton } from './Button';
import { defaultTheme } from "../../../themes";
import {
    ThemeProvider
} from "@fluentui/react";

export default {
    title: 'Button',
    subcomponents: { PrimaryButton, SecondaryButton }
} as ComponentMeta<any>;

const PrimaryButtonTemplate: ComponentStory<typeof PrimaryButton> = (args) => (
    <ThemeProvider theme={defaultTheme.body}>
        <PrimaryButton {...args} />
    </ThemeProvider>);
export const Primary = PrimaryButtonTemplate.bind({});
Primary.args = {
    ariaLabel: "",
    id: "",
    title: "",
    text: "Primary",
    disabled: false
} as CSButtonProps;

const SecondaryButtonTemplate: ComponentStory<typeof SecondaryButton> = (args) => (
    <ThemeProvider theme={defaultTheme.body}>
        <SecondaryButton {...args} />
    </ThemeProvider>);
export const Secondary = SecondaryButtonTemplate.bind({});
Secondary.args = {
    ariaLabel: "",
    id: "",
    title: "",
    text: "Secondary",
    disabled: false
} as CSButtonProps;
