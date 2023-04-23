import { debounce } from "lodash";
import { useCallback, useEffect } from "react";

export {};

interface PaginatorProps {
    rowsPerPage: number;
    totalRows: number;
    currentPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    setPage: (page: number) => void;
    goToNextPage: () => void;
    goToPrevPage: () => void;
}

export const Paginator = ({ rowsPerPage, totalRows, currentPage, isFirstPage, isLastPage, setPage, goToNextPage, goToPrevPage }: PaginatorProps) => {

    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const changeCurrentPage = (pageNumber: number) => {
        if (pageNumber < 1) {
            setPage(1);
            return;
        }

        else if (pageNumber > totalPages) {
            setPage(totalPages);
            return;
        }

        setPage(pageNumber);
    }

    const debounceOnChange = useCallback(debounce(changeCurrentPage, 500), []);

    useEffect(() => {
        return () => {
            debounceOnChange.cancel();
        };
    }, [debounceOnChange])

    return (
        <div className='pagination'>

            <button className='floating' disabled={isFirstPage} onClick={() => setPage(1)}>First</button>
            <button className='floating' disabled={isFirstPage} onClick={() => goToPrevPage()}>Prev</button>

            <span className='floating'>
                Page <input onChange={(event) => debounceOnChange(Number(event.target.value))} type="number" className='page-input' defaultValue={currentPage} /> of <strong>{totalPages}</strong>
            </span>

            <button className='floating' disabled={isLastPage} onClick={() => goToNextPage()}>Next</button>
            <button className='floating' disabled={isLastPage} onClick={() => setPage(totalPages)}>Last</button>
        </div >
    )
}