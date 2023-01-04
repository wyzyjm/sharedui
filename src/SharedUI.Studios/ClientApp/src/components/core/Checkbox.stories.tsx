import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox as SharedCheckbox, CheckboxProps } from './Checkbox';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { ThemeProvider } from '@fluentui/react';
import { defaultTheme } from '../../themes';
import { SharedComponentsContext } from './SharedComponentsContext';
initializeIcons(undefined, { disableWarnings: true });

export default {
  title: 'Checkbox',
  component: SharedCheckbox
} as ComponentMeta<typeof SharedCheckbox>;

const Checkbox: ComponentStory<typeof SharedCheckbox> = (args) => {
  return (
    <ThemeProvider theme={defaultTheme.body}>
      <SharedComponentsContext.Provider value={{ locale: 'en' }}>
        <SharedCheckbox {...args} />
      </SharedComponentsContext.Provider>
    </ThemeProvider>
  );
}

export const checkbox = Checkbox.bind({});

checkbox.args = {
  checked: true,
  text: "Test Check Box",
  name: "name",
  id: "id"
} as CheckboxProps;