import { Dialog, IDialogProps, Text, Stack, FontIcon, StackItem, ActionButton, IIconProps, IButtonStyles, useTheme, Theme, ThemeContext } from "@fluentui/react";
import React, { FunctionComponent, ReactElement } from "react";
import { useBoolean } from '@fluentui/react-hooks';
import "./WizardFlow.scss";
import "../core.scss";
import "../common.scss";

type ReactElementChildren = ReactElement<WizardFlowProps, FunctionComponent>;

const findByType = (children: ReactElementChildren[], component: FunctionComponent): ReactElementChildren => {
  const result: ReactElementChildren[] = [];
  /* This is the array of result since Article can have multiple times the same sub-component */
  const type = [component.displayName || component.name];
  /* We can store the actual name of the component through the displayName or name property of our sub-component */
  React.Children.forEach<ReactElementChildren>(children, (child: ReactElementChildren) => {
    const childType = child && child.type && (child.type.displayName || child.type.name);
    if (!result.length) {
      if (type.includes(childType)) {
        result.push(child);
      }
      const childResult = findByType(child?.props?.children, component);
      childResult && result.push(childResult);
    }
  });

  /* Then we go through each React children, if one of matches the name of the sub-component we’re looking for we put it in the result array */
  return result[0];
};

const Header: FunctionComponent = () => null;
const Subheader: FunctionComponent = () => null;
const Content: FunctionComponent = () => null;
const Footer: FunctionComponent = () => null;

export interface IWizardFlowMenuItem {
  name: string;
  key: string | number;
  status: IWizardFlowStatus;
}

export interface WizardFlowProps extends IDialogProps {
  menuItems: IWizardFlowMenuItem[];
  currentKey: string;
  height: string;
  children?: ReactElementChildren[];
  menuWidth?: number | string;
  /**
   * @description  Use style to determine the width of this dialog
   */
  innerWidth?: number | string;
  /**
   * @deprecated Due to adapting to the screen environment, this attribute is obsolete, please use innerWidth
   */
  minWidth?: number | string;
  /**
   * @deprecated Due to adapting to the screen environment, this attribute is obsolete, please use innerWidth
   */
  maxWidth?: number | string;
}

export interface IWizardFlow extends FunctionComponent<WizardFlowProps> {
  Header: FunctionComponent;
  Subheader: FunctionComponent;
  Content: FunctionComponent;
  Footer: FunctionComponent;
}

export enum IWizardFlowStatus {
  Done = 0,
  Doing = 1,
  Undo = 2,
}

