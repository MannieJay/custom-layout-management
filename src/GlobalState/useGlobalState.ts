import { useCallback, useContext } from "react"
import { GlobalContext } from "./StateContext"

const useGlobalState = () => {
    const [state, dispatch] = useContext(GlobalContext);
    const globalStore = state;
    const selectedCard = state?.selectedCard ? state.selectedCard : undefined;

    const setSelectedCard = useCallback((selectedCard: string) => {
        dispatch({type: 'SET_SELECTED_CARD', payload: selectedCard});
    }, [dispatch]);

    const setBackgroundItemSelected = useCallback((selectedItem: string, itemValue: boolean) => {
        dispatch({type: 'SET_BACKGROUND_ITEM_SELECTED', payload: {item: selectedItem, value: itemValue}});
    }, [dispatch]);

    return {
        globalStore,
        setSelectedCard,
        selectedCard,
        setBackgroundItemSelected
    };
};

export default useGlobalState;