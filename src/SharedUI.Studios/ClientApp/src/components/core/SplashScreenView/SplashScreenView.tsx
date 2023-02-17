import React from "react";
import { FontIcon, Stack } from "@fluentui/react";

export type SplashScreenViewProps = {
  title: string;
  description?: JSX.Element;
  isShaded?: boolean;
};

export function SplashScreenView(props: SplashScreenViewProps) {
  const { title, description, isShaded } = props;

  return (
    <Stack
      className="splashScreenViewParentContainer"
      styles={{
        root: {
          background: isShaded ? "#FAF9F8" : "",
          textAlign: "center",
          padding: "10px",
          minHeight: "500px",
        },
      }}
    >
      <FontIcon aria-label="box bubbles" iconName="boxbubbles-svg" />
      <h3 className="splashScreenViewChildren">{title}</h3>
      {description && <Stack className="splashScreenViewChildren">{description}</Stack>}
    </Stack>
  );
}
