import {
  CommandBar,
  ICommandBarItemProps,
  Icon,
  IStackStyles,
  IStackTokens,
  Link,
  Stack,
  Text,
  ThemeProvider,
} from "@fluentui/react";
import { defaultTheme } from "../../../themes";
import styled, { ThemeProvider as ReactThemeProvider } from "styled-components";
import { initializeComponent, withLocalization } from "../../../services/localization";
import { INTL } from "../../../util/intlUtil";
import { HeaderLocalizationFormatMessages } from "../../../clientResources";

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

export interface IHeaderProps {
  headerText: string;
  headerHomePageUrl: string;
  commandBarItems: ICommandBarItemProps[];
};

const StyledDiv = styled.div`
    .header-o89jbf53v3 {
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

function ThemedHeaderInternal(props: IHeaderProps) {
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

  return (
    <StyledDiv className="header-o89jbf53v3">
      <ThemeProvider theme={defaultTheme.header}>
        <ReactThemeProvider theme={defaultTheme.header}>
          <Stack
            horizontal
            verticalAlign="center"
            styles={itemAlignmentsStackStyles}
            tokens={itemAlignmentsStackTokens}
          >
            <ThemedHeaderLink
              style={{ overflow: "hidden", whiteSpace: "nowrap" }}
              href={props.headerHomePageUrl}
            >
              {INTL.formatMessage(HeaderLocalizationFormatMessages.CognitiveServices)}
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
            </div>
          </Stack>
        </ReactThemeProvider>
      </ThemeProvider>
    </StyledDiv>
  );
}

export const ThemedHeader = withLocalization(initializeComponent(ThemedHeaderInternal));