import {
  Breadcrumb, IBreadcrumbItem, ITooltipHostStyles, TooltipOverflowMode, useTheme
} from "@fluentui/react";
import { initializeIcons } from '@fluentui/react/lib/Icons';
import _ from "lodash";

initializeIcons(undefined, { disableWarnings: true });

const breadcrumbTooltipHostStyles: Partial<ITooltipHostStyles> = {
  root: { display: "block", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" },
};

export interface DefaultBreadcrumbProps {
  items: IBreadcrumbItem[];
}

export const StyledBreadcrumb = (props: DefaultBreadcrumbProps) => {
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
      ariaLabel="Breadcrumb"
      styles={{
        root: { margin: "0px" },
        itemLink: {
          fontSize: "0.875rem",
          color: defaultTheme.palette.themePrimary,
        },
        listItem: {
          selectors: {
            ":last-child .ms-Breadcrumb-itemLink": {
              color: defaultTheme.palette.themePrimary,
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
