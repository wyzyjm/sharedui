import { useState } from 'react'
import {
  CommandBar,
  ICommandBarItemProps,
  Icon,
  IStackStyles,
  IStackTokens,
  Link,
  Stack,
  Text,
  useTheme,
  Persona,
  PersonaSize,
  IPersonaProps,
  ThemeProvider,
} from "@fluentui/react";
import { format } from "util";

import { NotificationBoxListWrapped, NotificationBoxListProp } from "../Notification/Notification";
import { defaultTheme } from "../../../themes";
import styled, { ThemeProvider as ReactThemeProvider } from "styled-components";
import { initializeComponent, withLocalization } from "../../../services/localization";
import { INTL } from "../../../util/intlUtil";
import { HeaderLocalizationFormatMessages, AzureLocationMessages } from "../../../clientResources";

const itemAlignmentsStackStyles: IStackStyles = {
  root: {
    height: "40px",
  },
};

export const ThemedHeaderIcon: any = styled(Icon).attrs({})`
  &.white {
    color: ${(props) => props.theme.palette.themePrimary};
  }
`;

interface Subscription {
  name: string;
  sku: string;
  localeDisplayName: string;
}
export interface IHeaderProps {
  headerText: string;
  headerHomePageUrl: string;
  commandBarItems: ICommandBarItemProps[];
  profileButtonId?: string;
  isAuthenticated: boolean;
  friendlyName: string;
  subscription: Subscription;
  photoData?: string;
  loginPath: string;
  notifications?: NotificationBoxListProp;
  onProfileClick: () => void;
  isProfileCardVisible: boolean;
};

