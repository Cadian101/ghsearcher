import { createStore } from 'redux';

type Store = {
    searchString: string;
};

const searchStringReducer = (state: Store = { searchString: '' }, action: any): Store  => {
    if (action === 'search') {
        return {
            searchString: state.searchString
        }
    }

    return state
}

const store = createStore(searchStringReducer);

export default store;
