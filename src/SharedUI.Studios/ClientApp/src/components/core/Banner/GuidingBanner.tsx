import { Stack, StackItem } from "@fluentui/react";
import { initializeIcons } from '@fluentui/react/lib/Icons';
import styled from "styled-components";
import { initializeComponent, withLocalization } from "../../../services/localization";

initializeIcons(undefined, { disableWarnings: true });

export interface GuidingBannerProps {
    icon?: JSX.Element;
    title: string;
    description: JSX.Element;
    buttons: JSX.Element;
};

const StyledBanner = styled.div`
  background: rgb(243, 242, 241);
  padding: 20px;
  border-radius: 8px;
`
const StyledBannerTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
`
const StyledBannerDescription = styled.p`
  font-size: 14px;
  font-weight: 400;
`
const GuidingBannerInternal = (props: GuidingBannerProps) => {
    const { title, description, icon, buttons } = props

    return (
        <StyledBanner>
            <Stack horizontal>
                {icon && <StackItem grow={0} style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>{icon}</StackItem>}
                <StackItem grow={4}>
                    <StyledBannerTitle>{title}</StyledBannerTitle>
                    <StyledBannerDescription>{description}</StyledBannerDescription>
                    {buttons}
                </StackItem>
            </Stack>
        </StyledBanner>
    )
};

export const GuidingBannerArea = withLocalization(initializeComponent(GuidingBannerInternal));