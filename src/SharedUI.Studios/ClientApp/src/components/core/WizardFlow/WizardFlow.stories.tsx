import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IWizardFlowMenuItem, WizardFlow as WizardFlowComp, WizardFlowProps, IWizardFlowStatus } from './WizardFlow';
import { defaultTheme } from "../../../themes";
import {
    ThemeProvider
} from "@fluentui/react";

export default {
    title: 'Wizard',
    component: WizardFlowComp
} as ComponentMeta<typeof WizardFlowComp>;

const WizardTemplate: ComponentStory<typeof WizardFlowComp> = (args) => (
    <ThemeProvider theme={defaultTheme.body}>
        <WizardFlowComp {...args}>
            <WizardFlowComp.Header>
                <span>Header</span>
            </WizardFlowComp.Header>
            <WizardFlowComp.Subheader>
                <span>Sub-header</span>
            </WizardFlowComp.Subheader>
            <WizardFlowComp.Content>
                <div>Content</div>
            </WizardFlowComp.Content>
            <WizardFlowComp.Footer>
                <div>Footer</div>
            </WizardFlowComp.Footer>
        </WizardFlowComp>
    </ThemeProvider>
);

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