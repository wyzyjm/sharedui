import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { IHeaderProps, ThemedHeader as CS_Header, ThemedHeaderIcon } from "./Header";
import {
  ICommandBarItemProps,
  IIconProps,
  ThemeProvider,
  Callout,
} from "@fluentui/react";
import { defaultTheme } from "../../../themes";
import { ClientNotification, ClientNotificationDomain, ClientNotifications, ClientNotificationStatus, getNotificationMessage, NotificationBoxListProp, NotificationProcessingBar, NotificationPrompt } from "../Notification/Notification";
import { SharedComponentsContext } from '../SharedComponentsContext';
import { ProfileCard, ProfileCardProps } from '../ProfileCard/ProfileCard'
import { Profile } from '../ProfileCard/ProfileCard.stories'
import { useId } from "@fluentui/react-hooks";

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

const clientNotificationGenerator = (p: string) => ({
  id: p,
  domain: ClientNotificationDomain.Subscription,
  title: p,
  message: p,
  status: ClientNotificationStatus.Failed,
  createdAt: new Date(),
  updatedAt: new Date(),
  silent: false,
} as ClientNotification)

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
    ariaLabel: "Notifications",
    iconOnly: true,
    tooltipHostProps: { hidden: true },
    iconProps: { iconName: Icons.Ringer.iconName },
    onClick() { },
    onRenderIcon() {
      return (
        <>
          <ThemedHeaderIcon iconName={Icons.Ringer.iconName} />
          <NotificationPrompt notifications={{ [notification.id]: notification }} />
          <NotificationProcessingBar notifications={{ [notification.id]: notification }} />
        </>
      );
    },
  },
  {
    key: "Settings",
    text: "Settings",
    ariaLabel: "Settings",
    iconOnly: true,
    tooltipHostProps: { hidden: true },
    iconProps: { iconName: Icons.Settings.iconName },
  },
  {
    key: "Help",
    text: "Help",
    ariaLabel: "Help",
    iconOnly: true,
    tooltipHostProps: { hidden: true },
    iconProps: { iconName: Icons.Help.iconName },
  },
] as ICommandBarItemProps[];

export default {
  title: "Header",
  component: CS_Header,
} as ComponentMeta<typeof CS_Header>;

const HeaderTemplate: ComponentStory<typeof CS_Header> = (args) => {
  // const buttonId = useId('callout-button');
  return (
    <ThemeProvider theme={defaultTheme.body}>
      <SharedComponentsContext.Provider value={{ locale: 'en' }}>
        <CS_Header {...args} />
        {/* <CS_Header {...args} profileButtonId={buttonId} /> */}
        {/* <Callout target={`#${buttonId}`} >Callout content</Callout> */}
      </SharedComponentsContext.Provider>
    </ThemeProvider>
  );
}

export const Header = HeaderTemplate.bind({});

Header.args = {
  headerText: "Azure OpenAI Studio",
  headerHomePageUrl: "https://openai.studio-ppe.azure.com/portal",
  isAuthenticated: true,
  commandBarItems: commandBarItems,
  loginPath: '/portal',
  friendlyName: 'Conan Wang (CSI Interfusion Inc)',
  subscription: {
    name: 'subscription name',
    sku: '2,50',
    localeDisplayName: 'West US',
  },
  // photoData: '',
  notifications: {
    notifications: {
      "123": clientNotificationGenerator("123"),
      "456": clientNotificationGenerator("456"),
      "789": clientNotificationGenerator("789"),
   } as ClientNotifications
  } as NotificationBoxListProp
} as IHeaderProps;
