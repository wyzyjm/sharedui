import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ILeftNavProps, LeftNav as CS_LeftNav } from "./LeftNav";
import { INavLinkGroup, ThemeProvider } from "@fluentui/react";
import { defaultTheme } from "../../../themes";
import { Icons } from "../Icons";
import { SharedComponentsContext } from '../SharedComponentsContext';

const navLinkGroups: INavLinkGroup[] = [
  {
    name: "Speech project",
    groupData: "",
    links: [
      {
        name: "Speech datasets",
        url: "https://speech.microsoft.com/portal/aa1c5d8161814be7bbd5e0ffd21e5dac/customspeech/77349ea6-dd32-462c-b4b2-4b2ea8b900df/data",
        key: "data",
        iconProps: Icons.Database,
        onClick: () => { console.log("Redirecting to Speech datasets") }
      },
      {
        name: "Train custom models",
        url: "https://speech.microsoft.com/portal/aa1c5d8161814be7bbd5e0ffd21e5dac/customspeech/77349ea6-dd32-462c-b4b2-4b2ea8b900df/training",
        key: "training",
        iconProps: Icons.WorkItem,
        onClick: () => { console.log("Redirecting to Train custom models") }
      },
      {
        name: "Test models",
        url: "https://speech.microsoft.com/portal/aa1c5d8161814be7bbd5e0ffd21e5dac/customspeech/77349ea6-dd32-462c-b4b2-4b2ea8b900df/testing",
        key: "testing",
        iconProps: Icons.TestBeaker,
        onClick: () => { console.log("Redirecting to Test models") }
      },
      {
        name: "Deploy models",
        url: "https://speech.microsoft.com/portal/aa1c5d8161814be7bbd5e0ffd21e5dac/customspeech/77349ea6-dd32-462c-b4b2-4b2ea8b900df/endpoint",
        key: "endpoint",
        iconProps: Icons.Deploy,
        onClick: () => { console.log("Redirecting to Deploy models") }
      },
    ],
  },
];

export default {
  title: "LeftNav",
  component: CS_LeftNav,
} as ComponentMeta<typeof CS_LeftNav>;

const LeftNavTemplate: ComponentStory<typeof CS_LeftNav> = (args) => {
  return (
    <ThemeProvider theme={defaultTheme.body}>
      <SharedComponentsContext.Provider value={{ locale: 'en' }}>
        <CS_LeftNav {...args} />
      </SharedComponentsContext.Provider>
    </ThemeProvider>
  );
}

export const LeftNav = LeftNavTemplate.bind({});

LeftNav.args = {
  navItems: navLinkGroups,
  defaultMenuSelectKey: "",
  title: "Custom Speech",
  titleLink: {
    href: "https://speech.microsoft.com/portal/aa1c5d8161814be7bbd5e0ffd21e5dac/customspeech",
    onClick: () => {
      console.log("onClick method called");
    }
  },
  onLinkClick: () => {
    console.log("onLinkClick method called");
  },
} as ILeftNavProps;
