import { useMemo } from 'react'
import {
    Label,
    Link,
    Panel,
    PanelType,
    Persona,
    PersonaSize,
    Stack,
    Text,
    TooltipHost,
    IIconProps,
    FontIcon,
    useTheme,
    IPersonaProps,
    IPersonaSharedProps,
    IPanelStyles,
} from "@fluentui/react";
import { format } from "util";
import { INTL } from "../../../util/intlUtil";
import { ProfileCardLocalizationFormatMessages, AzureLocationMessages } from "../../../clientResources";
import { Maybe } from '../../../util/typeUtil'
import { TenantInformation, Subscription } from '../../../models'
import { initializeComponent, withLocalization } from "../../../services/localization";

const ThemedAddUserIcon = (props: IIconProps): JSX.Element => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" style={props?.style}>
    <g strokeWidth="1.9" fill="none">
        <circle cx="32" cy="32" r="30.25" />
        <g transform="matrix(1.1 0 0 1.1 8.8 5.61)">
            <circle cx="20" cy="16" r="7" />
            <path d="M30 35h10m-5-5v10M30.833 32.09A11 11 0 009 34" />
        </g>
    </g>
</svg>);

export declare interface ProfileCardInformation extends TenantInformation {
    accountName: string;
    accountEmail: string;
    roleName?: string;
    roleLearnMoreLink?: string
}
export interface ProfileCardProps {
    isOpen: boolean;
    tenant: ProfileCardInformation;
    photoData: Maybe<string>,
    subscription?: Pick<Subscription, "name" | "sku" | "localeDisplayName">;
    onClose: () => void;
    login: () => void;
    signOut: () => void;
    onSwitchTenant: () => void;
    onSwitchResource: () => void;
}

// styles
const panelStyles = {
    main: {
        height: "fit-content",
        maxHeight: "calc(100vh - 40px)",
        top: 40
    },
    contentInner: {
        overflow: "auto",
    },
    scrollableContent: {
        overflow: "visible",
    },
    commands: {
        display: "none",
    },
    content: {
        padding: 0,
    },
} as IPanelStyles;

const PlaceHolder = "unselected";

