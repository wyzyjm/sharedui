/* eslint-disable react/jsx-pascal-case */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BannerArea as CS_Banner, BannerProps } from './Banner';
import { RatingBannerArea as CS_RatingBanner, RatingBannerProps } from './RatingBanner';
import { GuidingBannerArea as CS_GuidingBanner, GuidingBannerProps } from './GuidingBanner';
import { defaultTheme } from "../../../themes";
import {
    Text,
    Icon,
    PrimaryButton,
    ThemeProvider,
    DefaultButton
} from "@fluentui/react";
import { HaTSInteraction, HatsProps } from '../Hats/Hats';
import { SharedComponentsContext } from '../SharedComponentsContext';

export default {
    title: 'Banner',
    subcomponents: { CS_Banner, CS_RatingBanner, CS_GuidingBanner }
} as ComponentMeta<any>;

const HatsTemplate: ComponentStory<typeof CS_Banner> = (args: BannerProps) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <CS_Banner {...args} />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

const RatingHatsTemplate: ComponentStory<typeof CS_RatingBanner> = (args: RatingBannerProps) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <CS_RatingBanner {...args} />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}
const GuidingHatsTemplate: ComponentStory<typeof CS_GuidingBanner> = (args: GuidingBannerProps) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <CS_GuidingBanner {...args} />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

export const Banner = HatsTemplate.bind({});

export const RatingBanner = RatingHatsTemplate.bind({});

Banner.args = {
    onClick: () => { console.log("banner clicked"); },
    onClose: () => { console.log("banner closed"); },
    headerText: "Kindly provide your valuable feedback",
    buttonText: "Submit feedback",
    hatsProp: {
        onClose: () => { console.log("onClose"); },
        autoFlyout: false,
        headerText: "Feedback",
        surveyLink: "https://microsoft.qualtrics.com/jfe/form/SV_40zWLBFYILTkRWl?Kind=FormRecognizer&From=Preview",
        isOpen: true,
        interaction: HaTSInteraction.Banner
    } as HatsProps
} as BannerProps;

RatingBanner.args = {
    onClick: () => { console.log("banner clicked"); },
    onClose: () => { console.log("banner closed"); },
    headerText: "How likely is it that you would recommend Speech Services Studio to a friend or colleague? Please select one:",
    hatsProp: {
        onClose: () => { },
        autoFlyout: false,
        headerText: "Feedback",
        surveyLink: "https://microsoft.qualtrics.com/jfe/form/SV_40zWLBFYILTkRWl?Kind=FormRecognizer&From=Preview",
        isOpen: true,
        interaction: HaTSInteraction.Banner
    } as HatsProps
} as RatingBannerProps;

export const GuidingBanner = GuidingHatsTemplate.bind({})
const renderIcon = <Icon iconName="AzureLogo" styles={{
    root: {
        fontSize: 100,
        color: 'skyblue'
    }
}} />
GuidingBanner.args = {
    icon: renderIcon,
    title: 'No deployment detected',
    description: <Text>To get started you will need to create a new deployment, then you can select an example below, and create a custom model based on one of the available presets, or create a custom model.</Text>,
    buttons: <><DefaultButton>Default</DefaultButton> <PrimaryButton>Primary</PrimaryButton></>

} as GuidingBannerProps;
