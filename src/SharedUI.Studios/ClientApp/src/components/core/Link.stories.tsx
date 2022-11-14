import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LinkProps, Link as SharedComponentLink } from './Link';

export default {
    title: 'Link',
    component: SharedComponentLink
} as ComponentMeta<typeof SharedComponentLink>;

export const Link: ComponentStory<typeof SharedComponentLink> = (args) => (
    <SharedComponentLink {...args} />
);

Link.args = {
    href: "https://www.google.com/",
    displayText: 'Click Here',
    openInANewWindow:true,
} as LinkProps;
