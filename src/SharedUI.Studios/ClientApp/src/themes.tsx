// Taken from speech studio.

import { createTheme } from "@fluentui/react";

export const defaultTheme = {
  header: createTheme({
    defaultFontStyle: { fontSize: "1rem" },
    palette: {
      themePrimary: "#ffffff",
      themeLighterAlt: "#767676",
      themeLighter: "#a6a6a6",
      themeLight: "#c8c8c8",
      themeTertiary: "#d0d0d0",
      themeSecondary: "#dadada",
      themeDarkAlt: "#eaeaea",
      themeDark: "#f4f4f4",
      themeDarker: "#f8f8f8",
      neutralLighterAlt: "#0075ce",
      neutralLighter: "#0073cb",
      neutralLight: "#006ec2",
      neutralQuaternaryAlt: "#0067b5",
      neutralQuaternary: "#0062ad",
      neutralTertiaryAlt: "#005ea6",
      neutralTertiary: "#c8c8c8",
      neutralSecondary: "#d0d0d0",
      neutralPrimaryAlt: "#dadada",
      neutralPrimary: "#ffffff",
      neutralDark: "#f4f4f4",
      black: "#f8f8f8",
      white: "#0078d4",
    },
  }),
  body: createTheme({
    palette: {
      themePrimary: "#0078d4",
      themeLighterAlt: "#eff6fc",
      themeLighter: "#deecf9",
      themeLight: "#c7e0f4",
      themeTertiary: "#71afe5",
      themeSecondary: "#2b88d8",
      themeDarkAlt: "#106ebe",
      themeDark: "#005a9e",
      themeDarker: "#004578",
      neutralLighterAlt: "#faf9f8",
      neutralLighter: "#f3f2f1",
      neutralLight: "#edebe9",
      neutralQuaternaryAlt: "#e1dfdd",
      neutralQuaternary: "#d0d0d0",
      neutralTertiaryAlt: "#c8c6c4",
      neutralTertiary: "#a19f9d",
      neutralSecondary: "#605e5c",
      neutralPrimaryAlt: "#3b3a39",
      neutralPrimary: "#323130",
      neutralDark: "#201f1e",
      black: "#000000",
      white: "#ffffff",
    },
  }),
};