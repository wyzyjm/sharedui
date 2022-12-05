import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
    IHelpAreaProps,
    HelpArea as CS_HelpArea,
} from "./Help";
import { ThemeProvider } from "@fluentui/react";
import { defaultTheme } from "../../themes";
import { LinkProps } from "./Link";

export default {
    title: "HelpArea",
    component: CS_HelpArea,
} as ComponentMeta<typeof CS_HelpArea>;

const ChoiceGroupTemplate: ComponentStory<typeof CS_HelpArea> = (args) => (
    <ThemeProvider theme={defaultTheme.body}>
        <CS_HelpArea {...args} />
    </ThemeProvider>
);

const HelpBody = () => {
    return <div><h5>Help Body</h5></div>
}

const helpItems: LinkProps[] = [{
    displayText: 'Custom speech document',
    href: 'https://go.microsoft.com/fwlink/?linkid=2085429'
},
{
    displayText: 'Create Azure support request',
    href: 'https://go.microsoft.com/fwlink/?linkid=2163219'
},
{
    displayText: 'Ask questions on StackOverflow',
    href: 'https://go.microsoft.com/fwlink/?linkid=2162671'
},
{
    displayText: 'Ask questions on Microsoft Q&A',
    href: 'https://go.microsoft.com/fwlink/?linkid=2162894',
}]

const footerItems: LinkProps[] = [{
    displayText: "Privacy & cookies",
    href: 'https://go.microsoft.com/fwlink/?linkid=521839'
},
{
    displayText: "Terms of use",
    href: 'https://go.microsoft.com/fwlink/?linkid=533207',
},
{
    displayText: "Trademarks",
    href: 'https://go.microsoft.com/fwlink/?linkid=2085431',
}]

export const HelpArea = ChoiceGroupTemplate.bind({});

HelpArea.args = {
    headerText: "Help",
    onClose: () => { },
    isOpen: true,
    helpItems: helpItems,
    helpBody: <HelpBody />,
    footerItems: footerItems
} as IHelpAreaProps;
