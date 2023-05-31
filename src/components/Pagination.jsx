import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../usePagination";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
    setClickEdit,
    handleDelete,
    selectedId,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <section className="flex justify-between mt-10">
      <div>
        <p>
          Showing {currentPage === 1 ? "1" : `${currentPage * 10 - 9}`} to{" "}
          {currentPage * 10 < totalCount
            ? `${currentPage * 10}`
            : `${totalCount}`}{" "}
          of {totalCount} tasks
        </p>
      </div>
      <ul
        className={classnames("pagination-container", {
          [className]: className,
        })}
      >
        <li
          className={classnames("pagination-item", {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <li className="pagination-item dots" key={pageNumber}>
                &#8230;
              </li>
            );
          }

          return (
            <li
              className={classnames("pagination-item", {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
              key={pageNumber}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={classnames("pagination-item", {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      </ul>
      <div className="flex gap-3">
        <button
          className="bg-[#77b5d9] text-[#14397d] px-[15px] py-[10px] rounded-md hover:bg-[#14397d] hover:text-[#d7eaf3] transition-all duration-300"
          onClick={() => {
            selectedId ? setClickEdit(true) : setClickEdit(false);
          }}
        >
          Edit
        </button>
        <button
          className="bg-[#77b5d9] text-[#14397d] px-[15px] py-[10px] rounded-md hover:bg-[#14397d] hover:text-[#d7eaf3] transition-all duration-300"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </section>
  );
};

export default Pagination;
