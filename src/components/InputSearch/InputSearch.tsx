import React, { ChangeEvent, FC } from "react";
import RecentSearches from "./components/RecentSearches/RecentSearches";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../store/store";

const InputSearch: FC = () => {
    const minlength: number = 3;
    const listId: string = "recent-searches";

    const historyQueries = useSelector((store: Store) => store.latterMemories);
    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "search", payload: event.target.value });
    };

    return (
        <>
            <input
                id="input-search"
                className={"input input--search"}
                type="search"
                minLength={minlength}
                list={listId}
                placeholder={`Search will start with > ${minlength} symbols`}
                onChange={handleChange}
            />
            <RecentSearches listId={listId} optionsData={historyQueries} />
        </>
    );
};

export default InputSearch;
