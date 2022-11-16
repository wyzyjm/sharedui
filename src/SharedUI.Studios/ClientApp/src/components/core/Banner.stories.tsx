import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BannerArea as CS_Banner } from './Banner';
import { defaultTheme } from "../../themes";
import {
    ThemeProvider
} from "@fluentui/react";
import { HaTSInteraction } from './Hats/Hats';

export default {
    title: 'Banner',
    component: CS_Banner
} as ComponentMeta<typeof CS_Banner>;

const HatsTemplate: ComponentStory<typeof CS_Banner> = (args) => (
    <ThemeProvider theme={defaultTheme.body}>
        <CS_Banner {...args} />
    </ThemeProvider>
);

export const Banner = HatsTemplate.bind({});

Banner.args = {
    onClose: ()=>{},
    headerText: "Kindly Provide your Valuable Feedback",
    buttonText: "Click Here To Start",
    hatsProp:{
        onClose: ()=>{},
        autoFlyout: false,
        headerText: "Feedback",
        surveyLink: "https://microsoft.qualtrics.com/jfe/form/SV_40zWLBFYILTkRWl?Kind=FormRecognizer&From=Studio",
        isOpen: true,
        interaction: HaTSInteraction.AutoFlyout
    }
}