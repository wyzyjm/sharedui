import { IIconProps, registerIcons, useTheme } from "@fluentui/react";
import React, { CSSProperties } from "react";

export type AccessibleKeyDefinition<T> = {
  [key: string]: T;
};
export interface IconProp {
  style?: CSSProperties;
}
function defineIcons<T extends AccessibleKeyDefinition<IIconProps>>(icons: T): T {
  return icons;
}

// TODOs(lesun): These title need to be localized.
// Define the icon with default attrs or styles, Fabric icons: https://aka.ms/uifabric-icons
export const Icons = defineIcons({
  CompassNW: { iconName: "CompassNW" },
  FabricMovetoFolder: { iconName: "FabricMovetoFolder" },
  Delete: { iconName: "Delete" },
  Edit: { iconName: "Edit" },
  Download: { iconName: "Download" },
  Processing: { iconName: "Processing" },
  TestBeaker: { iconName: "TestBeaker" },
  TestPlan: { iconName: "TestPlan" },
  Deploy: { iconName: "Deploy" },
  KnowledgeArticle: { iconName: "KnowledgeArticle" },
  Upload: { iconName: "Upload" },
  Save: { iconName: "Save" },
  SaveAs: { iconName: "SaveAs" },
  PageAdd: { iconName: "PageAdd" },
  Generate: { iconName: "Generate" },
  Refresh: { iconName: "Refresh" },
  ReplyAlt: { iconName: "ReplyAlt" },
  Volume0: { iconName: "Volume0" },
  Volume3: { iconName: "Volume3" },
  VolumeDisabled: { iconName: "VolumeDisabled" },
  Play: { iconName: "Play" },
  CirclePlay: { iconName: "MSNVideos" },
  CirclePlaySolid: { iconName: "MSNVideosSolid" },
  Pause: { iconName: "Pause" },
  CirclePause: { iconName: "CirclePause" },
  Stop: { iconName: "Stop" },
  Undo: { iconName: "Undo" },
  Redo: { iconName: "Redo" },
  CheckMark: { iconName: "CheckMark" },
  Sort: { iconName: "Sort" },
  SortUp: { iconName: "SortUp" },
  SortDown: { iconName: "SortDown" },
  Copy: { iconName: "Copy" },
  PageHeaderEdit: { iconName: "PageHeaderEdit" },
  View: { iconName: "View" },
  Hide3: { iconName: "Hide3" },
  Warning: { iconName: "Warning" },
  WarningSolid: { iconName: "WarningSolid" },
  InfoSolid: { iconName: "InfoSolid" },
  Info: { iconName: "Info" },
  CircleAdditionSolid: { iconName: "CircleAdditionSolid" },
  Add: { iconName: "Add" },
  AddIn: { iconName: "AddIn" },
  Ringer: { iconName: "Ringer" },
  Settings: { iconName: "Settings" },
  Help: { iconName: "Help" },
  WorkItem: { iconName: "WorkItem" },
  OfficeChat: { iconName: "OfficeChat" },
  Send: { iconName: "Send" },
  Money: { iconName: "Money" },
  EraseTool: { iconName: "EraseTool" },
  Cancel: { iconName: "Cancel" },
  ColorSolid: { iconName: "ColorSolid" },
  ToggleLeft: { iconName: "ToggleLeft" },
  ToggleRight: { iconName: "ToggleRight" },
  History: { iconName: "History" },
  FullHistory: { iconName: "FullHistory" },
  Link: { iconName: "Link" },
  NavigateExternalInline: { iconName: "NavigateExternalInline" },
  GiftBoxSolid: { iconName: "GiftBoxSolid" },
  LightningBolt: { iconName: "LightningBolt" },
  ChevronRight: { iconName: "ChevronRight" },
  ChevronLeft: { iconName: "ChevronLeft" },
  ChevronDown: { iconName: "ChevronDown" },
  ChevronUp: { iconName: "ChevronUp" },
  Emoji2: { iconName: "Emoji2" },
  Sad: { iconName: "Sad" },
  PlugDisconnected: { iconName: "PlugDisconnected" },
  PlugConnected: { iconName: "PlugConnected" },
  FileSymlink: { iconName: "FileSymlink" },
  OpenInNewWindow: { iconName: "OpenInNewWindow" },
  More: { iconName: "More" },
  BranchCommit: { iconName: "BranchCommit" },
  Storyboard: { iconName: "Storyboard" },
  NetworkTower: { iconName: "NetworkTower" },
  NewAnalyticsQuery: { iconName: "NewAnalyticsQuery" },
  Feedback: { iconName: "Feedback" },
  AddOnlineMeeting: { iconName: "AddOnlineMeeting" },
  JoinOnlineMeeting: { iconName: "JoinOnlineMeeting" },
  Album: { iconName: "Album" },
  Blog: { iconName: "Blog" },
  AnalyticsReport: { iconName: "AnalyticsReport" },
  CompletedSolid: { iconName: "CompletedSolid" },
  Completed: { iconName: "Completed" },
  ChatBot: { iconName: "ChatBot" },
  DoubleChevronLeft: { iconName: "DoubleChevronLeft" },
  DoubleChevronRight: { iconName: "DoubleChevronRight" },
  DoubleChevronRight12: { iconName: "DoubleChevronRight12" },
  Database: { iconName: "Database" },
  List: { iconName: "List" },
  MoreVertical: { iconName: "MoreVertical", style: { fontSize: "1rem", fontWeight: "bold" } },
  Export: { iconName: "Export" },
  Media: { iconName: "Media" },
  CloudUpload: { iconName: "CloudUpload" },
  Share: { iconName: "Share" },
  Lightbulb: { iconName: "Lightbulb" },
  TextDocument: { iconName: "TextDocument" },
  Page: { iconName: "Page" },
  Switch: { iconName: "Switch" },
  Pin: { iconName: "Pin" },
  Unpin: { iconName: "PinnedSolid" },
  Rename: { iconName: "Rename" },
  FileCSS: { iconName: "FileCSS" },
  OpenFolderHorizontal: { iconName: "OpenFolderHorizontal" },
  addEvent: { iconName: "AddEvent" },
  pageEdit: { iconName: "PageEdit" },
  MiniExpand: { iconName: "MiniExpand" },
  windowEdit: { iconName: "WindowEdit" },
  microphone: { iconName: "Microphone" },
  readingMode: { iconName: "ReadingMode" },
  userFollowed: { iconName: "UserFollowed" },
  MSNVolume: { iconName: "MSNVolume" },
  fangBody: { iconName: "FangBody" },
  headSet: { iconName: "Headset" },
  coffeeScript: { iconName: "CoffeeScript" },
  activateOrders: { iconName: "ActivateOrders" },
  textDocumentShared: { iconName: "TextDocumentShared" },
  speech: { iconName: "Speech" },
  cannedChat: { iconName: "CannedChat" },
  telemarketer: { iconName: "Telemarketer" },
  mail: { iconName: "Mail" },
  workItem: { iconName: "WorkItem" },
  Green: { iconName: "Green" },
  Red: { iconName: "Red" },
  errorBadge: { iconName: "ErrorBadge" },
  unknown: { iconName: "Unknown" },
  CheckboxChecked: { iconName: "CheckboxChecked" },
  CheckboxPartialChecked: { iconName: "CheckboxPartialChecked" },
  CheckboxUnchecked: { iconName: "CheckboxUnchecked" }
})
export const ThemedExternalLinkIcon = (props: IconProp): JSX.Element => {
  const theme = useTheme();
  return (
    <svg style={props?.style} width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 7.75H14.25V14H0.5V0.25H6.75V1.5H1.75V12.75H13V7.75ZM14.25 0.25V6.5H13V2.38867L7.18945 8.18945L6.31055 7.31055L12.1113 1.5H8V0.25H14.25Z"
        fill={theme.palette.themePrimary}
      />
    </svg>
  );
};

