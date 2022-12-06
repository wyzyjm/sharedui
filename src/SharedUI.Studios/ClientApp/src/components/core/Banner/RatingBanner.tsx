// \FormRecognizerStudio\FormRecognizerStudio\ClientApp\src\view\components\navMenu\navMenu.tsx
import React, { useState } from "react";
import { FontIcon, Text, DefaultButton } from "@fluentui/react";
import { initializeIcons } from '@fluentui/react/lib/Icons';
import "./Banner.scss"
import { HaTSArea as CS_Hats, HatsProps } from '../Hats/Hats';
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

    return (
        <div>
            {isBannerVisible
                && (<div className="studio-banner">
                    <div className="studio-banner-left">
                        <Text
                            className="studio-banner-content studio-ratings-banner-span"
                            tabIndex={0}
                        >
                            {props.headerText}
                        </Text>
                        <div className="studio-banner-left-align">
                            <span className="studio-banner-content studio-ratings-banner-span">Not at all likely</span>
                            <ul className="studio-ratings-banner">
                                <li onClick={handleRatingClick}>0</li>
                                <li onClick={handleRatingClick}>1</li>
                                <li onClick={handleRatingClick}>2</li>
                                <li onClick={handleRatingClick}>3</li>
                                <li onClick={handleRatingClick}>4</li>
                                <li onClick={handleRatingClick}>5</li>
                                <li onClick={handleRatingClick}>6</li>
                                <li onClick={handleRatingClick}>7</li>
                                <li onClick={handleRatingClick}>8</li>
                                <li onClick={handleRatingClick}>9</li>
                                <li onClick={handleRatingClick}>10</li>
                            </ul>
                            <span className="studio-banner-content studio-ratings-banner-span">Extremely likely</span>
                        </div>
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

