import { Spinner, SpinnerSize } from "@fluentui/react";
import React from "react";
import { useTheme } from "@fluentui/react-theme-provider";
import { initializeComponent, useLocalization, withLocalization } from "../../services/localization";

// Just display a little circulating loading indicator in the center of the
// page. This will display in coordiance with the page-wide loading indicator
// (meaning that it'll be covered entirely by the page-wide one).
function CircularLoadingIndicatorInternal(): JSX.Element {
  return (
    <div className="loading" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 23332 }}>
      <Spinner style={{ height: "100%" }} size={SpinnerSize.large} />
    </div>
  );
}

// Displays a circulating loading indicator that covers the whole page with
// a light-gray mask.
function CircularLoadingIndicatorPageWideInternal(): JSX.Element {
  const theme = useTheme();
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: theme.palette.neutralTertiary,
          opacity: 0.5,
        }}
      ></div>
      <div className="loading" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 23333 }}>
        <Spinner style={{ height: "100%" }} size={SpinnerSize.large} />
      </div>
    </>
  );
}

export const CircularLoadingIndicator = withLocalization(initializeComponent(CircularLoadingIndicatorInternal));
export const CircularLoadingIndicatorPageWide = withLocalization(initializeComponent(CircularLoadingIndicatorPageWideInternal));