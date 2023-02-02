import React from 'react';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PrivacyLink } from "./PrivacyLink";
import { ThemeProvider } from "@fluentui/react";
import { SharedComponentsContext } from '../SharedComponentsContext';
import { defaultTheme } from "../../../themes";

export default {
    title: "PrivacyLink",
    component: PrivacyLink
} as ComponentMeta<typeof PrivacyLink>


const PrivacyTemplate: ComponentStory<typeof PrivacyLink> = (args) =>  {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <PrivacyLink {...args} />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    )
}

export const PrivacyAndLink = PrivacyTemplate.bind({});






