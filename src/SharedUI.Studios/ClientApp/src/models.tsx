import { isEmpty, values } from "lodash";

export enum FetchStatus {
    Succeeded = "Succeeded",
    Failed = "Failed",
    NotStarted = "NotStarted",
    Running = "Running",
}

export declare interface CachableEntity {
    fromCache?: boolean;
}

export declare interface TenantInformation extends CachableEntity {
    tenantId: string;
    displayName: string;
    defaultDomain: string;
}

export enum SubscriptionType {
    ARM,
    Manual,
    SubscriptionAPI, // Todo: Richard, potentially integrate with Cogsvc Subscription API.
}

export declare interface CognitiveServicesSubscriptionKey {
    key1: string;
    key2: string;
}

export declare interface CognitiveServicesSubscriptionPermissions {
    actions: string[];
    dataActions: string[];
}

export declare interface CognitiveServicesSubscriptionCapability {
    name: string;
    value: string;
}

export declare interface CognitiveServicesSubscriptionPrivateEndpointConnection {
    id: string;
    name: string;
    type: string;
}

export declare interface CognitiveServicesSubscriptionVirtualNetworkRules {
    id: string;
    ignoreMissingVnetServiceEndpoint: boolean;
}

export enum CognitiveServicesSubscriptionNetworkAclsDefaultAction {
    Deny = "Deny",
    Allow = "Allow",
}

export declare interface CognitiveServicesSubscriptionIpRules {
    value: string;
}

export declare interface CognitiveServicesSubscriptionNetworkAcls {
    defaultAction: CognitiveServicesSubscriptionNetworkAclsDefaultAction;
    virtualNetworkRules: CognitiveServicesSubscriptionVirtualNetworkRules[];
    ipRules: CognitiveServicesSubscriptionIpRules[];
}

export declare interface CognitiveServicesSubscription extends CachableEntity {
    id: string;
    name: string;
    type: string;
    kind: string;
    location: string;
    skuName: string;
    internalId: string;
    customSubDomainName?: string;
    endpoint?: string;
    disableLocalAuth?: boolean;
    capabilities?: CognitiveServicesSubscriptionCapability[];
    privateEndpointConnections?: CognitiveServicesSubscriptionPrivateEndpointConnection[];
    networkAcls?: CognitiveServicesSubscriptionNetworkAcls;
    subscriptionId: string;
    subscriptionName: string;
    key?: CognitiveServicesSubscriptionKey;
    isFavorite?: boolean;
    provisioningState: string;
}

export declare interface SubscriptionRoleAssignmentPropertiesWithScope {
    principalId: string;
    roleDefinitionId: string;
    scope: string;
}

export declare interface SubscriptionRoleAssignment {
    id: string;
    name: string;
    properties: SubscriptionRoleAssignmentPropertiesWithScope;
    type: string;
}

export class Subscription {
    type: SubscriptionType;
    id: string;
    azureId: string;
    name: string;
    customSubDomainName?: string;
    endpoint?: string;
    disableLocalAuth?: boolean;
    azureSubscriptionId: string;
    azureSubscriptionName: string;
    locale: string;
    localeDisplayName: string;
    kind: string;
    sku: string;
    fromCache?: boolean;
    isFavorite?: boolean;
    key1: string;
    key2: string;
    keyFetchStatus: FetchStatus;
    roleAssignments?: SubscriptionRoleAssignment[];
    roleAssignmentsFetchStatus?: FetchStatus;
    permissions?: CognitiveServicesSubscriptionPermissions;
    permissionsFetchStatus?: FetchStatus;
    provisioningState: string;
    capabilities?: CognitiveServicesSubscriptionCapability[];
    isCustomDomain(): boolean {
        return !!this.customSubDomainName && this.customSubDomainName !== "";
    }
}

