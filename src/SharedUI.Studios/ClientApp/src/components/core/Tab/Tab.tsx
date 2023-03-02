import { ReactNode, useState } from "react";
import {
    Stack,
    ScrollablePane,
    Pivot,
    PivotItem,
} from "@fluentui/react";
import { SelectResourceTab as SelectResourceView, ISelectResourceTabProps } from '../SelectResourceTab/SelectResourceTab'
import { SelectDirectoryTab as SelectDirectoryView, ISelectDirectoryTabProps } from '../Directory/Directory'
import { initializeComponent, withLocalization } from "../../../services/localization";
import { INTL } from "../../../util/intlUtil";
import { TabLocalizationFormatMessages } from "../../../clientResources";

export const settingItemKeys: {
    directoryItemKey: string;
    subscriptionItemKeys: string;
    generalItemKey: string;
} = {
    directoryItemKey: "0",
    subscriptionItemKeys: '1',
    generalItemKey: "2",
};

export interface ITabProps {
    defaultSelectedItemKey?: string;
    generalDom?: ReactNode;
    onTabClick?: (item?: PivotItem) => void;
    directoryProps: ISelectDirectoryTabProps;
    resourceProps: ISelectResourceTabProps;
}

const TabInternal = (props: ITabProps): JSX.Element => {
    const { defaultSelectedItemKey, generalDom, onTabClick } = props
    const [currentItemKey, setCurrentItemKey] = useState(() => defaultSelectedItemKey ? defaultSelectedItemKey : '0');

    const onPivotClick = (item: PivotItem) => {
        setCurrentItemKey(item.props.itemKey);
        onTabClick?.(item)
    }
    return (
        <Stack grow style={{ height: "100%" }}>
            <Pivot
                linkSize={"large"}
                defaultSelectedKey={currentItemKey}
                styles={{ linkIsSelected: { "::before": { left: 0, right: 0 } } }}
                headersOnly
                onLinkClick={onPivotClick}
            >
                <PivotItem itemKey={settingItemKeys.directoryItemKey} headerText={INTL.formatMessage(TabLocalizationFormatMessages.Directory)} />
                <PivotItem itemKey={settingItemKeys.subscriptionItemKeys} headerText={INTL.formatMessage(TabLocalizationFormatMessages.Resource)} />
                {generalDom && <PivotItem itemKey={settingItemKeys.generalItemKey} headerText={INTL.formatMessage(TabLocalizationFormatMessages.General)} />}
            </Pivot>
            <Stack.Item grow>
                <ScrollablePane styles={{ root: { position: "relative", width: "100%", height: "100%", minHeight: 120 }, contentContainer: { display: 'flex' } }} >
                    {currentItemKey === settingItemKeys.directoryItemKey && <SelectDirectoryView {...props.directoryProps} />}
                    {currentItemKey === settingItemKeys.subscriptionItemKeys && <SelectResourceView   {...props.resourceProps} />}
                    {currentItemKey === settingItemKeys.generalItemKey && generalDom}
                </ScrollablePane>
            </Stack.Item>
        </Stack>
    )
}
export const Tab = withLocalization(initializeComponent(TabInternal));
