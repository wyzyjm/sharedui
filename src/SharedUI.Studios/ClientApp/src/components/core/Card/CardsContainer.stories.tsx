import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ICardProp } from './Card';

import { CardsContainer, CardsContainerProps } from './CardsContainer';
import { defaultTheme } from "../../../themes";
import { ThemeProvider } from "@fluentui/react";
import { SharedComponentsContext } from '../SharedComponentsContext';

export default {
    title: 'CardsContainer',
    component: CardsContainer
} as ComponentMeta<typeof CardsContainer>;

const DefaultCard: ComponentStory<typeof CardsContainer> = (args) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <CardsContainer {...args} />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

const cards: ICardProp[] = new Array(6).fill(6).map((item, index) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getCardType = (index: number) => {
        let type = 'CardWithIllustration'
        switch (index % 4) {
            case 1:
                type = 'CardWithIllustration'
                break;
            case 2:
                type = 'CardWithIcon'
                break;
            case 3:
                type = 'CardWithCustomDesign'
                break;

            default:
                type = 'CardWithNoIllustration'
                break;
        }
        return type
    }
    return {
        title: `Extract common tags from images${index + 1}`,
        icon: new URL('https://vision.cognitive.azure.com/dist/static/media/generic-image-tagging-illustration.e3c81ac9.svg'),
        description: `Use an AI model to automatically assign one or more labels to an image.${index + 1}`,
        linkTitle: "Try it out",
        linkProps: {
            href: "https://aka.ms/csstudio"
        },
        cardType: 'CardWithIllustration', //getCardType(index), 
        iconName: "AlignCenter"
    }
})
export const cardContainer = DefaultCard.bind({});
cardContainer.args = {
    title: "Extract common tags from images",
    description: 'subscription is optional',
    items: cards,
} as CardsContainerProps;
