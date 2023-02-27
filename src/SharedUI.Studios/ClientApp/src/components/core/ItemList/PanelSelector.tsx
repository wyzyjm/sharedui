import { Announced, Checkbox, IColumn, IconButton, IIconProps, Stack } from "@fluentui/react";
import { useState } from "react";
import styled from "styled-components";
import { PanelSelectorLocalizationFormatMessages } from "../../../clientResources";
import { initializeComponent, withLocalization } from "../../../services/localization";
import { INTL } from "../../../util/intlUtil";

export interface IPanelSelectorProps {
    tableColumns?: IColumn[];
    onChange?: (arg: Object) => void;
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
    const [move, setMove] = useState(0);
    let draftColumns = props.tableColumns;
    const [columns, setColumns] = useState(draftColumns);
    const [announced, setAnnounced] = useState<JSX.Element | undefined>(undefined);
    const upIcon: IIconProps = { iconName: "Up" };
    const downIcon: IIconProps = { iconName: "Down" };

    function handleMoveUp(index: number) {
        if (index > 0) {
            let toggleColumnUp = columns[index];
            columns[index] = columns[index - 1];
            columns[index - 1] = toggleColumnUp;
            setColumns(columns);
            setMove(v => v + 1);
            setAnnounced(<Announced message={INTL.formatMessage(PanelSelectorLocalizationFormatMessages.MoveUpColumnsUpdate)} />);
        }
    }

    function handleMoveDown(index: number) {
        if (index < props.tableColumns.length - 1) {
            let toggleColumnDown = columns[index];
            columns[index] = columns[index + 1];
            columns[index + 1] = toggleColumnDown;
            setColumns(columns);
            setMove(v => v + 1);
            setAnnounced(<Announced message={INTL.formatMessage(PanelSelectorLocalizationFormatMessages.MoveDownColumnsUpdate)} />);
        }
    }

    function handleChange(item: any, isChecked?: boolean, ev?: React.FormEvent<HTMLElement | HTMLInputElement>) {
        item.isHiddenFromColumnSelector = !isChecked;
        setColumns(columns);
        props.onChange(columns);
        setMove(v => v + 1);
    }

    return (
        <>{props.isOpen &&
            <div>
                {announced}
                {props.tableColumns.map((item: any, index: number) => (
                    <StyledCSColumnsMainDiv>
                        <StyledCSColumnsStack horizontal>
                            <Checkbox label={item.name} title={item.name} checked={!item.isHiddenFromColumnSelector} onChange={(ev, isChecked) => handleChange(item, isChecked, ev)} />
                            <StyledCSIconsDiv className="icons-div">
                                <StyledCSMoveUpIconButton iconProps={upIcon} title="Move Up" ariaLabel={INTL.formatMessage(PanelSelectorLocalizationFormatMessages.MoveUp)} onClick={ev => handleMoveUp(index)} />
                                <StyledCSMoveDownIconButton iconProps={downIcon} title="Move Down" ariaLabel={INTL.formatMessage(PanelSelectorLocalizationFormatMessages.MoveDown)} onClick={ev => handleMoveDown(index)} />
                            </StyledCSIconsDiv>
                        </StyledCSColumnsStack>
                    </StyledCSColumnsMainDiv>
                ))}

            </div>}
        </>
    )
};

export const PanelSelector = withLocalization(initializeComponent(PanelSelectorInternal));