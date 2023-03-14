import React, { useState } from "react";
import { FontIcon, Text, MessageBar, CommandBar, ICommandBarItemProps } from "@fluentui/react";
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { HaTSArea as CS_Hats, HatsProps } from '../Hats/Hats';
import { INTL } from "../../../util/intlUtil";
import { BannerLocalizationFormatMessages } from "../../../clientResources";
import { initializeComponent, withLocalization } from "../../../services/localization";
import styled from "styled-components";

initializeIcons(undefined, { disableWarnings: true });

export interface RatingBannerButtonsProps {
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
          @media all and (max-width: 1055px) { 
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
        @media all and (max-width: 1055px) { 
            width: 100%;
            margin-top: 10px;
            min-width: initial;
          }
    
        .negative {
          padding-left: 8px;
          @media all and (max-width: 416px) {
            align-items: left;
          }
        }
    
        .positive {
          @media all and (max-width: 585px) {
            margin-left: -102px;
          }
          @media all and (max-width: 432px) {
            margin-top: -16px;
          }
          @media all and (max-width: 410px) {
            margin-left: 7px;
            margin-top: 20px;
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

const StyledCommandBar = styled(CommandBar)`
        .ms-Button-flexContainer{
            width: 22px;
            height: 24px;
            margin-right: 0;
            background: #0F6CBD;
            border-radius: 4px;
            margin-left: 4px;
        }

        .ms-FocusZone{
            background: rgb(243, 242, 241);
            padding-left: 20px;
            padding-right: 10px;
            @media all and (max-width: 585px) {
                margin-top: 25px;
                margin-left: -65px;
            }
            @media all and (max-width: 432px) { 
                margin-top: 8px;
                margin-left: -10px;
            }
        }
        .ms-CommandBar-primaryCommand {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            padding-bottom: 10px;
        }

        .ms-CommandBarItem-link{
            background-color: rgb(243, 242, 241);
            margin-left: -10px;
            height: 30px;
        }

        .ms-Button-label{
            color: white;
        }
`;

const RatingBannerButtonsInternal = (props: RatingBannerButtonsProps) => {
    const [isBannerVisible, setIsBannerVisible] = useState(true);
    const [isHatsVisible, setIsHatsVisible] = useState(false);
    const ratings: ICommandBarItemProps[] = [
        {
            key: '0',
            text: '0',
            onClick: (key, value) => handleRatingClick(value),
        },
        {
            key: '1',
            text: '1',
            onClick: (key, value) => handleRatingClick(value),
        },
        {
            key: '2',
            text: '2',
            onClick: (key, value) => handleRatingClick(value),
        },
        {
            key: '3',
            text: '3',
            onClick: (key, value) => handleRatingClick(value),
        },
        {
            key: '4',
            text: '4',
            onClick: (key, value) => handleRatingClick(value),
        },
        {
            key: '5',
            text: '5',
            onClick: (key, value) => handleRatingClick(value),
        },
        {
            key: '6',
            text: '6',
            onClick: (key, value) => handleRatingClick(value),
        },
        {
            key: '7',
            text: '7',
            onClick: (key, value) => handleRatingClick(value),
        },
        {
            key: '8',
            text: '8',
            onClick: (key, value) => handleRatingClick(value),
        },
        {
            key: '9',
            text: '9',
            onClick: (key, value) => handleRatingClick(value),
        },
        {
            key: '10',
            text: '10',
            onClick: (key, value) => handleRatingClick(value),
        }
    ];
    function handleRatingClick(value: any) {
        console.log(value);
        setIsBannerVisible(false);
        if (props.hatsProp) {
            props.hatsProp.surveyLink = props.hatsProp.surveyLink + `&Q_PopulateResponse={"QID25":"${value.key}"}`;
            setIsHatsVisible(true);
        }
        props.onClick && props.onClick();
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
                                    <StyledCommandBar items={ratings} onReduceData={() => undefined} />
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

export const RatingBannerButtonsArea = withLocalization(initializeComponent(RatingBannerButtonsInternal));