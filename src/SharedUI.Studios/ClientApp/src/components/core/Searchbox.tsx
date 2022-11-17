import { ISearchBoxStyles,  SearchBox as FluentSearchBox } from "@fluentui/react/lib/SearchBox";
import { initializeIcons } from "@fluentui/react";

// Registers a map of icon names, which define how to render icons
initializeIcons();
export interface ISearchBoxProps {
  value: string;
  placeholder: string;
  onClear: Function;
  onChange: Function;
  onSearch: Function;
}

export function SearchBox(props: ISearchBoxProps): JSX.Element {
  const searchBoxStyles: Partial<ISearchBoxStyles> = {
    root: {
      width: 200,
    },
  };

  return (
    <div>
      <FluentSearchBox
        styles={searchBoxStyles}
        placeholder={props.placeholder || ""}
        onClear={ev => {props.onClear()}}
        onChange={(_, newValue) => props.onChange(newValue)}
        onSearch={newValue => props.onSearch(newValue)}
      />
    </div>
  );
};