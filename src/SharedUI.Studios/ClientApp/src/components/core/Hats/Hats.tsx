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

export const HaTSArea = (props: { 
    onClose: () => void; 
    interaction?: HaTSInteraction; 
    autoFlyout?: boolean;
    headerText:string;
    surveyLink:string;
 }) => {
    const [loading, setLoading] = useState(true);
    const { onClose, interaction, autoFlyout=false, headerText, surveyLink } = props; 

    function onDismiss() {
        onClose?.();
    }
    
    function onLightDismissClick() {
        onClose?.();
    }
    
    return (
        <Panel
            className="profile-6te3ri77ie"
            isOpen={true}
            onDismiss={onDismiss}
            type={PanelType.custom}
            customWidth={"480px"}
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
