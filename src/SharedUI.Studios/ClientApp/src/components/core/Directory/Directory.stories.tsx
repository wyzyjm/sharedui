// 'https://go.microsoft.com/fwlink/?linkid=2162896'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SelectDirectoryTab, ISelectDirectoryTabProps } from './Directory';
import { defaultTheme } from "../../../themes";
import {
    ThemeProvider
} from "@fluentui/react";
import { SharedComponentsContext } from '../SharedComponentsContext';

export default {
    title: 'SelectDirectoryTab',
    component: SelectDirectoryTab
} as ComponentMeta<typeof SelectDirectoryTab>;

const DefaultCard: ComponentStory<typeof SelectDirectoryTab> = (args) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <SelectDirectoryTab {...args} />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

export const selectDirectoryTab = DefaultCard.bind({});
selectDirectoryTab.args = {
    selectedTenant: {
        tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
        displayName: "Microsoft",
        defaultDomain: "microsoft.onmicrosoft.com",
    },
    tenants: [{
        tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
        displayName: "Microsoft",
        defaultDomain: "microsoft.onmicrosoft.com",
    }, {
        tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db46",
        displayName: "Microsoft2",
        defaultDomain: "microsoft.onmicrosoft.com",
    }],
    onChangeDirectory: (selectedTenant) => { console.log('selectedTenant', selectedTenant) }
} as ISelectDirectoryTabProps;
