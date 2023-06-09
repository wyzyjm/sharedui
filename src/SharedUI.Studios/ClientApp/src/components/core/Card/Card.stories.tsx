import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from "@fluentui/react";
import { Card, ICardProp } from './Card';
import { defaultTheme } from "../../../themes";
import {
    ThemeProvider
} from "@fluentui/react";
import { SharedComponentsContext } from '../SharedComponentsContext';

export default {
    title: 'Card',
    component: Card
} as ComponentMeta<typeof Card>;

const DefaultCard: ComponentStory<typeof Card> = (args) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <Card {...args} />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

export const card = DefaultCard.bind({});
card.args = {
    title: "Extract common tags from images",
    iconUrl: new URL('https://vision.cognitive.azure.com/dist/static/media/generic-image-tagging-illustration.e3c81ac9.svg'),
    description: "Use an AI model to automatically assign one or more labels to an image.",
    linkTitle: "Try it out",
    linkProps: {
        href: "https://aka.ms/csstudio"
    },
    cardType: "CardWithIllustration",
    iconName: "AlignCenter",
    // subTitle: <div>Next generation of QnAMaker</div>,
    // preview: "Preview",
    // linkPropsDropdownOptions: [
    //     {
    //         key: 'codeSamplesCsharp',
    //         text: 'Code samples - C#',
    //         href: "https://aka.ms/language-sdks-csharp"
    //     },
    //     {
    //         key: 'codeSamplesPython',
    //         text: 'Code samples - Python',
    //         href: "https://aka.ms/language-sdks-python"
    //     },
    //     {
    //         key: 'codeSamplesJava',
    //         text: 'Code samples - Java',
    //         href: "https://aka.ms/language-sdks-java"
    //     }
    // ]
} as ICardProp;
