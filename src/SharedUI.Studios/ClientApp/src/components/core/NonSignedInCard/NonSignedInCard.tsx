import { ReactNode } from "react";
import styled from "styled-components";
import { TeachingBubble as Bubble, DirectionalHint } from "@fluentui/react";
import { INTL } from "../../../util/intlUtil";
import { urlLinks } from "../../../util/urlLinks";
import { NonSignedInCardLocalizationFormatMessages } from "../../../clientResources";
import { initializeComponent, withLocalization } from "../../../services/localization";


export interface INonSignedInCardProps {
    isVisible: boolean;
    targetButtonId: string;
    title: string;
    exploreDescription: ReactNode;
    onDismiss: () => void;
    onClickLearnMore: () => void;
    onClickSignUp: () => void;
}

const StyledDiv = styled.div`
    a {
        color: white;
        font-weight: bold;
        margin: 0 4px;
        text-decoration: none;

        &:hover {
            color: white;
            text-decoration: underline;
        }
    }
`
const NonSignedInCardInternal = (props: INonSignedInCardProps): JSX.Element => {
    const preventTeachingBuble = (ev: Event | React.FocusEvent<Element> | React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => {
        return true;
    };
    return (
        <>
            {props.isVisible && <Bubble
                target={props.targetButtonId}
                headline={props.title}
                isWide
                onDismiss={props.onDismiss}
                calloutProps={{
                    directionalHint: DirectionalHint.bottomAutoEdge,
                    preventDismissOnEvent: preventTeachingBuble,
                    doNotLayer: false
                }}
                hasCloseButton={true}
                secondaryButtonProps={{
                    text: INTL.formatMessage(NonSignedInCardLocalizationFormatMessages.SignUpAndGetFreeAzureCredit),
                    href: urlLinks.createAzureAccount(),
                    onClick: props.onClickSignUp
                }}
                styles={{ footer: { justifyContent: "center" } }}
            >
                <StyledDiv>
                    {props.exploreDescription}
                    <p>
                        {INTL.formatMessage(NonSignedInCardLocalizationFormatMessages.DontHaveAzureAccount)}
                        <a href={urlLinks.createAzureAccount()}>{INTL.formatMessage(NonSignedInCardLocalizationFormatMessages.CreateOneLink)}</a>
                        {INTL.formatMessage(NonSignedInCardLocalizationFormatMessages.or)}
                        <a onClick={props.onClickLearnMore} href={urlLinks.learnMoreCreatingAzureAccount()}>
                            {INTL.formatMessage(NonSignedInCardLocalizationFormatMessages.howToCreateAccountLink)}
                        </a>
                    </p>
                </StyledDiv>

            </Bubble>}
        </>
    )
}
export const NonSignedInCard = withLocalization(initializeComponent(NonSignedInCardInternal));
