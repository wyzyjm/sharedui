
// \FormRecognizerStudio\FormRecognizerStudio\ClientApp\src\view\components\navMenu\navMenu.tsx

import React, { useState } from "react";
import { FontIcon, Text, DefaultButton } from "@fluentui/react";
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { HaTSArea as CS_Hats, HatsProps, HaTSInteraction } from '../Hats/Hats';
import { initializeComponent, useLocalization, withLocalization } from "../../../services/localization";
import styled from "styled-components";

initializeIcons(undefined, { disableWarnings: true });

export interface BannerProps {
    onClose: Function;
    headerText: string;
    buttonText: string;
    hatsProp?: HatsProps;  // if hatsProp is passed, the hats panel would be shown on click of the banner.
    onClick: Function;
};

const StyledBannerDiv = styled.div`
    width: 100%;
    height: 32px;
    font-size: 12px;
    outline: 2px solid transparent;
    background-color: #f3f2f1;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
    padding: 0 0 0 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .studio-banner-left {
        height: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;
        width: 100%;

        .studio-banner-content,
        .azure-support-content {
            margin: 0 8px;
        }

        #studio-banner-button,
        #azure-support-button {
            box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.15);
            font-size: 12px;
            background-color: #fff;
            border: 1px solid #8a8886;
            overflow: hidden;
            cursor: pointer;
        }
    }

    #studio-banner-close-button {
        width: 32px;
        height: 32px;
        border: none;
        cursor: pointer;
    }

    @media only screen and (max-width: 448px) {
        height: 42px;
    }

    @media only screen and (max-width: 304px) {
        height: 82px;
    }
    
    @media only screen and (max-width: 260px) {
        height: 102px;
    }
`;

const BannerInternal = (props: BannerProps) => {
    function handleClick() {
        setIsBannerVisible(false);
        if (props.hatsProp) {
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

    return (
        <div>
            {isBannerVisible
                && (<StyledBannerDiv className="studio-banner">
                    <div className="studio-banner-left">
                        <FontIcon
                            iconName="Info"
                            title={"Info-icon"}
                        />
                        <Text
                            className="studio-banner-content"
                            tabIndex={-1}
                        >
                            {props.headerText}
                        </Text>
                        <DefaultButton
                            id="studio-banner-button"
                            styles={{ root: { height: "auto", padding: 3 } }}
                            onClick={handleClick}
                        >
                            {props.buttonText}
                        </DefaultButton>
                    </div>
                    <button
                        id="studio-banner-close-button"
                        onClick={handleCancel}
                    >
                        <FontIcon
                            title={"Close"}
                            iconName="CalculatorMultiply"
                        />
                    </button>
                </StyledBannerDiv>)}
            {isHatsVisible && (<CS_Hats {...props.hatsProp} />)
            }
        </div>
    );
};

export const BannerArea = withLocalization(initializeComponent(BannerInternal));