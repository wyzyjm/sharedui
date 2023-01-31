import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ProfileCard, TenantInformation, ProfileCardProps } from './ProfileCard'
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

const tenantInformation: TenantInformation = {
  tenantId: 'tenantId',
  displayName: 'Conan Wang (CSI Interfusion Inc)',
  defaultDomain: 'defaultDomain',
  subscription: 'subscription',
  resource: 'resource',
  accountName: 'Conan Wang (CSI Interfusion Inc)',
  accountEmail: 'v-donglwang@microsoft.com',
  site: 'West US 2, S0'
}

export const Profile = ProfileCardTemplate.bind({});
Profile.args = {
  headerText: "ProfileCard",
  isOpen: true,
  tenant: tenantInformation,
  onClose: () => { },
  login: () => { },
  signOut: () => { },
  toggleSwitchTenant: () => { },
  toggleSwitchResource: () => { },
} as ProfileCardProps