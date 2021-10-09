import { createStore } from 'redux';

export type Store = {
    searchString: string;
    latterMemories: [],
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
        return {
            ...state,
            latterMemories: action.payload,
        }
    }

    return state
}

const store = createStore(searchStringReducer);

export default store;
