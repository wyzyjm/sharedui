import React from "react";
import { Text } from "@fluentui/react";
import { INTL } from "../../../util/intlUtil";
import { FaviconLocalizationFormatMessages } from "../../../clientResources";
import {
  initializeComponent,
  withLocalization,
} from "../../../services/localization";

export function FaviconGuidanceWrap() {
  return (
    <Text>
      {INTL.formatMessage(FaviconLocalizationFormatMessages.Message)}
      <a
        href="https://msazure.visualstudio.com/Cognitive%20Services/_git/Platform-OpenAIPortal/pullrequest/7457796?_a=files"
        target="_blank"
        rel="noreferrer"
      >
        {INTL.formatMessage(FaviconLocalizationFormatMessages.PullRequest)}
      </a>
    </Text>
  );
}

export const FaviconGuidance = withLocalization(
  initializeComponent(FaviconGuidanceWrap)
);
