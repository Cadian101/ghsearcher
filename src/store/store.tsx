import { createStore } from 'redux';

export type Store = {
    searchString: string;
    latterMemories: string[],
};

const emptyStore: Store = {
    searchString: '',
    latterMemories: [],
}

const searchStringReducer = (state: Store = emptyStore, action: any): Store  => {
    if (action.type === 'search') {
        return {
            ...state,
            searchString: action.payload,
        }
    }

    if (action.type === 'remind') {
        const latestSearchesQuantity: number = 5;
        return {
            ...state,
            latterMemories: action.payload.slice(-latestSearchesQuantity),
        }
    }

    return state
}

const store = createStore(searchStringReducer);

export default store;
