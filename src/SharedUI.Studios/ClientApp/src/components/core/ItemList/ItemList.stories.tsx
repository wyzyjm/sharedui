import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { defaultTheme } from "../../../themes";
import {
    CommandBarButton,
    DefaultButton,
    IColumn,
    ThemeProvider
} from "@fluentui/react";
import { SharedComponentsContext } from '../SharedComponentsContext';
import { CustomShimmeredDetailsList, ICustomColumnsList, ICustomShimmeredDetailsListProp } from './ItemList';
import { ColumnSelector as CS_ColumnSelector, IColumnSelectorItem } from './ColumnSelector';
import { PanelSelector as CS_PanelSelector, IPanelSelectorProps } from './PanelSelector';
import { useState } from '@storybook/addons';


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
}

let tableSchema: ICustomColumnsList<SampleGridItem> = [
    {
        name: "First name",
        key: "FirstName",
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        onRender: (item: SampleGridItem) => (
            <span>{item.firstName}</span>
        ),
        isRowHeader: true,
        sortKey: (item: SampleGridItem) => item.firstName,
        onColumnContextMenu: (column: IColumn, ev: any) => { console.log("called"); },
        isHiddenFromColumnSelector: false,
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
    }
];

function getColumnsForColumnSelector(tableSchema: ICustomColumnsList<SampleGridItem>): IColumnSelectorItem[] {
    return tableSchema.map(tableColumn => {
        return {
            name: tableColumn.name,
            key: tableColumn.key,
            isItemUnselected: tableColumn.isHiddenFromColumnSelector
        };
    });
}

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

let ps_args = {
    tableColumns: tableSchema,
    isOpen: false
} as IPanelSelectorProps;

const ItemListTemplate: ComponentStory<typeof CustomShimmeredDetailsList<SampleGridItem>> = (args: ICustomShimmeredDetailsListProp<SampleGridItem>) => {
    const [tableSchemaCols, setTableSchemaCols] = useState(tableSchema);
    const [columnSelectorCols, setColumnSelectorCols] = useState(getColumnsForColumnSelector(tableSchema));
    const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState(false);
   
    const updateTable = (columns: IColumnSelectorItem[]) => {
        const newTableSchema: any = [];
        const olderTableSchema = tableSchemaCols;

        columns.forEach(column => {
            const tableSchemaCol = olderTableSchema.find(schema => schema.key === column.key);
            tableSchemaCol.isHiddenFromColumnSelector = column.isItemUnselected;
            newTableSchema.push(tableSchemaCol);
        });

        setTableSchemaCols(newTableSchema);
        setColumnSelectorCols(getColumnsForColumnSelector(newTableSchema));
    };

    function handlePanel() {
        setIsColumnSelectorOpen(!isColumnSelectorOpen);
    }

    function handlePanelSelector() {
        ps_args.isOpen = !ps_args.isOpen;
    }

    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <DefaultButton text="Column selector" onClick={handlePanel} />
                <CS_ColumnSelector tableColumns={columnSelectorCols} isOpen={isColumnSelectorOpen} onCloseColumnSelector={() => {}} onChange={updateTable} />
                <CustomShimmeredDetailsList<SampleGridItem> contextualMenuProps={null} onSelect={items => console.log("items selected")} items={gridItems} columns={tableSchemaCols} enableShimmer={false}  />
                <CommandBarButton text="Panel selector" onClick={handlePanelSelector} />
                {/* <CS_PanelSelector {...ps_args} onChange={getTable} /> */}
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

export const ItemList = ItemListTemplate.bind({});
