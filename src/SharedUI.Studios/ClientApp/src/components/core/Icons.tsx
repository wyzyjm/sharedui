import { IIconProps } from "@fluentui/react";

export type AccessibleKeyDefinition<T> = {
    [key: string]: T;
};

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
})