export const WizardFlow: IWizardFlow = function (props: WizardFlowProps) {
  const generateLeftMenu = function (theme: Theme) {
    const menus = [];
    for (let i = 0; i < props.menuItems.length; i++) {
      const item = props.menuItems[i];
      menus.push(
        <Stack key={`icon-${i}`} styles={{ root: { flexDirection: "row" } }}>
          <FontIcon
            iconName={(() => {
              let iconName = "StatusCircleRing";
              switch (item.status) {
                case IWizardFlowStatus.Undo:
                  iconName = "StatusCircleRing";
                  break;
                case IWizardFlowStatus.Done:
                  iconName = "SkypeCircleCheck";
                  break;
                case IWizardFlowStatus.Doing:
                  iconName = "CircleFill";
                  break;
              }
              return iconName;
            })()}
            style={{
              color: (() => {
                let color = "transparent";
                switch (item.status) {
                  case IWizardFlowStatus.Undo:
                    color = "StatusCircleRing";
                    break;
                  case IWizardFlowStatus.Done:
                    color = theme.palette.themePrimary;
                    break;
                  case IWizardFlowStatus.Doing:
                    color = theme.palette.themePrimary;
                    break;
                }
                return color;
              })(),
            }}
          />
          <Text className="step-title" style={{ marginLeft: "8px" }}>
            {item.name}
          </Text>
        </Stack>
      );

      if (i + 1 != props.menuItems.length) {
        menus.push(
          <Stack key={`line-${i}`} styles={{ root: { flexDirection: "row" } }}>
            <Stack
              styles={{
                root: {
                  width: "14px",
                  display: "flex",
                  justifyContent: "center",
                },
              }}
            >
              <hr
                style={{
                  width: "2px",
                  height: "36px",
                  border: "transparent",
                  backgroundColor: theme.palette.neutralQuaternary,
                  marginTop: "0",
                  marginBottom: "0",
                }}
              />
            </Stack>
          </Stack>
        );
      }
    }
    return (
      <Stack horizontalAlign="start" tokens={{ childrenGap: 3 }} style={{ padding: "16px", width: '100%' }}>
        {menus}
      </Stack>
    );
  };

  const HeaderComponent = findByType(props.children, Header);
  const SubheaderComponent = findByType(props.children, Subheader);
  const ContentComponent = findByType(props.children, Content);
  const FooterComponent = findByType(props.children, Footer);

  const [isMenuVisible, { toggle: toggleIsMenuVisible }] = useBoolean(false);
  const theme = useTheme();
  const addChevronDownIcon: IIconProps = { iconName: 'ChevronDown' };
  const addChevronDownIconStyle: IButtonStyles = {
    root: {
      height: 30
    },
    icon: {
      color: theme.palette.neutralPrimary,
    },
  }

  return (
    <ThemeContext.Consumer>
      {(theme: Theme | undefined) => {
        return (
          <Dialog
            styles={{
              root: {
                selectors: {
                  ".ms-Dialog-title": {
                    borderBottom: `1px solid ${theme.palette.neutralLight}`,
                    padding: "16px",
                  },
                  ".ms-Dialog-inner": {
                    padding: "0",
                    width: "100%",
                  },
                  ".ms-Dialog-main": {
                    width: "800px"
                  },
                },
              },
            }}
            {...props}
            maxWidth={"800px"}
          >
            <Stack horizontal styles={{ root: { minHeight: props.height } }}>
              <Stack
                className="wizard-left hidden_medium"
                styles={{
                  root: {
                    minWidth: "30%",
                  },
                }}
              >
                {generateLeftMenu(theme)}
              </Stack>
              <Stack
                className="wizard-right expand_medium"
                styles={{
                  root: {
                    borderLeft: `1px solid ${theme.palette.neutralLight}`,
                    flexDirection: "column",
                    width: '70%',
                    height: "auto",
                    position: 'relative',
                  },
                }}
              >
                {Stack && (
                  <Stack
                    className="wizard-right-header hidden_medium"
                    role="heading"
                    aria-level={2}
                    styles={{
                      root: {
                        padding: "16px 16px 0",
                        fontSize: "20px",
                        fontWeight: "600",
                      },
                    }}
                  >
                    {HeaderComponent.props.children}
                  </Stack>
                )}
                {Stack && (
                  <Stack
                    className="wizard-right-header hidden_medium_large"
                    role="heading"
                    aria-level={2}
                    styles={{
                      root: {
                        padding: "16px",
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottom: `1px solid ${theme.palette.neutralLight}`,
                      },
                    }}
                  >
                    <StackItem styles={{
                      root: {
                        fontSize: "20px",
                        fontWeight: "600",
                      }
                    }}>
                      <FontIcon iconName="CircleFill" style={{ color: theme.palette.themePrimary, fontSize: 14, paddingRight: 7, paddingTop: 6 }} />
                      {HeaderComponent.props.children}
                    </StackItem>
                    <ActionButton
                      styles={addChevronDownIconStyle}
                      iconProps={addChevronDownIcon}
                      onClick={toggleIsMenuVisible}
                      ariaLabel="Show model creation steps" />
                  </Stack>
                )}
                {isMenuVisible && (
                  <Stack
                    className="hidden_medium_large"
                    styles={{
                      root: {
                        position: "absolute",
                        top: 63,
                        background: 'white',
                        width: '100%',
                        zIndex: 1,
                        boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.3)",
                      },
                    }}
                  >
                    {generateLeftMenu(theme)}
                  </Stack>
                )}
                {SubheaderComponent && (
                  <Stack
                    className="wizard-right-header"
                    styles={{
                      root: {
                        padding: "16px 16px 0",
                        fontSize: "14px",
                        fontWeight: "400",
                      },
                    }}
                  >
                    {SubheaderComponent.props.children}
                  </Stack>
                )}
                {ContentComponent && (
                  <Stack
                    className="wizard-right-content"
                    styles={{
                      root: {
                        padding: "10px 32px 16px 16px",
                        flex: "1",
                        overflow: "hidden",
                      },
                    }}
                  >
                    {ContentComponent.props.children}
                  </Stack>
                )}
                {FooterComponent && (
                  <Stack
                    className="wizard-right-footer"
                    styles={{
                      root: {
                        borderTop: `1px solid ${theme.palette.neutralLight}`,
                        padding: "16px 16px",
                        overflow: "hidden",
                        display: 'flex',
                        justifyContent: 'flex-end'
                      },
                    }}
                    verticalAlign="center"
                  >
                    {FooterComponent.props.children}
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Dialog>
        );
      }}
    </ThemeContext.Consumer>
  );
};

WizardFlow.Header = Header;
WizardFlow.Subheader = Subheader;
WizardFlow.Content = Content;
WizardFlow.Footer = Footer;