import {
  useTheme,
  IDocumentCardStyles,
  DocumentCard,
  Link,
  Icon,
  Text,
  Stack,
  ILinkProps,
  ActionButton,
  IIconStyles,
  IContextualMenuItem,
} from "@fluentui/react";
import { FontSizes } from '@fluentui/theme';
import React, { useState } from "react";
import { CSSProperties, ReactNode } from "react";
import { initializeComponent, useLocalization, withLocalization } from "../../../services/localization";
import { CardLocalizationFormatMessages } from "../../../clientResources";
import { INTL } from "../../../util/intlUtil";


export enum CardTypes {
  CardWithIllustration = 260,
  CardWithNoIllustration = 260,
  CardWithIcon = 208,
  CardWithCustomDesign = 199
}

export interface ICardProp {
  cardType?: keyof typeof CardTypes;
  
  /**
   * Only applicable if the CardType is CardWithIcon
   */
  headerIconText?: string;

  isCompactMode?: boolean;
  title: string;
  subTitle?: JSX.Element,
  preview?: string,
  description: string;
  iconName?: string
  iconUrl?: URL;

  /**
   * Sample usage for rendering SVG icons:
   * const CreateArtwork = require('./portal/icons/CreateArtwork.svg').default;
   * <CreateArtwork />
   */
  iconElement?: JSX.Element;

  linkTitle: string;
  linkProps: ILinkProps;
  onClick?: () => void;
  linkPropsDropdownOptions?: IContextualMenuItem[]
};

export interface IStyledDocumentCardProp {
  onClick?: () => void;
  children: React.ReactNode;
  width: number;
  role?: string;
  selected?: boolean;
}

const iconStyles: IIconStyles = { root: { fontSize: "14px", textDecoration: "underline"} };

const getSamplesLinkOptions = (linkPropsDropdownOptions: IContextualMenuItem[]): IContextualMenuItem[] =>
  linkPropsDropdownOptions.map(
    (link) =>
      ({
        ...link,
        onRenderContent: () => (
          <Link as="span" underline>
            {`${link.text} `}
            <Icon iconName="MiniExpand" styles={iconStyles} />
          </Link>
        ),
      } as IContextualMenuItem)
  );

const CardInternal = (props: ICardProp) => {
  const { preview } = props;
  const theme = useTheme();
  const { linkPropsDropdownOptions } = props;
  const [isLinkPropsDropdownExpanded, setIsLinkPropsDropdownExpanded] = useState(false);
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
    subTitleStyle: {
      fontSize: "12pt",
      padding: "0 12px",
      color: "#5d5d5d"
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
      fontSize: "12pt",
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
    <StyledDocumentCard onClick={props.onClick} width={CardTypes[props.cardType]}>
      {props.cardType === "CardWithIllustration" && (
        <Stack>
          {
            props.iconUrl ? 
              (<Stack style={styles.image}>
                <Stack grow style={{ width: "100%", backgroundSize: "cover", background: `url(${props.iconUrl})` }} ></Stack>
              </Stack>)
              : (props.iconElement ? 
                (<Stack style={styles.image}>
                  <Stack style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>{props.iconElement}</Stack>
                </Stack>) : <></>)
          }
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
          <Text style={{ fontSize: FontSizes.size12, paddingLeft: "8px" }}>{props.headerIconText}</Text>
        </Stack>
      )}
      <Stack className="header" style={styles.headerWrapper}>
          <Stack>
              <Text style={styles.header}>{props.title}</Text>
          </Stack>
      </Stack>
      {props.subTitle && <Text style={styles.subTitleStyle}>{props.subTitle}</Text>}
      {preview && <Text style={styles.subTitleStyle}>{preview}</Text>}
      <Stack grow style={styles.descriptionWrapper}>
        <Text style={styles.description}>{props.description}</Text>
      </Stack>
      {["CardWithIllustration", "CardWithNoIllustration"].includes(props.cardType) && (
        <>
          {linkPropsDropdownOptions?.length > 0 ? (
            <Stack style={{ padding : "0 2px"}}>
              <ActionButton
                onClick={() => {}}
                data-is-focusable
                menuIconProps={{
                  iconName: isLinkPropsDropdownExpanded ? "ChevronUp" : "ChevronDown",
                  title: isLinkPropsDropdownExpanded ? INTL.formatMessage(CardLocalizationFormatMessages.CollapseCardLink) : INTL.formatMessage(CardLocalizationFormatMessages.ExpandCardLink)
                }}
                menuProps={{items: getSamplesLinkOptions(linkPropsDropdownOptions)}}
                onMenuClick={()=> {setIsLinkPropsDropdownExpanded(!isLinkPropsDropdownExpanded)}}
              >
                {props.linkTitle}
              </ActionButton>
            </Stack>
          ) : (
            <Stack style={styles.linkWrapper}>
              <Link {...props.linkProps}>{props.linkTitle}</Link>
            </Stack>
          )}
        </>
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