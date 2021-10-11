import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../store/store";
import useDebounce from "../../hooks/useDebounce";

const SearchStuff: FC = () => {
    const dispatch = useDispatch();
    const searchQuery: string = useSelector((store: Store) => store.searchString);
    const historyQueries: string[] = useSelector((store: Store) => store.latterMemories);
    const itemsPerPage: number = 10;
    const delay: number = 500;

    const debouncedInput = useDebounce<string>(searchQuery, delay);

    const [pageQuantity, SetPageQuantity] = useState<number>(1);
    const [currentPage, SetCurrentPage] = useState<number>(1);
    const [repos, SetRepos] = useState<[]>([]);
    const [respError, setRespError] = useState<string | undefined>();
    const debouncedPage = useDebounce<number>(currentPage, delay);

    const searchRepos = (query: string) => {
        return fetch(
            `https://api.github.com/search/repositories?q=${query}&per_page=${itemsPerPage}&page=${currentPage}`,
            {
                method: "GET"
            }
        )
            .then((r) => r.json())
            .catch((error) => {
                return new Error(error);
            });
    };

    const pageMove = (event: ChangeEvent<HTMLInputElement>) => {
        SetCurrentPage(+event.target.value);
    };

    const pagePlus = () => {
        return currentPage < pageQuantity
            ? SetCurrentPage(prevState => prevState + 1)
            : 0;
    };

    const pageMinus = () => {
        return currentPage === 1
            ? 0
            : SetCurrentPage(prevState => prevState - 1);
    };

    useEffect(() => {
            if (debouncedInput) {
                if (debouncedInput !== historyQueries[historyQueries.length -1]) {
                    dispatch({ type: "remind", payload: historyQueries.concat([debouncedInput]) });
                }

                searchRepos(debouncedInput).then((results) => {
                    if (results.message !== undefined) {
                        setRespError(results.message);
                    } else if (results.items.length >= 1) {
                        SetRepos(results.items);
                        SetPageQuantity((): number => {
                            const n = Math.ceil(results.total_count / itemsPerPage) <= 1000
                                ? Math.ceil(results.total_count / itemsPerPage)
                                : 100;

                            if (currentPage > n) {
                                SetCurrentPage(n);
                            }

                            return isNaN(n) ? 1 : n
                        });
                        setRespError(undefined);
                    } else {
                        SetRepos([]);
                    }
                });
            } else {
                SetRepos([])
                SetCurrentPage(1)
                SetPageQuantity(1);
            }
        },
        [debouncedInput, debouncedPage]
    );

    return (
        <>
            <div className="search-result-paging">
                <button
                    className="search-result-paging__button"
                    disabled={currentPage === 1}
                    onClick={() => pageMinus()}
                >
                    &lt;
                </button>
                <span>
                    Page
                    <input
                        className="search-result-paging__input"
                        type="number"
                        min="1"
                        max={pageQuantity}
                        value={currentPage}
                        onChange={(e) => pageMove(e)}
                    />
                    of {pageQuantity}
                </span>
                <button
                    className="search-result-paging__button"
                    disabled={currentPage === pageQuantity}
                    onClick={() => pagePlus()}
                >
                    &gt;
                </button>
            </div>
            {respError && (<p>{respError}</p>)}
            <ul className="search-result">
                {repos && (
                    repos.map((repo: any, i: number) => {
                        return (
                            <li key={i} className="search-result__item">
                                <div className="search-result__item-wrapper">
                                    <h2 className="title">
                                        <a  className="title__link" href={repo.html_url} rel="noopener noreferrer" target="_blank">{repo.name}</a>
                                    </h2>
                                    <dl className="feature feature--rowed">
                                        <dt className="feature__term">Language:</dt>
                                        <dd className="feature__description">{repo.language}</dd>
                                    </dl>
                                    <dl className="feature">
                                        <dt className="feature__term">Description:</dt>
                                        <dd className="feature__description">{repo.description}</dd>
                                    </dl>
                                </div>
                            </li>
                        );
                    })
                )}
            </ul>
        </>
    );
};

export default SearchStuff;
