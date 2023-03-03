import { Icon, Stack, Text, useTheme } from "@fluentui/react";
import styled from "styled-components";
import { CreateResourceWizardMessages } from "../../../clientResources";
import { urlLinks } from "../../../util/urlLinks";
import { INTL } from "../../../util/intlUtil";

const StyledContainer = styled(Stack)`
width: 100%;
font-weight: 400;
font-size: 14px;
line-height: 1.43;
span {
    color: #1a1a1a;
}

>* {
    margin-bottom: 20px;
    width: 100%;
}


.crw-review-item-title {
    font-weight: 600;
    margin-bottom: 5px;
}
i {
    font-size: 20px;
    line-height: 14px;
    margin-left: 10px;
    cursor: pointer;
    color: #0F6CBD;
}

a {
    text-decoration: none;
    color: #0F6CBD;

    &:hover {
        text-decoration: underline;
    }

    i {
        font-size: 14px;
        margin-left: 3px;
    }
}
span span {
    margin-bottom: 20px;
}

`

export interface ISummaryStepProps {
    kind: 'SummaryStep';

    selectedDirectory: string;
    selectedSubscription: string;
    selectedResource: string;
    selectedLocation: string;
    selectedPricingTier: string;

    onChangeSubscription: () => void;
    onChangeDirectory: () => void;
    onChangeResource: () => void;
    onChangeLocation: () => void;
    onChangePricingTier: () => void;
}

export const SummaryStep = (props: ISummaryStepProps) => {

    const theme = useTheme();

    return (
        <StyledContainer theme={theme} >
            <Stack aria-label={INTL.formatMessage(CreateResourceWizardMessages.SummaryStepAzureDirectoryTitle)}>
                <Text block className="crw-review-item-title" >{INTL.formatMessage(CreateResourceWizardMessages.SummaryStepAzureDirectoryTitle)}</Text>
                <Text block className="crw-review-item-selectedDirectory" >{props.selectedDirectory}</Text>
            </Stack>

            <Stack aria-label={INTL.formatMessage(CreateResourceWizardMessages.SummaryStepSubscriptionTitle)}>
                <Text block className="crw-review-item-title" >{INTL.formatMessage(CreateResourceWizardMessages.SummaryStepSubscriptionTitle)}</Text>
                <Text block className="crw-review-item-selectedSubscription" >
                    {props.selectedSubscription}
                    <Icon onClick={props.onChangeSubscription} iconName="Edit" role="button" aria-label={`Edit ${INTL.formatMessage(CreateResourceWizardMessages.SummaryStepSubscriptionTitle)}`} />
                </Text>
            </Stack>

            <Stack aria-label={INTL.formatMessage(CreateResourceWizardMessages.SummaryStepResourceTitle)}>
                <Text block className="crw-review-item-title" >{INTL.formatMessage(CreateResourceWizardMessages.SummaryStepResourceTitle)}</Text>
                <Text block className="crw-review-item-selectedResource" >
                    {props.selectedResource}
                    <Icon onClick={props.onChangeResource} iconName="Edit" role="button" aria-label={`Edit ${INTL.formatMessage(CreateResourceWizardMessages.SummaryStepResourceTitle)}`} />
                </Text>
            </Stack>

            <Stack aria-label={INTL.formatMessage(CreateResourceWizardMessages.SummaryStepLocationTitle)}>
                <Text block className="crw-review-item-title" >{INTL.formatMessage(CreateResourceWizardMessages.SummaryStepLocationTitle)}</Text>
                <Text block className="crw-review-item-selectedLocation" >
                    {props.selectedLocation}
                    <Icon onClick={props.onChangeResource} iconName="Edit" role="button" aria-label={`Edit ${INTL.formatMessage(CreateResourceWizardMessages.SummaryStepLocationTitle)}`} />
                </Text>
            </Stack>

            <Stack aria-label={INTL.formatMessage(CreateResourceWizardMessages.SummaryStepPricingTierTitle)}>
                <Text block className="crw-review-item-title" >{INTL.formatMessage(CreateResourceWizardMessages.SummaryStepPricingTierTitle)}</Text>
                <Text block className="crw-review-item-selectedPricingTier" >
                    {props.selectedPricingTier}
                    <Icon onClick={props.onChangeResource} iconName="Edit" role="button" aria-label={`Edit ${INTL.formatMessage(CreateResourceWizardMessages.SummaryStepPricingTierTitle)}`} />
                </Text>
            </Stack>

            <Stack aria-label={INTL.formatMessage(CreateResourceWizardMessages.SummaryStepOptionsTitle)}>
                <Text block className="crw-review-item-title" >{INTL.formatMessage(CreateResourceWizardMessages.SummaryStepOptionsTitle)}</Text>
                <Text block >
                    <Text block>
                        {INTL.formatMessage(CreateResourceWizardMessages.SummaryStepOptionsDescriptionPortal)}
                        <a
                            href={urlLinks.headerAzure()}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {INTL.formatMessage(CreateResourceWizardMessages.SummaryStepOptionsDescriptionPortalText)}
                            <Icon iconName="NavigateExternalInline" />
                        </a>
                    </Text>
                    <Text block>
                        {INTL.formatMessage(CreateResourceWizardMessages.SummaryStepOptionsDescriptionOption1)}
                        <br />
                        {INTL.formatMessage(CreateResourceWizardMessages.SummaryStepOptionsDescriptionOption2)}
                        <br />
                        {INTL.formatMessage(CreateResourceWizardMessages.SummaryStepOptionsDescriptionOption3)}
                        <br />
                        {INTL.formatMessage(CreateResourceWizardMessages.SummaryStepOptionsDescriptionOption4)}
                    </Text>
                    <Text block>
                        <a
                            href={urlLinks.advancedOptionsLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {INTL.formatMessage(CreateResourceWizardMessages.SummaryStepOptionsDescriptionLearnMoreText)}
                            <Icon iconName="NavigateExternalInline" />
                        </a>
                    </Text>
                </Text>
            </Stack>
        </StyledContainer>
    )
};