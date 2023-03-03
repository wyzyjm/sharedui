import React from 'react';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LeftNavCustom, NavigationCustomProps } from "./LeftNavCustom";
import { ThemeProvider, INavLinkGroup } from "@fluentui/react";
import { INTL } from "../../../util/intlUtil";
import { SharedComponentsContext } from '../SharedComponentsContext';
import { defaultTheme } from "../../../themes";
import { LeftNavCustomLocalizationFormatMessages } from "../../../clientResources";

export default {
    title: "LeftNavCustom",
    component: LeftNavCustom
} as ComponentMeta<typeof LeftNavCustom>

const LeftNavTemplate: ComponentStory<typeof LeftNavCustom> = (args) =>  {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <LeftNavCustom {...args} />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    )
}

export const LeftNavCustomComponent = LeftNavTemplate.bind({});

const getNavLinkGroups = () => {
    const navLinkGroups: INavLinkGroup[] = [
      {
        links: [
          {
            id: "collapseChevron",
            name: "",
            ariaLabel: "collapseChevron",
            url: '',
            key: 'collapse',
            title: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.ExpandCollapsed),
            iconProps: {
              iconName: 'DoubleChevronLeft',
            },
          },
          {
            name: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.OpenAI),
            url: '/portal',
            icon: 'home',
            title: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.OpenAI),
          },
        ]
      }
    ];
  
    const tryItLinks = [
      {
        name: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.GPT3),
        url: '/playground',
        key: 'playground',
        icon: 'WebAppBuilderFragmentCreate',
        title: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.GPT3),
        ariaLabel: `${INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.GPT3)} 1 of 3 Playground`
      }
    ];

    navLinkGroups.push({
      name: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.Playground),
      links: tryItLinks
    });
  
    navLinkGroups.push({
      name: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.Management),
      links: [
        {
          name: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.Deployments),
          url: '/deployment',
          key: 'deployment',
          icon: 'Deploy',
          title: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.Deployments),
        },
        {
          name: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.Models),
          url: '/models',
          key: 'models',
          icon: 'DatabaseSync',
          title: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.Models),
        },
        {
          name: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.FileManagement),
          url: '/fileManagement',
          key: 'fileManagement',
          icon: 'FileCode',
          title: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.FileManagement),
        }
      ]
    });
  
    return navLinkGroups
  }

  const getSkinnyNavItems = () => {
    const navLinkGroupsSkinny: INavLinkGroup[] = [{
      links: []
    }];
  
    navLinkGroupsSkinny[0].links.push({
      id: "expandChevron",
      name: "",
      url: '',
      key: 'collapse',
      ariaLabel: "collapseChevron",
      title: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.ExpandCollapse),
      iconProps: {
        iconName: 'DoubleChevronRight',
      },
    });
    navLinkGroupsSkinny[0].links.push({
      name: "",
      url: '/portal',
      icon: 'home',
      key: 'home',
      title: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.OpenAI),
    });
    navLinkGroupsSkinny[0].links.push({
      name: "",
      url: '/playground',
      key: 'playground',
      icon: 'WebAppBuilderFragmentCreate',
      title: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.Playground),
      ariaLabel: `${INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.GPT3)} 1 of 3 Playground`
    });
  
    navLinkGroupsSkinny[0].links.push({
      name: "",
      url: '/deployment',
      key: 'deployment',
      icon: 'Deploy',
      title: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.Deployments),
    });
    navLinkGroupsSkinny[0].links.push({
      name: "",
      url: '/models',
      key: 'models',
      icon: 'DatabaseSync',
      title: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.Models),
    });
    navLinkGroupsSkinny[0].links.push({
      name: "",
      url: '/fileManagement',
      key: 'fileManagement',
      icon: 'FileCode',
      title: INTL.formatMessage(LeftNavCustomLocalizationFormatMessages.FileManagement)
    });
  
    return navLinkGroupsSkinny;
  }

LeftNavCustomComponent.args ={
    navigation: () => {console.log()},
    getCurrentUrl: () => "path/home",
    expandedNaviItems: getNavLinkGroups(),
    collapsedNaviItems: getSkinnyNavItems(),
} as NavigationCustomProps
