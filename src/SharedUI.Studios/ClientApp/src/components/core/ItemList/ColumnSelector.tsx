import { Announced, Checkbox, DefaultButton, IColumn, IconButton, IIconProps, Panel, PanelType, PrimaryButton, SearchBox, Stack } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { initializeComponent, withLocalization } from "../../../services/localization";
import styled from "styled-components";
import { INTL } from "../../../util/intlUtil";
import { ColumnSelectorLocalizationFormatMessages } from "../../../clientResources";
import { cloneDeep } from "lodash";
export interface IColumnSelectorItem {
    name: string;
    key: string;
    isItemUnselected: boolean;
}

export interface IColumnSelectorProps {
    tableColumns?: IColumnSelectorItem[];
    onChange?: (arg: IColumnSelectorItem[]) => void;
    isOpen?: boolean | true;
    onCloseColumnSelector?: () => void;
};

const StyledCSContentDiv = styled.div`
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #000000;
        margin-top: 18px;
`;

const StyledCSSearchBox = styled(SearchBox)`
        margin-top: 16px;
        box-sizing: border-box;
        height: 32px;
        border: 1px solid #605E5C;
        border-radius: 2px;
`;

const StyledCSColumnsMainDiv = styled.div`
        margin-top: 16px;
`;

const StyledCSColumnsStack = styled(Stack)`
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        gap: 25px;
        isolation: isolate;
        height: 40px;
        border: 1px solid #F5F5F5;
        border-radius: 4px;
        :hover{
            background: #F3F2F1;
            .icons-div{
                visibility: visible;
            }
        }
`;

const StyledCSIconsDiv = styled.div`
        margin-right: 8px;
        // visibility: hidden;
        :focus{
            visibility: visible;
        }
`;

const StyledCSMoveUpIconButton = styled(IconButton)`
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0px;
        width: 24px;
        height: 24px;
        background: #FFFFFF;
        border: 1px solid #D1D1D1;
        border-radius: 4px;
        margin-right: 8px;
        .ms-Icon {
            color: #242424;
        }
`;

const StyledCSMoveDownIconButton = styled(IconButton)`
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0px;
        width: 24px;
        height: 24px;
        background: #FFFFFF;
        border: 1px solid #D1D1D1;
        border-radius: 4px;
        .ms-Icon {
            color: #242424;
        }
`;

