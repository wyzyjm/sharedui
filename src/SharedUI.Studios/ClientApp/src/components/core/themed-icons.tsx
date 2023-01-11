import { FontIcon, ISpinnerProps, Spinner, SpinnerSize, Stack } from "@fluentui/react";
import React, { CSSProperties } from "react";
import { ThemedIconsLocalizationFormatMessages } from "../../clientResources";
import { INTL } from "../../util/intlUtil";

export interface IconProp {
  style?: CSSProperties;
}

const statusIconStyle = { width: 16, height: 16 };

const FailedStatusIcon = (props: IconProp): JSX.Element => {
  return (
    <Stack style={{ color: "#A80000" }}>
      <FontIcon iconName="ErrorBadge" aria-label={INTL.formatMessage(ThemedIconsLocalizationFormatMessages.Failed)} style={props?.style || statusIconStyle} />
    </Stack>
  );
};

const SuceededStatusIcon = (props: IconProp): JSX.Element => {
  return (
    <Stack style={{ color: "#107C10" }}>
      <FontIcon iconName="Completed" aria-label={INTL.formatMessage(ThemedIconsLocalizationFormatMessages.Success)} style={props?.style || statusIconStyle} />
    </Stack>
  );
};

const ExpiredStatusIcon = (props: IconProp): JSX.Element => {
  return (
    <Stack style={{ color: "#D83B01" }}>
      <FontIcon iconName="Warning12" aria-label={INTL.formatMessage(ThemedIconsLocalizationFormatMessages.Expired)} style={props?.style || statusIconStyle} />
    </Stack>
  );
};

const ProcessingStatusIcon = (props: ISpinnerProps): JSX.Element => {
  return (
    <Stack verticalAlign="center" style={{ color: "#107C10" }}>
      <Spinner aria-label={INTL.formatMessage(ThemedIconsLocalizationFormatMessages.Processing)} size={props?.size || SpinnerSize.small} />
    </Stack>
  );
};

const CanceledStatusIcon = (props: IconProp): JSX.Element => {
  return (
    <Stack style={{ color: "#797775" }}>
      <FontIcon iconName="ErrorBadge" aria-label={INTL.formatMessage(ThemedIconsLocalizationFormatMessages.Cancelled)} style={props?.style || statusIconStyle} />
    </Stack>
  );
};

const PausedStatusIcon = (props: IconProp): JSX.Element => {
  return (
    <Stack style={{ color: "#797775" }}>
      <FontIcon iconName="CirclePause" aria-label={INTL.formatMessage(ThemedIconsLocalizationFormatMessages.Paused)} style={props?.style || statusIconStyle} />
    </Stack>
  );
};

const SuspendedStatusIcon = (props: IconProp): JSX.Element => {
  return (
    <Stack style={{ color: "#A80000" }}>
      <FontIcon iconName="Blocked2" aria-label={INTL.formatMessage(ThemedIconsLocalizationFormatMessages.Suspended)} style={props?.style || statusIconStyle} />
    </Stack>
  );
};

const RecentStatusIcon = (props: ISpinnerProps): JSX.Element => {
  return (
    <Stack verticalAlign="center" style={{ color: "#797775" }}>
      <FontIcon iconName="Recent" aria-label={INTL.formatMessage(ThemedIconsLocalizationFormatMessages.Recent)} style={props?.style || statusIconStyle} />
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
