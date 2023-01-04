import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ISearchBoxProps, SearchBox as CS_SearchBox } from "./Searchbox";
import { defaultTheme } from "../../../themes";
import { ThemeProvider } from "@fluentui/react";
import { SharedComponentsContext } from '../SharedComponentsContext';

export default {
  title: "SearchBox",
  component: CS_SearchBox,
} as ComponentMeta<any>;

const SearchBoxTemplate: ComponentStory<typeof CS_SearchBox> = (args) => {
  return (
    <ThemeProvider theme={defaultTheme.body}>
      <SharedComponentsContext.Provider value={{ locale: 'en' }}>
        <CS_SearchBox {...args} />
      </SharedComponentsContext.Provider>
    </ThemeProvider>
  );
}

export const Search_Box = SearchBoxTemplate.bind({});

Search_Box.args = {
  value: "",
  placeholder: "Search",
  onClear: () => {
    console.log("onClear method called");
  },
  onChange: () => {
    console.log("onChange method called");
  },
  onSearch: () => {
    console.log("onSearch method called");
  },
} as ISearchBoxProps;
