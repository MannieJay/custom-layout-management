import React, { createContext, Dispatch, useReducer } from 'react';
import Reducer from './Reducer';
import { GlobalContextInterface } from '../types';
const initialState: GlobalContextInterface = {
    selectedCard: undefined,
    backgroundItemSelections: {
        header: {
            selected: false
        },
        column1: {
            selected: false
        },
        column2: {
            selected: false
        },
        column3: {
            selected: false
        },
        footer: {
            selected: false
        },
        background: {
            selected: false
        }
    }
};

const GlobalStore: React.FC = (props) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <GlobalContext.Provider value={[state, dispatch]}>
            {props.children}
        </GlobalContext.Provider>
    );
};

const GlobalContext = createContext<[GlobalContextInterface, Dispatch<{type: string, payload: any}>]>([{}, () => {}]);

export { GlobalStore, GlobalContext, initialState };