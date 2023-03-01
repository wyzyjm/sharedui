import React, { useContext } from "react";
import { Icon } from "@fluentui/react";
import { initializeComponent, withLocalization } from "../../../services/localization";
import { SharedComponentsContext } from "../../../components/core/SharedComponentsContext";
import { INTL } from "../../../util/intlUtil";
import { PrivacyLinkLocalizationFormatMessages } from "../../../clientResources";
import styled from "styled-components";

export interface CustomLinkProps {
    url?: string,
    action?(): any,
    text: string,
    isExternal: boolean,
    cssClass?: string
}

const StyledLink = styled.a`
    color: #0078d4;
    &.link {
        margin-right: 5px;
    }
    &.imprintLink {
        margin-top: 10px;
        margin-right: 10px;
        margin-left: 10px;
    }
    &:hover {
        color: inherit;
        text-decoration: unset;
    }
`
export function CustomLink(props: CustomLinkProps): JSX.Element {
  return (
      <StyledLink
        className={"link " + props.cssClass}
        href={props.url ? props.url : "#"}
        target={props.url ? "_blank" : ""}
        onClick={props.action}
      >
        {props.text}
        {props.isExternal && (
          <Icon iconName="NavigateExternalInline" style={{ marginLeft: '3px' }} />
        )}
      </StyledLink>
  );
}

export function PrivacyAndImprintLink(): JSX.Element {
    const sharedComponentsContext = useContext(SharedComponentsContext);
    const locale = sharedComponentsContext.locale;

    return <div className="privacyLinkContainer" role="navigation">
        <CustomLink isExternal={true} text={INTL.formatMessage(PrivacyLinkLocalizationFormatMessages.PrivacyCookies)} url={"https://go.microsoft.com/fwlink/?linkid=521839"} action={null}/>

        {["de", "at", "ch"].includes(locale) && (
            <span>
                |
                <CustomLink isExternal={true} text={INTL.formatMessage(PrivacyLinkLocalizationFormatMessages.Imprint)} url={"https://go.microsoft.com/fwlink/?linkid=2192553"} action={null} cssClass={"imprintLink"} />
            </span>)}
        {locale === 'it' && (
            <span>
                |{/*"Accessibilità" should not be translated as the word is specifically required. It will only be shown to Italian users.*/}
                <CustomLink isExternal={true} text={"Accessibilità"} url={"https://go.microsoft.com/fwlink/?linkid=2213826"} action={null} cssClass={"imprintLink"} />
            </span>)}
        {locale === 'fr' && (
            <span>
                |{/*"Accessibilité" should not be translated as the word is specifically required. It will only be shown to French users.*/}
                <CustomLink isExternal={true} text={"Accessibilité : partiellement conforme"} url={"https://go.microsoft.com/fwlink/?linkid=2214997"} cssClass={"imprintLink"} />
            </span>)}
    </div>
}

export const PrivacyLink = withLocalization(initializeComponent(PrivacyAndImprintLink))
