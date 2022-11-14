import {
  Breadcrumb,
  ITooltipHostStyles,
  TooltipOverflowMode,
  useTheme
} from "@fluentui/react";
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons(undefined, { disableWarnings: true });

const breadcrumbTooltipHostStyles: Partial<ITooltipHostStyles> = {
  root: { display: "block", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" },
};

export interface DefaultBreadcrumbProps {
  items: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  key:string,
  text:string,
  href?:string,
  onClick?: () => void;
}

export const StyledBreadcrumb = (props: DefaultBreadcrumbProps) => {
  const theme = useTheme();
  return !props.items ? null : (
    <Breadcrumb
    ariaLabel="Breadcrumb"
    styles={{
      root: { margin: "0px" },
      itemLink: {
        fontSize: "0.875rem",
        color: theme.palette.themePrimary,
      },
      listItem: {
        selectors: {
          ":last-child .ms-Breadcrumb-itemLink": {
            color: theme.palette.themePrimary,
            fontWeight: 400,
            pointerEvents: 'none',
            cursor:'pointer'
          },
        },
      },
    }}
      tooltipHostProps={{
        overflowMode: TooltipOverflowMode.Self,
        styles: breadcrumbTooltipHostStyles,
      }}
      {...props}    />

  );
};
