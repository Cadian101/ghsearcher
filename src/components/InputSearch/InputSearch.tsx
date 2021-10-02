import React, { FC } from "react";
import RecentSearches from "./components/RecentSearches/RecentSearches";

type InputSearchProps = {
    searchQuery?: string;
};

const InputSearch: FC<InputSearchProps> = ({searchQuery}) => {
    const minlength: number = 3;
    const listId: string = 'recent-searches';

    const repoSearch = (): void => {

    };

    return (
        <form action="#">
            <input
                className={"input input--text"}
                type="search"
                minLength={minlength}
                list={listId}
                placeholder={`Search will start with > ${minlength} symbols`}
                onChange={repoSearch}
            />
            <RecentSearches listId={listId} optionsData={['asd', 'sdf', 'dfg']} />
        </form>
    );
};

export default InputSearch;
