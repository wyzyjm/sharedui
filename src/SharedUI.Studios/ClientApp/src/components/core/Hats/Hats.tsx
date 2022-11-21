import React, { useState } from "react";
import { Panel, PanelType, Link } from "@fluentui/react";
import { CircularLoadingIndicator as Spinner } from '../Spinners'
import { Hr } from '../Hr'

export enum HaTSInteraction {
    None = "",
    Banner = "Banner",
    Smiley = "Smiley",
    AutoFlyout = "AutoFlyout",
}

function buttonId(props: {interaction?:HaTSInteraction,autoFlyout:boolean,button:string}) {
    const {interaction, autoFlyout, button } = props; 
    const analyticsComponent = interaction === HaTSInteraction.Smiley ? "header" : "banner";

    return `hats-${analyticsComponent}-${autoFlyout ? 'autoflyout' : 'manual'}-${button}`;
}

export interface HatsProps {
    onClose: () => void; 
    interaction?: HaTSInteraction; 
    autoFlyout?: boolean | false;
    headerText:string;
    surveyLink:string;
    isOpen?: boolean | true;
}

export const HaTSArea = (props: HatsProps) => {
    const [loading, setLoading] = useState(true);
    const { onClose, interaction, autoFlyout=false, headerText, surveyLink, isOpen } = props;
    const [isPanelOpen, setIsPanelOpen] = useState(isOpen)

    if (!surveyLink || !surveyLink.length) {
        throw new Error("Survey Link is not passed for the HaTSArea component");
    }
 
    function onDismiss() {
        setIsPanelOpen(false);
        onClose?.();
    }
    
    function onLightDismissClick() {
        onClose?.();
    }
    
    return (
         <Panel
            className="profile-6te3ri77ie"
            isOpen={isPanelOpen}
            onDismiss={onDismiss}
            type={PanelType.custom}
            customWidth={"380px"}
            style={{ top: "40px" }}
            isLightDismiss
            onLightDismissClick={onLightDismissClick}
            headerText={headerText || ""}
            layerProps={{ eventBubblingEnabled: true }}
            styles={{ content: { height: "100%" }, scrollableContent: { height: "100%" } }}
        >
            <Link
                href={surveyLink}
                target="_blank"
                data-bi-name={buttonId({interaction,autoFlyout,button:'openinanewwindow'})}
            >
                Open in a new window
            </Link>
            <Hr />
            {loading && (
                <Spinner />
            )}
            <iframe
                title="HaTS-egbi9redea"
                style={{display: loading ? "none" : "", height: "calc(100% - 2rem)", width: "100%", border: "none" }}
                src={surveyLink}
                onLoad={() => {
                    setLoading(false);
                }}
            />
            </Panel>
    );
};