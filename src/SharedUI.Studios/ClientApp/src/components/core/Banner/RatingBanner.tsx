// \FormRecognizerStudio\FormRecognizerStudio\ClientApp\src\view\components\navMenu\navMenu.tsx
import React, { useState } from "react";
import { FontIcon, Text, DefaultButton, MessageBar, MessageBarType, ChoiceGroup, IChoiceGroupOption } from "@fluentui/react";
import { initializeIcons } from '@fluentui/react/lib/Icons';
import "./RatingBanner.scss";
import "../core.scss";
import { HaTSArea as CS_Hats, HatsProps } from '../Hats/Hats';
import { INTL } from "../../../util/intlUtil";
import { BannerLocalizationFormatMessages } from "../../../clientResources";
initializeIcons(undefined, { disableWarnings: true });
import { initializeComponent, useLocalization, withLocalization } from "../../../services/localization";

export interface RatingBannerProps {
    onClose: Function;
    headerText: string;
    hatsProp?: HatsProps;  // if hatsProp is passed, the hats panel would be shown on click of the banner.
    onClick: Function;
};

const RatingBannerInternal = (props: RatingBannerProps) => {

    function handleRatingClick(e: any, option: IChoiceGroupOption) {
        setIsBannerVisible(false);
        if (props.hatsProp) {
            props.hatsProp.surveyLink = props.hatsProp.surveyLink + `&Q_PopulateResponse={"QID25":"${option.value}"}`;
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
                                    className="studio-banner-content"
                                    tabIndex={0}
                                >
                                    {props.headerText}
                                </Text>
                                <div className="studio-ratings">
                                    <div className="negative">
                                        {INTL.formatMessage(BannerLocalizationFormatMessages.NotAtAll)}
                                    </div>
                                    <div className="ratings">
                                        {ratings.map((e) => (
                                            <label className="rating-number-label">
                                                <ChoiceGroup
                                                    className="inlineflex"
                                                    aria-label="Rating"
                                                    label={e}
                                                    options={[{ key: e, text: "", value: e }]}
                                                    onChange={handleRatingClick}
                                                />
                                            </label>
                                        ))}
                                    </div>
                                    <div className="positive">
                                        {INTL.formatMessage(BannerLocalizationFormatMessages.ExtremelyLikely)}
                                    </div>
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

export const RatingBannerArea = withLocalization(initializeComponent(RatingBannerInternal));