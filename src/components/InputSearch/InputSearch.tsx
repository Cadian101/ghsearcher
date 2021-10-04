import React, { ChangeEvent, FC, useState } from "react";
import RecentSearches from "./components/RecentSearches/RecentSearches";
import useDebounce from "../../hooks/useDebounce";

type InputSearchProps = {
    searchQuery?: string;
};

const InputSearch: FC<InputSearchProps> = ({searchQuery}) => {
    const minlength: number = 3;
    const listId: string = 'recent-searches';
    const delay: number = 500;

    const [inputValue, setInputValue] = useState<string>('')
    const debouncedInput = useDebounce<string>(inputValue, delay)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    return (
        <form action="#">
            <input
                className={"input input--text"}
                type="search"
                minLength={minlength}
                list={listId}
                placeholder={`Search will start with > ${minlength} symbols`}
                onChange={handleChange}
                value={searchQuery}
            />
            <RecentSearches listId={listId} optionsData={['asd', 'sdf', 'dfg']} />
            <p>{debouncedInput}</p>
        </form>
    );
};

export default InputSearch;
