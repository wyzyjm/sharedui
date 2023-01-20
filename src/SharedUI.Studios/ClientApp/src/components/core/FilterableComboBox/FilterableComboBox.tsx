import {
  ComboBox,
  IAutofillProps,
  IComboBox,
  IComboBoxOption,
  IComboBoxProps,
  SelectableOptionMenuItemType,
} from "@fluentui/react";
import _ from "lodash";
import "../core.scss";
import React, { useEffect, useRef, useState } from "react";
import { FilterableComboBoxFormatMessages } from "../../../clientResources";
import { initializeComponent, withLocalization } from "../../../services/localization";
import { INTL } from "../../../util/intlUtil";

export interface IFilterableComboBoxOption extends IComboBoxOption {
  additionalFilterText?: string;
}

export interface IFilterableComboBoxProps
  extends Omit<IComboBoxProps, "options" | "onChange" | "allowFreeform" | "ref"> {

  options: IFilterableComboBoxOption[];

  /**
   * Whether the input auto focus after the first render
   */
  autoFocus?: boolean;

  /**
   * Whether menu should be opened when get focus
   */
  openMenuOnFocus?: boolean;

  /**
   * Whether trigger onChange event if the input value is not in options
   */
  optionCustomizable?: boolean;

  /**
   * Whether the caret down icon button is hidden
   */
  caretDownButtonHidden?: boolean;

  /**
   * Whether options can be filterted by the input value
   */
  filterable?: boolean;

  isShowAllOnly?: boolean;

  onChange?: (selectedKey?: string | string[]) => void;
}

const optionAll = "all";

