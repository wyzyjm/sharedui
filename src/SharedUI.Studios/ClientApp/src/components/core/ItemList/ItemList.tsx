import {
    Announced,
    ColumnActionsMode,
    ContextualMenu,
    DefaultButton,
    Dialog,
    DialogFooter,
    DialogType,
    IColumn,
    IContextualMenuItem,
    IContextualMenuProps,
    IDetailsColumnRenderTooltipProps,
    IDetailsHeaderProps,
    IDetailsList,
    IDetailsListProps,
    IRenderFunction,
    IShimmeredDetailsListProps,
    ITextField,
    PrimaryButton,
    Selection as DetailsListSelection,
    ShimmeredDetailsList,
    Stack,
    StackItem,
    Sticky,
    StickyPositionType,
    TextField,
    Theme,
    TooltipHost,
    useTheme,
} from "@fluentui/react";
import { cloneDeep, every } from "lodash";
import React, { CSSProperties, useEffect, useState } from "react";
import { DetailsListLocalizedFormatMessages, FormatMessagePlaceholder } from "../../../clientResources";
import { initializeComponent, withLocalization } from "../../../services/localization";
import { comparatorUtil } from "../../../util/comparator";
import { INTL } from "../../../util/intlUtil";
import { ExactlyOne } from "../../../util/typeUtil";
import { useResetState } from "../../customizedHooks";
import { MoreActionsButton } from "../Button/Button";
import { IListContextualMenuPartialProps, ListContextualMenu } from "./ContextualMenu";

const defaultDetailsListStyles = (theme: Theme) => ({
    headerWrapper: {
        selectors: {
            ".ms-DetailsHeader-cellTitle": {
                fontSize: "0.875rem",
            },
            ".ms-DetailsHeader": {
                padding: "0",
            },
        },
    },
    contentWrapper: {
        selectors: {
            ".ms-DetailsRow": {
                fontSize: "0.875rem",
                selectors: {
                    ":hover .more-button": {
                        display: "inline-block",
                    },
                    ".more-button": {
                        display: "none",
                    },
                    "a:hover": {
                        textDecoration: "underline",
                    },
                },
            },
            ".is-selected .more-button": {
                display: "inline-block",
            },
            ".is-selected a": {
                color: theme.palette.themeDark + " !important",
            },
        },
    },
}) as IDetailsListProps["styles"];

export interface ICustomColumn<T> extends IColumn {
    sortKey?: (item: T) => string | number | Date;
    onRenderDependencies?: string[];
}

/**
 * [Compile-time safety guard: ensure all tables have exactly one row header]
 * This is definitely a column that is the row header.
 */
export interface ICustomColumnWithHeader<T> extends ICustomColumn<T> {
    isRowHeader: true;
}

/**
 * [Compile-time safety guard: ensure all tables have exactly one row header]
 * This is definitely a column that is not a row header.
 */
export interface ICustomColumnWithoutHeader<T> extends ICustomColumn<T> {
    isRowHeader?: false | undefined;
}

/**
 * [Compile-time safety guard: ensure all tables have exactly one row header]
 * Functional detector: [not_row_head*, row_head, not_row_head*]
 */
export type ICustomColumnsList<T> = ExactlyOne<ICustomColumnWithHeader<T>, ICustomColumnWithoutHeader<T>> &
    ICustomColumn<T>[];

export interface ICustomShimmeredDetailsListProp<T> extends Omit<IShimmeredDetailsListProps, "selection"> {
    /** Exactly one column should set the `isRowHeader` as true. */
    columns: ICustomColumnsList<T>;

    contextualMenuProps: IListContextualMenuPartialProps<T>;

    onSelect?: (items: T[]) => void;

    onSorted?: (columnKey: string, isSortedDescending: boolean) => void;

    selectedKeys?: string[];

    isDefaultTopItem?: (item: T) => boolean;
}

