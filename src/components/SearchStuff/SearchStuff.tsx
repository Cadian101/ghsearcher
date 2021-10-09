import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../store/store";
import useDebounce from "../../hooks/useDebounce";

const SearchStuff: FC = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((store: Store) => store.searchString);
    const itemsPerPage: number = 10;
    const delay: number = 500;

    const debouncedInput = useDebounce<string>(searchQuery, delay);

    const [pageQuantity, SetPageQuantity] = useState<number>(1);
    const [currentPage, SetCurrentPage] = useState<number>(1);
    const [repos, SetRepos] = useState<[]>([]);
    const debouncedPage = useDebounce<number>(currentPage, delay);

    const searchCharacters = (query: string, page?: number) => {
        return fetch(
            `https://api.github.com/search/repositories?q=${query}&per_page=${itemsPerPage}&page=${currentPage}`,
            {
                method: "GET"
            }
        )
            .then((r) => r.json())
            .catch((error) => {
                //TODO
                throw new Error(error);
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
                searchCharacters(debouncedInput).then((results) => {
                    if (results !== undefined && results.items.length >= 1) {
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
                    } else {
                        SetRepos([])
                    }

                    console.log("Entries: ", results.total_count);
                    console.log("Pages: ", Math.ceil(results.total_count / itemsPerPage));
                    console.log("Result: ", repos);
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
                <button className="search-result-paging__button" onClick={() => pageMinus()}>&lt;</button>
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
                <button className="search-result-paging__button" onClick={() => pagePlus()}>&gt;</button>
            </div>
            <ul className="search-result">
                {repos && (
                    repos.map((repo: any, i: number) => {
                        return (
                            <li key={i} className="search-result__item">
                                <div className="search-result__item-wrapper">
                                    <h2 className="title">
                                        <a  className="title__link" href={repo.html_url}>{repo.name}</a>
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
