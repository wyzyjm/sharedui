import { Stack, Checkbox } from "@fluentui/react";
import styled from "styled-components";

const StyledContainer = styled(Stack)`
    width: 100%;
    .crw-checkbox {
        margin-top: 15px;
    }
`;
export interface IAdditionalTermsStepProps {
    kind: 'AdditionalTermsStep';
    title: string;
    content: JSX.Element;
    confirmationMessage: string;
    onChangeConfirmationMessageSelection: (status: boolean) => void;
}

export const AdditionalTermsStep = (props: IAdditionalTermsStepProps) => (
    <StyledContainer>
        {props.content}
        <Checkbox
            disabled={false}
            name={props.title}
            defaultChecked={false}
            className="crw-checkbox"
            label={props.confirmationMessage}
            onChange={(_, value) => props.onChangeConfirmationMessageSelection(value)}
        />
    </StyledContainer>
);