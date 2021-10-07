import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../store/store";
import useDebounce from "../../hooks/useDebounce";

const SearchStuff: FC = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((store: Store) => store.searchString);
    const projects = useSelector((store: Store) => store.items);
    const itemsPerPage: number = 10;
    const delay: number = 5000;

    const debouncedInput = useDebounce<string>(searchQuery, delay);

    const [pageQuantity, SetPageQuantity] = useState<number>(1);
    const [currentPage, SetCurrentPage] = useState<number>(1);
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
                    SetPageQuantity((): number => {
                        const n = Math.ceil(results.total_count / itemsPerPage);

                        if (currentPage > n) {
                            SetCurrentPage(n);
                        }

                        return isNaN(n) ? 1 : n
                    });

                    console.log("Entries: ", Math.ceil(results.total_count));
                    console.log("Pages: ", Math.ceil(results.total_count / itemsPerPage));
                    console.log("Result: ", results.items);

                    dispatch({ type: "write", payload: results.items });
                });
            } else {
                SetCurrentPage(1)
                SetPageQuantity(1);
            }
        },
        [debouncedInput, debouncedPage]
    );

    return (
        <>
            <div>
                <button onClick={() => pageMinus()}>-</button>
                <span>
                    Page
                    <input
                        type="number"
                        min="1"
                        max={pageQuantity}
                        value={currentPage}
                        onChange={(e) => pageMove(e)}
                    />
                    of {pageQuantity}
                </span>
                <button onClick={() => pagePlus()}>+</button>
            </div>
            <ul>
                {projects && (
                    projects.map((project: any, i: number) => {
                        return (
                            <li key={i}>
                                <dl>
                                    <dt>
                                        <h2>{project.name}</h2>
                                    </dt>
                                    <dd>
                                        <p>{project.language}</p>
                                        <p>{project.description}</p>
                                    </dd>
                                </dl>
                            </li>
                        );
                    })
                )}
            </ul>
        </>

    );
};

export default SearchStuff;
