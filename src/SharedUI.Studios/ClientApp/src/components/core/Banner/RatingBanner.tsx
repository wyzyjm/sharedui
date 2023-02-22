// \FormRecognizerStudio\FormRecognizerStudio\ClientApp\src\view\components\navMenu\navMenu.tsx
import React, { useState } from "react";
import { FontIcon, Text, MessageBar, ChoiceGroup, IChoiceGroupOption, PrimaryButton } from "@fluentui/react";
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
          color: inherit;

          @media all and (max-width: 1250px) { 
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

        @media all and (max-width: 1250px) { 
            width: 100%;
            margin-top: 10px;
            min-width: initial;
          }
    
        .negative {
          padding-right: 10px;
          padding-left: 10px;

          @media all and (max-width: 416px) {
            align-items: left;
            padding-left: 8px;
          }
        }
    
        .positive {
          padding-left: 10px;

          @media all and (max-width: 704px) {
            margin-left: -100px;
          }

          @media all and (max-width: 416px) {
            margin-right: 0px;
            margin-top: -5px;
            margin-left: 0px;
            padding-left: 8px;
          }
        }
    
        .ratings {
          margin-top: -6px;
          margin-left: 8px;
          margin-right: -8px;

          @media all and (max-width: 704px) {
            margin-left: -60px;
            margin-top: 20px;
          }

          @media all and (max-width: 416px) {
            margin-left: 8px;
            margin-top: 0px;
            margin-right: 5px;
          }

        @media all and (max-width: 320px) { 
            margin-right: 5px;
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
        display: inline-block;

        @media all and (max-width: 390px) {
            display: inline-block;
            font-family: 'Segoe UI';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            margin-right: .7px;
            padding-left: 2px
        }
    }
    .ms-ChoiceFieldLabel {
        margin-top: 30px;
        margin-left: -21px;
        margin-right: 16px;
    }
`;

const StyledLabel = styled.label`
    display: inline-block;
    margin-bottom: 0.5rem;
`;

const StyledDiv = styled.div`
        height: 60px;
        width: 0px;
        margin-left: 10px;
        border: 1px solid #939393;

        @media all and (max-width: 516px) {
            visibility: hidden;
        }
`;

const StyledPrimaryButton = styled(PrimaryButton)`
        width: 100px;
        height: 30px;
        margin-left: 10px;
        top: 17px;
        background: #0F6CBD;
        border-radius: 4px;

        @media all and (max-width: 516px) {
            top: 0px;
        }
        @media all and (max-width: 416px) {
            margin-left: -92px;
            margin-top: 20px;
        }
`;

const RatingBannerInternal = (props: RatingBannerProps) => {
    const [isBannerVisible, setIsBannerVisible] = useState(true);
    const [isHatsVisible, setIsHatsVisible] = useState(false);
    const [selectedKey, setSelectedKey] = useState("");
    const options: IChoiceGroupOption[] = [
        { key: '0', text: '0' },
        { key: '1', text: '1' },
        { key: '2', text: '2' },
        { key: '3', text: '3' },
        { key: '4', text: '4' },
        { key: '5', text: '5' },
        { key: '6', text: '6' },
        { key: '7', text: '7' },
        { key: '8', text: '8' },
        { key: '9', text: '9' },
        { key: '10', text: '10' },
    ];

    function handleRatingClick(e: React.FormEvent, option: IChoiceGroupOption) {
        setSelectedKey(option.key);
    }

    function handleSubmitClick() {
        if (selectedKey != "") {
            setIsBannerVisible(false);
            if (props.hatsProp) {
                props.hatsProp.surveyLink = props.hatsProp.surveyLink + `&Q_PopulateResponse={"QID25":"${selectedKey}"}`;
                setIsHatsVisible(true);
            }
            props.onClick && props.onClick();
        }
    }

    function handleCancel() {
        setIsBannerVisible(false);
        props.onClose && props.onClose();
    }

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
                                >
                                    {props.headerText}
                                </Text>
                                <div className="studio-ratings">
                                    <div className="negative">
                                        {INTL.formatMessage(BannerLocalizationFormatMessages.NotAtAll)}
                                    </div>
                                    <div className="ratings">
                                        <StyledLabel className="rating-number-label">
                                            <StyledChoiceGroup
                                                className="inlineflex"
                                                aria-label="Rating"
                                                options={options}
                                                onChange={handleRatingClick}
                                            />
                                        </StyledLabel>
                                    </div>
                                    <div className="positive">
                                        {INTL.formatMessage(BannerLocalizationFormatMessages.ExtremelyLikely)}
                                    </div>
                                    <StyledDiv></StyledDiv>
                                    <StyledPrimaryButton onClick={handleSubmitClick}>
                                        {INTL.formatMessage(BannerLocalizationFormatMessages.Submit)}
                                    </StyledPrimaryButton>
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