import { Stack, Checkbox } from "@fluentui/react";
import { useCallback, useState } from "react";
import styled from "styled-components";

const StyledContainer = styled(Stack)`
    width: 100%;
    .crw-checkbox {
        margin-top: 15px;
    }
`;
export interface IAdditionalTermsStepProps {
    title: string;
    content: JSX.Element;
    confirmationMessage: string;
    onChangeConfirmationMessageSelection: (status: boolean) => void;
}

export const AdditionalTermsStep = (props: IAdditionalTermsStepProps) => {
    const [checkState, setCheckState] = useState(false);

    const onChange = useCallback(
        (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean): void => {
            setCheckState(!!checked);
            props.onChangeConfirmationMessageSelection(checked)
        },
        [],
    );

    return (<StyledContainer>
        {props.content}
        <Checkbox
            disabled={false}
            name={props.title}
            checked={checkState}
            defaultChecked={false}
            className="crw-checkbox"
            label={props.confirmationMessage}
            onChange={onChange}
        />
    </StyledContainer>)
};