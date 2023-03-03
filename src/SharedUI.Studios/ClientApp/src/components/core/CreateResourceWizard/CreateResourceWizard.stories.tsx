import { ComponentStory, ComponentMeta } from '@storybook/react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { DefaultButton, Text, Image, IStackProps, IStackTokens, PrimaryButton, Stack, ThemeProvider, Icon } from '@fluentui/react';
import { defaultTheme } from '../../../themes';
import { SharedComponentsContext } from '../SharedComponentsContext';
import { SelectDirectoryStep, ISelectDirectoryStepProps } from "./SelectDirectoryStep";
import { AdditionalTermsStep, IAdditionalTermsStepProps } from "./AdditionalTermsStep";
import { CreateResourceStep, ICreateResourceStepProps } from "./CreateResourceStep";
import { ISummaryStepProps, SummaryStep } from "./SummaryStep";
import styled from 'styled-components';
import { ResourceGroup, AzureSku } from '../../../models';
import { IWizardFlowStatus, WizardFlow, WizardFlowComp, WizardFlowProps } from '../WizardFlow/WizardFlow';
initializeIcons(undefined, { disableWarnings: true });

export default {
    title: 'Create Resource Wizard',
    subcomponents: { SelectDirectoryStep, AdditionalTermsStep, SummaryStep, CreateResourceStep }
} as ComponentMeta<any>;
const stackTokens: IStackTokens = { childrenGap: 8 };

const AdditionalTermsCard = styled((props: IStackProps) => (
    <Stack className={props.className} >
        <Stack className="resource-dialog-card-left">
            <Image alt="demo" src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Defender-CC-H-111x111-1?wid=111&hei=111&fit=crop" />
        </Stack>
        <Stack className="resource-dialog-card-right">
            <Text block className="text-field-subtitle">
                Microsoft provides technical documentation regarding the appropriate operation applicable to this Cognitive Service that is made available by Microsoft. Customer acknowledges and agrees that they have reviewed this documentation and will use this service in accordance with it.
            </Text>
            <Text block className="text-field-subtitle">
                <a href="/">Responsible use of AI documentation for PII<Icon iconName="NavigateExternalInline" /></a>
            </Text>
            <Text block className="text-field-subtitle">
                <a href="/">Responsible use of AI documentation for Text analytics for health<Icon iconName="NavigateExternalInline" /></a>
            </Text>
        </Stack>
    </Stack>
))`
    width: 610px;
    height: 250px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    padding: 16px;
    background-color: #F2F2F2;
  
    .resource-dialog-card-left {
        width: 99px;
        height: 121px;
        margin-left: 16px;
        margin-right: 30px;
    
        img {
            width: 99px;
        }
    }

    a {
        text-decoration: none;
        color: #0F6CBD;
        /* color: ${props => props.theme.semanticColors ? props.theme.semanticColors.link : "#0F6CBD"};; */

        i {
            margin-left: 3px;
        }

        &:hover {
            text-decoration: underline;
        }
    }
  
    .resource-dialog-card-right {
        width: 419px;
        margin-top: 8px;
        >* {
            margin-bottom: 14px;
        }
    }
`;

const SelectDirectoryStepTemplate: ComponentStory<typeof SelectDirectoryStep> = (args) => (
    <ThemeProvider theme={defaultTheme.body}>
        <SharedComponentsContext.Provider value={{ locale: 'en' }}>
            <SelectDirectoryStep {...args} />
        </SharedComponentsContext.Provider>
    </ThemeProvider>
);

export const SelectDirectoryStepComponent = SelectDirectoryStepTemplate.bind({});

SelectDirectoryStepComponent.args = {
    imageSrc: "https://msazure.visualstudio.com/a531312f-ba7b-4573-ab4f-d468b740a319/_apis/wit/attachments/89151bb3-6c4d-4028-bf33-426830c68c87?fileName=image%2094.png",
    tenants: [
        {
            tenantId: "0",
            displayName: "tenant-1",
            defaultDomain: "",
        },
        {
            tenantId: "1",
            displayName: "tenant-2",
            defaultDomain: "",
        },
        {
            tenantId: "2",
            displayName: "tenant-3",
            defaultDomain: "",
        },
    ],
    selectedTenantId: "1",
    onChangeTenant: (tenantId: string) => console.log(tenantId),
} as ISelectDirectoryStepProps;


const CreateResourceStepTemplate: ComponentStory<typeof CreateResourceStep> = (args) => (
    <ThemeProvider theme={defaultTheme.body}>
        <SharedComponentsContext.Provider value={{ locale: 'en' }}>
            <CreateResourceStep {...args} />
        </SharedComponentsContext.Provider>
    </ThemeProvider>
);

