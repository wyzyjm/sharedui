import React from 'react';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Text } from "@fluentui/react";
import { PageHeader } from "./PageHeader";
import { ThemeProvider } from "@fluentui/react";
import { SharedComponentsContext } from '../SharedComponentsContext';
import { defaultTheme } from "../../../themes";

export default {
    title: "PageHeader",
    Component: PageHeader
}  as ComponentMeta<typeof PageHeader>

const PageHeaderTemplate: ComponentStory<typeof PageHeader> = (args) =>  {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <PageHeader {...args} />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    )
}

export const PageHeaderComponent = PageHeaderTemplate.bind({});

PageHeaderComponent.args = {
    headTitle: "Models",
    subTitle: <Text>Files uploaded to the service.</Text>
}