const StyledDiv = styled.div`
width: 100%;

.navbar {
    padding: 0;
    display: flex;
    width: 100%;
    height: 40px;
}

.nav-left {
    margin-left: 1rem;
    display: inline-flex;
    flex-direction: row;
}

.nav-right {
    display: inline-flex;
    flex-direction: row;
    position: relative;
    float: right;
}

.signin {
  margin-right: 1rem;
}

.spliter {
    padding-left: 0.8125rem;
    padding-right: 0.8125rem;
    font-size: 100%;
}

.header-link {
    line-height: normal;
    letter-spacing: -0.17px;

    span {
        font-size: 18px;
        vertical-align: middle;
    }

    i {
        line-height: 1.5;

        &.black-icon {
            font-weight: 600;
        }
    }
}

.right-icon {
    display: -webkit-flex;
    display: flex;
    height: 40px;
    width: 3rem;
    -webkit-flex: 0 0 auto;
    flex: 0 0 auto;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    cursor: pointer;
    background: none;
    border: none;
}

.navbar-text {
    padding-right: 1rem;
}

.header-link.notification {
  position: absolute;
}

.ms-CommandBar {
  padding: 0;
  height: 40px;

  .ms-ContextualMenu-link {
      position: relative;
  }

  .ms-Button--commandBar {
      width: 40px;
      position: relative;
  }

  .notification-prompt {
      position: absolute;
      top: 8px;
      left: 24px;
  }
}

.ms-ContextualMenu {

  .ms-ContextualMenu-linkContent {
      i {
          margin: 0 4px;
          width: 16px !important;
          font-size: 16px !important;
      }

      .notification-prompt {
          top: 4px;
          left: 16px;
          overflow: hidden;
          text-align: center;
          line-height: 16px !important;
      }
  }


  .notification-prompt,
  .notification-progressing-bar {
      position: absolute;
  }

  .notification-progressing-bar {
      top: 25px;
      width: 22px;
  }

}

/** Mobile support start **/

.show_s {
  display: none !important;
}

// 1200px
@media (max-width: 1200px) {

  .container-inside-content,
  .container-inside-header {
      padding: 0 10px !important;
  }
}

// 600px
@media (max-width: 600px) {
  .ms-OverflowSet-item {
      display: none !important;
  }

  .show_s {
      display: block !important;
  }
}

// 600px
@media (max-width: 600px) {
  .hidden_little {
      display: none !important;
  }
}

// 600px
@media (max-width: 600px) {
  .show_little {
      display: block !important;
  }
}

// 500px
@media (max-width: 500px) {
  .hidden_small {
      display: none !important;
  }
}
// 768px
@media (max-width: 768px) {
  .hidden_medium {
    display: none !important;
  }
}

// main
.container-content {
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
}

// wrapped
.container-inside-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.container-inside-header {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

// body
.container-inside-content {
  overflow-y: overlay;
  flex: 1;
}

// content-body
.container-inside-content--body {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

button.ms-Link {
  &:focus {
      outline: none;
  }
}

a {
  &:focus {
      text-decoration: underline;
  }
}
`;
const PlaceHolder = "--";
function ThemedHeaderInternal(props: IHeaderProps) {
  const { isAuthenticated, friendlyName, subscription, photoData, loginPath, onProfileClick, isProfileCardVisible } = props
  const theme = useTheme();

  const itemAlignmentsStackTokens: IStackTokens = {
    padding: "0 0 0 10px",
  };
  const ThemedHeaderLink = styled(Link).attrs({
    className: "white",
  })`
    &.white {
      color: ${(props) => props.theme.palette.themePrimary};
      &:hover,
      &:active,
      &:focus,
      &:visited {
        color: ${(props) => props.theme.palette.themePrimary};
        text-decoration: none;
      }
    }
  `;
  const ThemedHeaderButton = styled.button.attrs({})`
  &.white {
    background-color: ${props => props.theme.palette.themePrimary};
  }`;
  const ThemedHeaderPersona = styled(Persona).attrs({})`
  div.ms-Persona-initials {
    width: 100%;
    color: ${props => props.theme.palette.themePrimary};
  }
  &.white {
    div.ms-Persona-initials {
      background-color: ${props => props.theme.palette.themePrimary};
      color: ${props => props.theme.palette.white};
    }
  }

  div.ms-Persona-imageArea {
    display: flex;
    img {
      width: 32px;
      height: 32px;
    }
  }

  &.hasPhoto {
    div.ms-Persona-initials {
      display: none;
    }
  }
`;

  function getLocalizationMessage(name: string): string {
    const id = name.replace(/ /g, "").toLowerCase();
    if (id in AzureLocationMessages) return INTL.formatMessage(AzureLocationMessages[id]);
    return name;
  }
  function onRenderCoin(personaProps: IPersonaProps): JSX.Element {
    const { coinSize, imageAlt } = personaProps;
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
  return (
    <StyledDiv>
      <ThemeProvider theme={defaultTheme.header}>
        <ReactThemeProvider theme={defaultTheme.header}>
          <Stack
            horizontal
            verticalAlign="center"
            styles={itemAlignmentsStackStyles}
            tokens={itemAlignmentsStackTokens}
          >
            <ThemedHeaderLink className="hidden_small" href={props.headerHomePageUrl} >
              {INTL.formatMessage(HeaderLocalizationFormatMessages.CognitiveServices)}
            </ThemedHeaderLink>
            <Text
              className="hidden_small"
              style={{
                marginRight: 10,
                marginLeft: 10
              }}
            >
              <span
                style={{ color: "white" }}
              >
                |
              </span>
            </Text>
            <ThemedHeaderLink href={props.headerHomePageUrl} className="headerText">
              {props.headerText}
            </ThemedHeaderLink>

            <Stack.Item grow={1}>
              <span></span>
            </Stack.Item>
            <div className="nav-right my-lg-0">
              <CommandBar
                items={props.commandBarItems}
                // overflowButtonAs={{className: "show_s"}}
                overflowItems={props.commandBarItems}
                overflowButtonProps={{ ariaLabel: "More commands", className: "show_s" }}
                ariaLabel="Inbox actions"
              />
              {/* profile start */}
              {isAuthenticated && <ThemedHeaderButton
                id={props.profileButtonId}
                className={"right-icon nav-item " + (isProfileCardVisible ? "white" : "")}
                style={{ width: "auto" }}
                title={friendlyName}
                onClick={() => {
                  onProfileClick();
                }}
              >
                <Stack horizontal tokens={{ childrenGap: 8 }} style={{ alignItems: "center" }}>
                  <Stack className="hidden_medium" style={{ alignItems: "flex-end" }}>
                    <Text style={{ fontSize: 14, color: isProfileCardVisible ? "inherit" : theme.palette.white }}>
                      {friendlyName}
                    </Text>
                    <Text
                      title={format(
                        "%s (%s, %s)",
                        subscription ? subscription.name : PlaceHolder,
                        subscription
                          ? getLocalizationMessage(subscription.localeDisplayName)
                          : PlaceHolder,
                        subscription ? subscription.sku : PlaceHolder
                      )}
                      style={{
                        fontSize: 10,
                        color: isProfileCardVisible ? "inherit" : theme.palette.white,
                        maxWidth: 200,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {format(
                        "%s (%s, %s)",
                        subscription ? subscription.name : PlaceHolder,
                        subscription
                          ? getLocalizationMessage(subscription.localeDisplayName)
                          : PlaceHolder,
                        subscription ? subscription.sku : PlaceHolder
                      )}
                    </Text>
                  </Stack>
                  {photoData && (
                    <ThemedHeaderPersona
                      className="hasPhoto"
                      hidePersonaDetails
                      size={PersonaSize.size32}
                      onRenderCoin={onRenderCoin}
                    />
                  )}
                  {!photoData && (
                    <ThemedHeaderPersona
                      hidePersonaDetails
                      size={PersonaSize.size32}
                      text={friendlyName}
                      className={isProfileCardVisible ? "" : "white"}
                    />
                  )}
                </Stack>
              </ThemedHeaderButton>}
              {/* profile end */}
            </div>
            {!isAuthenticated && (
              <div className="nav-right my-lg-0 signin">
                <ThemedHeaderLink href={loginPath}>
                  {INTL.formatMessage(HeaderLocalizationFormatMessages.SignIn)}
                </ThemedHeaderLink>
              </div>
            )}
          </Stack>
        </ReactThemeProvider>
      </ThemeProvider>
      <NotificationBoxListWrapped {...props.notifications} />
    </StyledDiv>
  );
}

export const ThemedHeader = withLocalization(initializeComponent(ThemedHeaderInternal));