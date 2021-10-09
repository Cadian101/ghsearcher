import React, { ChangeEvent, FC } from "react";
import RecentSearches from "./components/RecentSearches/RecentSearches";
import { useDispatch } from "react-redux";

const InputSearch: FC = () => {
    const minlength: number = 3;
    const listId: string = "recent-searches";

    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "search", payload: event.target.value });
    };

    return (
        <form action="#">
            <input
                className={"input input--search"}
                type="search"
                minLength={minlength}
                list={listId}
                placeholder={`Search will start with > ${minlength} symbols`}
                onChange={handleChange}
            />
            <RecentSearches listId={listId} optionsData={["asd", "sdf", "dfg"]} />
        </form>
    );
};

export default InputSearch;
