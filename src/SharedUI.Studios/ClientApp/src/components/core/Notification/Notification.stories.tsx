import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  ClientNotificationDomain,
  ClientNotifications,
  ClientNotificationStatus,
  NotificationBoxListWrapped as CSNotificationBox,
  INotificationPanelProps,
  NotificationPanel as CSNotification,
  getNotificationMessage,
} from "./Notification";
import { ThemeProvider } from "@fluentui/react";
import { defaultTheme } from "../../../themes";
import { SharedComponentsContext } from '../SharedComponentsContext';

export default {
  title: 'Notification',
  subcomponents: { CSNotification, CSNotificationBox }
} as ComponentMeta<any>;

const arg: ClientNotifications = {
  '127': {
    id: "127",
    domain: ClientNotificationDomain.Subscription,
    title: "Project created",
    message: () => getNotificationMessage("Failed", "https://bing.com", "Go to Bing", "https://microsoft.com", "Dismiss"),
    status: ClientNotificationStatus.Failed,
    createdAt: new Date(),
    updatedAt: new Date(),
    silent: false
  },
  '126': {
    id: "126",
    domain: ClientNotificationDomain.Subscription,
    title: "Project created",
    message: () => getNotificationMessage("Succeeded", "https://bing.com", "Go to Bing", "https://microsoft.com", "Dismiss"),
    status: ClientNotificationStatus.Succeeded,
    createdAt: new Date(),
    updatedAt: new Date(),
    silent: false
  },
  '125': {
    id: "125",
    domain: ClientNotificationDomain.Subscription,
    title: "No created",
    message: () => getNotificationMessage("PartiallySucceeded", "https://bing.com", "Go to Bing", "https://microsoft.com", "Dismiss"),
    status: ClientNotificationStatus.PartiallySucceeded,
    createdAt: new Date(),
    updatedAt: new Date(),
    silent: false
  },
  '124': {
    id: "124",
    domain: ClientNotificationDomain.Subscription,
    title: "Project created",
    message: () => getNotificationMessage("Processing", "https://bing.com", "Go to Bing", "https://microsoft.com", "Dismiss"),
    status: ClientNotificationStatus.Processing,
    createdAt: new Date(),
    updatedAt: new Date(),
    silent: false
  },
  '123': {
    id: "123",
    domain: ClientNotificationDomain.Subscription,
    title: "Project created",
    message: () => getNotificationMessage("Uploading", "https://bing.com", "Go to Bing", "https://microsoft.com", "Dismiss"),
    status: ClientNotificationStatus.Uploading,
    createdAt: new Date(),
    updatedAt: new Date(),
    silent: false
  },
  '122': {
    id: "122",
    domain: ClientNotificationDomain.Subscription,
    title: "No created",
    message: () => getNotificationMessage("Canceled", "https://bing.com", "Go to Bing", "https://microsoft.com", "Dismiss"),
    status: ClientNotificationStatus.Canceled,
    createdAt: new Date(),
    updatedAt: new Date(),
    silent: false
  },
  '121': {
    id: "121",
    domain: ClientNotificationDomain.Subscription,
    title: "No created",
    message: () => getNotificationMessage("Expired", "https://bing.com", "Go to Bing", "https://microsoft.com", "Dismiss"),
    status: ClientNotificationStatus.Expired,
    createdAt: new Date(),
    updatedAt: new Date(),
    silent: true
  },
  '120': {
    id: "120",
    domain: ClientNotificationDomain.Subscription,
    title: "Project created",
    message: () => getNotificationMessage("Paused", "https://bing.com", "Go to Bing", "https://microsoft.com", "Dismiss"),
    status: ClientNotificationStatus.Paused,
    createdAt: new Date(),
    updatedAt: new Date(),
    silent: false
  },
  '119': {
    id: "119",
    domain: ClientNotificationDomain.Subscription,
    title: "Project created",
    message: () => getNotificationMessage("Suspended", "https://bing.com", "Go to Bing", "https://microsoft.com", "Dismiss"),
    status: ClientNotificationStatus.Suspended,
    createdAt: new Date(),
    updatedAt: new Date(),
    silent: false
  }
};

const handleDismissAll = () => {};

const NotificationPanelTemplate: ComponentStory<typeof CSNotification> = (args) => {
  return (
    <ThemeProvider theme={defaultTheme.body}>
      <SharedComponentsContext.Provider value={{ locale: 'en' }}>
        <CSNotification {...args} />
      </SharedComponentsContext.Provider>
    </ThemeProvider>
  );
}

export const NotificationPanelCom = NotificationPanelTemplate.bind({});

NotificationPanelCom.args = {
  notifications: arg,
  isOpen: true,
  headerText: "Notification",
  onClick: handleDismissAll,
  onClose: handleDismissAll,
  onDismissAll: handleDismissAll,
  onDismissedItem: (id: string) => {},
} as INotificationPanelProps;

const NotificationBoxListWrappedTemplate: ComponentStory<typeof CSNotificationBox> = (args) => {
  return (
    <ThemeProvider theme={defaultTheme.body}>
      <SharedComponentsContext.Provider value={{ locale: 'en' }}>
        <CSNotificationBox {...args} />
      </SharedComponentsContext.Provider>
    </ThemeProvider>
  );
}


export const NotificationBox = NotificationBoxListWrappedTemplate.bind({});

NotificationBox.args = {
  notifications: arg,
} as INotificationPanelProps;