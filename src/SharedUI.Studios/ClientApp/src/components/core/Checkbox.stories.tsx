import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox as SharedCheckbox, CheckboxProps } from './Checkbox';
import { initializeIcons } from '@fluentui/react/lib/Icons';
initializeIcons(undefined, { disableWarnings: true });

export default {
    title: 'Checkbox',
    component: SharedCheckbox
} as ComponentMeta<typeof SharedCheckbox>;

const Checkbox: ComponentStory<typeof SharedCheckbox> = (args) => (
    <SharedCheckbox {...args}/>
);

export const checkbox = Checkbox.bind({});

checkbox.args = {
  checked:true,
  text: "Test Check Box",
  name:"name",
  id:"id"
} as CheckboxProps;

