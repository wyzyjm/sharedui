
import { useMemo } from 'react'
import {
    Label,
    Link,
    Image,
    IImageProps,
    ImageFit,
    Panel,
    PanelType,
    Persona,
    PersonaSize,
    Stack,
    Text,
    IIconProps,
    FontIcon,
    useTheme,
    IPersonaProps,
    IPersonaSharedProps,
    IPanelStyles,
    ILinkStyles,
} from "@fluentui/react";
import { INTL } from "../../../util/intlUtil";
import { ProfileCardLocalizationFormatMessages } from "../../../clientResources";

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


export declare interface CachableEntity {
    fromCache?: boolean;
}
export declare interface TenantInformation extends CachableEntity {
    photoData?: string;
    tenantId: string;
    displayName: string;
    defaultDomain: string;
    subscription: string;
    resource: string;
    accountName: string;
    accountEmail: string;
    site: string;
}
export interface ProfileCardProps {
    isOpen: boolean;
    tenant: TenantInformation;
    onClose: () => void;
    login: () => void;
    signOut: () => void;
    toggleSwitchTenant: () => void;
    toggleSwitchResource: () => void;
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

const linkStyles = {
    root: { display: "flex", flexShrink: 0, justifyContent: 'flex-end', width: 60 }
} as ILinkStyles

export const ProfileAreaWrapped = (props: ProfileCardProps) => {
    const { isOpen, tenant, onClose, login, signOut, toggleSwitchTenant, toggleSwitchResource } = props
    const theme = useTheme();

    // Render 
    function _onRenderPrimaryText(_props: IPersonaProps): JSX.Element {
        return <Text style={{ fontSize: 20 }}>{_props.text}</Text>;
    }
    function _onRenderTertiaryText(_props: IPersonaProps) {
        return <Link target="_blank" href="https://myaccount.microsoft.com/?ref=MeControl">
            {_props.tertiaryText}
            <FontIcon iconName="NavigateExternalInline" />
        </Link>
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function _onRenderPersonaCoin(_props: IPersonaSharedProps) {
        const { imageAlt, imageUrl } = _props;
        const imageProps: IImageProps = {
            imageFit: ImageFit.cover,
            src: imageUrl,
            styles: _props => ({ root: { borderRadius: "50%", flexShrink: 0, } }),
        }
        return <Image  {...imageProps} alt={imageAlt} width={100} height={100} />
    }
    function _onRenderOptionalText(_props: IPersonaProps): JSX.Element {
        return <Stack tokens={{ childrenGap: 10 }} style={{ paddingTop: 10 }}>
            <Stack.Item >
                <Label>{INTL.formatMessage(ProfileCardLocalizationFormatMessages.CurrentDirectory)}</Label>
                <Stack horizontal horizontalAlign="space-between">
                    <Text styles={{ root: { overflow: 'hidden' } }}>{tenant.displayName ?? INTL.formatMessage(ProfileCardLocalizationFormatMessages.PlaceHolder)}</Text>
                    <Link styles={linkStyles} onClick={() => { toggleSwitchTenant() }}>{INTL.formatMessage(ProfileCardLocalizationFormatMessages.Switch)}</Link>
                </Stack>
            </Stack.Item>
            <Stack.Item >
                <Label>{INTL.formatMessage(ProfileCardLocalizationFormatMessages.CurrentResource)}</Label>
                <Stack horizontal horizontalAlign="space-between">
                    <Text styles={{ root: { overflow: 'hidden' } }}>{tenant.resource ?? INTL.formatMessage(ProfileCardLocalizationFormatMessages.PlaceHolder)}</Text>
                    <Link styles={linkStyles} onClick={() => { toggleSwitchResource() }}>{INTL.formatMessage(ProfileCardLocalizationFormatMessages.Switch)}</Link>
                </Stack>
                <Text style={{ fontSize: 10, color: theme.palette.neutralSecondary }}>{tenant.site}</Text>
            </Stack.Item>
        </Stack>
    }

    const hasPhotoData: IPersonaProps = useMemo(() => (tenant.photoData ? {
        onRenderPersonaCoin: _onRenderPersonaCoin
    } : null), [tenant, _onRenderPersonaCoin])
    // Render
    return (
        <Panel
            role="dialog"
            aria-labelledby="profile card"
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