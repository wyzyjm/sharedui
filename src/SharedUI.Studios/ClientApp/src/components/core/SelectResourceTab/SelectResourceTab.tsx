import { useMemo, useRef, useState } from 'react'
import {
    CommandBarButton,
    ConstrainMode,
    DetailsListLayoutMode,
    IDetailsList,
    ISearchBoxStyles,
    Link as FabricLink,
    Pivot,
    PivotItem,
    ScrollablePane,
    SearchBox,
    SelectionMode,
    Stack,
    Text,
    PrimaryButton,
    IconButton,
    IShimmerProps,
    Shimmer,
    ShimmerElementType
} from "@fluentui/react";
import _ from "lodash";
import { format } from "util";
import { ThemedExternalLinkIcon } from '../Icons'
import { CustomShimmeredDetailsList, ICustomColumnsList } from "../ItemList/ItemList";

import { FetchStatusUtil } from '../../../util/common'
import { INTL } from "../../../util/intlUtil";
import { urlLinks } from "../../../util/urlLinks";

import { ResourceLocalizationFormatMessages, AzureLocationMessages } from "../../../clientResources";
import { initializeComponent, withLocalization } from "../../../services/localization";

// Types
import { Subscription, AzureSubscription, AzureRoleDefinitionType, TenantInformation, SubscriptionViewModel, ProvisioningStates } from '../../../models'

// Component
export interface IShimmerSpanProp extends IShimmerProps {
    enableShimmer?: boolean;
}

export const ShimmerSpan = (props: IShimmerSpanProp): JSX.Element => {
    const defaultShimmerElements = [{ type: ShimmerElementType.line, width: "80px" }];
    if (props.enableShimmer) {
        return (
            <Shimmer styles={{ root: { display: "inline-block" } }} shimmerElements={defaultShimmerElements} {...props} />
        );
    } else {
        return <>{props.children}</>;
    }
};


//  Constants
const PlaceHolder = "--";

export interface ISelectResourceTabProps {
    selectedTenant: TenantInformation;
    selectedSubscription: Subscription;
    subscriptions: Subscription[];
    azureSubscriptions: AzureSubscription[];
    onChangeResource: (resource: Subscription) => void;
    createOpenAIResourceLink: string;
    learnMoreAboutCreatingCognitiveServicesSubscriptionLink: string;
    openAIStudioBuiltInRoleIdsArray: string[]
}
export const settingItemKeys: {
    directoryItemKey: string;
    subscriptionItemKeys: { itemKey: string; favoriteItemKey: string; allSubscriptionsItemKey: string };
    generalItemKey: string;
} = {
    directoryItemKey: "0",
    subscriptionItemKeys: { itemKey: "1", favoriteItemKey: "1-0", allSubscriptionsItemKey: "1-1" },
    generalItemKey: "2",
};
const searchBoxStyles: Partial<ISearchBoxStyles> = {
    root: {
        width: 200,
    },
};

