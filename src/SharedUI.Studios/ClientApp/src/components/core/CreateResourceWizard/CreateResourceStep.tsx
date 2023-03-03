import { Stack, Text, FontIcon, TextField, useTheme, ComboBox } from "@fluentui/react";
import styled from "styled-components";
import { INTL } from "../../../util/intlUtil";
import { CreateResourceWizardMessages } from "../../../clientResources";
// import { FilterableComboBox } from "../FilterableComboBox/FilterableComboBox";
import { AzureSku, ResourceGroup } from "../../../models";

const StyledContainer = styled(Stack)`
width: 100%;
>* {
    margin-bottom: 20px;
    width: 100%;
}
.crw-form-item {
    input {
      border: none !important;
    }
    .crw-form-item-label {
      width: 331px;
      height: 20px;
      margin-bottom: 5px;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: ${props => props.theme ? props.theme.palette.neutralPrimary : "#323130"};
    }

    div {
      width: 331px;
      max-width: 100%;
      height: 32px;
      input {
        line-height: 32px;
        padding: 0 8px;
        border: none;
        box-sizing: border-box;
        background: ${props => props.theme ? props.theme.palette.white : "#ffffff"};
        border: 1px solid ${props => props.theme ? props.theme.palette.neutralPrimary : "#323130"};
        border-radius: 2px;
      }
    }

    .crw-form-item-input {
        max-width: 100%;
        width: 331px;
        height: 32px;
        line-height: 32px;
    }
  }

  .crw-form-item-tip-container {
    display: flex;
    flex-direction: row;
  }

  .crw-form-item-tips-container {
    margin-top: 25px;
    margin-left: 41px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 12px;
    width: 243px;
    background: ${props => props.theme ? props.theme.palette.white : "#ffffff"};
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    i {
      width: 15.86px;
      height: 16px;
      /* Coulnn't found this color in theme */
      color: #424242; 
    }
    span {
      width: 182px;
      margin-left: 7px;
      font-size: 10px;
      line-height: 12px;
      color: ${props => props.theme ? props.theme.palette.neutralPrimary : "#323130"};
    }
  }

  .crw-form-item, .ms-ComboBox {
    max-width: 100%;
  }

  @media (max-width: 660px) {
  .crw-form-item-tip-container {
    flex-wrap: wrap;
    .crw-form-item-tips-container {
        margin-left: 10px;
    }
  }
}

@media (max-width: 648px) {
  .crw-form-item-tip-container {
    flex-wrap: wrap;
    .crw-form-item-tips-container {
        margin-left: 0;
    }
  }
}
`;

export interface ICreateResourceStepProps {
    kind: 'CreateResourceStep';

    resourceGroups: ResourceGroup[];
    selectedResourceGroupId: string;

    resourceName: string;
    locations: {
        id: string;
        displayName: string;
    }[];
    selectedLocationId: string;

    pricingTiers: AzureSku['code'][];
    selectedPricingTierId: string;

    onChangeResourceGroup: (resourceGroupId: string) => void;
    onChangeLocation: (locationId: string) => void;
    onChangePricingTier: (pricingTierId: string) => void;
    onChangeResourceName: (resourceName: string) => void;

    onChangeSubscriptionClick: () => void;
    selectedSubscription: {
        id: string;
        displayName: string;
    };
};

export const CreateResourceStep = (props: ICreateResourceStepProps) => {

    const theme = useTheme()

    const resourceGroups = props.resourceGroups.map(item => ({
        isSelected: props.selectedResourceGroupId === item.id,
        key: item.id,
        value: item.id,
        text: item.name,
    }));

    const locations = props.locations.map(item => ({
        isSelected: props.selectedLocationId === item.id,
        key: item.id,
        value: item.id,
        text: item.displayName,
    }));

    const pricingTiers = props.pricingTiers.map(item => ({
        isSelected: props.selectedPricingTierId === item,
        key: item,
        value: item,
        text: item,
    }));

    return (
        <StyledContainer theme={theme}>

            <Stack>
                <Text block >{INTL.formatMessage(CreateResourceWizardMessages.SubscriptionTitle)}</Text>
                <Text block onClick={props.onChangeSubscriptionClick}>{props.selectedSubscription.displayName}</Text>
            </Stack>


            <ComboBox
                className="crw-form-item crw-form-item-resourceGroup"
                defaultSelectedKey={props.selectedResourceGroupId}
                placeholder={INTL.formatMessage(CreateResourceWizardMessages.ResourceGroupSelectorPlaceholder)}
                label={INTL.formatMessage(CreateResourceWizardMessages.ResourceGroupSelectorTitle)}
                allowFreeInput
                autoComplete="on"
                onChange={(_, option) => props.onChangeResourceGroup(option.key as string)}
                options={resourceGroups}
                iconButtonProps={{ ariaDescription: "dropdown button", role: "button" }}
            />

            <Stack className="crw-form-item-tip-container">
                <Stack className="crw-form-item">
                    <Text className="crw-form-item-label">
                        {INTL.formatMessage(CreateResourceWizardMessages.ResourceNameInputTitle)}
                    </Text>
                    <TextField
                        className="crw-form-item-input"
                        placeholder={INTL.formatMessage(CreateResourceWizardMessages.ResourceNameInputPlaceholder)}
                        onChange={(_, e) => props.onChangeResourceName(e)}
                    />
                </Stack>
                <Stack className="crw-form-item-tips-container">
                    <FontIcon iconName="InfoSolid" />
                    <span>{INTL.formatMessage(CreateResourceWizardMessages.ResourceNameInputTip)}</span>
                </Stack>
            </Stack>

            <Stack className="crw-form-item-tip-container">
                <ComboBox
                    className="crw-form-item crw-form-item-pricingTier"
                    defaultSelectedKey={props.selectedLocationId}
                    placeholder={INTL.formatMessage(CreateResourceWizardMessages.LocationSelectorPlaceholder)}
                    onChange={(_, option) => props.onChangePricingTier(option.key as string)}
                    iconButtonProps={{ ariaDescription: "dropdown button", role: "button" }}
                    options={locations}
                    allowFreeInput
                    autoComplete="on"
                    label={INTL.formatMessage(CreateResourceWizardMessages.LocationSelectorTitle)}
                />
                <Stack className="crw-form-item-tips-container">
                    <FontIcon iconName="InfoSolid" />
                    <span>{INTL.formatMessage(CreateResourceWizardMessages.LocationSelectorTip)}</span>
                </Stack>
            </Stack>

            <Stack className="crw-form-item-tip-container">
                <ComboBox
                    className="crw-form-item crw-form-item-location"
                    defaultSelectedKey={props.selectedPricingTierId}
                    placeholder={INTL.formatMessage(CreateResourceWizardMessages.PricingTierSelectorPlaceholder)}
                    onChange={(_, option) => props.onChangeLocation(option.key as string)}
                    options={pricingTiers}
                    allowFreeInput
                    autoComplete="on"
                    iconButtonProps={{ ariaDescription: "dropdown button", role: "button" }}
                    label={INTL.formatMessage(CreateResourceWizardMessages.PricingTierSelectorTitle)}
                />
                <Stack className="crw-form-item-tips-container">
                    <FontIcon iconName="InfoSolid" />
                    <span>{INTL.formatMessage(CreateResourceWizardMessages.PricingTierSelectorTip)}</span>
                </Stack>
            </Stack>

        </StyledContainer>
    )
};

