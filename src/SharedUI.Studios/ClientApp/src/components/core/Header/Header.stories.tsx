import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { IHeaderProps, ThemedHeader as CS_Header } from "./Header";
import {
  ICommandBarItemProps,
  IIconProps,
  ThemeProvider,
} from "@fluentui/react";
import { defaultTheme } from "../../../themes";

function defineIcons<T extends AccessibleKeyDefinition<IIconProps>>(
  icons: T
): T {
  return icons;
}
type AccessibleKeyDefinition<T> = {
  [key: string]: T;
};

const Icons = defineIcons({
  Ringer: { iconName: "Ringer" },
  Settings: { iconName: "Settings" },
  Help: { iconName: "Help" },
});
const commandBarItems = [
  {
    key: "Notifications",
    text: "Notifications",
    iconProps: { iconName: Icons.Ringer.iconName },
  },
  {
    key: "Settings",
    text: "Settings",
    iconProps: { iconName: Icons.Settings.iconName },
  },
  {
    key: "Help",
    text: "Help",
    iconProps: { iconName: Icons.Help.iconName },
  },
] as ICommandBarItemProps[];

export default {
  title: "Header",
  component: CS_Header,
} as ComponentMeta<typeof CS_Header>;

const HeaderTemplate: ComponentStory<typeof CS_Header> = (args) => (
  <ThemeProvider theme={defaultTheme.body}>
    <CS_Header {...args} />
  </ThemeProvider>
);

export const Header = HeaderTemplate.bind({});
Header.args = {
  headerText: "Speech Studio",
  headerLinkClickUrl: "https://speech.microsoft.com/portal",
  commandBarItems: commandBarItems,
} as IHeaderProps;
