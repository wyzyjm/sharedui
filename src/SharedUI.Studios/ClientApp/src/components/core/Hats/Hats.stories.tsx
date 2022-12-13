import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HaTSArea as CS_Hats, HaTSInteraction, HatsProps } from './Hats';
import { defaultTheme } from "../../../themes";
import {
    ThemeProvider
} from "@fluentui/react";

export default {
    title: 'Hats',
    component: CS_Hats
} as ComponentMeta<typeof CS_Hats>;

const HatsTemplate: ComponentStory<typeof CS_Hats> = (args: HatsProps) => (
    <ThemeProvider theme={defaultTheme.body}>
        <CS_Hats {...args} />
    </ThemeProvider>
);

export const Hats = HatsTemplate.bind({});

Hats.args = {
    onClose: () => { console.log("Hats survey closed"); },
    onLoad: () => { console.log("Hats survey loaded"); },
    interaction: HaTSInteraction.Smiley,
    autoFlyout: false,
    headerText: "Feedback",
    surveyLink: "https://microsoft.qualtrics.com/jfe/form/SV_40zWLBFYILTkRWl?Kind=FormRecognizer&From=Preview",
    isOpen: true,
} as HatsProps;