export const CreateResourceStepComponent = CreateResourceStepTemplate.bind({});

CreateResourceStepComponent.args = {
    kind: 'CreateResourceStep',
    resourceGroups: [
        {
            id: "1",
            name: "tenant-0",
            location: "",
        },
        {
            id: "2",
            name: "tenant-1",
            location: "",
        },
        {
            id: "3",
            name: "tenant-2",
            location: "",
        },
    ] as ResourceGroup[],
    selectedResourceGroupId: "1",
    onChangeResourceGroup: (tenantId: string) => console.log(tenantId),

    locations: [
        {
            id: "0",
            displayName: "tenant-0",
        },
        {
            id: "1",
            displayName: "tenant-1",
        },
        {
            id: "2",
            displayName: "tenant-2",
        },
    ],
    selectedLocationId: "1",
    onChangeLocation: (tenantId: string) => console.log(tenantId),

    pricingTiers: ["Basic", "D3", "F0"] as AzureSku['code'][],

    selectedPricingTierId: "1",
    onChangePricingTier: (tenantId: string) => console.log(tenantId),

    resourceName: "",
    onChangeResourceName: (tenantId: string) => console.log(tenantId),

    selectedSubscription: {
        id: "2",
        displayName: "tenant-2",
    }

} as ICreateResourceStepProps;

const AdditionalTermsStepTemplate: ComponentStory<typeof AdditionalTermsStep> = (args) => (
    <ThemeProvider theme={defaultTheme.body}>
        <SharedComponentsContext.Provider value={{ locale: 'en' }}>
            <AdditionalTermsStep {...args} />
        </SharedComponentsContext.Provider>
    </ThemeProvider>
);

export const AdditionalTermsStepComponent = AdditionalTermsStepTemplate.bind({});

AdditionalTermsStepComponent.args = {
    kind: 'AdditionalTermsStep',

    title: "string",
    content: (<AdditionalTermsCard />),
    confirmationMessage: "I confirm that I have reviewed and acknowledge the terms in the Responsible AI Notice.",
    onChangeConfirmationMessageSelection: (status: boolean) => { },
} as IAdditionalTermsStepProps;


const SummaryStepTemplate: ComponentStory<typeof SummaryStep> = (args) => (
    <ThemeProvider theme={defaultTheme.body}>
        <SharedComponentsContext.Provider value={{ locale: 'en' }}>
            <SummaryStep {...args} />
        </SharedComponentsContext.Provider>
    </ThemeProvider>
);

export const SummaryStepComponent = SummaryStepTemplate.bind({});

SummaryStepComponent.args = {
    kind: 'SummaryStep',

    selectedDirectory: "Contoso Corporation",
    selectedSubscription: "Contoso-West",
    selectedResource: "Contoso-test-22",
    selectedLocation: "Contoso-test-22",
    selectedPricingTier: "Contoso-test-22",

    onChangeSubscription: () => { },
    onChangeDirectory: () => { },
    onChangeResource: () => { },
    onChangeLocation: () => { },
    onChangePricingTier: () => { },
} as ISummaryStepProps;

const SelectDirectoryStepProps = {
    kind: 'SelectDirectoryStep',
    imageSrc: "https://msazure.visualstudio.com/a531312f-ba7b-4573-ab4f-d468b740a319/_apis/wit/attachments/89151bb3-6c4d-4028-bf33-426830c68c87?fileName=image%2094.png",
    tenants: [
        {
            tenantId: "0",
            displayName: "tenant-1",
            defaultDomain: "",
        },
        {
            tenantId: "1",
            displayName: "tenant-2",
            defaultDomain: "",
        },
        {
            tenantId: "2",
            displayName: "tenant-3",
            defaultDomain: "",
        },
    ],
    selectedTenantId: "1",
    onChangeTenant: (tenantId: string) => console.log(tenantId),
} as ISelectDirectoryStepProps;

const CreateSelectDirectoryStepOldDialogTemplate: ComponentStory<typeof WizardFlowComp> = (args) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <WizardFlowComp {...args}>
                    <WizardFlow.Header>
                        <span>Your Azure directory</span>
                    </WizardFlow.Header>
                    <WizardFlow.Content>
                        <SelectDirectoryStep {...SelectDirectoryStepProps} />
                    </WizardFlow.Content>
                    <WizardFlow.Footer>
                        <>
                            <Stack
                                horizontal
                                tokens={stackTokens}
                            >
                                <PrimaryButton text="Next" allowDisabledFocus />
                            </Stack>
                            <Stack
                                horizontal
                                tokens={stackTokens}
                            >
                                <DefaultButton text="Cancel" allowDisabledFocus />
                            </Stack>
                        </>
                    </WizardFlow.Footer>
                </WizardFlowComp>
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