function ColumnSelectorInternal(props: IColumnSelectorProps): JSX.Element {
    const upIcon: IIconProps = { iconName: "Up" };
    const downIcon: IIconProps = { iconName: "Down" };
    const buttonStyles = { root: { marginRight: 8 } };

    const [isColumnVisible, setIsColumnVisible] = useState<{[ id: string]: boolean}>({});
    const [columns, setColumns] = useState<IColumnSelectorItem[]>(cloneDeep(props.tableColumns));
    const [announced, setAnnounced] = useState<JSX.Element | undefined>(undefined);
    const [isPanelOpen, setIsPanelOpen] = useState(props.isOpen);
    const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(true);

    useEffect(() => {
        setIsPanelOpen(props.isOpen);
    }, [props.isOpen]);

    useEffect(() => {
        setColumns(cloneDeep(props.tableColumns));
    }, [props.tableColumns]);

    useEffect(() => {
        setIsSaveBtnDisabled(JSON.stringify(props.tableColumns) === JSON.stringify(columns));
    }, [columns]);

    const onRenderFooterContent = () => (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <PrimaryButton onClick={handleSave} styles={buttonStyles} disabled={isSaveBtnDisabled}>
                {INTL.formatMessage(ColumnSelectorLocalizationFormatMessages.Save)}
            </PrimaryButton>
            <DefaultButton onClick={onDismiss}>
                {INTL.formatMessage(ColumnSelectorLocalizationFormatMessages.Cancel)}
            </DefaultButton>
        </div>
    );

    const handleMoveUp = (index: number) => {
        if (index > 0) {
            let toggleColumnUp = columns[index];
            columns[index] = columns[index - 1];
            columns[index - 1] = toggleColumnUp;
            setColumns(cloneDeep(columns));
            setAnnounced(<Announced message={INTL.formatMessage(ColumnSelectorLocalizationFormatMessages.MoveUpColumnsUpdate)} />);
        }
    };

    const handleMoveDown = (index: number) => {
        if (index < columns.length - 1) {
            let toggleColumnDown = columns[index];
            columns[index] = columns[index + 1];
            columns[index + 1] = toggleColumnDown;
            setColumns(cloneDeep(columns));
            setAnnounced(<Announced message={INTL.formatMessage(ColumnSelectorLocalizationFormatMessages.MoveDownColumnsUpdate)} />);
        }
    };

    const handleChange = (item: IColumnSelectorItem, isChecked?: boolean) => {
        item.isItemUnselected = !isChecked;
        setColumns(cloneDeep(columns));
    };

    const handleSearchChange = (event?: React.ChangeEvent<HTMLInputElement>, newValue?: string) => {
        const isColumnPresentInSearch = (column: IColumnSelectorItem) => {
            return column.name.toLowerCase().startsWith(newValue.toLowerCase()) || column.name.toLowerCase().includes(newValue.toLowerCase());
        };

        const isColumnVisibleMap: {[id: string]: boolean} = {};
        columns.forEach(col => {
            isColumnVisibleMap[col.key] = isColumnPresentInSearch(col);
        });

        setIsColumnVisible(isColumnVisibleMap);
        setAnnounced(<Announced message={INTL.formatMessage(ColumnSelectorLocalizationFormatMessages.SearchColumnsUpdate)} />);
    };

    const handleSave = () => {
        props.onChange(columns);
        onDismiss();
    };

    const onDismiss = () => {
        setIsPanelOpen(false);
        props.onCloseColumnSelector();
    };

    return (
        <div className="column-selector">
            <Panel
                headerText={INTL.formatMessage(ColumnSelectorLocalizationFormatMessages.EditColumns)}
                headerTextProps={{ 'aria-level': 2 }}
                type={PanelType.custom}
                customWidth={"380px"}
                style={{ top: "40px" }}
                isBlocking={false}
                isOpen={isPanelOpen}
                onDismiss={onDismiss}
                closeButtonAriaLabel={INTL.formatMessage(ColumnSelectorLocalizationFormatMessages.Close)}
                onRenderFooterContent={onRenderFooterContent}
                isFooterAtBottom={true}
            >
                <div>
                    <StyledCSContentDiv>
                        {INTL.formatMessage(ColumnSelectorLocalizationFormatMessages.Content)}
                    </StyledCSContentDiv>
                    <StyledCSSearchBox placeholder="Filter by name" onChange={handleSearchChange} />
                    {announced}
                    { 
                        columns.map((item: IColumnSelectorItem, index: number) => (
                            (isColumnVisible[item.key] !== false) &&
                                (<StyledCSColumnsMainDiv key={item.key}>
                                    <StyledCSColumnsStack horizontal>
                                        <Checkbox label={item.name} title={item.name} checked={!item.isItemUnselected} onChange={(ev, isChecked) => handleChange(item, isChecked)} />
                                        <StyledCSIconsDiv className="icons-div">
                                            <StyledCSMoveUpIconButton iconProps={upIcon} title="Move Up" ariaLabel={INTL.formatMessage(ColumnSelectorLocalizationFormatMessages.MoveUp)} onClick={ev => handleMoveUp(index)} />
                                            <StyledCSMoveDownIconButton iconProps={downIcon} title="Move Down" ariaLabel={INTL.formatMessage(ColumnSelectorLocalizationFormatMessages.MoveDown)} onClick={ev => handleMoveDown(index)} />
                                        </StyledCSIconsDiv>
                                    </StyledCSColumnsStack>
                                </StyledCSColumnsMainDiv>)
                        ))
                    }
                </div>
            </Panel>
        </div>
    );
};

export const ColumnSelector = withLocalization(initializeComponent(ColumnSelectorInternal));