// export const BoxbubblesIcon = (props: IIconProps): JSX.Element => 
registerIcons({
  icons: {
    "boxbubbles-svg": (
      <svg
        width="173"
        height="205"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.15" filter="url(#NoDeployment-boxbubbles_svg__a)">
          <path
            d="m77.82 198.848 10.379 1.468 79.952-45.788-90.33-55.835v100.155Z"
            fill="url(#NoDeployment-boxbubbles_svg__b)"
          ></path>
        </g>
        <path
          d="m78.775 74.78 54.608 31.527-.178 62.749-54.608-31.528.178-62.749Z"
          fill="url(#NoDeployment-boxbubbles_svg__c)"
        ></path>
        <path
          d="M24.527 106.307 78.78 74.779l-.178 62.749-54.253 31.529.178-62.75Z"
          fill="url(#NoDeployment-boxbubbles_svg__d)"
        ></path>
        <path
          d="m79.135 137.836-.178 62.749-54.608-31.528.178-62.749 54.608 31.528Z"
          fill="url(#NoDeployment-boxbubbles_svg__e)"
        ></path>
        <path
          d="m133.386 106.308-.178 62.749-54.253 31.528.178-62.749 54.253-31.528Z"
          fill="url(#NoDeployment-boxbubbles_svg__f)"
        ></path>
        <path
          opacity="0.1"
          d="m56.75 158.106 22.384-11.211v-5.69l24.844 27.074 29.721-17.007v-45.019l-54.293 31.418-22.657 20.435Z"
          fill="#000"
        ></path>
        <path
          d="m155.913 86.312-54.608-31.529-22.5 20.018 54.607 31.528 22.501-20.017ZM79.152 137.835l-54.607-31.527L.227 128.051l54.608 31.527 24.317-21.743ZM24.55 106.307l54.253-31.53-21.616-22.572L2.935 83.53l21.614 22.778Z"
          fill="#FFBC6C"
        ></path>
        <path
          d="M94.36 132.124c6.165 0 11.163-4.997 11.163-11.161 0-6.165-4.998-11.162-11.162-11.162-6.165 0-11.162 4.997-11.162 11.162 0 6.164 4.998 11.161 11.162 11.161Z"
          fill="url(#NoDeployment-boxbubbles_svg__g)"
        ></path>
        <path
          d="m100.746 160.625 54.253-31.528-21.822-22.802-54.046 31.552 21.615 22.778Z"
          fill="#FFBC6C"
        ></path>
        <path
          d="M115.618 103.731a9.237 9.237 0 0 0 9.237-9.237 9.237 9.237 0 1 0-9.237 9.237Z"
          fill="url(#NoDeployment-boxbubbles_svg__h)"
        ></path>
        <path
          d="M102.313 70.57a6.928 6.928 0 1 0 0-13.857 6.928 6.928 0 0 0 0 13.857Z"
          fill="url(#NoDeployment-boxbubbles_svg__i)"
        ></path>
        <path
          d="M71.733 119.183c8.078 0 14.626-6.548 14.626-14.626 0-8.077-6.548-14.625-14.626-14.625s-14.626 6.548-14.626 14.625c0 8.078 6.549 14.626 14.626 14.626Z"
          fill="url(#NoDeployment-boxbubbles_svg__j)"
        ></path>
        <path
          d="M98.762 89.417c6.378 0 11.548-5.17 11.548-11.549 0-6.377-5.17-11.548-11.548-11.548S87.214 71.49 87.214 77.87c0 6.377 5.17 11.548 11.548 11.548Z"
          fill="url(#NoDeployment-boxbubbles_svg__k)"
        ></path>
        <path
          d="M84.296 59.908a9.62 9.62 0 0 0 0-19.241 9.62 9.62 0 1 0 0 19.241Z"
          fill="url(#NoDeployment-boxbubbles_svg__l)"
        ></path>
        <path
          d="M107.201 44.048a8.083 8.083 0 1 0 0-16.167 8.083 8.083 0 0 0 0 16.167Z"
          fill="url(#NoDeployment-boxbubbles_svg__m)"
        ></path>
        <path
          d="M98.337 23.404a6.16 6.16 0 1 0 0-12.319 6.16 6.16 0 0 0 0 12.32Z"
          fill="url(#NoDeployment-boxbubbles_svg__n)"
        ></path>
        <path
          d="M115.441 9.737A4.619 4.619 0 1 0 115.44.5a4.619 4.619 0 0 0 .001 9.237Z"
          fill="url(#NoDeployment-boxbubbles_svg__o)"
        ></path>
        <defs>
          <radialGradient
            id="NoDeployment-boxbubbles_svg__b"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(82.19536 -4.84448 4.3512 73.82588 111.649 165.576)"
          >
            <stop stopOpacity="0.75"></stop>
            <stop offset="1" stopOpacity="0"></stop>
          </radialGradient>
          <radialGradient
            id="NoDeployment-boxbubbles_svg__g"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(94.36 120.963) scale(11.1617)"
          >
            <stop stopOpacity="0.15"></stop>
            <stop offset="1" stopOpacity="0"></stop>
          </radialGradient>
          <radialGradient
            id="NoDeployment-boxbubbles_svg__h"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(115.618 94.494) scale(9.23723)"
          >
            <stop stopOpacity="0.15"></stop>
            <stop offset="1" stopOpacity="0"></stop>
          </radialGradient>
          <radialGradient
            id="NoDeployment-boxbubbles_svg__i"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(102.313 63.642) scale(6.92797)"
          >
            <stop stopOpacity="0.15"></stop>
            <stop offset="1" stopOpacity="0"></stop>
          </radialGradient>
          <radialGradient
            id="NoDeployment-boxbubbles_svg__j"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(67.378 98.538) scale(18.7617)"
          >
            <stop offset="0.045" stopColor="#ACF3FD"></stop>
            <stop offset="0.256" stopColor="#73DBF3"></stop>
            <stop offset="0.508" stopColor="#35C1E8"></stop>
            <stop offset="0.693" stopColor="#0FB1E1"></stop>
            <stop offset="0.79" stopColor="#00ABDE"></stop>
            <stop offset="1" stopColor="#0078D4"></stop>
          </radialGradient>
          <radialGradient
            id="NoDeployment-boxbubbles_svg__k"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(95.324 73.116) scale(14.8139)"
          >
            <stop offset="0.045" stopColor="#ACF3FD"></stop>
            <stop offset="0.256" stopColor="#73DBF3"></stop>
            <stop offset="0.508" stopColor="#35C1E8"></stop>
            <stop offset="0.693" stopColor="#0FB1E1"></stop>
            <stop offset="0.79" stopColor="#00ABDE"></stop>
            <stop offset="1" stopColor="#0078D4"></stop>
          </radialGradient>
          <radialGradient
            id="NoDeployment-boxbubbles_svg__l"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(81.432 46.328) scale(12.3414)"
          >
            <stop offset="0.045" stopColor="#ACF3FD"></stop>
            <stop offset="0.256" stopColor="#73DBF3"></stop>
            <stop offset="0.508" stopColor="#35C1E8"></stop>
            <stop offset="0.693" stopColor="#0FB1E1"></stop>
            <stop offset="0.79" stopColor="#00ABDE"></stop>
            <stop offset="1" stopColor="#0078D4"></stop>
          </radialGradient>
          <radialGradient
            id="NoDeployment-boxbubbles_svg__m"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(104.794 32.638) scale(10.3693)"
          >
            <stop offset="0.045" stopColor="#ACF3FD"></stop>
            <stop offset="0.256" stopColor="#73DBF3"></stop>
            <stop offset="0.508" stopColor="#35C1E8"></stop>
            <stop offset="0.693" stopColor="#0FB1E1"></stop>
            <stop offset="0.79" stopColor="#00ABDE"></stop>
            <stop offset="1" stopColor="#0078D4"></stop>
          </radialGradient>
          <radialGradient
            id="NoDeployment-boxbubbles_svg__n"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(96.503 14.71) scale(7.90103)"
          >
            <stop offset="0.045" stopColor="#ACF3FD"></stop>
            <stop offset="0.256" stopColor="#73DBF3"></stop>
            <stop offset="0.508" stopColor="#35C1E8"></stop>
            <stop offset="0.693" stopColor="#0FB1E1"></stop>
            <stop offset="0.79" stopColor="#00ABDE"></stop>
            <stop offset="1" stopColor="#0078D4"></stop>
          </radialGradient>
          <radialGradient
            id="NoDeployment-boxbubbles_svg__o"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(114.066 3.218) scale(5.92471)"
          >
            <stop offset="0.045" stopColor="#ACF3FD"></stop>
            <stop offset="0.256" stopColor="#73DBF3"></stop>
            <stop offset="0.508" stopColor="#35C1E8"></stop>
            <stop offset="0.693" stopColor="#0FB1E1"></stop>
            <stop offset="0.79" stopColor="#00ABDE"></stop>
            <stop offset="1" stopColor="#0078D4"></stop>
          </radialGradient>
          <linearGradient
            id="NoDeployment-boxbubbles_svg__c"
            x1="78.597"
            y1="121.917"
            x2="133.383"
            y2="121.917"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F78D1E"></stop>
            <stop offset="1" stopColor="#FFB34D"></stop>
          </linearGradient>
          <linearGradient
            id="NoDeployment-boxbubbles_svg__d"
            x1="24.349"
            y1="121.918"
            x2="78.78"
            y2="121.918"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EF7100"></stop>
            <stop offset="0.999" stopColor="#D15900"></stop>
          </linearGradient>
          <linearGradient
            id="NoDeployment-boxbubbles_svg__e"
            x1="78.957"
            y1="200.585"
            x2="24.527"
            y2="106.308"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.532" stopColor="#F78D1E"></stop>
            <stop offset="1" stopColor="#FAA21D"></stop>
          </linearGradient>
          <linearGradient
            id="NoDeployment-boxbubbles_svg__f"
            x1="5647.22"
            y1="18838.2"
            x2="9496.02"
            y2="18838.2"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EF7100"></stop>
            <stop offset="0.999" stopColor="#D15900"></stop>
          </linearGradient>
          <filter
            id="NoDeployment-boxbubbles_svg__a"
            x="73.82"
            y="94.693"
            width="98.331"
            height="109.622"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="2"
              result="effect1_foregroundBlur_1172_140785"
            ></feGaussianBlur>
          </filter>
        </defs>
      </svg>
    ),
  },
});