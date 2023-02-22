import React, { useCallback, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { defaultTheme } from "../../../themes";
import {
    CommandBarButton,
    DefaultButton,
    IColumn,
    IScrollablePaneStyles,
    ScrollablePane,
    StackItem,
    ThemeProvider
} from "@fluentui/react";
import { SharedComponentsContext } from '../SharedComponentsContext';
import { CustomShimmeredDetailsList, ICustomColumn, ICustomColumnsList, ICustomColumnWithHeader, ICustomShimmeredDetailsListProp } from './ItemList';
import { ColumnSelector as CS_ColumnSelector, IColumnSelectorProps } from './ColumnSelector';
import { PanelSelector as CS_PanelSelector, IPanelSelectorProps } from './PanelSelector';

export default {
    title: 'ItemList',
    component: CustomShimmeredDetailsList,
    parameters: { actions: { argTypesRegex: '^onChange.*' } },
} as ComponentMeta<typeof CustomShimmeredDetailsList>;

interface SampleGridItem {
    firstName: string;
    lastName: string;
    designation: string;
    successCount: number;
    failedCount: number;
    foo: string;
}

let tableSchema: any = [
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
        onColumnContextMenu: (column: IColumn, ev: any) => { console.log("called"); },
        isHiddenFromColumnSelector: false
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
        isHiddenFromColumnSelector: false
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
        ),
        isHiddenFromColumnSelector: false
    },
    {
        name: "Success count",
        key: "SuccessCount",
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        sortKey: (item: SampleGridItem) => item.successCount,
        onRender: (item: SampleGridItem) => item.successCount,
        isHiddenFromColumnSelector: false
    },
    {
        name: "Failure count",
        key: "FailureCount",
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        sortKey: (item: SampleGridItem) => item.failedCount,
        onRender: (item: SampleGridItem) => item.failedCount,
        isHiddenFromColumnSelector: false
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

let cs_args = {
    tableColumns: tableSchema,
    isOpen: false
} as IColumnSelectorProps;

let ps_args = {
    tableColumns: tableSchema,
    isOpen: false
} as IPanelSelectorProps;

const ItemListTemplate: ComponentStory<typeof CustomShimmeredDetailsList<SampleGridItem>> = (args: ICustomShimmeredDetailsListProp<SampleGridItem>) => {
    const [temp, setTemp] = useState(0);
    const getTable = useCallback((updatedTableSchema: any) => {
        () => (tableSchema = updatedTableSchema);
        setTemp(val => (val + 1));
    }, []);

    function handlePanel() {
        cs_args.isOpen = !cs_args.isOpen;
        setTemp(val => (val + 1));
    }

    function handlePanelSelector() {
        ps_args.isOpen = !ps_args.isOpen;
        setTemp(val => (val + 1));
    }

    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <DefaultButton text="Column selector" onClick={handlePanel} />
                <CS_ColumnSelector {...cs_args} onChange={getTable} />
                <CustomShimmeredDetailsList<SampleGridItem> {...args} />
                <CommandBarButton text="Panel selector" onClick={handlePanelSelector} />
                <CS_PanelSelector {...ps_args} onChange={getTable} />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

export const ItemList = ItemListTemplate.bind({});

ItemList.args = {
    columns: tableSchema,
    items: gridItems,
    onSelect: items => console.log("items selected"),
    enableShimmer: false
} as ICustomShimmeredDetailsListProp<SampleGridItem>;