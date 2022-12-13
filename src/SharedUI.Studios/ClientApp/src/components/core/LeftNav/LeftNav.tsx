import {
  ActionButton,
  IButtonStyles,
  IconButton,
  INavLinkGroup,
  Stack,
  Theme,
  Text,
  useTheme,
  Nav,
  IRenderFunction,
  IRenderGroupHeaderProps,
  INavStyles,
} from "@fluentui/react";
import { CSSProperties, useState } from "react";
import "./LeftNav.scss";
import { Icons } from "../Icons";
import { INTL } from "../../../util/intlUtil";
import { LeftNavLocalizationFormatMessages } from "../../../clientResources";

const menuPageContainerStyles: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
};

const getNavContainerStyles = (
  leftWidth: string,
  theme: Theme,
  expanded: boolean
): CSSProperties => ({
  width: leftWidth,
  minWidth: leftWidth,
  height: "100%",
  borderRight: `1px solid ${theme.palette.neutralLight}`,
  overflow: "auto",
  transitionDuration: expanded ? "200ms" : "0s",
  transitionProperty: "width, min-width",
});

const expansionToggleButtonStyles: Partial<IButtonStyles> = {
  root: { width: "3rem", maxWidth: "100%", height: "36px" },
  icon: { fontSize: "8px", height: "8px", width: "8px", lineHeight: "8px" },
};

const collapsedNavStyles: Partial<INavStyles> = {
  root: {
    ".nav-group-name": { display: "none" },
  },
  link: {
    padding: 0,
    ".ms-Button-flexContainer": { justifyContent: "center" },
  },
  linkText: { display: "none" },
};

const getBodyContainerStyles = (
  leftWidth: string,
  expanded: boolean
): CSSProperties => ({
  width: `calc(100% - ${leftWidth})`,
  overflow: "auto",
  transitionDuration: expanded ? "200ms" : "0s",
  transitionProperty: "width",
});

function useBoolean(
  initialState: boolean
): [
    boolean,
    { setTrue: () => void; setFalse: () => void; toggle: () => void }
  ] {
  const [value, setValue] = useState(initialState);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue((x) => !x);
  return [value, { setTrue, setFalse, toggle }];
}

export interface ILeftNavProps {
  title?: string | JSX.Element;
  titleLink?: string;
  navItems: INavLinkGroup[];
  onRenderGroupHeader?: IRenderFunction<IRenderGroupHeaderProps>;
  styles: Object;
  groups: INavLinkGroup[];
  onClick?: () => void;
  onLinkClick?: () => void;
  selectedKey?: string;
  defaultMenuSelectKey?: string;
}

const FabricNav: React.FunctionComponent<ILeftNavProps> = (props) => {
  const theme = useTheme();

  const onRenderGroupHeader = (group: INavLinkGroup): JSX.Element => {
    return (
      //nav-group-name hidden title when shrink
      <Stack
        className="nav-group-name"
        styles={{
          root: { height: "auto", justifyContent: "center", marginLeft: "8px" },
        }}
      >
        <Text
          styles={{
            root: {
              fontSize: "14px",
              fontWeight: "600",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
          }}
          title={group.name}
        >
          {group.name}
        </Text>
        {group.groupData && group.groupData.locale && (
          <Text
            styles={{
              root: {
                fontSize: "12px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                paddingBottom: 10,
                paddingTop: 5,
                color: theme.palette.neutralSecondary,
              },
            }}
          >
            {group.groupData.locale}
          </Text>
        )}
      </Stack>
    );
  };

  return (
    <Nav
      onLinkClick={() => props.onLinkClick()}
      {...props}
      onRenderGroupHeader={
        props.onRenderGroupHeader
          ? props.onRenderGroupHeader
          : onRenderGroupHeader
      }
    />
  );
};

const MenuPage: React.FunctionComponent<ILeftNavProps> = (
  props: ILeftNavProps
) => {
  const [expanded, { toggle: toggleExpanded }] = useBoolean(true);
  const leftWidth = expanded ? "14.125rem" : "3rem";
  const theme = useTheme();
  return (
    <div style={menuPageContainerStyles}>
      <div style={getNavContainerStyles(leftWidth, theme, expanded)}>
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <IconButton
            styles={expansionToggleButtonStyles}
            iconProps={
              expanded
                ? Icons.DoubleChevronLeft
                : Icons.DoubleChevronRight
            }
            ariaLabel={expanded ? INTL.formatMessage(LeftNavLocalizationFormatMessages.Opened) : INTL.formatMessage(LeftNavLocalizationFormatMessages.Hidden)}
            onClick={toggleExpanded}
          />
        </div>
        {expanded && props.title && (
          <ActionButton
            iconProps={Icons.List}
            onClick={() => props.onClick()}
            styles={{
              root: { height: "44px", marginBottom: "13px" },
            }}
          >
            {props.title}
          </ActionButton>
        )}
        {
          <FabricNav
            onRenderGroupHeader={props.onRenderGroupHeader}
            styles={expanded ? null : collapsedNavStyles}
            groups={props.navItems}
            selectedKey={props.defaultMenuSelectKey}
            navItems={props.navItems}
            onClick={() => props.onClick()}
            onLinkClick={() => props.onLinkClick()}
          />
        }
      </div>
      <div style={getBodyContainerStyles(leftWidth, expanded)}>
      </div>
    </div>
  );
};

export const LeftNav = (props: ILeftNavProps): JSX.Element => {
  return (
    <div className="sr">
      <MenuPage
        navItems={props.navItems}
        defaultMenuSelectKey={props.defaultMenuSelectKey}
        title={props.title}
        titleLink={props.titleLink}
        groups={props.groups}
        selectedKey={props.selectedKey}
        styles={props.styles}
        onClick={() => props.onClick()}
        onLinkClick={() => props.onLinkClick()}
      ></MenuPage>
    </div>
  );
};
