import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BannerArea as CS_Banner, BannerProps } from './Banner';
import { RatingBannerArea as CS_RatingBanner, RatingBannerProps} from './RatingBanner';
import { defaultTheme } from "../../../themes";
import {
    ThemeProvider
} from "@fluentui/react";
import { HaTSInteraction, HatsProps } from '../Hats/Hats';


export default {
    title: 'Banner',
    subcomponents: { CS_Banner, CS_RatingBanner }
} as ComponentMeta<any>;

const HatsTemplate: ComponentStory<typeof CS_Banner> = (args: BannerProps) => (
    <ThemeProvider theme={defaultTheme.body}>
        <CS_Banner {...args} />
    </ThemeProvider>
);

const RatingHatsTemplate: ComponentStory<typeof CS_RatingBanner> = (args: RatingBannerProps) => (
    <ThemeProvider theme={defaultTheme.body}>
        <CS_RatingBanner {...args} />
    </ThemeProvider>
);

export const Banner = HatsTemplate.bind({});

export const RatingBanner = RatingHatsTemplate.bind({});


Banner.args = {
    onClick: () => { console.log("banner clicked"); },
    onClose: ()=>{ console.log("banner closed"); },
    headerText: "Kindly Provide your Valuable Feedback",
    buttonText: "Click Here To Start",
    hatsProp:{
        openInANewWindowLocalizedText: "Open in a new window",
        onClose: ()=>{ console.log("onClose"); },
        autoFlyout: false,
        headerText: "Feedback",
        surveyLink: "https://microsoft.qualtrics.com/jfe/form/SV_40zWLBFYILTkRWl?Kind=FormRecognizer&From=Preview",
        isOpen: true,
        interaction: HaTSInteraction.Banner
    } as HatsProps
} as BannerProps;

RatingBanner.args = {
    onClick: () => { console.log("banner clicked"); },
    onClose: ()=>{ console.log("banner closed"); },
    headerText: "How likely is it that you would recommend Speech Services to a friend or colleague",
    hatsProp:{
        openInANewWindowLocalizedText: "Open in a new window",
        onClose: ()=>{},
        autoFlyout: false,
        headerText: "Feedback",
        surveyLink: "https://microsoft.qualtrics.com/jfe/form/SV_40zWLBFYILTkRWl?Kind=FormRecognizer&From=Preview",
        isOpen: true,
        interaction: HaTSInteraction.Banner
    } as HatsProps
} as RatingBannerProps;