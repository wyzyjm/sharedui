import * as React from "react";
import { Link, ILinkProps, Panel, PanelType, Stack } from "@fluentui/react";
import { useState, useEffect } from "react";
import { INTL } from "../../../util/intlUtil";
import { HelpLocalizationFormatMessages } from "../../../clientResources";
import { initializeComponent, useLocalization, withLocalization } from "../../../services/localization";
import styled from "styled-components";

export type LinkPropsExt = ILinkProps & { displayText: string }

export interface IHelpAreaProps {
    helpBody: JSX.Element;
    headerText: string;
    isOpen?: boolean | true;
    onClose: () => void;
    helpItems: LinkPropsExt[];
    footerItems: LinkPropsExt[];
};

const StyledStack = styled(Stack)`
    .ms-Stack-inner{
        margin-left: 5px !important;
    }
`;

const HelpAreaInternal = (props: IHelpAreaProps) => {
    const { onClose, isOpen, headerText } = props;
    const [isPanelOpen, setIsPanelOpen] = useState(isOpen);
    useEffect(() => {
        setIsPanelOpen(isOpen)
    }, [isOpen])
    function onDismiss() {
        setIsPanelOpen(false);
        onClose?.();
    }

    const onRenderFooterContent = () => (
        <Stack wrap horizontal horizontalAlign={"space-between"}>
            {
                props.footerItems.map((item: LinkPropsExt, index: any) => {
                    const { displayText, ...linkProps } = item;
                    return (
                        <StyledStack wrap horizontal horizontalAlign={"space-between"} tokens={{ childrenGap: 11 }} key={displayText}>
                            <Stack.Item>
                                <Link {...linkProps}>{displayText}</Link>
                            </Stack.Item>
                            <Stack.Item>
                                {index !== (props.footerItems.length - 1) && (
                                    <Stack.Item>
                                        |
                                    </Stack.Item>
                                )}
                            </Stack.Item>
                        </StyledStack>
                    );
                })
            }
        </Stack>
    )

    return (
        <Panel
            isOpen={isPanelOpen}
            role="dialog"
            aria-labelledby="Help"
            onDismiss={onDismiss}
            closeButtonAriaLabel={INTL.formatMessage(HelpLocalizationFormatMessages.Close)}
            type={PanelType.custom}
            customWidth={"380px"}
            style={{ top: "40px" }}
            isLightDismiss
            headerText={headerText || ""}
            headerTextProps={{ 'aria-level': 2 }}
            onRenderFooterContent={onRenderFooterContent}
            isFooterAtBottom={true}
        >
            <Stack style={{ marginTop: 10 }}>
                <Stack tokens={{ childrenGap: 5 }}>
                    {
                        props.helpItems.map((item: LinkPropsExt) => {
                            const { displayText, ...linkProps } = item;
                            return (
                                <Stack.Item key={displayText}>
                                    <Link {...linkProps}>{displayText}</Link>
                                </Stack.Item>
                            );
                        })
                    }
                </Stack>
                <Stack.Item>
                    {props.helpBody}
                </Stack.Item>
            </Stack>
        </Panel>
    );
};

export const HelpArea = withLocalization(initializeComponent(HelpAreaInternal));