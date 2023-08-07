import './Pagination.css';
import ReactPaginate from 'react-paginate';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function PaginatedItems({ maxPageCount, type }) {
  const dispatch = useDispatch();
  const forcePage = useSelector((state) => state.toolkit.currentPageOfMovie);
  const handlePageClick = (event) => {
    dispatch(type(event.selected + 1));
  };

  return (
    <>
      <ReactPaginate
        nextLabel='next'
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={3}
        pageCount={maxPageCount}
        previousLabel='previous'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakLabel='...'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
        renderOnZeroPageCount={null}
        forcePage={forcePage - 1}
      />
    </>
  );
}
