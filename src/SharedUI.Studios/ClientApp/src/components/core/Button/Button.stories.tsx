import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CSButtonProps, PrimaryButton, SecondaryButton } from './Button';
import {
    DefaultButton,
    IButtonProps
} from "@fluentui/react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Button',
    component: PrimaryButton
    // subcomponents: { PrimaryButton, SecondaryButton }
} as ComponentMeta<typeof PrimaryButton>;

// const Template: ComponentStory<typeof PrimaryButton> = (args) => <PrimaryButton {...args} />;
// export const Primary = Template.bind({});
// Primary.args = {
//     hasPrefixIcon: false,

// } as CSButtonProps;

const foo: CSButtonProps = {
    disabled: false,
    theme: null,
    
};

// export const Secondary: ComponentStory<typeof SecondaryButton> = (args) => (
//     <SecondaryButton {...args} />
// );

const Template: ComponentStory<typeof DefaultButton> = (args) => <DefaultButton {...args} />;
const PrimaryDefaultButton = Template.bind({});
PrimaryDefaultButton.args = {
} as CSButtonProps;

// function activator<T>(type: { new(): T ;} ): T {
//     return new type();
// }

// const foo2 = {} as IButtonProps;
// IButtonProps.
// console.log(foo2);

// const foo1: CSButtonProps = activator<CSButtonProps>(CSButtonProps);

const TemplatePrimary: ComponentStory<typeof PrimaryButton> = (args) => <PrimaryButton {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
debugger;
Object.keys(PrimaryDefaultButton.args).forEach(argName => {
    debugger;
    Primary.args[argName] = undefined;
});

Primary.args["abc"] = undefined;


// export const Primary: ComponentStory<typeof PrimaryButton> = (args) => (
//     <PrimaryButton {...args} />
// );

