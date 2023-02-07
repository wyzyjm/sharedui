import React from "react";
import { Stack } from "@fluentui/react";
import styled from "styled-components";
import { initializeComponent, withLocalization } from "../../../services/localization";

export interface PageHeaderProps {
    headTitle: string,
    subTitle?: JSX.Element
}

const Heading = styled.h1`
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px
`

export function PageHeaderWrap(props: PageHeaderProps) {
    const { headTitle, subTitle } = props;
    return <Stack grow role="main" className="header" styles={{root: { marginTop: "16px", marginLeft: "20px", marginRight: "20px" }}}>
        <Heading>{headTitle}</Heading>
        {
            subTitle && <Stack>{subTitle}</Stack>
        }
    </Stack>
}

export const PageHeader = withLocalization(initializeComponent(PageHeaderWrap))