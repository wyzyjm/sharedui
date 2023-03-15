import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Stack, PrimaryButton } from "@fluentui/react";
import { NonSignedInCard, INonSignedInCardProps } from './NonSignedInCard';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { defaultTheme } from "../../../themes";
import { SharedComponentsContext } from '../SharedComponentsContext';
export default {
    title: 'NonSignedInCard',
    component: NonSignedInCard,
} as ComponentMeta<typeof NonSignedInCard>

const NonSignedInCardTemplate: ComponentStory<typeof NonSignedInCard> = (args) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <Stack grow horizontalAlign='end'>
                    <PrimaryButton id="signin" title='signIn' ariaLabel='Signin' >
                        signIn
                    </PrimaryButton>
                </Stack>
                <NonSignedInCard {...args} targetButtonId='#signin' />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

export const NonSignedInCards = NonSignedInCardTemplate.bind({});

NonSignedInCards.args = {
    isVisible: true,
    title: 'Sign in with Azure to get full access to Vision Studio',
    exploreDescription: <p>
        You can explore and try out Vision services without signing in. To get full access to Vision Studio, please sign in with your Azure account.
        <a href="https://go.microsoft.com/fwlink/?linkid=2162908">Learn more about Azure account</a>
    </p>,
    onDismiss: () => { console.log('onDismiss') },
    onClickLearnMore: (e: React.MouseEvent) => {
        e.preventDefault()
        console.log('onClickLearnMore');
    },
    onClickSignUp: (e: React.MouseEvent) => {
        e.preventDefault()
        console.log('onClickSignUp');
    },
} as INonSignedInCardProps;
