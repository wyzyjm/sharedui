import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Card, ICardProp } from './Card';
import { defaultTheme } from "../../themes";
import {
    ThemeProvider
} from "@fluentui/react";


export default {
    title: 'Card',
    component: Card
} as ComponentMeta<typeof Card>;

const DefaultCard: ComponentStory<typeof Card> = (args) => (
    <ThemeProvider theme={defaultTheme.body}>
        <Card {...args} />
    </ThemeProvider>
);

export const card = DefaultCard.bind({});
card.args = {
    title: "Extract common tags from images",
    icon: new URL('https://vision.cognitive.azure.com/dist/static/media/generic-image-tagging-illustration.e3c81ac9.svg'),
    description: "Use an AI model to automatically assign one or more labels to an image.",
    linkTitle: "Try it out",
} as ICardProp;
