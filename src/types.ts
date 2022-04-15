export interface GlobalContextInterface {
    selectedCard?: 'TwoColumn' | 'ThreeColumn' | 'TwoColumnFooter' | undefined
    showEditor?: boolean
    backgroundItemSelections?: BackgroundItemSelections
}

export interface BackgroundItemSelections {
    header: {
        selected: boolean
    },
    column1: {
        selected: boolean
    },
    column2: {
        selected: boolean
    },
    column3: {
        selected: boolean
    },
    footer: {
        selected: boolean
    }
}