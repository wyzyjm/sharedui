// \FormRecognizerStudio\FormRecognizerStudio\ClientApp\src\view\components\navMenu\navMenu.tsx
import React, { useState } from "react";
import { FontIcon, Text, DefaultButton, MessageBar, MessageBarType, ChoiceGroup } from "@fluentui/react";
import { initializeIcons } from '@fluentui/react/lib/Icons';
import "./RatingBanner.scss"
import { HaTSArea as CS_Hats, HatsProps } from '../Hats/Hats';
import { INTL } from "../../../util/intlUtil";
import { BannerLocalizationFormatMessages } from "../../../clientResources";
initializeIcons(undefined, { disableWarnings: true });

export interface RatingBannerProps {
    onClose: Function;
    headerText: string;
    hatsProp?: HatsProps;  // if hatsProp is passed, the hats panel would be shown on click of the banner.
    onClick: Function;
}

export const RatingBannerArea = (props: RatingBannerProps) => {

    function handleRatingClick(e: any) {
        setIsBannerVisible(false);
        if (props.hatsProp) {
            props.hatsProp.surveyLink = props.hatsProp.surveyLink + '&hats_nps_score=' + e.target.innerText;
            setIsHatsVisible(true);
        }
        props.onClick && props.onClick();
    }

    function handleCancel() {
        setIsBannerVisible(false);
        props.onClose && props.onClose();
    }

    const [isBannerVisible, setIsBannerVisible] = useState(true);
    const [isHatsVisible, setIsHatsVisible] = useState(false);
    const ratings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    return (
        <div>
            {isBannerVisible
                && (
                    <div className="studio-rating-banner">
                        <MessageBar
                            className="message-bar"
                            dismissButtonAriaLabel="Close"
                        >
                            <div className="studio-banner-left">
                                <Text
                                    className="studio-banner-content studio-ratings-banner-span"
                                    tabIndex={0}
                                >
                                    {props.headerText}
                                </Text>

                                <div className="studio-banner-left-align">
                                    <span className="studio-banner-content studio-ratings-banner-span not-at-all-likely">
                                        {INTL.formatMessage(BannerLocalizationFormatMessages.NotAtAllLikely)}
                                    </span>
                                    <div className="studio-ratings-banner">
                                        {ratings.map((e) => (
                                            <label>
                                                <ChoiceGroup
                                                    className="inlineflex"
                                                    aria-label="Rating"
                                                    label={e}
                                                    options={[{ key: e, text: "" }]}
                                                    onClick={handleRatingClick}
                                                />
                                            </label>
                                        ))}
                                    </div>
                                    <span className="studio-banner-content studio-ratings-banner-span extremely-likely">
                                        {INTL.formatMessage(BannerLocalizationFormatMessages.ExtremelyLikely)}
                                    </span>
                                </div>
                            </div>
                            <button
                                id="studio-rating-banner-close-button"
                                onClick={handleCancel}
                            >
                                <FontIcon
                                    title={"Close"}
                                    iconName="CalculatorMultiply"
                                />
                            </button>
                        </MessageBar>
                    </div>
                )}
            {isHatsVisible && (<CS_Hats {...props.hatsProp} />)
            }
        </div>
    );
};