export function fromCognitiveServicesSubscription(input: CognitiveServicesSubscription): Subscription {
    const inputLocation = input.location.replace(/ /g, "").toLowerCase();
    //const location = userPreference.getLocation(inputLocation); // TODO: mukeshag fix the location
    const location = {
        name: inputLocation,
        displayName: inputLocation,
    };

    const result: Subscription = new Subscription();
    result.type = SubscriptionType.ARM;
    result.azureId = input.id;
    result.id = input.internalId;
    result.name = input.name;
    result.customSubDomainName =
        (values(input.capabilities).find(capability => capability.name == "VirtualNetworks") &&
            (!isEmpty(input.privateEndpointConnections) ||
                input.networkAcls?.defaultAction == CognitiveServicesSubscriptionNetworkAclsDefaultAction.Deny)) ||
            input.disableLocalAuth
            ? input.customSubDomainName
            : undefined;
    result.endpoint = input.endpoint;
    result.disableLocalAuth = input.disableLocalAuth == true;
    result.azureSubscriptionId = input.subscriptionId;
    result.azureSubscriptionName = input.subscriptionName;
    result.locale = location ? location.name : inputLocation;
    result.localeDisplayName = location ? location.displayName : input.location;
    result.kind = input.kind;
    result.sku = input.skuName;
    result.key1 = input.key ? input.key.key1 : "";
    result.key2 = input.key ? input.key.key2 : "";
    result.fromCache = input.fromCache;
    result.isFavorite = input.isFavorite;
    result.provisioningState = input.provisioningState;
    result.capabilities = input.capabilities;
    return result;
}

export function toCognitiveServicesSubscription(input: Subscription): CognitiveServicesSubscription {
    const result: CognitiveServicesSubscription = {
        id: input.azureId,
        name: input.name,
        type: "Microsoft.CognitiveServices/accounts",
        kind: input.kind,
        location: input.locale,
        skuName: input.sku,
        internalId: input.id,
        customSubDomainName: input.customSubDomainName,
        endpoint: input.endpoint,
        disableLocalAuth: input.disableLocalAuth,
        subscriptionId: input.azureSubscriptionId,
        subscriptionName: input.azureSubscriptionName,
        fromCache: input.fromCache,
        isFavorite: input.isFavorite,
        key: {
            key1: input.key1,
            key2: input.key2,
        },
        provisioningState: input.provisioningState,
        capabilities: input.capabilities
    };

    return result;
}

export declare interface ResourceGroup {
    id: string;
    location: string;
    name: string;
}

export enum AzureRoleDefinitionType {
    BuiltInRole = "BuiltInRole",
    CustomRole = "CustomRole",
}

export declare interface AzureRoleDefinitionProperties {
    roleName: string;
    type: AzureRoleDefinitionType;
}
export declare interface AzureRoleDefinition {
    id: string;
    name: string;
    type: string;
    properties: AzureRoleDefinitionProperties;
}

export declare interface AzureSubscription extends CachableEntity {
    subscriptionId: string;
    displayName: string;
    roleDefinitions?: AzureRoleDefinition[];
    roleDefinitionsFetchStatus?: FetchStatus;
    tenantId: string;
}

export declare interface AzureSubscriptionFeatureRegistrations extends CachableEntity {
    subscriptionId: string;
    featureRegistrations: FeatureRegistrations[];
    featureRegistrationFetchStatus?: FetchStatus;
}

export declare interface FeatureRegistrations {
    isFeatureRegistered?: boolean;
    featureName: string;
}

export interface AzureAsyncOperation {
    "id": string; //"/subscriptions/id/locations/westus/operationsStatuses/sameguid",
    "name": string; //"sameguid",
    "status": string; //"RP defined values | Succeeded | Failed | Canceled",
    "startTime": string; //"<DateLiteral per ISO8601>",
    "endTime": string;  //"<DateLiteral per ISO8601>",
    "percentComplete": number; //0.0, // <double between 0 and 100>
    "properties"?: any;      /* The resource provider can choose the values here, but it should only be returned on a successful operation (status being "Succeeded"). */
    "error"?: {
        /* RP must return the *code* and *messages* fields. Please use the schema for the "ErrorResponse" Type from the Common Types definition in the Azure Rest API Specifications repository: https://github.com/Azure/azure-rest-api-specs/blob/master/specification/common-types/resource-management/v3/types.json */
        "code": string;
        "message": string;
    }
}

export type AzureSku = {
    /**
     * The pricing code for the account.
     */
    code: 'F0' | 'F1' | 'S0' | 'S1' | 'E0' | 'S' | 'Basic' | 'D3';

    /**
     * The pricing tier readable name.
     */
    name?: 'Free' | 'Standard' | 'Basic';
};

export class SubscriptionViewModel extends Subscription {
    showKeyFlag?: boolean;
    keyCopied?: boolean;
}

export enum ProvisioningStates {
    Queued = "queued",
    NotRunning = "notrunning",
    Started = "started",
    Creating = "creating",
    Updating = "updating",
    Running = "running",
    Canceled = "canceled",
    Deleted = "deleted",
    Failed = "failed",
    Finished = "finished",
    Succeeded = "succeeded",
    NotStarted = "notstarted"
}
