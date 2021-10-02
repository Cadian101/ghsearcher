import React, { FC } from "react";

type RecentSearchesProps = {
    listId: string;
    optionsData: string[];
};

const RecentSearches: FC<RecentSearchesProps> = ({listId, optionsData }) => {
    return (
        <datalist id={listId}>
            {optionsData.map((optionData, i) => {
                return <option key={i} value={optionData} />
            })}
        </datalist>
    );
};

export default RecentSearches;
