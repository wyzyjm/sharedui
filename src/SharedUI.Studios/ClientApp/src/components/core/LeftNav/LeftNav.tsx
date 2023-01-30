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
  Link,
  ILinkProps,
  INavProps,
} from "@fluentui/react";
import { CSSProperties, useState } from "react";
import { Icons } from "../Icons";
import { INTL } from "../../../util/intlUtil";
import { LeftNavLocalizationFormatMessages } from "../../../clientResources";
import { initializeComponent, useLocalization, withLocalization } from "../../../services/localization";

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
  titleLink?: ILinkProps;
  navItems: INavLinkGroup[];
  onRenderGroupHeader?: IRenderFunction<IRenderGroupHeaderProps>;
  styles?: Object;
  onLinkClick?: () => void;
  selectedKey?: string;
  defaultMenuSelectKey?: string;
};

const FabricNav: React.FunctionComponent<INavProps> = (props) => {
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
      role="presentation"
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
      <div style={getNavContainerStyles(leftWidth, theme, expanded)} role="navigation" aria-label="Navigation menu">
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <IconButton
            styles={expansionToggleButtonStyles}
            iconProps={
              expanded
                ? Icons.DoubleChevronLeft
                : Icons.DoubleChevronRight
            }
            ariaLabel={expanded ? INTL.formatMessage(LeftNavLocalizationFormatMessages.CollapseNavigation) : INTL.formatMessage(LeftNavLocalizationFormatMessages.ExpandNavigation)}
            onClick={toggleExpanded}
          />
        </div>
        {expanded && props.title && (
          <div style={{ display: "flex" }}>
            <div style={{ paddingTop: "3px" }}>
              <ActionButton
                iconProps={Icons.List}
                ariaLabel="List"
              />
            </div>
            <div style={{ marginTop: "auto", marginBottom: "auto" }}>
              <Link
                styles={{
                  root: { height: "44px", marginBottom: "13px" },
                }}
                {...props.titleLink}>
                {props.title}
              </Link>
            </div>
          </div>
        )}
        {
          <FabricNav
            onRenderGroupHeader={props.onRenderGroupHeader}
            styles={expanded ? null : collapsedNavStyles}
            selectedKey={props.defaultMenuSelectKey}
            groups={props.navItems}
            onLinkClick={() => props.onLinkClick()}
          />
        }
      </div>
      <div style={getBodyContainerStyles(leftWidth, expanded)}>
      </div>
    </div>
  );
};

const LeftNavInternal = (props: ILeftNavProps): JSX.Element => {
  return (
    <div style={{ display: "unset" }}>
      <MenuPage
        navItems={props.navItems}
        defaultMenuSelectKey={props.defaultMenuSelectKey}
        title={props.title}
        titleLink={props.titleLink}
        selectedKey={props.selectedKey}
        styles={props.styles}
        onLinkClick={() => props.onLinkClick()}
      ></MenuPage>
    </div>
  );
};

export const LeftNav = withLocalization(initializeComponent(LeftNavInternal));