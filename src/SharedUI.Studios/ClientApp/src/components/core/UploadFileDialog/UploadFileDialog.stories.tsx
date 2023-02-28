import React from 'react';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { UploadFileDialog } from "./UploadFileDialog";
import { ThemeProvider } from "@fluentui/react";
import { SharedComponentsContext } from '../SharedComponentsContext';
import { defaultTheme } from "../../../themes";

export default {
    title: "UploadFileDialog",
    Component: UploadFileDialog
}  as ComponentMeta<typeof UploadFileDialog>

const UploadFileDialogTemplate: ComponentStory<typeof UploadFileDialog> = (args) =>  {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <UploadFileDialog {...args} />
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    )
}

export const UploadFileDialogComponent = UploadFileDialogTemplate.bind({});

UploadFileDialogComponent.args = {
    isApiInProgress: false,
    fileTypeSuffix: 'jsonl',
    textDataset: 'UTF-8 BOM text file',
    maxFileSizeInMB: 100,
    onFileChange: (file) => {console.log(file);},
}
