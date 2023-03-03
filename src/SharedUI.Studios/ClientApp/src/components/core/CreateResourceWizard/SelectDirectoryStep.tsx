import { Stack, Text, Image, useTheme } from "@fluentui/react";
import styled from "styled-components";
import { INTL } from "../../../util/intlUtil";
import { CreateResourceWizardMessages } from "../../../clientResources";
import { TenantInformation } from "../../../models";
import { urlLinks } from "../../../util/urlLinks";

const StyledContainer = styled(Stack)`
width: 100%;
>* {
    margin-bottom: 20px;
    width: 100%;
}
.crw-selector-title {
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: 600;
}
a {
    text-decoration: none;
    color: #0F6CBD;
    /* color: ${props => props.theme.semanticColors ? props.theme.semanticColors.link : "#0F6CBD"}; */
}
a:hover {
    text-decoration: underline;
}
img {
    width: 566px;
    height: auto;
    max-width: 100%;
}
.tenant-item {
    display: contents;
    cursor: pointer;
}
`;

export interface ISelectDirectoryStepProps {
    kind: 'SelectDirectoryStep';

    imageSrc: string;
    tenants: TenantInformation[];
    selectedTenantId: string;
    onChangeTenant: (tenantId: string) => void;
};

export const SelectDirectoryStep = (props: ISelectDirectoryStepProps) => {
    const theme = useTheme();
    const onChangeTenant = (id: string) => id === props.selectedTenantId || props.onChangeTenant(id);

    return (
        <StyledContainer theme={theme} >
            <Text block >
                {INTL.formatMessage(CreateResourceWizardMessages.SelectDirectoryStepDescription1)}
            </Text>
            <Text block >
                {INTL.formatMessage(CreateResourceWizardMessages.SelectDirectoryStepDescription2)}
            </Text>
            <a
                href={urlLinks.learnMoreAboutAzureDirectories()}
                target="_blank"
                rel="noopener noreferrer"
            >
                {INTL.formatMessage(CreateResourceWizardMessages.SelectDirectoryStepLearnMoreLinkText)}
            </a>
            <Text block className="crw-selector-title">
                {INTL.formatMessage(CreateResourceWizardMessages.SelectDirectoryStepSelectorTitle)}
            </Text>
            <Stack className="crw-tenant-list" aria-label="Associated directory list" role="radiogroup" >
                {
                    props.tenants.map(item => (
                        <Stack key={`tenant-${item.tenantId}`} >
                            <Text
                                className="tenant-item"
                                role="radio"
                                onClick={() => onChangeTenant(item.tenantId)}
                                aria-checked={item.tenantId === props.selectedTenantId ? true : false}
                            >
                                {item.displayName}{item.tenantId === props.selectedTenantId && '*'}
                            </Text>
                        </Stack>
                    ))
                }
            </Stack>
            <Image src={props.imageSrc} alt={INTL.formatMessage(CreateResourceWizardMessages.SelectDirectoryStepRelationship)} />
        </StyledContainer>
    )
};