export const ProfileAreaWrapped = (props: ProfileCardProps) => {
    const { isOpen, tenant, subscription, photoData, onClose, login, signOut, onSwitchTenant, onSwitchResource } = props
    const theme = useTheme();

    function getLocalizationMessage(name: string): string {
        const id = name.replace(/ /g, "").toLowerCase();
        if (id in AzureLocationMessages) return INTL.formatMessage(AzureLocationMessages[id]);
        return name;
    }
    // Render 
    function _onRenderPrimaryText(_props: IPersonaProps): JSX.Element {
        return <Text style={{ fontSize: 20 }}>{_props.text}</Text>;
    }
    function _onRenderTertiaryText(_props: IPersonaProps) {
        return <Link target="_blank" href="https://myaccount.microsoft.com/?ref=MeControl">
            {_props.tertiaryText}
            <FontIcon iconName="NavigateExternalInline" style={{ marginLeft: '3px' }} />
        </Link>
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function _onRenderPersonaCoin(_props: IPersonaSharedProps) {
        const { coinSize, imageAlt } = _props;
        return (
            <img
                style={{ borderRadius: "50%", width: 100, height: 100 }}
                src={`data:image/png;base64,${photoData ?? ""}`}
                alt={imageAlt}
                width={coinSize}
                height={coinSize}
            />
        );
    }
    function _onRenderOptionalText(_props: IPersonaProps): JSX.Element {
        return <Stack tokens={{ childrenGap: 10 }} style={{ paddingTop: 10 }}>
            {/* Directory */}
            <Stack>
                <Label>{INTL.formatMessage(ProfileCardLocalizationFormatMessages.CurrentDirectory)}</Label>
                <Stack horizontal>
                    <Stack.Item styles={{ root: { maxWidth: 160, overflow: "hidden" } }}>
                        <Text title={props.tenant?.displayName}>{props.tenant?.displayName ?? PlaceHolder}</Text>
                    </Stack.Item>
                    <Stack.Item grow>
                        <span />
                    </Stack.Item>
                    <Link
                        onClick={() => { onSwitchTenant() }}
                        data-bi-name={INTL.formatMessage(ProfileCardLocalizationFormatMessages.SwitchDirectories)}
                        aria-label={INTL.formatMessage(ProfileCardLocalizationFormatMessages.SwitchDirectory)}
                    >
                        {INTL.formatMessage(ProfileCardLocalizationFormatMessages.Switch)}
                    </Link>
                </Stack>
            </Stack>

            {/* Role */}
            {tenant.roleName && <Stack>
                <Stack horizontal verticalAlign='center'>
                    <Label>{INTL.formatMessage(ProfileCardLocalizationFormatMessages.CurrentRole)}</Label>
                    <TooltipHost content={INTL.formatMessage(ProfileCardLocalizationFormatMessages.CurrentRoleLearnMore)}>
                        <FontIcon style={{ display: 'block', cursor: 'pointer', marginLeft: 5 }} iconName="info" />
                    </TooltipHost>
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <Stack.Item styles={{ root: { maxWidth: 160, overflow: "hidden" } }}>
                        <Text title={tenant.roleName}>{tenant.roleName}</Text>
                    </Stack.Item>
                    {tenant.roleLearnMoreLink && <Stack.Item styles={{ root: { maxWidth: 80, overflow: "hidden" } }}>
                        <Link target='_blank' href={tenant.roleLearnMoreLink}>
                            {INTL.formatMessage(ProfileCardLocalizationFormatMessages.LearnMore)}
                        </Link>
                    </Stack.Item>}
                </Stack>
            </Stack>}

            {/* Resource */}
            <Stack>
                <Label>{INTL.formatMessage(ProfileCardLocalizationFormatMessages.CurrentResource)}</Label>
                <Stack horizontal>
                    <Stack.Item styles={{ root: { maxWidth: 160, overflow: "hidden" } }}>
                        <Text title={subscription?.name}>{subscription ? subscription.name : PlaceHolder}</Text>
                    </Stack.Item>
                    <Stack.Item grow>
                        <span />
                    </Stack.Item>
                    <Link
                        onClick={() => { onSwitchResource() }}
                        data-bi-name={INTL.formatMessage(ProfileCardLocalizationFormatMessages.SwitchResources)}
                        aria-label={INTL.formatMessage(ProfileCardLocalizationFormatMessages.SwitchResource)}
                    >
                        {subscription ? INTL.formatMessage(ProfileCardLocalizationFormatMessages.Switch) :
                            INTL.formatMessage(ProfileCardLocalizationFormatMessages.Select)
                        }
                    </Link>
                </Stack>
                {subscription && subscription.localeDisplayName && subscription.sku && <Text style={{ fontSize: 10, color: theme.palette.neutralSecondary }}>
                    {format(
                        "%s, %s",
                        subscription ? getLocalizationMessage(subscription.localeDisplayName) : PlaceHolder,
                        subscription ? subscription.sku : PlaceHolder
                    )}
                </Text>}
            </Stack>
        </Stack>
    }

    const hasPhotoData: IPersonaProps = useMemo(() => (photoData ? {
        onRenderPersonaCoin: _onRenderPersonaCoin
    } : null), [photoData, _onRenderPersonaCoin])
    // Render
    return (
        <Panel
            role="dialog"
            aria-labelledby={INTL.formatMessage(ProfileCardLocalizationFormatMessages.Labelledby)}
            isOpen={isOpen}
            onDismiss={() => { onClose() }}
            type={PanelType.custom}
            customWidth='380px'
            styles={panelStyles}
            isLightDismiss
            layerProps={{ eventBubblingEnabled: true, }}
        >
            <Stack horizontalAlign="start" tokens={{ childrenGap: 16, padding: 20 }}>
                <Stack.Item align="end">
                    <Link onClick={signOut} >{INTL.formatMessage(ProfileCardLocalizationFormatMessages.SignOut)}</Link>
                </Stack.Item>
                <Persona
                    styles={{ root: { width: '100%', height: "100%" }, details: { paddingRight: 0 } }}
                    size={PersonaSize.size100}
                    text={tenant.accountName}
                    onRenderPrimaryText={_onRenderPrimaryText}
                    secondaryText={tenant.accountEmail}
                    tertiaryText={INTL.formatMessage(ProfileCardLocalizationFormatMessages.ViewAccount)}
                    onRenderTertiaryText={_onRenderTertiaryText}
                    onRenderOptionalText={_onRenderOptionalText}
                    {...hasPhotoData}
                />
            </Stack>
            <Stack
                horizontal
                verticalAlign="center"
                tokens={{ childrenGap: 16, padding: 20 }}
                styles={{
                    root: {
                        backgroundColor: theme.palette.neutralLighter,
                        ":hover": { backgroundColor: theme.palette.neutralLight, },
                    },
                }}
            >
                <Stack>
                    <ThemedAddUserIcon style={{ stroke: theme.palette.neutralPrimary, width: "40px", height: "40px" }} />
                </Stack>
                <Stack>
                    <Link onClick={() => { login() }}  >
                        {INTL.formatMessage(ProfileCardLocalizationFormatMessages.SignInWithADifferentAccount)}
                    </Link>
                </Stack>
            </Stack>
        </Panel>
    );
}

export const ProfileCard = withLocalization(initializeComponent(ProfileAreaWrapped));