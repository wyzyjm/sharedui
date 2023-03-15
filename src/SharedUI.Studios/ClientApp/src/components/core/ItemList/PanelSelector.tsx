import { Announced, Checkbox, IColumn, IconButton, IIconProps, Stack } from "@fluentui/react";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PanelSelectorLocalizationFormatMessages } from "../../../clientResources";
import { initializeComponent, withLocalization } from "../../../services/localization";
import { INTL } from "../../../util/intlUtil";

export interface IColumnSelectorItem {
    name: string;
    key: string;
    isItemUnselected: boolean;
}

export interface IPanelSelectorProps {
    tableColumns?: IColumnSelectorItem[];
    onChange?: (arg: IColumnSelectorItem[]) => void;
    isOpen?: boolean | true;
};

const StyledCSColumnsMainDiv = styled.div`
        width: 240px;
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
        height: 32px;
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

function PanelSelectorInternal(props: IPanelSelectorProps): JSX.Element {
    const upIcon: IIconProps = { iconName: "Up" };
    const downIcon: IIconProps = { iconName: "Down" };

    const [isColumnVisible, setIsColumnVisible] = useState<{ [id: string]: boolean }>({});
    const [columns, setColumns] = useState<IColumnSelectorItem[]>(cloneDeep(props.tableColumns));
    const [announced, setAnnounced] = useState<JSX.Element | undefined>(undefined);

    useEffect(() => {
        setColumns(cloneDeep(props.tableColumns));
    }, [props.tableColumns]);

    const handleMoveUp = (index: number) => {
        if (index > 0) {
            let toggleColumnUp = columns[index];
            columns[index] = columns[index - 1];
            columns[index - 1] = toggleColumnUp;
            setColumns(cloneDeep(columns));
            props.onChange(columns);
            setAnnounced(<Announced message={INTL.formatMessage(PanelSelectorLocalizationFormatMessages.MoveUpColumnsUpdate)} />);
        }
    };

    const handleMoveDown = (index: number) => {
        if (index < columns.length - 1) {
            let toggleColumnDown = columns[index];
            columns[index] = columns[index + 1];
            columns[index + 1] = toggleColumnDown;
            setColumns(cloneDeep(columns));
            props.onChange(columns);
            setAnnounced(<Announced message={INTL.formatMessage(PanelSelectorLocalizationFormatMessages.MoveDownColumnsUpdate)} />);
        }
    };

    const handleChange = (item: IColumnSelectorItem, isChecked?: boolean) => {
        item.isItemUnselected = !isChecked;
        setColumns(cloneDeep(columns));
        props.onChange(columns);
    };

    return (
        <>{props.isOpen &&
            <div>
                {announced}
                {columns.map((item: IColumnSelectorItem, index: number) => (
                    (isColumnVisible[item.key] !== false) &&
                    (<StyledCSColumnsMainDiv>
                        <StyledCSColumnsStack horizontal>
                            <Checkbox label={item.name} title={item.name} checked={!item.isItemUnselected} onChange={(ev, isChecked) => handleChange(item, isChecked)} />
                            <StyledCSIconsDiv className="icons-div">
                                <StyledCSMoveUpIconButton iconProps={upIcon} title="Move Up" ariaLabel={INTL.formatMessage(PanelSelectorLocalizationFormatMessages.MoveUp)} onClick={ev => handleMoveUp(index)} />
                                <StyledCSMoveDownIconButton iconProps={downIcon} title="Move Down" ariaLabel={INTL.formatMessage(PanelSelectorLocalizationFormatMessages.MoveDown)} onClick={ev => handleMoveDown(index)} />
                            </StyledCSIconsDiv>
                        </StyledCSColumnsStack>
                    </StyledCSColumnsMainDiv>)
                ))}
            </div>
        }</>
    )
};

export const PanelSelector = withLocalization(initializeComponent(PanelSelectorInternal));