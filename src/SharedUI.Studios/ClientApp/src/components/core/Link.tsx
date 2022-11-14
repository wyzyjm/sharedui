export interface LinkProps {
    href: string,
    displayText: any
    openInANewWindow?: boolean
    disabled?: boolean
    onClick?: () => void
}

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

export const Link = (props: LinkProps): JSX.Element => {
    const target = props.openInANewWindow ? '_blank' : null;
    return (
        <div style={styles.linkWrapper}>
            <a href={props.disabled ? null: props.href } rel="noreferrer" target={target} style={props.disabled ? styles.disabled: styles.underline} onClick={props.disabled ? null: props.onClick}>
                {props.displayText}
            </a>
        </div>
    )
};
