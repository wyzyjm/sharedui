import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ProfileCard, ProfileCardInformation, ProfileCardProps } from './ProfileCard'
import { ThemeProvider } from "@fluentui/react";
import { defaultTheme } from "../../../themes";
import { SharedComponentsContext } from '../SharedComponentsContext';

export default {
  title: "ProfileCard",
  component: ProfileCard,
} as ComponentMeta<typeof ProfileCard>;

const ProfileCardTemplate: ComponentStory<typeof ProfileCard> = (args) => {
  return (
    <ThemeProvider theme={defaultTheme.body}>
      <SharedComponentsContext.Provider value={{ locale: 'en' }}>
        <ProfileCard {...args} />
      </SharedComponentsContext.Provider>
    </ThemeProvider>
  );
}

const tenantInformation: ProfileCardInformation = {
  tenantId: 'tenantId',
  displayName: 'Conan Wang (CSI Interfusion Inc)',
  defaultDomain: 'defaultDomain',

  accountName: 'Conan Wang (CSI Interfusion Inc)',
  accountEmail: 'v-donglwang@microsoft.com',

  roleName: 'Owner',
  roleLearnMoreLink: 'learn more link'
}

export const Profile = ProfileCardTemplate.bind({});
Profile.args = {
  headerText: "ProfileCard",
  isOpen: true,
  tenant: tenantInformation,
  photoData: undefined,
  // subscription: {
  //   name: 'subscription name',
  //   sku: '2,50',
  //   localeDisplayName: 'West US',
  // },
  onClose: () => { },
  login: () => { },
  signOut: () => { },
  onSwitchTenant: () => { },
  onSwitchResource: () => { },
} as ProfileCardProps