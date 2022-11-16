import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  IChoiceGroupProps,
  ChoiceGroup as CS_ChoiceGroup,
} from "./Choicegroup";
import { IChoiceGroupOption, ThemeProvider } from "@fluentui/react";
import { defaultTheme } from "../../themes";

export default {
  title: "ChoiceGroup",
  component: CS_ChoiceGroup,
} as ComponentMeta<typeof CS_ChoiceGroup>;

const ChoiceGroupTemplate: ComponentStory<typeof CS_ChoiceGroup> = (args) => (
  <ThemeProvider theme={defaultTheme.body}>
    <CS_ChoiceGroup {...args} />
  </ThemeProvider>
);
const options: IChoiceGroupOption[] = [
  { key: "A", text: "Option A" },
  { key: "B", text: "Option B" },
  { key: "C", text: "Option C" },
  { key: "D", text: "Option D" },
];
export const ChoiceGroup = ChoiceGroupTemplate.bind({});

ChoiceGroup.args = {
  defaultSelectedKey: "B",
  options: options,
  onChange: () => {
    console.log("onChange method called");
  },
  label: "Pick one",
  required: true,
} as IChoiceGroupProps;