export const CreateSelectDirectoryStepOldDialogComponent = CreateSelectDirectoryStepOldDialogTemplate.bind({});

CreateSelectDirectoryStepOldDialogComponent.args = {
    dialogContentProps: {
        title: 'Choose an Azure resource',
    },
    currentStep: "SelectDirectoryStep",
    currentKey: "0",
    height: "662px",
    menuWidth: "205px",
    innerWidth: "855px",
    hidden: false,
    modalProps: { isBlocking: true },
    onDismiss: () => console.log("Wizrd dismissed"),
    menuItems: [
        {
            name: 'Directory',
            status: IWizardFlowStatus.Doing,
            key: 0,
        },
        {
            name: 'Subscription',
            status: IWizardFlowStatus.Undo,
            key: 1,
        },
        {
            name: 'Resource',
            status: IWizardFlowStatus.Undo,
            key: 2,
        },
        {
            name: 'Review and finish',
            status: IWizardFlowStatus.Undo,
            key: 3,
        },
    ],
} as WizardFlowProps;

const CreateResourceStepProps = {
    kind: 'CreateResourceStep',
    resourceGroups: [
        {
            id: "1",
            name: "tenant-0",
            location: "",
        },
        {
            id: "2",
            name: "tenant-1",
            location: "",
        },
        {
            id: "3",
            name: "tenant-2",
            location: "",
        },
    ] as ResourceGroup[],
    selectedResourceGroupId: "1",
    onChangeResourceGroup: (tenantId: string) => console.log(tenantId),

    locations: [
        {
            id: "0",
            displayName: "tenant-0",
        },
        {
            id: "1",
            displayName: "tenant-1",
        },
        {
            id: "2",
            displayName: "tenant-2",
        },
    ],
    selectedLocationId: "1",
    onChangeLocation: (tenantId: string) => console.log(tenantId),

    pricingTiers: ["Basic", "D3", "F0"] as AzureSku['code'][],
    selectedPricingTierId: "1",
    onChangePricingTier: (tenantId: string) => console.log(tenantId),

    resourceName: "",
    onChangeResourceName: (tenantId: string) => console.log(tenantId),

    selectedSubscription: {
        id: "2",
        displayName: "tenant-2",
    }
} as ICreateResourceStepProps;

const CreateResourceStepOldDialogTemplate: ComponentStory<typeof WizardFlowComp> = (args) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <WizardFlowComp {...args}>
                    <WizardFlow.Header>
                        <span>Create and use a new resource</span>
                    </WizardFlow.Header>
                    <WizardFlow.Content>
                        <CreateResourceStep {...CreateResourceStepProps} />
                    </WizardFlow.Content>
                    <WizardFlow.Footer>
                        <>
                            <Stack
                                horizontal
                                tokens={stackTokens}
                            >
                                <DefaultButton text="Back" allowDisabledFocus />
                                <DefaultButton text="Next" allowDisabledFocus disabled />
                            </Stack>
                            <Stack
                                horizontal
                                tokens={stackTokens}
                            >
                                <DefaultButton text="Cancel" allowDisabledFocus />
                            </Stack>
                        </>
                    </WizardFlow.Footer>
                </WizardFlowComp>
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

export const CreateResourceStepOldDialogComponent = CreateResourceStepOldDialogTemplate.bind({});

CreateResourceStepOldDialogComponent.args = {
    dialogContentProps: {
        title: 'Choose an Azure resource',
    },
    currentStep: "CreateResourceStep",
    currentKey: "2",
    height: "662px",
    menuWidth: "205px",
    innerWidth: "855px",
    hidden: false,
    modalProps: { isBlocking: true },
    onDismiss: () => console.log("Wizrd dismissed"),
    menuItems: [
        {
            name: 'Directory',
            status: IWizardFlowStatus.Done,
            key: 0,
        },
        {
            name: 'Subscription',
            status: IWizardFlowStatus.Done,
            key: 1,
        },
        {
            name: 'Resource',
            status: IWizardFlowStatus.Doing,
            key: 2,
        },
        {
            name: 'Review and finish',
            status: IWizardFlowStatus.Undo,
            key: 3,
        },
    ],
} as WizardFlowProps;

const AdditionalTermsStepProps = {
    kind: 'AdditionalTermsStep',

    title: "string",
    content: (<AdditionalTermsCard />),
    confirmationMessage: "I confirm that I have reviewed and acknowledge the terms in the Responsible AI Notice.",
    onChangeConfirmationMessageSelection: (status: boolean) => { },
} as IAdditionalTermsStepProps;

