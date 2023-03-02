import React, { useState, useEffect } from 'react';
import { Nav, INavStyles, INavLinkGroup, Stack, IStackItemStyles, find } from "@fluentui/react";
import { initializeComponent, withLocalization } from "../../../services/localization";


import styled from 'styled-components';

export const DALLE_PREVIEW_HIDEKEY = "azureopenai_dalle_preview";
export const CHATGPT_PREVIEW_HIDEKEY = "azureopenai_chatgpt_preview";

const navStylesExpanded: Partial<INavStyles> = {
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    border: '1px solid #eee',
    borderBottom: 0,
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  // these link styles override the default truncation behavior
  link: {
    whiteSpace: 'normal',
    lineHeight: 'inherit',
    paddingLeft: '16px',
    paddingRight: '16px',
    minWidth: '228px'
  },
  linkText: {
    color: '#323130'
  },
  chevronIcon: {
    display: 'none'
  },
  chevronButton: {
    display: 'none'
  }
};

const navStylesCollapsed: Partial<INavStyles> = {
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    border: '1px solid #eee',
    borderBottom: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  // these link styles override the default truncation behavior
  link: {
    whiteSpace: 'normal',
    lineHeight: 'inherit',
    paddingLeft: '11px',
    paddingRight: '11px'
  },
  linkText: {
    color: '#323130'
  },
  chevronIcon: {
    display: 'none'
  },
  chevronButton: {
    display: 'none'
  }
};

const stackItemStyles: IStackItemStyles = {
  root: {
    alignItems: 'start',
    display: 'flex',
    height: '100%'
  }
};

const LeftNavStyles = styled.div`
  @media all and (max-width: 992px) {
    .hideOnMediumOrSmallerDevice {
      display: none;
    }
  }
  @media all and (min-width: 992px) {
    .showOnMediumOrLargerDevice {
      display: none;
    }
  }
  .ms-Nav-compositeLink#collapseChevron {
    span {
        justify-content: flex-end;
    }
    button {
      background-color: transparent;
    }
    &:focus {
        outline: none;
    }
    i {
        color: #0078D4;
        font-size: 8px;
        display: flex;
        height: 32px;
        width: 32px;
        align-items: center;
        justify-content: center;
        &:hover {
            background-color: #EDEBE9;
        }
    }
  }

  #tryitout, #management {
      pointer-events: none;
  }

  .ms-Nav-link {
      &:after {
          border-left: 0;
      }
  }

  .ms-Nav-compositeLink#expandChevron {
      button {
          padding-right: 0;
          padding-left: 0;
          span {
              justify-content: center;
              align-items: center;
          }
          &:focus {
              outline: none;
          }
      }
      background-color: transparent;
      &:focus {
          outline: 0;
      }
      i {
          color: #0078D4;
          font-size: 8px;
          height: 32px;
          width: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
              background-color: #EDEBE9;
          }
      }
  }

  .ms-Nav-link {
      border-radius: 0;
      i {
          margin-left: 0;
      }
  }

  .ms-Nav-link[title="Expand/Collapsed"] {
      padding-right: 0;
      position: relative;
      top: -7px;
      right: -5px;
      outline: none;
  }

  .ms-Nav-compositeLink {
      button:disabled {
          color:rgb(50, 49, 48);
      }
  }

  .ms-Nav-groupContent {
      margin-bottom: 0px;
  }

  .navigation-header {
      height: 44px;
      display: flex;
      align-items: center;
      p {
          font-size: 14px;
          font-weight: bold;
          padding-left: 16px;
          margin-bottom: 0px;
      }
  }
`

const _onRenderGroupHeader = (group: INavLinkGroup): JSX.Element => {
  return (
    <div className='navigation-header'>
      <p>{group.name}</p>
    </div>
  )
}

const Navi = (props: {
  subscriptionId: string;
  expandedNaviItems: INavLinkGroup[];
  collapsedNaviItems: INavLinkGroup[];
  expandedStyle: Partial<INavStyles>;
  collapsedStyle: Partial<INavStyles>;
  navigation: (navigate: {pathname: string, search: string}) => void;
  getCurrentUrl: () => string;
  search?: string;
}) => {
  const [naviItems, setNaviItems] = useState(props.expandedNaviItems);
  const [naviStyles, setNaviStyles] = useState(props.expandedStyle);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
     setCurrentUrl(props.getCurrentUrl());
  }, []);

  return (
    <Stack.Item
      grow={0}
      styles={stackItemStyles}
      className="childrenFullHeight"
    >
      <Nav
        styles={naviStyles}
        groups={naviItems}
        selectedKey={currentUrl}
        onRenderLink={(link) => {
          if (link.isExpanded) {
            return <b>{link.name}</b>;
          } else {
            return <div>{link.name}</div>;
          }
        }}
        onLinkClick={(ev, item) => {
          ev.stopPropagation();
          ev.preventDefault();

          if (item.key !== "collapse") {
            setCurrentUrl(item.url);
            props.navigation({
              pathname: `/portal${props.subscriptionId ? `/${props.subscriptionId}` : ''}${item.url.includes('portal') ? '' : `${item.url}`}`,
              search: props.search
            });
          }
          if (item.links && item.links.length) {
            ev.stopPropagation();
            ev.preventDefault();
            return false;
          }
          if (item.key == "collapse") {
            if (naviItems == props.expandedNaviItems) {
              setNaviItems(props.collapsedNaviItems);
              setNaviStyles(props.collapsedStyle);
            } else {
              setNaviItems(props.expandedNaviItems);
              setNaviStyles(props.expandedStyle);
            }
          }
        }}
        onLinkExpandClick={(evt) => {
          evt.stopPropagation();
        }}
        onRenderGroupHeader={_onRenderGroupHeader}
        ariaLabel="Main"
      />
    </Stack.Item>
  );
};

const Navigation = (props: NavigationProps) => {
  const { subscriptionId, navigation, getCurrentUrl, expandedNaviItems,  collapsedNaviItems} = props;
  const navStyle: React.CSSProperties = { height: '100%', marginLeft: '0px' };

  return (
    <>
      <LeftNavStyles>
        <div className="hideOnMediumOrSmallerDevice" style={navStyle}>
          <Navi
            subscriptionId={subscriptionId}
            expandedNaviItems={expandedNaviItems}
            collapsedNaviItems={collapsedNaviItems}
            expandedStyle={navStylesExpanded}
            collapsedStyle={navStylesCollapsed}
            navigation={navigation}
            getCurrentUrl={getCurrentUrl}
          />
        </div>
        <div className="showOnMediumOrLargerDevice" style={navStyle}>
          <Navi
            subscriptionId={subscriptionId}
            expandedNaviItems={collapsedNaviItems}
            collapsedNaviItems={expandedNaviItems}
            expandedStyle={navStylesCollapsed}
            collapsedStyle={navStylesExpanded}
            navigation={navigation}
            getCurrentUrl={getCurrentUrl}
          />
        </div>
      </LeftNavStyles>
    </>
  );
}

export interface NavigationProps {
  subscriptionId?: string,
  expandedNaviItems: INavLinkGroup[];
  collapsedNaviItems: INavLinkGroup[];
  navigation: (navigate: {pathname: string, search: string}) => void;
  getCurrentUrl: () => string;
  search?: string;
}


  
export const LeftNavCustom = withLocalization(initializeComponent(Navigation))