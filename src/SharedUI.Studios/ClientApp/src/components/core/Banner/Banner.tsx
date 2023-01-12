
// \FormRecognizerStudio\FormRecognizerStudio\ClientApp\src\view\components\navMenu\navMenu.tsx

import React, { useState } from "react";
import { FontIcon, Text, DefaultButton } from "@fluentui/react";
import { initializeIcons } from '@fluentui/react/lib/Icons';
import "./Banner.scss";
import "../core.scss";
import { HaTSArea as CS_Hats, HatsProps, HaTSInteraction } from '../Hats/Hats';
initializeIcons(undefined, { disableWarnings: true });
import { initializeComponent, useLocalization, withLocalization } from "../../../services/localization";

export interface BannerProps {
    onClose: Function;
    headerText: string;
    buttonText: string;
    hatsProp?: HatsProps;  // if hatsProp is passed, the hats panel would be shown on click of the banner.
    onClick: Function;
};

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
                && (<div className="studio-banner">
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
                </div>)}
            {isHatsVisible && (<CS_Hats {...props.hatsProp} />)
            }
        </div>
    );
};

export const BannerArea = withLocalization(initializeComponent(BannerInternal));