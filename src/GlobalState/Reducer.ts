import { GlobalContextInterface } from "../types";

const actionMap: any = {
    SET_SELECTED_CARD: (state: GlobalContextInterface, action: {payload: string}) => {
        return {
            ...state,
            selectedCard: action.payload
        }
    },
    SET_BACKGROUND_ITEM_SELECTED: (state: GlobalContextInterface, action: {payload: {
        item: 'header' | 'column1' | 'column2' | 'column3' | 'footer',
        value: boolean
    }}) => {
        const itemKey = action?.payload?.item;
        if (state?.backgroundItemSelections?.[itemKey]) {
            return {
                ...state,
                backgroundItemSelections: {
                    ...state.backgroundItemSelections,
                    [itemKey]: {
                        ...state.backgroundItemSelections[itemKey],
                        selected: action.payload.value
                    }
                }
            }
        } else {
            return state;
        }
    }
}

const Reducer = (state: GlobalContextInterface, action: any) => {
    console.log('reducer', action, state);
    if (action && action.type && actionMap[action.type]) {
        return actionMap[action.type](state, action);
    } else {
        return state;
    }
};

export default Reducer;