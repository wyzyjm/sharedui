import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StyledBreadcrumb } from './Breadcrumb';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { defaultTheme } from "../../../themes";
import { SharedComponentsContext } from '../SharedComponentsContext';

export default {
  title: 'BreadCrumb',
  component: StyledBreadcrumb
} as ComponentMeta<typeof StyledBreadcrumb>;

const Breadcrumb: ComponentStory<typeof StyledBreadcrumb> = (args) => {
  return (
    <ThemeProvider theme={defaultTheme.body}>
      <SharedComponentsContext.Provider value={{ locale: 'en' }}>
        <StyledBreadcrumb{...args} />
      </SharedComponentsContext.Provider>
    </ThemeProvider>
  );
}

const breadcrumbItems = [{
  key: 'Home',
  text: 'Home',
  href: 'https://www.google.com/',
  onClick: () => { }
},
{
  key: 'About',
  text: 'About',
  href: 'https://www.microsoft.com/',
  onClick: () => { }
},
{
  key: 'Contact Us',
  text: 'Contact Us',
  href: '',
  onClick: () => { }
}]

export const BreadCrumb = Breadcrumb.bind({});

BreadCrumb.args = {
  items: breadcrumbItems
};