import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
    IHelpAreaProps,
    HelpArea as CS_HelpArea,
    LinkPropsExt,
} from "./Help";
import { ILinkProps, ThemeProvider } from "@fluentui/react";
import { defaultTheme } from "../../../themes";
import { SharedComponentsContext } from '../SharedComponentsContext';

export default {
    title: "HelpArea",
    component: CS_HelpArea,
} as ComponentMeta<typeof CS_HelpArea>;

const HelpTemplate: ComponentStory<typeof CS_HelpArea> = (args) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <CS_HelpArea {...args} />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

const HelpBody = () => {
    return <div><p>Help Body</p></div>
}

const helpItems: LinkPropsExt[] = [{
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

const footerItems: LinkPropsExt[] = [{
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

export const HelpArea = HelpTemplate.bind({});

HelpArea.args = {
    headerText: "Help",
    onClose: () => { },
    isOpen: true,
    helpItems: helpItems,
    helpBody: <HelpBody />,
    footerItems: footerItems
} as IHelpAreaProps;