function buildColumns<T extends {}>(
    columns: ICustomColumn<T>[],
    contextualMenuProps: IListContextualMenuPartialProps<T>,
    onMoreButtonClick: (eventTarget: EventTarget) => void
) {
    let draftColumns = cloneDeep(columns);
    draftColumns = draftColumns.map(col => {
        if (col.sortKey && col.isResizable) {
            col.columnActionsMode = ColumnActionsMode.hasDropdown;
        }

        return col;
    });

    // columns[0].isRowHeader
    if (contextualMenuProps?.contextMenuContainerColumnKey) {
        const commandButtionColumn = draftColumns?.find((x) => x.key == contextualMenuProps.contextMenuContainerColumnKey);

        if (commandButtionColumn) {
            const { onRender } = commandButtionColumn;
            commandButtionColumn.onRender = (item) => (
                <Stack
                    horizontal
                    styles={{
                        root: {
                            justifyContent: "space-between",
                        },
                    }}
                >
                    <StackItem
                        styles={{
                            root: {
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                            },
                        }}
                    >
                        {onRender(item)}
                    </StackItem>
                    <MoreActionsButton onClick={(e: any) => onMoreButtonClick(e.currentTarget)} className="more-button" />
                </Stack>
            );
        }
    }

    return draftColumns;
}

