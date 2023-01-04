import { ThemeProvider } from '@fluentui/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SharedComponentsContext } from './SharedComponentsContext';
import { defaultTheme } from '../../themes';
import { LinkProps, Link as SharedComponentLink } from './Link';

export default {
    title: 'Link',
    component: SharedComponentLink
} as ComponentMeta<typeof SharedComponentLink>;

export const Link: ComponentStory<typeof SharedComponentLink> = (args) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <SharedComponentLink {...args} />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

Link.args = {
    href: "https://www.google.com/",
    displayText: 'Click Here',
    openInANewWindow: true,
} as LinkProps;
