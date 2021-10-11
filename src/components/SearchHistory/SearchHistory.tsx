import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../store/store";

const SearchHistory: FC = () => {
    const dispatch = useDispatch();
    const historyQueries: string[] = useSelector((store: Store) => store.latterMemories);

    let browserStorage = window.sessionStorage;

    const setBrowserStorage = (name: string, data: any) => {
        try {
            browserStorage.setItem(
                name,
                typeof data !== 'undefined' || null || (typeof data !== 'object' && typeof data !== 'function')
                    ? JSON.stringify(data)
                    : data
            )
        } catch (e) {
            throw new Error(`Something went wrong during storage setup ${e}`)
        }
    }

    const getBrowserStorage = (name: string) => {
        try {
            return JSON.parse(browserStorage.getItem(name) as string)
        } catch (e) {
            throw new Error(`Something went wrong during storage read ${e}`)
        }
    }

    useEffect(() => {
        if (typeof getBrowserStorage('searchHistory') !== 'object') {
            setBrowserStorage("searchHistory",historyQueries);
        } else {
            dispatch({ type: "remind", payload: getBrowserStorage('searchHistory') });
        }
    },[])

    useEffect(() => {
        if (getBrowserStorage('searchHistory') !== historyQueries) {
            setBrowserStorage("searchHistory", historyQueries);
        }
    },[historyQueries])

    return (
        <div className='search-history'>
            <h3 className="search-history__title">Search history <span className="search-history__list-order">(oldest first)</span> :</h3>
            {historyQueries && (
                <ul className="search-history__list">
                    {historyQueries.map((historyQuery, i) =>{
                        return (
                            <li className="search-history__list-item" key={i}>
                                {historyQuery}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    );
};

export default SearchHistory;
