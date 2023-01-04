import React, { useState } from "react";
import { Panel, PanelType, Link } from "@fluentui/react";
import { CircularLoadingIndicator as Spinner } from '../Spinners'
import { Hr } from '../Hr'
import { INTL } from "../../../util/intlUtil";
import { HatsLocalizationFormatMessages } from "../../../clientResources";
import { initializeComponent, useLocalization, withLocalization } from "../../../services/localization";

export enum HaTSInteraction {
    None = "None",
    Banner = "Banner",
    Smiley = "Smiley",
    AutoFlyout = "AutoFlyout",
}

function buttonId(props: { interaction?: HaTSInteraction, autoFlyout: boolean, button: string }) {
    const { interaction, autoFlyout, button } = props;
    const analyticsComponent = interaction === HaTSInteraction.Smiley ? "header" : "banner";

    return `hats-${analyticsComponent}-${autoFlyout ? 'autoflyout' : 'manual'}-${button}`;
}

export interface HatsProps {
    onLoad?: () => void;
    onClose?: () => void;
    onLightDismissClick?: () => void;
    interaction?: HaTSInteraction;
    autoFlyout?: boolean | false;
    headerText: string;
    surveyLink: string;
    isOpen?: boolean | true;
};

export const HatsInternal = (props: HatsProps) => {
    const [loading, setLoading] = useState(true);
    const [isPanelOpen, setIsPanelOpen] = useState(props.isOpen);

    const { onClose, onLoad, interaction, autoFlyout, headerText, surveyLink, isOpen } = props;

    if (!surveyLink || !surveyLink.length) {
        throw new Error("Survey Link is not passed for the HaTSArea component");
    }

    function onDismiss() {
        setIsPanelOpen(false);
        onClose?.();
    }

    function onLightDismissClick() {
        setIsPanelOpen(false);
        onLightDismissClick?.();
    }

    return (
        <Panel
            className="profile-6te3ri77ie"
            role="dialog"
            aria-labelledby="Feedback"
            closeButtonAriaLabel={INTL.formatMessage(HatsLocalizationFormatMessages.Close)}
            isOpen={isPanelOpen}
            onDismiss={onDismiss}
            type={PanelType.custom}
            customWidth={"380px"}
            style={{ top: "40px" }}
            isLightDismiss
            onLightDismissClick={onLightDismissClick}
            headerText={headerText || ""}
            headerTextProps={{ 'aria-level': 2 }}
            layerProps={{ eventBubblingEnabled: true }}
            styles={{ content: { height: "100%" }, scrollableContent: { height: "100%" } }}
        >
            <Link
                href={surveyLink}
                target="_blank"
                data-bi-name={buttonId({ interaction, autoFlyout, button: 'openinanewwindow' })}
            >
                {INTL.formatMessage(HatsLocalizationFormatMessages.OpenInANewWindow)}
            </Link>
            <Hr />
            {loading && (
                <Spinner />
            )}
            <iframe
                title="HaTS-egbi9redea"
                style={{ display: loading ? "none" : "", height: "calc(100% - 2rem)", width: "100%", border: "none" }}
                src={surveyLink}
                onLoad={() => {
                    setLoading(false);
                    onLoad?.();
                }}
            />
        </Panel>
    );
};

export const HaTSArea = withLocalization(initializeComponent(HatsInternal));