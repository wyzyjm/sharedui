import { useTheme, IDocumentCardStyles, DocumentCard } from "@fluentui/react";
import React from "react";
import { CSSProperties, ReactNode } from "react";
import {
    Stack,
    Text,
} from "@fluentui/react";
import {  Link  } from "../Link/Link"
import { initializeComponent, useLocalization, withLocalization } from "../../../services/localization";

export interface ICardProp {
    title: string;
    description: string;
    icon?: URL;
    linkTitle: string;
    isCompactMode?: boolean;
    href?: string;
    openInANewWindow?: boolean;
    onClick?: () => void
};

export interface IStyledDocumentCardProp {
    onClick?: () => void;
    children: React.ReactNode;
    width: number;
    role?: string;
    selected?: boolean;
}

const CardInternal = (props: ICardProp) => {
    const theme = useTheme();
    const styles = {
        headerWrapper: {
            margin: "12px 12px 0px 12px",
        },
        header: {
            fontSize: 14,
            fontWeight: 600,
        },
        image: {
            textAlign: "center",
            minHeight: "153px",
            maxHeight: "153px",
            background: theme.palette.neutralLighter,
            borderRadius: "8px 8px 0 0",
            overflow: "hidden",
            width: "100%",
            display: "flex",
            alignItems: "center",
            position: "relative",
        } as CSSProperties,
        descriptionWrapper: {
            padding: "12px",
            paddingBottom: props.isCompactMode ? "0px" : "12px",
        },
        description: {
            fontSize: 12,
            color: theme.palette.neutralSecondary,
        },
        linkWrapper: {
            padding: "12px",
            paddingTop: props.isCompactMode ? "0px" : "12px",
        },
        link: {
            fontSize: "12px",
            lineHeight: "16px",
        },
    };
    const linkProps = {
        href: props.href,
        displayText: props.linkTitle,
        openInANewWindow: props.openInANewWindow,
        tabIndex: 0
    }

    return (
        <StyledDocumentCard onClick={props.onClick} width={260}>
            <Stack>
                <Stack style={styles.image}>
                    <Stack grow style={{ width: "100%", backgroundSize: "cover", background: `url(${props.icon})` }}>
                    </Stack>
                </Stack>
            </Stack>
            <Stack style={styles.headerWrapper}>
                <Text style={styles.header}>{props.title}</Text>
            </Stack>
            <Stack grow style={styles.descriptionWrapper}>
                <Text style={styles.description}>{props.description}</Text>
            </Stack>
            <Stack style={styles.linkWrapper}>
                <Link {...linkProps}> </Link>
            </Stack>
        </StyledDocumentCard>
    );
};

export function StyledDocumentCard(props: IStyledDocumentCardProp): JSX.Element {
    const theme = useTheme();
    const documentCardStyles = {
        root: {
            "display": "flex",
            "maxWidth": `${props.width}px!important`,
            "minWidth": `${props.width}px!important`,
            "flexDirection": "column",
            "border": "none",
            "boxShadow": "none",
            "background": theme.palette.white,
            "borderRadius": "8px",
            "::after": {
                content: `" "!important`,
                width: "100%",
                height: "100%",
                position: "absolute",
                outline: "2px solid transparent",
                boxShadow: `0px 2px 4px ${theme.palette.neutralQuaternary}, 0px 0px 2px ${theme.palette.neutralLight}`,
                border: props.selected ? `solid 2px ${theme.palette.themePrimary} !important` : "none !important",
                borderRadius: "8px",
            },
            ":hover": {
                "border": "none",
                "boxShadow": "none",
                "background": theme.palette.neutralLighterAlt,
                "::after": {
                    boxShadow: `0px 4px 8px ${theme.palette.neutralQuaternary}, 0px 0px 2px ${theme.palette.neutralLight}`,
                },
            },
        },
    } as IDocumentCardStyles;

    return (
        <DocumentCard onClick={props.onClick} styles={documentCardStyles} role={props.role ?? "none"}>
            {props.children}
        </DocumentCard>
    );
}

export const Card = withLocalization(initializeComponent(CardInternal));