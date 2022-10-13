import {
  CommandBar,
  CommandBarButton,
  DefaultButton,
  IButtonProps,
  ICommandBarProps,
  Icon,
  IconButton as FabricIconButton,
  IconButton,
  IIconProps,
  PrimaryButton as FabricPrimaryButton,
  registerIcons,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import { useTheme } from "@fluentui/react-theme-provider";
import React from "react";
import styled, { ThemedStyledProps } from "styled-components";

const iconThemedStyles = (props: CSButtonProps) => `
    color: ${props.disabled ? props.theme.palette.neutralTertiary : props.theme.palette.themePrimary};
  
    svg {
      fill: ${props.disabled ? props.theme.palette.neutralTertiary : props.theme.palette.themePrimary};
      path {
        ${props.disabled ? props.theme.palette.neutralTertiary : props.theme.palette.themePrimary};
      }
      path[stroke="placeholder"]{
        stroke: ${props.disabled ? props.theme.palette.neutralTertiary : props.theme.palette.themePrimary}
      }
    }
  `;

const cellButtonThemedStyles = (props: CSButtonProps) => `
    cursor: ${!props.disabled ? "pointer" : "default"};
    line-height: 1;
  
    i {
      margin: 0;
      ${iconThemedStyles(props)}
    }
  
    &:focus {
      border-width: 3px;
    }
  `;

const secondaryButtonThemedStyles = (props: CSButtonProps) => `
    ${cellButtonThemedStyles(props)}
  
    border: ${props.disabled ? "none" : `1px solid ${props.theme.palette.themePrimary}`};
    background-color: ${props.disabled ? props.theme.palette.neutralLighter : "white"};
  
    &:hover, &:focus {
      background-color: ${props.disabled ? props.theme.palette.neutralLighter : props.theme.palette.neutralLighter};
      border-width: 1px;
    }
  `;

const primaryButtonThemedStyles = (props: CSButtonProps) => `
    background-color: ${props.disabled ? props.theme.palette.neutralLighter : props.theme.palette.themePrimary};
    color: ${props.disabled ? props.theme.palette.neutralTertiary : "white"} !important;
  
    i {
      margin: 0;
      color: ${props.disabled ? props.theme.palette.neutralTertiary : "white"} !important;
    }
  
    svg {
      fill: ${props.disabled ? props.theme.palette.neutralTertiary : "white"} !important;
      vertical-align: baseline;
      height: 1.125rem;
    }
  
    &:hover, &:focus {
      background-color: ${props.disabled ? props.theme.palette.neutralLighter : props.theme.palette.themeDarkAlt};
    }
  `;

const themedStylesWithSplitButton = (props: CSButtonProps, themedStylesFunc: any) => {
  const theme = useTheme();
  return `${themedStylesFunc({ ...props, disabled: props.disabled || props.primaryDisabled, theme })}`;
}

interface DefaultButtonProps {
  hasPrefixIcon?: boolean;
}

export type CSButtonProps = ThemedStyledProps<IButtonProps & React.RefAttributes<DefaultButton> & DefaultButtonProps, any>;

const Button = styled(DefaultButton) <DefaultButtonProps>`
  display: inline-block;
  height: 2.25rem;
  text-align: center;
  font-weight: 400;
  vertical-align: middle;
  user-select: none;
  border: none;
  padding: 0.375rem 1.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0;
  box-shadow: none;

  ${props =>
    props.hasPrefixIcon &&
    `& {
      padding: 0 0.75rem;

      i {
        float: left;
        margin-right: 5px !important;
        vertical-align: top;
      }
    }`}
`;

export const PrimaryButton = styled(Button)`
    min-width: 5.375rem;
    box-shadow: none;
    ${props => themedStylesWithSplitButton(props, primaryButtonThemedStyles)}
  `;

export const SecondaryButton = styled(Button)`
    ${props => themedStylesWithSplitButton(props, secondaryButtonThemedStyles)}
  `;