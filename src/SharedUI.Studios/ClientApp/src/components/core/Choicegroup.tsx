import * as React from "react";
import {
  IChoiceGroupOption,
  ChoiceGroup as FluentChoiceGroup,
} from "@fluentui/react/lib/ChoiceGroup";

export interface IChoiceGroupProps {
  defaultSelectedKey: string;
  options: IChoiceGroupOption[];
  onChange: Function;
  label: string;
  required: boolean;
}

export const ChoiceGroup = (props: IChoiceGroupProps): JSX.Element => {
  return (
    <div>
      <FluentChoiceGroup
        defaultSelectedKey={props.defaultSelectedKey}
        options={props.options}
        onChange={(e) => props.onChange()}
        label={props.label}
        required={props.required}
      />
    </div>
  );
};
