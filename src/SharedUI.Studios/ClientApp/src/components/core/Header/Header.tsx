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
import "./Header.scss";
import "../core.scss";
import { initializeComponent, useLocalization, withLocalization } from "../../../services/localization";

const itemAlignmentsStackStyles: IStackStyles = {
  root: {
    height: "40px",
  },
};

const ThemedHeaderButton = styled.button.attrs({})`
  &.white {
    background-color: ${(props) => props.theme.palette.themePrimary};
  }
`;

export const ThemedHeaderIcon: any = styled(Icon).attrs({})`
  &.white {
    color: ${(props) => props.theme.palette.themePrimary};
  }
`;

export interface IHeaderProps {
  headerText: string;
  headerLinkClickUrl: string;
  commandBarItems: ICommandBarItemProps[];
};

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
    <div className="header-o89jbf53v3">
      <ThemeProvider theme={defaultTheme.header}>
        <ReactThemeProvider theme={defaultTheme.header}>
          <Stack
            horizontal
            verticalAlign="center"
            styles={itemAlignmentsStackStyles}
            tokens={itemAlignmentsStackTokens}
          >
            <ThemedHeaderLink
              className="hidden_small"
              href={"https://azure.microsoft.com/products/cognitive-services/"}
              target="_blank"
            >
              Azure Cognitive Services
            </ThemedHeaderLink>
            <Text
              className="hidden_small"
              style={{
                marginRight: 10,
                marginLeft: 10,
              }}
            >
              |
            </Text>
            <ThemedHeaderLink
              style={{ overflow: "hidden", whiteSpace: "nowrap" }}
              href={props.headerLinkClickUrl}
            >
              {props.headerText}
            </ThemedHeaderLink>
            <Stack.Item grow={1}>
              <span></span>
            </Stack.Item>
            <div className="nav-right my-lg-0">
              <CommandBar
                className="header-CommandBar show_little"
                items={[]}
                overflowItems={props.commandBarItems}
                overflowButtonProps={{ ariaLabel: "More commands" }}
                ariaLabel="Inbox actions"
              />
              {props.commandBarItems.map((e) => (
                <div key={e.key}>
                  <ThemedHeaderButton
                    aria-label={e.text}
                    className="hidden_little right-icon nav-item "
                    title={e.text}
                  >
                    <div className="header-link">
                      <ThemedHeaderIcon
                        iconName={e.iconProps.iconName}
                        className="white"
                      />
                    </div>
                  </ThemedHeaderButton>
                </div>
              ))}
            </div>
          </Stack>
        </ReactThemeProvider>
      </ThemeProvider>
    </div>
  );
}

export const ThemedHeader = withLocalization(initializeComponent(ThemedHeaderInternal));