export const ResourceAreaWrapped = (props: ISelectResourceTabProps): JSX.Element => {
    const { selectedSubscription: subscription, onChangeResource, selectedTenant, createOpenAIResourceLink, openAIStudioBuiltInRoleIdsArray } = props

    const [iconEleId] = useState(Math.random().toString());
    const [selectedSubscription, setSelectedSubscription] = useState(subscription);
    const [searchSubscriptionName, setSearchSubscriptionName] = useState("");
    const subscriptionListRef = useRef<IDetailsList>();
    const [currentSubscriptionItemKey, setCurrentSubscriptionItemKey] = useState(settingItemKeys.subscriptionItemKeys.allSubscriptionsItemKey);

    // Function
    function getLocalizationMessage(name: string): string {
        const id = name.replace(/ /g, "").toLowerCase();
        if (id in AzureLocationMessages) return INTL.formatMessage(AzureLocationMessages[id]);
        return name;
    }
    function onLinkClickOfResources(currentPivotItem: PivotItem) {
        const itemKey = currentPivotItem.props.itemKey;
        if (itemKey === currentSubscriptionItemKey) return;
        setCurrentSubscriptionItemKey(itemKey);
        onLinkChangeOfSetting();
    }
    function onLinkChangeOfSetting() {
        setSelectedSubscription(subscription);
    }
    function canSwitchResource(): boolean {
        return selectedSubscription && (!subscription || selectedSubscription.id !== subscription.id);
    }
    function hasProvisioningState(actualProvisioningState: string, expectedProvisioningState: ProvisioningStates): boolean {
        return expectedProvisioningState?.toLowerCase() === actualProvisioningState?.toLowerCase();
    }
    function copyKey(item: SubscriptionViewModel) {
        if (item) {
            const selBox = document.createElement("textarea");
            selBox.style.position = "fixed";
            selBox.style.left = "0";
            selBox.style.top = "0";
            selBox.style.opacity = "0";
            selBox.value = item.key1;
            document.body.appendChild(selBox);
            selBox.focus();
            selBox.select();
            document.execCommand("copy");
            document.body.removeChild(selBox);
            item.keyCopied = true;
            subscriptionListRef.current?.forceUpdate();

            setTimeout(() => {
                item.keyCopied = false;
                subscriptionListRef.current?.forceUpdate();
            }, 2 * 1000);

            const element = document.getElementById(iconEleId);
            if (element) {
                element.focus();
            }
        }
    }

    function showKey(item: SubscriptionViewModel) {
        if (item.key1 && item.key1 !== "") {
            item.showKeyFlag = true;
            subscriptionListRef.current?.forceUpdate();
        }
    }

    function hideKey(item: SubscriptionViewModel) {
        item.showKeyFlag = false;
        subscriptionListRef.current?.forceUpdate();
    }

    const roleAssignmentText = useMemo((): string => {
        let result = "";
        if (subscription) {
            const azureSubscription = _.find(
                props.azureSubscriptions,
                item => item.subscriptionId === subscription.azureSubscriptionId
            );

            if (azureSubscription) {
                _.forEach(subscription.roleAssignments, item => {
                    const roleDefinition = _.find(
                        azureSubscription.roleDefinitions,
                        definition => definition.id === item.properties?.roleDefinitionId
                    );
                    if (
                        roleDefinition &&
                        (roleDefinition.properties?.type === AzureRoleDefinitionType.CustomRole ||
                            _.find(
                                openAIStudioBuiltInRoleIdsArray,
                                item => item === roleDefinition.id.substring(roleDefinition.id.lastIndexOf("/") + 1)
                            ))
                    ) {
                        const name =
                            roleDefinition.properties?.type === AzureRoleDefinitionType.CustomRole
                                ? `${roleDefinition.properties?.roleName} (${INTL.formatMessage(
                                    ResourceLocalizationFormatMessages.CustomRole
                                )})`
                                : roleDefinition.properties?.roleName;

                        result = result === "" ? name : `${result}, ${name}`;
                    }
                });
            }
        }

        return result === "" ? PlaceHolder : result;
    }, [subscription, props.azureSubscriptions, openAIStudioBuiltInRoleIdsArray]);
    const allResourcesSchema: ICustomColumnsList<SubscriptionViewModel> = [
        {
            name: INTL.formatMessage(ResourceLocalizationFormatMessages.ResourceName),
            key: ResourceLocalizationFormatMessages.ResourceName.defaultMessage,
            minWidth: 200,
            maxWidth: 400,
            sortKey: item => item.name,
            onRender: (item: SubscriptionViewModel) => (
                <Stack horizontal verticalAlign="center">
                    <Stack.Item>{item.name}</Stack.Item>
                </Stack>
            ),
            isResizable: true,
            isRowHeader: true,
            isHiddenFromColumnSelector: false

        },
        {
            name: INTL.formatMessage(ResourceLocalizationFormatMessages.AzureSubscription),
            key: ResourceLocalizationFormatMessages.AzureSubscription.defaultMessage,
            minWidth: 200,
            maxWidth: 400,
            sortKey: item => item.azureSubscriptionName,
            onRender: (item: SubscriptionViewModel) => <span>{item.azureSubscriptionName}</span>,
            isResizable: true,
            isHiddenFromColumnSelector: false
        },
        {
            name: INTL.formatMessage(ResourceLocalizationFormatMessages.Region),
            key: ResourceLocalizationFormatMessages.Region.defaultMessage,
            minWidth: 150,
            maxWidth: 300,
            sortKey: item => getLocalizationMessage(item.localeDisplayName),
            onRender: (item: SubscriptionViewModel) => (
                <span>{getLocalizationMessage(item.localeDisplayName)}</span>
            ),
            isResizable: true,
            isHiddenFromColumnSelector: false
        },
        {
            name: INTL.formatMessage(ResourceLocalizationFormatMessages.PricingTier),
            key: ResourceLocalizationFormatMessages.Plan.defaultMessage,
            minWidth: 100,
            maxWidth: 300,
            sortKey: item => item.sku,
            onRender: (item: SubscriptionViewModel) => (
                <span>
                    {item.sku === "S0"
                        ? `${INTL.formatMessage(ResourceLocalizationFormatMessages.Standard)} ${item.sku}`
                        : `${INTL.formatMessage(ResourceLocalizationFormatMessages.Free)} ${item.sku}`}
                </span>
            ),
            isResizable: true,
            isHiddenFromColumnSelector: false
        },
        {
            name: INTL.formatMessage(ResourceLocalizationFormatMessages.Endpoint),
            key: ResourceLocalizationFormatMessages.Endpoint.defaultMessage,
            minWidth: 300,
            maxWidth: 500,
            sortKey: item => item.endpoint,
            onRender: (item: SubscriptionViewModel) => <span>{item.endpoint}</span>,
            isResizable: true,
            isHiddenFromColumnSelector: false
        },
        {
            name: INTL.formatMessage(ResourceLocalizationFormatMessages.Key),
            key: ResourceLocalizationFormatMessages.Key.defaultMessage,
            minWidth: 400,
            maxWidth: 500,
            sortKey: item => item.key1,
            // onRender: (item: SubscriptionViewModel) => <RevealableResourceKey item={item} />,
            onRender: (item: SubscriptionViewModel) => <Stack horizontal verticalAlign="center">
                <span>{item.showKeyFlag && item.key1 ? item.key1 : "----------------------------------------"}</span>
                <Stack horizontal verticalAlign="center" style={{ marginTop: -6, marginBottom: -6 }}>
                    {!item.showKeyFlag && (
                        <IconButton
                            className="hover-show"
                            iconProps={{ iconName: "View" }}
                            title={INTL.formatMessage(ResourceLocalizationFormatMessages.ShowKey)}
                            ariaLabel="Show key"
                            onClick={() => {
                                showKey(item);
                            }}
                        />
                    )}
                    {item.showKeyFlag && (
                        <IconButton
                            className="hover-show"
                            iconProps={{ iconName: "Hide3" }}
                            title={INTL.formatMessage(ResourceLocalizationFormatMessages.HideKey)}
                            ariaLabel="Hide key"
                            onClick={() => {
                                hideKey(item);
                            }}
                        />
                    )}
                    {item.showKeyFlag && item.key1 && !item.keyCopied && (
                        <IconButton
                            className="hover-show"
                            id={"copyButton" + item.id}
                            iconProps={{ iconName: "Copy" }}
                            title={INTL.formatMessage(ResourceLocalizationFormatMessages.Copy)}
                            ariaLabel="Copy"
                            onClick={() => {
                                copyKey(item);
                            }}
                        />
                    )}
                    {item.keyCopied && (
                        <span className="hover-show">{INTL.formatMessage(ResourceLocalizationFormatMessages.Copied)}</span>
                    )}
                </Stack>
            </Stack>,
            isResizable: true,
            isHiddenFromColumnSelector: false
        },
    ];

    return (
        <Stack grow>
            <Stack.Item>
                {/* title */}
                <div style={{ marginTop: 18, marginBottom: 18 }}>
                    <p>{INTL.formatMessage(ResourceLocalizationFormatMessages.LearnMoreAboutCreatingResourcesDesc)}</p>
                    <FabricLink href={props.learnMoreAboutCreatingCognitiveServicesSubscriptionLink} target="_blank">
                        {INTL.formatMessage(ResourceLocalizationFormatMessages.LearnMoreAboutCreatingResourcesInAzure)}
                    </FabricLink>
                </div>
                {/* Resource */}
                <div>
                    <Text style={{ fontWeight: 500 }} variant="mediumPlus">
                        {INTL.formatMessage(ResourceLocalizationFormatMessages.CurrentResource) + " "}
                    </Text>
                    <Text variant="mediumPlus">
                        {format(
                            "%s (%s, %s)",
                            subscription ? subscription.name : PlaceHolder,
                            subscription ? getLocalizationMessage(subscription.localeDisplayName) : PlaceHolder,
                            subscription ? subscription.sku : PlaceHolder
                        )}
                    </Text>
                </div>
                {/* Subscription */}
                <div>
                    <Text style={{ fontWeight: 500 }} variant="mediumPlus">
                        {INTL.formatMessage(ResourceLocalizationFormatMessages.CurrentSubscription) + " "}
                    </Text>
                    <Text variant="mediumPlus">{subscription ? subscription.azureSubscriptionName : PlaceHolder}</Text>
                </div>
                {/* Role assignment: */}
                <div style={{ marginBottom: "1rem" }}>
                    <Text style={{ fontWeight: 500 }} variant="mediumPlus">
                        {INTL.formatMessage(ResourceLocalizationFormatMessages.CurrentRoleAssignments) + " "}
                    </Text>
                    {subscription && (
                        <>
                            <ShimmerSpan enableShimmer={!FetchStatusUtil.isEnd(subscription.roleAssignmentsFetchStatus)}>
                                <Text variant="mediumPlus">{roleAssignmentText}</Text>
                            </ShimmerSpan>
                            <FabricLink
                                href={`${urlLinks.learnMoreAboutAzurePortal()}#@${selectedTenant?.defaultDomain}/resource/${subscription?.azureId
                                    }/users`}
                                style={{ marginLeft: 25, marginRight: 10 }}
                                target="_blank"
                            >
                                {INTL.formatMessage(ResourceLocalizationFormatMessages.ViewLevelOfAccessForThisResource)}
                            </FabricLink>
                            <ThemedExternalLinkIcon />
                        </>
                    )}
                    {!subscription && <Text variant="mediumPlus">--</Text>}
                </div>
                {/* Pivot*/}
                <Pivot
                    defaultSelectedKey={currentSubscriptionItemKey}
                    onLinkClick={onLinkClickOfResources}
                    linkSize='large'
                >
                    <PivotItem
                        itemKey={settingItemKeys.subscriptionItemKeys.allSubscriptionsItemKey}
                        headerText={INTL.formatMessage(ResourceLocalizationFormatMessages.AllResources)}
                    >
                        <Stack horizontal tokens={{ childrenGap: 8 }} style={{ marginTop: 8, marginBottom: 8 }}>
                            <SearchBox
                                styles={searchBoxStyles}
                                value={searchSubscriptionName}
                                placeholder={INTL.formatMessage(ResourceLocalizationFormatMessages.Search)}
                                onChange={(event, text) => {
                                    setSearchSubscriptionName(text ? text : "");
                                }}
                            />
                            <CommandBarButton
                                style={{ marginLeft: 30 }}
                                href={createOpenAIResourceLink}
                                iconProps={{ iconName: "Add" }}
                                title={INTL.formatMessage(ResourceLocalizationFormatMessages.CreateAzureResource)}
                            >
                                {INTL.formatMessage(ResourceLocalizationFormatMessages.CreateAzureResource)}
                            </CommandBarButton>
                        </Stack>
                    </PivotItem>
                </Pivot>
            </Stack.Item>
            {/* Table list */}
            <Stack.Item grow>
                <ScrollablePane style={{ position: "relative", width: "100%", height: "100%", minHeight: 120 }}>
                    <CustomShimmeredDetailsList<SubscriptionViewModel>
                        componentRef={subscriptionListRef}
                        isDefaultTopItem={item => subscription && item.id === subscription.id}
                        items={_.values(
                            props.subscriptions
                                .filter((item) => {
                                    const filterBySearch = item.name.toLowerCase().indexOf(searchSubscriptionName ? searchSubscriptionName.toLowerCase() : "") >= 0;
                                    const filterByProvisioningState = hasProvisioningState(item.provisioningState, ProvisioningStates.Succeeded);
                                    return filterBySearch && filterByProvisioningState;
                                }).sort((a, b) => (a.name > b.name ? 1 : -1))
                        )}
                        selectedKeys={[selectedSubscription?.id]}
                        columns={allResourcesSchema}
                        ariaLabel={INTL.formatMessage(ResourceLocalizationFormatMessages.AllResources)}
                        checkButtonAriaLabel={INTL.formatMessage(ResourceLocalizationFormatMessages.SelectNow)}
                        ariaLabelForSelectAllCheckbox={INTL.formatMessage(ResourceLocalizationFormatMessages.ToggleSelectionForAllItems)}
                        onSelect={items => {
                            if (!_.isEmpty(items)) {
                                setSelectedSubscription(_.first(items));
                            } else {
                                setSelectedSubscription(undefined);
                            }
                        }}
                        selectionMode={SelectionMode.single}
                        layoutMode={DetailsListLayoutMode.justified}
                        constrainMode={ConstrainMode.unconstrained}
                        onRenderRow={(props, defaultRender) => (
                            <div className="detailsList-Row-Hover">{defaultRender(props)}</div>
                        )}
                        enableShimmer={false}
                        contextualMenuProps={{
                            getContextualMenuItems: (items) => [] as any,
                            contextMenuContainerColumnKey: "",
                        }}
                    />
                </ScrollablePane>
            </Stack.Item>
            {/* Footer */}
            <Stack horizontal verticalAlign='center' style={{ marginTop: 16 }}>
                <PrimaryButton
                    disabled={!canSwitchResource()}
                    onClick={() => {
                        if (canSwitchResource()) { onChangeResource(selectedSubscription) }
                    }}
                    text={INTL.formatMessage(ResourceLocalizationFormatMessages.UseResource)}
                />
                <FabricLink
                    href={urlLinks.learnMoreAboutCognitiveServicesSubscription()}
                    style={{ marginLeft: 25, marginRight: 10 }}
                    target="_blank"
                >
                    {INTL.formatMessage(ResourceLocalizationFormatMessages.ViewAllPropertiesInAzurePortal)}
                </FabricLink>
                <ThemedExternalLinkIcon />
            </Stack>
        </Stack>
    )
}
export const SelectResourceTab = withLocalization(initializeComponent(ResourceAreaWrapped));
