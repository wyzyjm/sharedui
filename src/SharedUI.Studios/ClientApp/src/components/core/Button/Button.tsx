import {
  CommandBarButton,
  IButtonProps
} from "@fluentui/react";
import React from "react";
import "../core.scss";
import { initializeComponent, useLocalization, withLocalization } from "../../../services/localization";
import { Icons } from "../Icons";
import { ButtonLocalizationFormatMessages } from "../../../clientResources";
import { INTL } from "../../../util/intlUtil";

export function MoreActionsButtonInternal(props: IButtonProps): JSX.Element {
  return (
    <CommandBarButton
      title={INTL.formatMessage(ButtonLocalizationFormatMessages.More)}
      styles={{
        root: {
          float: "right",
          margin: "-0.625rem",
          marginLeft: "0.25rem",
          marginRight: "-0.5rem",
          height: "2.5rem",
          width: "2.25rem",
          minWidth: "2.25rem",
          backgroundColor: "inherit",
        },
      }}
      menuIconProps={Icons.MoreVertical}
      {...props}
    />
  );
}

export const MoreActionsButton = withLocalization(initializeComponent(MoreActionsButtonInternal));