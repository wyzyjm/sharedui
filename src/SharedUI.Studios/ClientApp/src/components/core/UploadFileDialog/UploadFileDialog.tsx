import React, { useRef, useState } from "react";
import { initializeComponent, withLocalization } from "../../../services/localization";
import {
    FontIcon,
    Link,
    MessageBar,
    MessageBarType,
    Text,
    useTheme,
    Stack
  } from "@fluentui/react";
  import { INTL } from "../../../util/intlUtil";
  import { UploadFileDialogFormatMessages, FormatMessagePlaceholder } from "../../../clientResources";
  import { Icons } from "../Icons";


//Max allowed size is 200MB for local file upload.
const MAX_ALLOWED_FILE_SIZE_IN_MB_LOCAL_OVERRIDE = 200;

export const getUploadFileType = (fileTypeSuffix: string): string => {
    return fileTypeSuffix;
};
  
export const getValidFileExtension = (fileTypeSuffix: string): string => {
    return "." + getUploadFileType(fileTypeSuffix);
}
  
export const isFileFormatValid = (file: File, fileTypeSuffix: string): boolean => {
    const type = getUploadFileType(fileTypeSuffix);
    return file && type && file.name.endsWith(`.${type}`);
};

export const getMaxFileSizeInMB = (isLocalFile: boolean = false, maxFileSizeInMB?: number) => {
  let maxFileSize = maxFileSizeInMB;

  if (isLocalFile) {
    maxFileSize = Math.min(maxFileSize, MAX_ALLOWED_FILE_SIZE_IN_MB_LOCAL_OVERRIDE);
  }

  return maxFileSize;
}

export const isFileSizeValid = (file: File, isLocalFile: boolean = false, maxFileSizeInMB?: number ): boolean => {
  if (file.size === 0) {
    return false;
  }

  const MAX_TEXT_FILE_SIZE_IN_MB = getMaxFileSizeInMB(isLocalFile, maxFileSizeInMB);
  return file.size <= (MAX_TEXT_FILE_SIZE_IN_MB * 1000000);
};


export interface UploadFileDialogProps {
    fileTypeSuffix: string;
    textDataset: string;
    isApiInProgress: boolean;
    maxFileSizeInMB: number;
    onFileChange: (file: File) => void;
}

interface UploadParam {
    name: string;
    uploadFromLocal: boolean;
    file: File;
}

export const UploadFileDialogWrap = (props: UploadFileDialogProps): JSX.Element => {
  const { isApiInProgress, fileTypeSuffix, maxFileSizeInMB, onFileChange, textDataset } = props
  const [params, setParams] = useState({
    name: "",
    uploadFromLocal: true,
    file: null as File,
  } as UploadParam);
  const [isDroping, setIsDroping] = useState(false);
  const filesInput = useRef(null) as React.RefObject<HTMLInputElement>;
  const uploadFileType = getUploadFileType(fileTypeSuffix);
  const [uploadFile, setUploadFile] = useState(params.uploadFromLocal ? params.file : (null as File));
  const theme = useTheme();

  const handleDrop = (e: any) => {
    setIsDroping(false);
    
    if (!isApiInProgress && e.dataTransfer && e.dataTransfer.files) {
      const file = e.dataTransfer.files[0];
      
      setUploadFile(file);
      onFileChange(file);
    }
    e.preventDefault();
    e.stopPropagation();
  };
  
  return (
    <>
      <Stack grow>
          <Stack grow
            verticalAlign="center"
            styles={{
              root: {
                border: isDroping ? `2px dashed ${theme.palette.themePrimary}` : "transparent",
                backgroundColor: theme.palette.neutralLighterAlt,
              }
            }}
            onDrop={handleDrop}
            onDragOver={e => {
              setIsDroping(true);
              e.preventDefault();
              e.stopPropagation();
            }}
            onDragLeave={e => {
              setIsDroping(false);
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Stack.Item align="center">
              <FontIcon iconName={Icons.CloudUpload.iconName} style={{ fontSize: "40px" }} />
            </Stack.Item>
            <Stack.Item className="message" align="center">{INTL.formatMessage(UploadFileDialogFormatMessages.DragAndDrop)}</Stack.Item>
            <Stack.Item align="center">
              <Link disabled={isApiInProgress} onClick={() => filesInput.current.click()} style={{ color: theme.palette.themeDark }}>
                {INTL.formatMessage(UploadFileDialogFormatMessages.BrowseForFiles)}
                <input
                  type="file"
                  disabled={isApiInProgress}
                  ref={filesInput}
                  accept={`.${uploadFileType}`}
                  multiple={false}
                  style={{ display: "none" }}
                  onChange={() => {
                    const fileList: FileList = filesInput.current.files;
                    if (fileList) {
                      setUploadFile(fileList[0]);
                      onFileChange(fileList[0]);
                    }
                  }}
                />
              </Link>
            </Stack.Item>
            <Stack.Item align="center">
              <Text styles={{ root: { fontWeight: "normal", display: "block", marginTop: "6px" } }}>
                {`${getValidFileExtension(fileTypeSuffix)} (<${getMaxFileSizeInMB(true, maxFileSizeInMB)}MB, ` + textDataset + `)`}
              </Text>
            </Stack.Item>
          </Stack>
          {uploadFile && !isFileFormatValid(uploadFile, fileTypeSuffix) && (
            <MessageBar
              messageBarType={MessageBarType.error}
              isMultiline={false}
              onDismiss={() => {
                setUploadFile(null);
                onFileChange(null);
              }}
            >
              {INTL.formatMessage(UploadFileDialogFormatMessages.YourDataFormatIsInvalidPleaseArchiveCorrectFile, {
                [FormatMessagePlaceholder]: uploadFileType,
              })}
            </MessageBar>
          )}
          {uploadFile &&
            isFileFormatValid(uploadFile, fileTypeSuffix) &&
            (isFileSizeValid(uploadFile, true, maxFileSizeInMB) ? (
              <MessageBar
                messageBarType={MessageBarType.success}
                isMultiline={false}
                onDismiss={() => {
                  setUploadFile(null);
                  onFileChange(null);
                }}
              >
                {
                  INTL.formatMessage(UploadFileDialogFormatMessages.SelectedFileForUpload, {
                    [FormatMessagePlaceholder]: uploadFile.name,
                  })
                }
              </MessageBar>
            ) : uploadFile.size > 0 ? (
              <MessageBar
                messageBarType={MessageBarType.error}
                isMultiline={false}
                onDismiss={() => {
                  setUploadFile(null);
                  onFileChange(null);
                }}
              >
                {INTL.formatMessage(UploadFileDialogFormatMessages.YourDataIsOversizedPleaseDivideAndUpload)}
              </MessageBar>
            ) : (
              <MessageBar
                messageBarType={MessageBarType.error}
                isMultiline={false}
                onDismiss={() => {
                  setUploadFile(null);
                  onFileChange(null);
                }}
              >
                {INTL.formatMessage(UploadFileDialogFormatMessages.EmptyFilePleaseCheckYourData)}
              </MessageBar>
            ))}
      </Stack>
    </>
  );
}

export const UploadFileDialog = withLocalization(initializeComponent(UploadFileDialogWrap))
  