function CustomShimmeredDetailsListInternal<T>(props: ICustomShimmeredDetailsListProp<T>): JSX.Element {
    const theme = useTheme();
    const [sortedItems, setSortedItems] = useState(props.items);
    const [contextualMenuTarget, setContextualMenuTarget, resetContextualMenuTarget] = useResetState<EventTarget | Event>(
        null
    );

    const [colHeaderContextualMenuProps, setColHeaderContextualMenuProps] = React.useState<IContextualMenuProps | undefined>(undefined);
    const onHideColHeaderContextualMenu = React.useCallback(() => setColHeaderContextualMenuProps(undefined), []);
    const [isResizeDialogHidden, setIsResizeDialogHidden] = React.useState(true);
    const columnToEditRef = React.useRef<ICustomColumn<T> | null>(null);
    const detailsListRef = React.useRef<IDetailsList>(null);

    const resizeDialogContentProps = {
        type: DialogType.normal,
        title: INTL.formatMessage(DetailsListLocalizedFormatMessages.ResizeColumn),
        closeButtonAriaLabel: INTL.formatMessage(DetailsListLocalizedFormatMessages.Cancel),
        subText: INTL.formatMessage(DetailsListLocalizedFormatMessages.EnterDesiredWidth)
    };

    const resizeDialogTextfieldRef = React.useRef<ITextField>(null);

    const [selectionCount, setSelectionCount] = useState(0);
    const [selection] = useState(
        new DetailsListSelection({
            onSelectionChanged: () => {
                onItemsSelectionChanged();
                if (props.onSelect) {
                    props.onSelect(selection.getSelection() as T[]);
                }
            },
            getKey: props.getKey ? props.getKey : defaultGetKey,
        })
    );

    function onItemsSelectionChanged() {
        setSelectionCount(selection?.getSelectedCount());
    }

    const handleResizeColumn = () => {
        const detailsList = detailsListRef.current;
        if (columnToEditRef.current && resizeDialogTextfieldRef.current && detailsList) {
            const width = Number(resizeDialogTextfieldRef.current.value);
            detailsList.updateColumn(columnToEditRef.current, { width });
        }

        resizeDialogTextfieldRef.current = null;
        setIsResizeDialogHidden(true);
    };

    const resizeColumn = (column: ICustomColumn<T>) => {
        columnToEditRef.current = column;
        setIsResizeDialogHidden(false);
    };

    const [columns, setColumns] = useState(
        buildColumns(props.columns, props.contextualMenuProps, setContextualMenuTarget)
    );

    function setTopItems(items: T[]): T[] {
        if (!props.isDefaultTopItem) {
            return items;
        }

        const copiedItems = items.slice(0);
        const toFirst = (list: T[], index: number) => {
            const cur = list[index];
            list.splice(index, 1);
            list.unshift(cur);
            return list;
        };

        copiedItems.forEach((item, index) => {
            props.isDefaultTopItem && props.isDefaultTopItem(item) && toFirst(copiedItems, index);
        });

        return copiedItems;
    }

    function copyAndSort<T>(items: T[], sortMethod: (i: T) => string | number | Date, isSortedDescending?: boolean): T[] {
        return items
            .slice(0)
            .sort((a: T, b: T) => comparatorUtil.compare(sortMethod(a), sortMethod(b)) * (isSortedDescending ? -1 : 1));
    }

    function defaultGetKey(item: any): string {
        return item?.id;
    }

    const getHeaderContextualMenuProps = (ev: React.MouseEvent<HTMLElement>, column: ICustomColumn<T>): IContextualMenuProps => {
        const items = [] as IContextualMenuItem[];

        if (column.isResizable) {
            items.push({
                key: 'resize',
                text: INTL.formatMessage(DetailsListLocalizedFormatMessages.Resize),
                onClick: () => resizeColumn(column)
            })
        }

        if (column.sortKey) {
            items.push({
                key: 'sort',
                text: INTL.formatMessage(DetailsListLocalizedFormatMessages.Sort),
                onClick: () => sortColumn(column)
            });
        }

        if (items.length) {
            return {
                items: items,
                target: ev.currentTarget as HTMLElement,
                gapSpace: 10,
                isBeakVisible: true,
                onDismiss: onHideColHeaderContextualMenu,
            };
        }

        return null;
    };

    const sortColumn = (targetColumn: ICustomColumn<T>) => {
        let isSortedDescending = targetColumn.isSortedDescending === true;

        if (targetColumn.isSorted) {
            isSortedDescending = !isSortedDescending;
        }

        updateItemsAndCol(sortedItems, targetColumn.key, isSortedDescending, targetColumn.sortKey);

        if (props.onSorted) {
            props.onSorted(targetColumn.key, isSortedDescending);
        }
    }

    const onColumnClick = (event: React.MouseEvent<HTMLElement>, column: IColumn): void => {
        const targetColumn: ICustomColumn<T> = columns.find((c) => c.key == column.key);

        if (!targetColumn) {
            return;
        }

        if (targetColumn.columnActionsMode !== ColumnActionsMode.disabled) {
            setColHeaderContextualMenuProps(getHeaderContextualMenuProps(event, targetColumn));
        }
    };

    const onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (props, defaultRender) => {
        if (!props) {
            return null;
        }
        const onRenderColumnHeaderTooltip: IRenderFunction<IDetailsColumnRenderTooltipProps> = (tooltipHostProps) => (
            <TooltipHost {...tooltipHostProps} />
        );
        return (
            <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced>
                {defaultRender?.({
                    ...props,
                    onRenderColumnHeaderTooltip,
                })}
            </Sticky>
        );
    };

    const updateItemsAndCol = (
        items: any[],
        colKey: string,
        isSortedDescending: boolean,
        sortKey?: (item: any) => string | number | Date
    ) => {
        setSortedItems(copyAndSort<T>(items, sortKey, isSortedDescending));
        columns.forEach((c) => {
            c.isSorted = c.key === colKey;
            c.isSortedDescending = c.isSorted ? isSortedDescending : undefined;
        });
    };

    /**
     * This hidden element is used to announce a table status update upon user
     * click of an existing column, sorting the table by a new way. It uses a
     * hidden ARIA live region to announce the update.
     * @returns an element with minimum possible height and 0% opacity
     */
    function ariaTableSortingOrderAnnouncer(): JSX.Element {
        // parse whichever sorted column into narration
        let narration = INTL.formatMessage(DetailsListLocalizedFormatMessages.TableNotSorted);
        for (const col of columns)
            if (col.isSorted) {
                if (col.isSortedDescending === true)
                    narration = INTL.formatMessage(DetailsListLocalizedFormatMessages.CommonCustomShimmeredDetailsListSortedByInDesc, {
                        [FormatMessagePlaceholder]: col.name,
                    });
                else if (col.isSortedDescending === false)
                    narration = INTL.formatMessage(DetailsListLocalizedFormatMessages.CommonCustomShimmeredDetailsListSortedByInAsc, {
                        [FormatMessagePlaceholder]: col.name,
                    });
            }
        // assemble hidden widget
        const style: CSSProperties = {
            color: "#000000",
            fontSize: "1px",
            fontWeight: 100,
            maxHeight: "0px",
            overflow: "hidden",
        };
        return (
            <div className="shimmered-detail-list-aria" aria-live="assertive" aria-atomic={true} style={style}>
                {narration}
            </div>
        );
    }

    useEffect(() => {
        if (props.selectedKeys) {
            // selection will be changed exactly as is requested in [selectedKeys]
            props.selectedKeys.forEach((k) => selection.setKeySelected(k, true, false));
            for (const item of sortedItems) {
                const k = (props.getKey ?? defaultGetKey)(item);
                if (!props.selectedKeys.includes(k)) selection.setKeySelected(k, false, false);
            }
        }
    }, [props.selectedKeys]);

    useEffect(() => {
        const sortedColumn = columns.find((c) => c.isSorted);

        if (sortedColumn) {
            updateItemsAndCol(props.items, sortedColumn.key, sortedColumn.isSortedDescending, sortedColumn.sortKey);
        } else {
            setSortedItems(setTopItems(props.items));
        }
    }, [JSON.stringify(props.items.map((i) => JSON.stringify(i)).sort((a, b) => (a > b ? 1 : -1)))]);

    useEffect(() => {
        if (props.columns) {
            const modifiedColumns = buildColumns(props.columns, props.contextualMenuProps, setContextualMenuTarget);
            for (let i = 0; i < modifiedColumns.length; i++) {
                columns.forEach((c) => {
                    if (c.key == modifiedColumns[i].key) {
                        const { name, onRender } = modifiedColumns[i];
                        modifiedColumns[i] = c;
                        modifiedColumns[i].name = name;
                        modifiedColumns[i].onRender = onRender;
                    }
                });
            }
            setColumns(modifiedColumns);
        }
    }, [
        JSON.stringify(props.columns.map((column: any) => [column.name, column.key, column.onRenderDependencies].toString())),
    ]);

    return (
        <>
            <Announced
                message={INTL.formatMessage(DetailsListLocalizedFormatMessages.CountSelected, {
                    [FormatMessagePlaceholder]: selectionCount,
                })}
            />
            {ariaTableSortingOrderAnnouncer()}
            <ShimmeredDetailsList
                ariaLabel="list"
                ariaLabelForSelectionColumn={INTL.formatMessage(DetailsListLocalizedFormatMessages.ToggleSelection)}
                ariaLabelForSelectAllCheckbox={INTL.formatMessage(DetailsListLocalizedFormatMessages.ToggleSelectionForAllItems)}
                checkButtonAriaLabel={INTL.formatMessage(DetailsListLocalizedFormatMessages.SelectRow)}
                {...props}
                items={sortedItems}
                componentRef={detailsListRef}
                columns={columns}
                setKey="set"
                selection={selection}
                onColumnHeaderClick={onColumnClick}
                selectionPreservedOnEmptyClick={props.selectionPreservedOnEmptyClick ?? true}
                getKey={props.getKey ?? defaultGetKey}
                detailsListStyles={props.detailsListStyles ?? defaultDetailsListStyles(theme)}
                onItemContextMenu={
                    props.contextualMenuProps?.enableItemContextMenu && ((item, i, e) => setContextualMenuTarget(e))
                }
                onRenderDetailsHeader={onRenderDetailsHeader}
            />
            <ListContextualMenu<T>
                contextualMenuProps={props.contextualMenuProps}
                selection={selection.getSelection()}
                eventTarget={contextualMenuTarget}
                onDismiss={resetContextualMenuTarget}
            />

            {colHeaderContextualMenuProps && <ContextualMenu {...colHeaderContextualMenuProps} />}
            
            <Dialog
                hidden={isResizeDialogHidden}
                dialogContentProps={resizeDialogContentProps}
                onDismiss={() => setIsResizeDialogHidden(true)}
                modalProps={{
                    isBlocking: false,
                    titleAriaId: 'Dialog',
                    subtitleAriaId: 'DialogSub',
                    styles: { main: { maxWidth: 450 } }
                }}>
                <TextField type="number" componentRef={resizeDialogTextfieldRef} ariaLabel={INTL.formatMessage(DetailsListLocalizedFormatMessages.EnterDesiredWidth)} />
                <DialogFooter>
                    <PrimaryButton onClick={handleResizeColumn} text={INTL.formatMessage(DetailsListLocalizedFormatMessages.Resize)} />
                    <DefaultButton onClick={() => setIsResizeDialogHidden(true)} text={INTL.formatMessage(DetailsListLocalizedFormatMessages.Cancel)} />
                </DialogFooter>
            </Dialog>
        </>
    );
}

export const CustomShimmeredDetailsList = withLocalization(initializeComponent(CustomShimmeredDetailsListInternal)) as <T>(props: ICustomShimmeredDetailsListProp<T>) => React.ReactElement<ICustomShimmeredDetailsListProp<T>>;