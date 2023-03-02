import { useState } from 'react'
import {
    Link as FabricLink,
    SearchBox,
    ISearchBoxStyles,
    ScrollablePane,
    Stack,
    Text,
    SelectionMode,
    DetailsListLayoutMode,
    ConstrainMode,
    PrimaryButton
} from "@fluentui/react";
import _ from "lodash";
import { DirectoryLocalizationFormatMessages } from "../../../clientResources";
import { CustomShimmeredDetailsList, ICustomColumnsList } from "../ItemList/ItemList";
import { INTL } from "../../../util/intlUtil";
import { urlLinks } from '../../../util/urlLinks'
import { TenantInformation } from '../../../models'
import { ThemedExternalLinkIcon } from '../Icons'
import { initializeComponent, withLocalization } from "../../../services/localization";

import styled from "styled-components";

const StyledStack = styled(Stack)`
    div.detailsList-Row-Hover {
        .hover-show {
            display: none;
        }

        &:hover,
        .ms-DetailsRow.is-selected {
            .hover-show {
            display: initial;
            }
        }
    }
`;
export interface ISelectDirectoryTabProps {
    selectedTenant: TenantInformation;
    tenants: TenantInformation[];
    onChangeDirectory: (selectedTenant: TenantInformation) => void;
    LearnMoreAboutAzureDirectoriesLink: string;
}

export const DirectoryInternal = (props: ISelectDirectoryTabProps): JSX.Element => {
    const { selectedTenant: tenant, tenants, onChangeDirectory, LearnMoreAboutAzureDirectoriesLink } = props
    const [selectedTenant, setSelectedTenant] = useState(tenant);
    const [searchTenantName, setSearchTenantName] = useState("");

    function canSwitchDirectory(): boolean {
        return selectedTenant && (!tenant || tenant.tenantId !== selectedTenant.tenantId);
    }
    const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200, } };
    const allDirectoriesSchema: ICustomColumnsList<TenantInformation> = [
        {
            name: INTL.formatMessage(DirectoryLocalizationFormatMessages.DirectoryName),
            key: DirectoryLocalizationFormatMessages.DirectoryName.defaultMessage,
            minWidth: 160,
            maxWidth: 220,
            sortKey: item => item.displayName,
            onRender: (item: TenantInformation) => <span title={item.displayName}>{item.displayName}</span>,
            isResizable: true,
            isRowHeader: true,
            isHiddenFromColumnSelector: false
        },
        {
            name: INTL.formatMessage(DirectoryLocalizationFormatMessages.Domain),
            key: DirectoryLocalizationFormatMessages.Domain.defaultMessage,
            minWidth: 220,
            maxWidth: 240,
            sortKey: item => item.defaultDomain,
            onRender: (item: TenantInformation) => <span title={item.defaultDomain}>{item.defaultDomain}</span>,
            isResizable: true,
            isHiddenFromColumnSelector: false

        },
        {
            name: INTL.formatMessage(DirectoryLocalizationFormatMessages.DirectoryID),
            key: DirectoryLocalizationFormatMessages.DirectoryID.defaultMessage,
            minWidth: 300,
            maxWidth: 380,
            sortKey: item => item.tenantId,
            onRender: (item: TenantInformation) => <span title={item.tenantId}>{item.tenantId}</span>,
            isResizable: true,
            isHiddenFromColumnSelector: false
        },
    ];
    return (
        <StyledStack grow>
            {/* head */}
            <Stack.Item >
                <div style={{ marginTop: 18, marginBottom: 18 }}>
                    <Text>{INTL.formatMessage(DirectoryLocalizationFormatMessages.SwitchDirectoryPrompt) + " "}</Text>
                    <FabricLink href={LearnMoreAboutAzureDirectoriesLink} target="_blank">
                        {INTL.formatMessage(DirectoryLocalizationFormatMessages.LearnMoreAboutAzureDirectories)}
                    </FabricLink>
                </div>
                {tenant && (
                    <div style={{ marginBottom: "1rem" }}>
                        <Text style={{ fontWeight: 500 }} variant="mediumPlus">
                            {INTL.formatMessage(DirectoryLocalizationFormatMessages.CurrentDirectory) + " "}
                        </Text>
                        <Text variant="mediumPlus">{tenant.displayName}</Text>
                    </div>
                )}
                <Text>{INTL.formatMessage(DirectoryLocalizationFormatMessages.AllDirectories)}</Text>
                <Stack horizontal tokens={{ childrenGap: 8 }} style={{ marginTop: 8, marginBottom: 8 }}>
                    <SearchBox
                        styles={searchBoxStyles}
                        placeholder={INTL.formatMessage(DirectoryLocalizationFormatMessages.Search)}
                        onChange={(_event, text) => {
                            setSearchTenantName(text);
                        }}
                    />
                </Stack>
            </Stack.Item>

            {/* bottom */}
            <Stack.Item grow>
                <ScrollablePane style={{ position: "relative", width: "100%", height: "100%", minHeight: 120 }}>
                    <CustomShimmeredDetailsList<TenantInformation>
                        isDefaultTopItem={item => tenant && item.tenantId === tenant.tenantId}
                        items={_.values(
                            _.filter(tenants, item => item.displayName.toLowerCase().indexOf(searchTenantName) >= 0).sort((a, b) => (a.displayName > b.displayName ? 1 : -1))
                        )}
                        contextualMenuProps={{
                            getContextualMenuItems: (items) => [] as any,
                            contextMenuContainerColumnKey: "FirstName",
                        }}
                        getKey={(item: TenantInformation) => item?.tenantId}
                        selectedKeys={[selectedTenant?.tenantId]}
                        columns={allDirectoriesSchema}
                        ariaLabel={INTL.formatMessage(DirectoryLocalizationFormatMessages.AllDirectories)}
                        checkButtonAriaLabel={INTL.formatMessage(DirectoryLocalizationFormatMessages.SelectRow)}
                        ariaLabelForSelectAllCheckbox={INTL.formatMessage(DirectoryLocalizationFormatMessages.ToggleSelectionForAllItems)}
                        onSelect={items => {
                            if (!_.isEmpty(items)) {
                                setSelectedTenant(_.first(items));
                            } else {
                                setSelectedTenant(undefined);
                            }
                        }}
                        selectionMode={SelectionMode.single}
                        layoutMode={DetailsListLayoutMode.justified}
                        constrainMode={ConstrainMode.unconstrained}
                        onRenderRow={(props, defaultRender) => (
                            <div className="detailsList-Row-Hover">{defaultRender(props)}</div>
                        )}
                        enableShimmer={false}
                    />
                </ScrollablePane>
            </Stack.Item>
            <Stack horizontal verticalAlign={"center"} style={{ marginTop: 16 }}>
                <PrimaryButton
                    disabled={!canSwitchDirectory()}
                    onClick={() => { onChangeDirectory(selectedTenant) }}
                    text={INTL.formatMessage(DirectoryLocalizationFormatMessages.SwitchDirectory)}
                />
                <FabricLink
                    href={urlLinks.learnMoreAboutAzurePortal()}
                    style={{ marginLeft: 25, marginRight: 10 }}
                    target="_blank"
                >
                    {INTL.formatMessage(DirectoryLocalizationFormatMessages.ViewAllPropertiesInAzurePortal)}
                </FabricLink>
                <ThemedExternalLinkIcon />
            </Stack>
        </StyledStack>
    )
}

export const SelectDirectoryTab = withLocalization(initializeComponent(DirectoryInternal));