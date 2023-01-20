import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IWizardFlowMenuItem, WizardFlow, WizardFlowComp, WizardFlowProps, IWizardFlowStatus } from './WizardFlow';
import { defaultTheme } from "../../../themes";
import { ThemeProvider, Stack, IStackTokens, DefaultButton, PrimaryButton } from "@fluentui/react";
import { SharedComponentsContext } from '../SharedComponentsContext';

export default {
    title: 'Wizard',
    component: WizardFlowComp
} as ComponentMeta<typeof WizardFlowComp>;
const stackTokens: IStackTokens = { childrenGap: 8 };

const WizardTemplate: ComponentStory<typeof WizardFlowComp> = (args) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <WizardFlowComp {...args}>
                    <WizardFlow.Header>
                        <span>Question or main purpose of step</span>
                    </WizardFlow.Header>
                    <WizardFlow.Subheader>
                        <span>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Select the types of models you would like to use in your project. You can change this later under Settings.</span>
                    </WizardFlow.Subheader>
                    <WizardFlow.Content>
                        <div>Content</div>
                    </WizardFlow.Content>
                    <WizardFlow.Footer>
                        <>
                            <Stack
                                horizontal
                                tokens={stackTokens}
                            >
                                <DefaultButton text="back" allowDisabledFocus />
                                <PrimaryButton text="next"  allowDisabledFocus />
                            </Stack>
                            <Stack 
                                horizontal
                                tokens={stackTokens}
                            >
                                <DefaultButton text="Creat project"  disabled allowDisabledFocus />
                                <DefaultButton text="Cancel"  allowDisabledFocus />
                            </Stack>
                        </>
                    </WizardFlow.Footer>
                </WizardFlowComp>
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

export const Wizard = WizardTemplate.bind({});

Wizard.args = {
    title: 'Wizard title',
    currentKey: "2",
    height: "550px",
    hidden: false,
    modalProps: { isBlocking: true },
    onDismiss: () => console.log("Wizrd dismissed"),
    menuItems: [
        {
            name: 'Name and keyword',
            status: IWizardFlowStatus.Doing,
            key: 0
        },
        {
            name: 'Select pronunciations',
            status: IWizardFlowStatus.Undo,
            key: 1,
        },
        {
            name: 'Choose model type',
            status: IWizardFlowStatus.Undo,
            key: 2
        }
    ] as IWizardFlowMenuItem[]
} as WizardFlowProps;