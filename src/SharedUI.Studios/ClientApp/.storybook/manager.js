import { addons } from '@storybook/addons';
import fluentStorybookTheme from './CustomSbTheme';

addons.setConfig({
  theme: fluentStorybookTheme,
  showPanel: true,
});