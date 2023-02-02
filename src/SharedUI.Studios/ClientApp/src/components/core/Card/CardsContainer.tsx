import { useMemo, ReactNode } from 'react'
import { Text, Stack } from "@fluentui/react";
import { ICardProp, Card } from './Card'
import { initializeComponent, withLocalization } from "../../../services/localization";


export interface CardsContainerProps {
    title: string;
    description?: ReactNode;
    items: ICardProp[];
}
const CardsContainerInternal = (props: CardsContainerProps): JSX.Element => {
    const { title, description, items } = props

    const renderItems = useMemo(() => {
        if (!Array.isArray(items) || items.length === 0) return null
        return items.map((item: ICardProp) => <Card   {...item} />)
    }, [items])
    return (
        <Stack>
            <Text as="h2" className='cardContainerTitle' styles={{ root: { marginBottom: 0, fontSize: 18, fontWeight: 600 } }}> {title} </Text>
            {description && <Stack styles={{ root: { marginTop: 20 } }}>{description}</Stack>}
            <Stack tokens={{ childrenGap: 20 }} horizontal wrap styles={{ root: { margin: '20px 0' } }}> {renderItems} </Stack>
        </Stack>
    )
}

export const CardsContainer = withLocalization(initializeComponent(CardsContainerInternal));