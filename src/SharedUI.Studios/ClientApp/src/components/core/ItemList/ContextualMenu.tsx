import { ContextualMenu, DirectionalHint, IContextualMenuItem, IContextualMenuProps, Target } from "@fluentui/react";
import React from "react";
import { INTL } from "../../../util/intlUtil";
import { Props as FormattedMessageProps } from "react-intl/src/components/message";

export interface ICustomizedContextualMenuItem extends Partial<IContextualMenuItem> {
  buttonId: string;
  intlTextMessage: FormattedMessageProps;
}

const defineContextualMenuItem = (item: ICustomizedContextualMenuItem): IContextualMenuItem => {
  const { buttonId, intlTextMessage, ...contextualMenuItem } = item;
  return {
    "key": intlTextMessage.id,
    "data-bi-name": buttonId,
    "text": INTL.formatMessage(intlTextMessage, intlTextMessage.values), 
    ...contextualMenuItem,
  };
};

export const defineContextualMenuItems = (items: ICustomizedContextualMenuItem[]): IContextualMenuItem[] =>
  items?.map(defineContextualMenuItem);

export interface IListContextualMenuPartialProps<T> {
  /**
   * The key of container column that will be appended a "more" button
   * The contextual menu will be opend by clicking it
   */
  contextMenuContainerColumnKey: string;
  /**
   * Whether to show the contextual menu when right click a table row
   */
  enableItemContextMenu?: boolean;
  /**
   * Callback to get the contextual menu item definition
   */
  getContextualMenuItems: (items: T[]) => ICustomizedContextualMenuItem[];
}

export interface IListContextualMenuProps<T> extends Partial<IContextualMenuProps> {
  contextualMenuProps: IListContextualMenuPartialProps<T>;
  /**
   * The selected items used to calculate contextual menu items
   */
  selection: T[];
  /**
   * The target that the ContextualMenu should try to position itself based on.
   * It can be either an element, a query selector string resolving to a valid element,
   * or a MouseEvent. If a MouseEvent is given, the origin point of the event will be used.
   */
  eventTarget: EventTarget | Event;
}

export const ListContextualMenu = <T extends {}>({
  contextualMenuProps,
  selection,
  eventTarget,
  ...otherProps
}: IListContextualMenuProps<T>) => {
  if (!contextualMenuProps?.getContextualMenuItems || !eventTarget) {
    return null;
  }

  return (
    <ContextualMenu
      target={eventTarget as Target}
      items={defineContextualMenuItems(contextualMenuProps.getContextualMenuItems(selection))}
      directionalHint={DirectionalHint.rightTopEdge}
      {...otherProps}
    />
  );
};
