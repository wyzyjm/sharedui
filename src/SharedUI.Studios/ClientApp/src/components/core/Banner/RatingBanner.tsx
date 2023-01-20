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
    position: absolute;
    left: 0px;
    right: 0px;
    top: 40px;

    @media only screen and (max-width: 1116px) {
        height: 69px;
        top: 40px;
    }

    @media only screen and (max-width: 904px) {
        height: 79px;
        top: 40px;
    }

    @media only screen and (max-width: 680px) {
        height: 144px;
        right: -3px;
        top: 40px;
    }

    @media only screen and (max-width: 480px) {
        position: absolute;
        height: 150px;
        top: 40px;
    }

    @media only screen and (max-width: 390px) {
        height: 154px;
        top: 40px;
    }

    @media only screen and (max-width: 320px) {
        height: 420px;
        top: 40px;
    }
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

          @media only screen and (max-width: 390px) {
            margin-left: 2px;
            margin-right: 5px;
          }
        }
    }

    .studio-banner-left {
        height: 100%;
        display: flex;
        overflow: hidden;
        width: 100%;

        @media only screen and (max-width: 680px) {
            flex-direction: column;
        }

        @media only screen and (max-width: 390px) {
            flex-direction: column;
            margin-left: -30px;
            width: calc(100% + 15px);
        }
    
        .studio-banner-content {
          margin: 0 8px;
          cursor: 'pointer';
          font-size: 12px;
          vertical-align: top;

          @media only screen and (max-width: 1116px) {
            width: 45%;
          }

          @media only screen and (max-width: 904px) {
            width: 25%;
          }

          @media only screen and (max-width: 680px) {
            width: calc(100% - 32px);
          }

          @media only screen and (max-width: 390px) {
            width: calc(100% - 32px);
            margin-left: 28px;
          }
        }
      }
    
      .studio-ratings {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        
        @media only screen and (max-width: 680px) {
            margin-top: 20px;
        }
    
        .negative {
          margin-right: 10px;
          margin-left: 20px;

          @media only screen and (max-width: 1116px) {
            margin-right: 10px;
            margin-left: 0px;
          }

          @media only screen and (max-width: 904px) {
            margin-right: 10px;
            margin-left: 0px;
          }

          @media only screen and (max-width: 680px) {
            margin-left: 8px;
          }

          @media only screen and (max-width: 390px) {
            margin-left: 4px;
            margin-top: -5px;
            align-items: left;
          }
        }
    
        .positive {
          margin-left: 12px;

          @media only screen and (max-width: 680px) {
            margin-left: -90px;
          }

          @media only screen and (max-width: 390px) {
            margin-right: 0px;
            margin-top: -16px;
          }

          @media only screen and (max-width: 320px) {
            margin-left: 0px;
            margin-top: -4px;
          }
        }
    
        .ratings {
          margin-top: -5px;

          @media only screen and (max-width: 680px) {
            margin-left: -60px;
            margin-top: 20px;
          }

          @media only screen and (max-width: 390px) {
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
        margin-right: -5px;
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
        @media only screen and (max-width: 390px) {
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