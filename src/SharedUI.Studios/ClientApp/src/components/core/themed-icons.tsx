import { FontIcon, ISpinnerProps, Spinner, SpinnerSize, Stack } from "@fluentui/react";
import React, { CSSProperties } from "react";

export interface IconProp {
  style?: CSSProperties;
}

const statusIconStyle = { width: 16, height: 16 };

const FailedStatusIcon = (props: IconProp): JSX.Element => {
  return (
    <Stack style={{ color: "#A80000" }}>
      <FontIcon iconName="ErrorBadge" style={props?.style || statusIconStyle} />
    </Stack>
  );
};

const SuceededStatusIcon = (props: IconProp): JSX.Element => {
  return (
    <Stack style={{ color: "#107C10" }}>
      <FontIcon iconName="Completed" style={props?.style || statusIconStyle} />
    </Stack>
  );
};

const ExpiredStatusIcon = (props: IconProp): JSX.Element => {
  return (
    <Stack style={{ color: "#D83B01" }}>
      <FontIcon iconName="Warning12" style={props?.style || statusIconStyle} />
    </Stack>
  );
};

const ProcessingStatusIcon = (props: ISpinnerProps): JSX.Element => {
  return (
    <Stack verticalAlign="center" style={{ color: "#107C10" }}>
      <Spinner size={props?.size || SpinnerSize.small} />
    </Stack>
  );
};

const CanceledStatusIcon = (props: IconProp): JSX.Element => {
  return (
    <Stack style={{ color: "#797775" }}>
      <FontIcon iconName="ErrorBadge" style={props?.style || statusIconStyle} />
    </Stack>
  );
};

const PausedStatusIcon = (props: IconProp): JSX.Element => {
  return (
    <Stack style={{ color: "#797775" }}>
      <FontIcon iconName="CirclePause" style={props?.style || statusIconStyle} />
    </Stack>
  );
};

const SuspendedStatusIcon = (props: IconProp): JSX.Element => {
  return (
    <Stack style={{ color: "#A80000" }}>
      <FontIcon iconName="Blocked2" style={props?.style || statusIconStyle} />
    </Stack>
  );
};

const RecentStatusIcon = (props: ISpinnerProps): JSX.Element => {
  return (
    <Stack verticalAlign="center" style={{ color: "#797775" }}>
      <FontIcon iconName="Recent" style={props?.style || statusIconStyle} />
    </Stack>
  );
};

export const StatusIcons = {
  Succeeded: SuceededStatusIcon,
  Failed: FailedStatusIcon,
  Expired: ExpiredStatusIcon,
  Canceled: CanceledStatusIcon,
  Processing: ProcessingStatusIcon,
  Paused: PausedStatusIcon,
  Suspended: SuspendedStatusIcon,
  Recent: RecentStatusIcon,
};
