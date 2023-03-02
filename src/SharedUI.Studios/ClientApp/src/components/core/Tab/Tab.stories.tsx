import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    Stack,
    PivotItem,
} from "@fluentui/react";
import { Tab, ITabProps } from './Tab';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { defaultTheme } from "../../../themes";
import { SharedComponentsContext } from '../SharedComponentsContext';
import { selectDirectoryTab } from '../Directory/Directory.stories'
import { selectResourceTab } from '../SelectResourceTab/SelectResourceTab.stories'
export default {
    title: 'Tab',
    subcomponents: { Tab }
} as ComponentMeta<any>;

const CircularLoadingTemplate: ComponentStory<typeof Tab> = (args) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <Stack grow styles={{ root: { height: '600px' } }}>
                    <Tab {...args} />
                </Stack>
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

export const SettingTab = CircularLoadingTemplate.bind({});

SettingTab.args = {
    defaultSelectedItemKey: '0',
    generalDom: <div>generalDom</div>,
    onTabClick: (item: PivotItem) => {
        console.log('item', item);
    },
    directoryProps: { ...selectDirectoryTab.args },
    resourceProps: { ...selectResourceTab.args }
} as ITabProps;
