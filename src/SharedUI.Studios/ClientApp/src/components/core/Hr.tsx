import React from "react";
import styled from "styled-components";
import * as Colors from "./colors.scss";

const StyledHr = styled.div`
    height: 1px;
    background-color: black;
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
    opacity: 0.3;
`;

export const Hr = (): JSX.Element => {
    return <StyledHr></StyledHr>;
};
