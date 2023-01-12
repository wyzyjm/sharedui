import {
  Breadcrumb, IBreadcrumbItem, ITooltipHostStyles, TooltipOverflowMode, useTheme
} from "@fluentui/react";
import { initializeIcons } from '@fluentui/react/lib/Icons';
import _ from "lodash";
import "../core.scss";
import { BreadcrumbLocalizationFormatMessages } from "../../../clientResources";
import { initializeComponent, useLocalization, withLocalization } from "../../../services/localization";
import { INTL } from "../../../util/intlUtil";

initializeIcons(undefined, { disableWarnings: true });

const breadcrumbTooltipHostStyles: Partial<ITooltipHostStyles> = {
  root: { display: "block", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" },
};

export interface DefaultBreadcrumbProps {
  items: IBreadcrumbItem[];
};

const StyledBreadcrumbInternal = (props: DefaultBreadcrumbProps) => {
  const defaultTheme = useTheme();

  const breadcrumbs = _.map(props.items, (readcrumb) => {
    if (!readcrumb?.href) {
      readcrumb.style = { color: "black", fontSize: "0.875rem", fontWeight: 400 };
    }
    return readcrumb;
  });

  return !props.items ? null : (
    <Breadcrumb
      items={breadcrumbs}
      ariaLabel={INTL.formatMessage(BreadcrumbLocalizationFormatMessages.NavigationHistory)}
      styles={{
        root: { margin: "0px" },
        itemLink: {
          fontSize: "0.875rem",
          color: defaultTheme.palette.themePrimary,
        },
        listItem: {
          selectors: {
            ":last-child .ms-Breadcrumb-itemLink": {
              color: "black",
              fontWeight: 400,
              pointerEvents: 'none',
              cursor: 'pointer'
            },
          },
        },
      }}
      tooltipHostProps={{
        overflowMode: TooltipOverflowMode.Self,
        styles: breadcrumbTooltipHostStyles,
      }}
      {...props} />

  );
};

export const StyledBreadcrumb = withLocalization(initializeComponent(StyledBreadcrumbInternal));