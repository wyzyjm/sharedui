import { initializeComponent, useLocalization, withLocalization } from "../../../services/localization";

export interface LinkProps {
    href: string,
    displayText: any
    openInANewWindow?: boolean
    disabled?: boolean
    onClick?: () => void
    tabIndex?: number;
};

const styles = {
    linkWrapper: {
        marginTop: '0.9375rem !important',
        marginBottom: '0 !important'
    },
    underline: {
        textDecoration: 'underline'
    },
    disabled: {
        color: 'currentColor',
        cursor: 'not-allowed',
        opacity: 0.5,
        textDecoration: 'none'
    }
};

const LinkInternal = (props: LinkProps): JSX.Element => {
    const target = props.openInANewWindow ? '_blank' : null;
    return (
        <div style={styles.linkWrapper}>
            <a href={props.disabled ? null : props.href} rel="noreferrer" target={target} style={props.disabled ? styles.disabled : styles.underline} onClick={props.disabled ? null : props.onClick} tabIndex={props.tabIndex}>
                {props.displayText}
            </a>
        </div>
    )
};

export const Link = withLocalization(initializeComponent(LinkInternal));