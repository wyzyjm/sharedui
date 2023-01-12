import * as React from "react";
import { Link, ILinkProps, Panel, PanelType, Stack } from "@fluentui/react";
import { useState } from "react";
import "../core.scss";
import { INTL } from "../../../util/intlUtil";
import { HelpLocalizationFormatMessages } from "../../../clientResources";
import { initializeComponent, useLocalization, withLocalization } from "../../../services/localization";

export interface IHelpAreaProps {
    helpBody: JSX.Element;
    headerText: string;
    isOpen?: boolean | true;
    onClose: () => void;
    helpItems: ILinkProps[];
    footerItems: ILinkProps[];
};

const HelpAreaInternal = (props: IHelpAreaProps) => {
    const { onClose, isOpen, headerText } = props;
    const [isPanelOpen, setIsPanelOpen] = useState(isOpen);

    function onDismiss() {
        setIsPanelOpen(false);
        onClose?.();
    }

    const onRenderFooterContent = React.useCallback(
        () => (
            <Stack wrap horizontal horizontalAlign={"space-between"}>
                {props.footerItems.map((item: any, index: any) => (
                    <Stack wrap horizontal horizontalAlign={"space-between"} tokens={{ childrenGap: 15 }}>
                        <Stack.Item>
                            <Link
                                href={item.href}
                                target='_blank'
                            >
                                {item.displayText}
                            </Link>
                        </Stack.Item>
                        <Stack.Item>
                            {index != (props.footerItems.length - 1) && (
                                <Stack.Item>
                                    |
                                </Stack.Item>
                            )}
                        </Stack.Item>
                    </Stack>
                ))}
            </Stack>
        ),
        []
    );

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
                    {props.helpItems.map((item: any) => (
                        <Stack.Item >
                            <Link
                                href={item.href}
                                target='_blank'
                            >
                                {item.displayText}
                            </Link>
                        </Stack.Item>
                    ))}
                </Stack>
                <Stack.Item>
                    {props.helpBody}
                </Stack.Item>
            </Stack>
        </Panel>
    );
};

export const HelpArea = withLocalization(initializeComponent(HelpAreaInternal));