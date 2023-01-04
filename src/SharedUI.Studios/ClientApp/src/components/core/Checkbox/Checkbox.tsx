import { Checkbox as FluentCheckbox } from "@fluentui/react";
import { initializeComponent, useLocalization, withLocalization } from "../../../services/localization";

export interface CheckboxProps {
  checked: boolean,
  disabled: boolean,
  text: string,
  name: string,
  id: string,
  onChange?: () => void
};

const style = {
  marginTop: "15px"
}

const CheckboxInternal = (props: CheckboxProps): JSX.Element => {
  return (
    <div style={style}>
      <FluentCheckbox
        name={props.name}
        disabled={props.disabled}
        id={props.id}
        defaultChecked={props.checked}
        label={props.text}
        onChange={(e) => props.onChange()}
      />
    </div>
  )
};

export const Checkbox = withLocalization(initializeComponent(CheckboxInternal));