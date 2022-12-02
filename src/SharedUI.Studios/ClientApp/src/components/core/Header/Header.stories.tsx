import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { IHeaderProps, ThemedHeader as CS_Header, ThemedHeaderIcon } from "./Header";
import {
  ICommandBarItemProps,
  IIconProps,
  ThemeProvider,
} from "@fluentui/react";
import { defaultTheme } from "../../../themes";
import { ClientNotification, ClientNotificationDomain, ClientNotificationStatus, getNotificationMessage, NotificationProcessingBar, NotificationPrompt } from "../Notification/Notification";

const notification: ClientNotification = {
  id: "ID",
  domain: ClientNotificationDomain.Subscription,
  title: "Project created",
  message: () => getNotificationMessage("Hello world", "https://bing.com", "Go to Bing", "https://microsoft.com", "Dismiss"),
  status: ClientNotificationStatus.Succeeded,
  createdAt: new Date(),
  updatedAt: new Date(),
  silent: false
};

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
    onClick() { },
    onRenderIcon() {
      return (
        <div className="button-item">
          <ThemedHeaderIcon style={{ position: "absolute" }} iconName={Icons.Ringer.iconName} />
          <NotificationPrompt notifications={{ [notification.id]: notification }} />
          <NotificationProcessingBar notifications={{ [notification.id]: notification }} />
        </div>
      );
    },
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
