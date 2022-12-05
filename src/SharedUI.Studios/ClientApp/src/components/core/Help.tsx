import * as React from "react";
import { Panel, PanelType, Stack } from "@fluentui/react";
import { useState } from "react";
import { Link, LinkProps } from "./Link";

export interface IHelpAreaProps {
    helpBody: JSX.Element;
    headerText: string;
    isOpen?: boolean | true;
    onClose: () => void;
    helpItems: LinkProps[];
    footerItems: LinkProps[];
}
export const HelpArea = (props: IHelpAreaProps) => {
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
                                displayText={item.displayText}
                                openInANewWindow={true}
                            ></Link>
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
            onDismiss={onDismiss}
            closeButtonAriaLabel="Close"
            type={PanelType.custom}
            customWidth={"380px"}
            style={{ top: "40px" }}
            styles={{ content: { overflow: "auto" } }}
            isLightDismiss
            headerText={headerText || ""}
            onRenderFooterContent={onRenderFooterContent}
            isFooterAtBottom={true}
        >
            <Stack style={{ marginTop: 10 }}>
                <Stack tokens={{ childrenGap: 5 }}>
                    {props.helpItems.map((item: any) => (
                        <Stack.Item >
                            <Link
                                href={item.href}
                                displayText={item.displayText}
                                openInANewWindow={true}
                            ></Link>
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