const FilterableComboBoxInternal = ({
  options: initOptions,
  autoFocus,
  openMenuOnFocus,
  optionCustomizable,
  caretDownButtonHidden,
  filterable,
  onChange,
  ...originalProps
}: IFilterableComboBoxProps): JSX.Element => {
  const componentRef = useRef<IComboBox>();
  const inputRef = useRef<HTMLInputElement>(null);
  const menuOpened = useRef(false);
  const [autoFill, setAutoFill] = useState(false);
  const [options, setOptions] = useState(initOptions);
  const [texts, setTexts] = useState("" as string);
  const [selectedKeys, setSelectedKeys] = useState(originalProps.selectedKey);

  useEffect(() => {
    autoFocus && componentRef.current && handleFocus();
  }, []);

  useEffect(() => {
    if (originalProps.multiSelect) {
      setSelectedKeys(originalProps.selectedKey);
      setTexts(getText(originalProps.selectedKey as string[]));
    }
  }, [originalProps.selectedKey]);

  useEffect(() => {
    setOptions(initOptions);
  }, [initOptions]);

  const handleChange = (event: React.FormEvent<IComboBox>, option: IComboBoxOption, index: number, value: any) => {
    // void event, index;
    if (!onChange) return;

    if (option) {
      onChange(option.key.toString());
    } else if (optionCustomizable && value) {
      onChange(value);
    }

    setOptions(initOptions);
  };

  const handleMultiSelectChange = (event: any, option?: IComboBoxOption): void => {
    let selected = option?.selected;
    if (event.type == "blur") return;
    if (option || event.currentTarget.value) {
      const selectValue = option
        ? option.key
        : _.filter(options, op => op.text.toLowerCase().includes(event.currentTarget.value?.toLowerCase()))[0]?.key;
      if (typeof selected == "undefined") {
        selected = !(selectedKeys as string[]).includes(selectValue as string);
      }
      if (typeof selected != "undefined" && typeof selectValue != "undefined") {
        if (selectValue == "all") {
          const newSelectKeys = selected ? _.map(initOptions, option => option.key as string) : [];
          onChange(newSelectKeys);
          setSelectedKeys(newSelectKeys);
          setTexts(getText(newSelectKeys));
        } else {
          setSelectedKeys(prevSelectedKeys => {
            const selectkeys = selected
              ? [...(prevSelectedKeys as string[]), selectValue as string]
              : (prevSelectedKeys as string[]).filter(k => k !== selectValue && k != optionAll);
            onChange(selectkeys);
            setTexts(getText(selectkeys));
            return selectkeys;
          });
        }
      }
    }
  };

  const handleFocus = (e?: any) => {
    if (originalProps.disabled) return;

    if (!e || e?.target instanceof HTMLInputElement) {
      openMenuOnFocus && !menuOpened.current && componentRef.current?.focus(true);
    }

    if (optionCustomizable) {
      inputRef.current = inputRef.current || e?.target;
    }
  };

  const handleInput = (e: any) => {
    if ((e.nativeEvent as any)?.isComposing) return;

    handleFocus(e);

    if (!filterable) return;

    const newValue = e.target.value;
    const selectedOption = originalProps.selectedKey && _.find(initOptions, x => x.key == originalProps.selectedKey);
    const isDefaultSelection = !newValue || newValue == selectedOption?.text;
    if (isDefaultSelection) {
      setOptions(initOptions);
    } else {
      const nextOptions = initOptions.filter(
        item =>
          item.itemType !== SelectableOptionMenuItemType.Header &&
          item.text &&
          [item.text, item.additionalFilterText]
            .join(",")
            .toLowerCase()
            .includes(newValue.toLowerCase())
      );
      setOptions(nextOptions);
    }
  };

  const handleMenuOpen = () => {
    menuOpened.current = true;
    if (originalProps.multiSelect) {
      if ((selectedKeys as string[]).includes(optionAll)) {
        setOptions(initOptions);
      } else {
        const selectOptions = _.sortBy(
          initOptions.filter(item => (selectedKeys as string[]).includes(item.key as string)),
          op => op.text
        );
        const unSelectOptions = _.sortBy(
          initOptions.filter(item => item.key != optionAll && !(selectedKeys as string[]).includes(item.key as string)),
          op => op.text
        );
        setOptions([
          {
            key: optionAll,
            text: INTL.formatMessage(FilterableComboBoxFormatMessages.All),
          } as IFilterableComboBoxOption,
          ...selectOptions,
          ...unSelectOptions,
        ]);
      }
    } else {
      setOptions(initOptions);
    }
    setAutoFill(true);
  };

  const getText = (selects: string[]) => {
    const selectOptions = _.filter(initOptions, x => selects?.includes(x.key as string));
    const texts = _.map(selectOptions, item => item.text).toString();
    if (originalProps.isShowAllOnly && selects?.includes("all")) return "All";
    else return texts;
  };

  const handleMenuDismissed = () => {
    menuOpened.current = false;
    optionCustomizable && onChange?.(inputRef.current?.defaultValue);
    setAutoFill(false);
  };

  const autoFillProps: IAutofillProps = !autoFill
    ? null
    : {
      updateValueInWillReceiveProps: () => {
        return !menuOpened.current ? componentRef.current.selectedOptions[0]?.text : null;
      },
    };

  return (
    <ComboBox
      componentRef={componentRef}
      allowFreeform
      useComboBoxAsMenuWidth
      options={options}
      onChange={originalProps.multiSelect ? handleMultiSelectChange : handleChange}
      onMenuDismissed={handleMenuDismissed}
      onMenuOpen={handleMenuOpen}
      onClick={handleFocus}
      onInput={handleInput}
      onCompositionEnd={handleInput}
      autofill={autoFillProps}
      selectedKey={selectedKeys}
      comboBoxOptionStyles={{
        optionTextWrapper: { height: "auto" },
        optionText: { overflow: "visible", whiteSpace: "normal" },
      }}
      styles={caretDownButtonHidden && { root: { paddingRight: "12px" } }}
      caretDownButtonStyles={caretDownButtonHidden && { root: { display: "none" } }}
      text={originalProps.multiSelect ? texts : null}
      {...originalProps}
    />
  );
};

export const FilterableComboBox = withLocalization(initializeComponent(FilterableComboBoxInternal));