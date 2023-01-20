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
import { initializeComponent, withLocalization } from "../../../services/localization";

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
  headerTitle: string;
  headerHomeLink: string;
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
              href={props.headerHomeLink}
              target="_blank"
            >
              {props.headerTitle}
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
    </div>
  );
}

export const ThemedHeader = withLocalization(initializeComponent(ThemedHeaderInternal));