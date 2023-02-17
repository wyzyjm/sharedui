import React from 'react';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SplashScreenView, SplashScreenViewProps } from "./SplashScreenView";
import { ThemeProvider } from "@fluentui/react";
import { SharedComponentsContext } from '../SharedComponentsContext';
import { defaultTheme } from "../../../themes";
import { Stack } from "@fluentui/react";

export default {
    title: "SplashScreenView",
    component: SplashScreenView
} as ComponentMeta<typeof SplashScreenView>


const SplashScreenViewTemplate: ComponentStory<typeof SplashScreenView> = (args) =>  {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <SplashScreenView {...args} />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    )
}

export const SplashScreenViewContainer = SplashScreenViewTemplate.bind({});
const optionContainer = (
  <Stack>
      No deployments found. Please create a new deployment.
  </Stack>
);
SplashScreenViewContainer.args = {
  title: 'No deployments found',
  description: optionContainer
} as SplashScreenViewProps;