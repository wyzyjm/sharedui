import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IWizardFlowMenuItem, WizardFlow, WizardFlowComp, WizardFlowProps, IWizardFlowStatus } from './WizardFlow';
import { defaultTheme } from "../../../themes";
import {
    ThemeProvider
} from "@fluentui/react";
import { SharedComponentsContext } from '../SharedComponentsContext';

export default {
    title: 'Wizard',
    component: WizardFlowComp
} as ComponentMeta<typeof WizardFlowComp>;

const WizardTemplate: ComponentStory<typeof WizardFlowComp> = (args) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <WizardFlowComp {...args}>
                    <WizardFlow.Header>
                        <span>Header</span>
                    </WizardFlow.Header>
                    <WizardFlow.Subheader>
                        <span>Sub-header</span>
                    </WizardFlow.Subheader>
                    <WizardFlow.Content>
                        <div>Content</div>
                    </WizardFlow.Content>
                    <WizardFlow.Footer>
                        <div>Footer</div>
                    </WizardFlow.Footer>
                </WizardFlowComp>
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

export const Wizard = WizardTemplate.bind({});

Wizard.args = {
    title: 'Hello',
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