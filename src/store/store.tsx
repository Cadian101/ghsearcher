import { createStore } from 'redux';

export type Store = {
    searchString: string;
    items: [],
};

const emptyStore: Store = {
    searchString: '',
    items: [],
}

const searchStringReducer = (state: Store = emptyStore, action: any): Store  => {
    if (action.type === 'search') {
        return {
            ...state,
            searchString: action.payload,
        }
    }

    if (action.type === 'write') {
        return {
            ...state,
            items: action.payload,
        }
    }

    return state
}

const store = createStore(searchStringReducer);

export default store;
