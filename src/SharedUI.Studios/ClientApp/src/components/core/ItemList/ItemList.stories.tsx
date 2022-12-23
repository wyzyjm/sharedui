import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { defaultTheme } from "../../../themes";
import {
    IColumn,
    IScrollablePaneStyles,
    ScrollablePane,
    StackItem,
    ThemeProvider
} from "@fluentui/react";
import { SharedComponentsContext } from '../SharedComponentsContext';
import { CustomShimmeredDetailsList, ICustomColumn, ICustomColumnsList, ICustomColumnWithHeader, ICustomShimmeredDetailsListProp } from './ItemList';


export default {
    title: 'ItemList',
    component: CustomShimmeredDetailsList,
    parameters: { actions: { argTypesRegex: '^onChange.*' } },
} as ComponentMeta<typeof CustomShimmeredDetailsList>;

const ItemListTemplate: ComponentStory<typeof CustomShimmeredDetailsList<SampleGridItem>> = (args: ICustomShimmeredDetailsListProp<SampleGridItem>) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <CustomShimmeredDetailsList<SampleGridItem> {...args} />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

export const ItemList = ItemListTemplate.bind({});

interface SampleGridItem {
    firstName: string;
    lastName: string;
    designation: string;
    successCount: number;
    failedCount: number;
    foo: string;
}

const tableSchema: any = [
    {
        name: "First name",
        key: "FirstName",
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        onRender: (item: SampleGridItem) => (
            <span>{item.firstName}</span>
        ),
        sortKey: (item: SampleGridItem) => item.firstName,
        contextualMenuProps: {
            getContextualMenuItems: (items: SampleGridItem[]) => [] as any,
            contextMenuContainerColumnKey: "FirstName",
            enbaleItemContextMenu: true,
        },
        onColumnContextMenu: (column: IColumn, ev: any) => { console.log("called"); } 
    },
    {
        name: "Last name",
        key: "lastName",
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        sortKey: (item: SampleGridItem) => item.lastName,
        onRender: (item: SampleGridItem) => (
            <span>{item.lastName}</span>
        ),
    },
    {
        name: "Designation",
        key: "designation",
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        sortKey: (item: SampleGridItem) => item.designation,
        onRender: (item: SampleGridItem) => (
            <span>{item.designation}</span>
        )
    },
    {
        name: "Success count",
        key: "SuccessCount",
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        sortKey: (item: SampleGridItem) => item.successCount,
        onRender: (item: SampleGridItem) => item.successCount,
    },
    {
        name: "Failure count",
        key: "FailureCount",
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        sortKey: (item: SampleGridItem) => item.failedCount,
        onRender: (item: SampleGridItem) => item.failedCount,
    },
];

const gridItems = [
    {
      firstName: "Mukesh",
      lastName: "Agarwal",
      designation: "Engineer",
      failedCount: 10,
      successCount: 90  
    },
    {
        firstName: "Foo",
        lastName: "Bar",
        designation: "Developer",
        failedCount: 15,
        successCount: 85  
      },
      {
        firstName: "Foobar",
        lastName: "Anything",
        designation: "Engineer",
        failedCount: 45,
        successCount: 35  
      }
] as SampleGridItem[];

ItemList.args = {
    columns: tableSchema,
    items: gridItems,
    onSelect: items => console.log("items selected"),
    enableShimmer: false
} as ICustomShimmeredDetailsListProp<SampleGridItem>;