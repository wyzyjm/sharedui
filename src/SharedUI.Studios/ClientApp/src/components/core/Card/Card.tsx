import { useTheme, IDocumentCardStyles, DocumentCard, Link, Icon, Text, Stack, ILinkProps } from "@fluentui/react";
import { FontSizes } from '@fluentui/theme';
import React from "react";
import { CSSProperties, ReactNode } from "react";
import { initializeComponent, useLocalization, withLocalization } from "../../../services/localization";


export enum CardWidth {
  CardWithIllustration = 260,
  CardWithNoIllustration = 260,
  CardWithIcon = 208,
  CardWithCustomDesign = 199
}

type cardWidthNum = keyof typeof CardWidth
export interface ICardProp {
  title: string;
  description: string;
  icon?: URL;
  linkTitle: string;
  linkProps: ILinkProps;
  isCompactMode?: boolean;
  onClick?: () => void,
  cardType?: cardWidthNum,
  iconName?: string
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
      borderBottom: props.cardType === "CardWithCustomDesign" ? "2px solid #F7630C" : 0,
      paddingBottom: props.cardType === "CardWithCustomDesign" ? "5px" : 0,
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

  return (
    <StyledDocumentCard onClick={props.onClick} width={CardWidth[props.cardType]}>
      {props.cardType === "CardWithIllustration" && (
        <Stack>
          <Stack style={styles.image}>
            <Stack
              grow
              style={{
                width: "100%",
                backgroundSize: "cover",
                background: `url(${props.icon})`,
              }}
            ></Stack>
          </Stack>
        </Stack>
      )}
      {props.cardType === "CardWithIcon" && (
        <Stack
          horizontal
          style={{
            padding: "12px 12px 0",
            alignItems: "center",
          }}
        >
          <Stack
            style={{
              width: "28px",
              height: "28px",
              background: "#773ADC",
              borderRadius: "4px",
              position: "relative",
            }}
          >
            <Icon
              iconName={props.iconName || "AlignCenter"}
              style={{
                color: "#FFFFFF",
                width: "16px",
                height: "16px",
                position: "absolute",
                left: "calc(50% - 14px/2)",
                top: "calc(50% - 22px/2)",
              }}
            />
          </Stack>
          <Text style={{ fontSize: FontSizes.size12, paddingLeft: "8px" }}>
            Stereo-channel audio
          </Text>
        </Stack>
      )}
      <Stack style={styles.headerWrapper}>
        <Text style={styles.header}>{props.title}</Text>
      </Stack>
      <Stack grow style={styles.descriptionWrapper}>
        <Text style={styles.description}>{props.description}</Text>
      </Stack>
      {["CardWithIllustration", "CardWithNoIllustration"].includes(props.cardType) && (
        <Stack style={styles.linkWrapper}>
          <Link {...props.linkProps}>{props.linkTitle}</Link>
        </Stack>
      )}
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