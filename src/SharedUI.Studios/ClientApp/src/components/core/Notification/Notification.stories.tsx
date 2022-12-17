import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  ClientNotificationDomain,
  ClientNotification,
  ClientNotificationStatus,
  INotificationPanelProps,
  NotificationPanel as CS_Notification,
  getNotificationMessage,
} from "./Notification";
import { ThemeProvider } from "@fluentui/react";
import { defaultTheme } from "../../../themes";
import { SharedComponentsContext } from '../SharedComponentsContext';

export default {
  title: "Notification",
  component: CS_Notification,
} as ComponentMeta<typeof CS_Notification>;

const NotificationTemplate: ComponentStory<typeof CS_Notification> = (args) => {
  return (
    <ThemeProvider theme={defaultTheme.body}>
      <SharedComponentsContext.Provider value={{ locale: 'en' }}>
        <CS_Notification {...args} />
      </SharedComponentsContext.Provider>
    </ThemeProvider>
  );
}

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

const handleDismissAll = () => {
};

export const Notification = NotificationTemplate.bind({});

Notification.args = {
  headerText: "Notifications",
  isOpen: true,
  onClick: handleDismissAll,
  onClose: () => { },
  notifications: { [notification.id]: notification },
} as INotificationPanelProps;