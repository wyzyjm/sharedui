// \FormRecognizerStudio\FormRecognizerStudio\ClientApp\src\view\components\navMenu\navMenu.tsx
import React, { useState } from "react";
import { FontIcon, Text, DefaultButton, MessageBar, MessageBarType, ChoiceGroup, IChoiceGroupOption } from "@fluentui/react";
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { HaTSArea as CS_Hats, HatsProps } from '../Hats/Hats';
import { INTL } from "../../../util/intlUtil";
import { BannerLocalizationFormatMessages } from "../../../clientResources";
import { initializeComponent, useLocalization, withLocalization } from "../../../services/localization";
import styled from "styled-components";

initializeIcons(undefined, { disableWarnings: true });

export interface RatingBannerProps {
    onClose: Function;
    headerText: string;
    hatsProp?: HatsProps;  // if hatsProp is passed, the hats panel would be shown on click of the banner.
    onClick: Function;
};

const StyledMessageBar = styled(MessageBar)`
    position: relative;
    height: 100%;
    width: 100%;
`;

const StyledRatingBannerDiv = styled.div`
    .rating-number-label:last-child {
        .ms-Label {
            font-weight: 400;
            padding-left: 2px;
        }
    }

    .rating-number-label:not(:last-child) {
        .ms-Label {
          font-weight: 400;
          padding-left: 5px;

          @media all and (max-width: 390px) {
            margin-left: 2px;
            margin-right: 5px;
          }
        }
    }

    .studio-banner-left {
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        width: 100%;
    
        .studio-banner-content {
          margin: 0 8px;
          cursor: 'pointer';
          font-size: 12px;
          vertical-align: top;
          min-width: 200px;
          width: 45%;

          @media all and (max-width: 965px) { 
            width: 100%;
            padding-right: 32px;
          }
        }
      }
    
      .studio-ratings {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        min-width: 450px;

        @media all and (max-width: 965px) { 
            width: 100%;
            margin-top: 10px;
            min-width: initial;
          }
    
        .negative {
          padding-right: 10px;
          padding-left: 10px;

          @media all and (max-width: 390px) {
            align-items: left;
            padding-left: 5px;
          }
        }
    
        .positive {
          padding-left: 10px;

          @media all and (max-width: 680px) {
            margin-left: -90px;
          }

          @media all and (max-width: 390px) {
            margin-right: 0px;
            margin-top: -5px;
            margin-left: 0px;
            padding-left: 5px;
          }
        }
    
        .ratings {
          margin-top: -5px;

          @media all and (max-width: 680px) {
            margin-left: -60px;
            margin-top: 20px;
          }

          @media all and (max-width: 390px) {
            margin-left: 0px;
            margin-top: 0px;
          }
        }
      }
    
      #studio-rating-banner-close-button {
        position: absolute;
        width: 32px;
        height: 32px;
        right: 0px;
        top: 0px;
        font-family: 'Fabric MDL2 Assets';
        font-style: normal;
        padding-left: 9px;
        font-weight: 400;
        font-size: 10px;
        line-height: 100%;
        display: flex;
        align-items: center;
        text-align: center;
        border: none;
        cursor: pointer;
      }
`;

const StyledChoiceGroup = styled(ChoiceGroup)`
    .ms-ChoiceField {
        @media all and (max-width: 390px) {
            display: inline-block;
            font-family: 'Segoe UI';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            margin-right: .7px;
        }
    }
`;


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
                    <StyledRatingBannerDiv className="studio-rating-banner">
                        <StyledMessageBar
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
                                                <StyledChoiceGroup
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
                        </StyledMessageBar>
                    </StyledRatingBannerDiv>
                )}
            {isHatsVisible && (<CS_Hats {...props.hatsProp} />)
            }
        </div>
    );
};

export const RatingBannerArea = withLocalization(initializeComponent(RatingBannerInternal));