const CreateAdditionalTermsStepOldDialogTemplate: ComponentStory<typeof WizardFlowComp> = (args) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <WizardFlowComp {...args}>
                    <WizardFlow.Header>
                        <span>Review and confirm the selected resource</span>
                    </WizardFlow.Header>
                    <WizardFlow.Content>
                        <AdditionalTermsStep {...AdditionalTermsStepProps} />
                    </WizardFlow.Content>
                    <WizardFlow.Footer>
                        <>
                            <Stack
                                horizontal
                                tokens={stackTokens}
                            >
                                <DefaultButton text="Back" allowDisabledFocus />
                                <DefaultButton text="Next" allowDisabledFocus disabled />
                            </Stack>
                            <Stack
                                horizontal
                                tokens={stackTokens}
                            >
                                <DefaultButton text="Cancel" allowDisabledFocus />
                            </Stack>
                        </>
                    </WizardFlow.Footer>
                </WizardFlowComp>
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

export const CreateAdditionalTermsStepOldDialogComponent = CreateAdditionalTermsStepOldDialogTemplate.bind({});

CreateAdditionalTermsStepOldDialogComponent.args = {
    dialogContentProps: {
        title: 'Choose an Azure resource',
    },
    currentStep: "SummaryStep",
    currentKey: "3",
    height: "662px",
    menuWidth: "205px",
    innerWidth: "855px",
    hidden: false,
    modalProps: { isBlocking: true },
    onDismiss: () => console.log("Wizrd dismissed"),
    menuItems: [
        {
            name: 'Directory',
            status: IWizardFlowStatus.Done,
            key: 0,
        },
        {
            name: 'Subscription',
            status: IWizardFlowStatus.Done,
            key: 1,
        },
        {
            name: 'Resource',
            status: IWizardFlowStatus.Done,
            key: 2,
        },
        {
            name: 'Responsible AI notice',
            status: IWizardFlowStatus.Doing,
            key: 3,
        },
        {
            name: 'Review and finish',
            status: IWizardFlowStatus.Undo,
            key: 4,
        },
    ],
} as WizardFlowProps;

const SummaryStepProps = {
    kind: 'SummaryStep',

    selectedDirectory: "Contoso Corporation",
    selectedSubscription: "Contoso-West",
    selectedResource: "Contoso-test-22",
    selectedLocation: "Contoso-test-22",
    selectedPricingTier: "Contoso-test-22",

    onChangeSubscription: () => { },
    onChangeDirectory: () => { },
    onChangeResource: () => { },
    onChangeLocation: () => { },
    onChangePricingTier: () => { },
} as ISummaryStepProps;

const CreateSummaryStepOldDialogTemplate: ComponentStory<typeof WizardFlowComp> = (args) => {
    return (
        <ThemeProvider theme={defaultTheme.body}>
            <SharedComponentsContext.Provider value={{ locale: 'en' }}>
                <WizardFlowComp {...args}>
                    <WizardFlow.Header>
                        <span>Review and confirm the selected resource</span>
                    </WizardFlow.Header>
                    <WizardFlow.Content>
                        <SummaryStep {...SummaryStepProps} />
                    </WizardFlow.Content>
                    <WizardFlow.Footer>
                        <>
                            <Stack
                                horizontal
                                tokens={stackTokens}
                            >
                                <DefaultButton text="Back" allowDisabledFocus />
                                <DefaultButton text="Create resource" allowDisabledFocus />
                            </Stack>
                            <Stack
                                horizontal
                                tokens={stackTokens}
                            >
                                <DefaultButton text="Cancel" allowDisabledFocus />
                            </Stack>
                        </>
                    </WizardFlow.Footer>
                </WizardFlowComp>
            </SharedComponentsContext.Provider>
        </ThemeProvider>
    );
}

export const CreateSummaryStepOldDialogComponent = CreateSummaryStepOldDialogTemplate.bind({});

CreateSummaryStepOldDialogComponent.args = {
    dialogContentProps: {
        title: 'Choose an Azure resource',
    },
    currentStep: "SummaryStep",
    currentKey: "2",
    height: "662px",
    menuWidth: "205px",
    innerWidth: "855px",
    hidden: false,
    modalProps: { isBlocking: true },
    onDismiss: () => console.log("Wizrd dismissed"),
    menuItems: [
        {
            name: 'Directory',
            status: IWizardFlowStatus.Done,
            key: 0,
        },
        {
            name: 'Subscription',
            status: IWizardFlowStatus.Done,
            key: 1,
        },
        {
            name: 'Resource',
            status: IWizardFlowStatus.Done,
            key: 2,
        },
        {
            name: 'Responsible AI notice',
            status: IWizardFlowStatus.Done,
            key: 3,
        },
        {
            name: 'Review and finish',
            status: IWizardFlowStatus.Doing,
            key: 4,
        },
    ],
} as WizardFlowProps;