import react, { useState, useEffect } from "react";

import "./Pagination.css";

interface IPaginationProps {
  records: number;
  currentPage: number;
  pageSize: number;
  onPageClick: (page: number | string) => void;
}

function Pagination({ records, currentPage, pageSize, onPageClick }: IPaginationProps) {
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [displayResult, setDisplayResult] = useState<any[]>([]);
console.log('pagination')
  useEffect(() => {
    if (records && pageSize) {
      const pages = Math.ceil(records / pageSize);
      setNumberOfPages(pages);
    }
  }, [records, pageSize]);

  useEffect(() => {
    let resultArr: any[] = [];
    if (currentPage && numberOfPages) {
      let startingPage = 1;
      let leftDots = currentPage - startingPage > 2 ? "..." : "";
      let previousPage = currentPage - 1 <= startingPage ? 0 : currentPage - 1;
      let selectedPage =
        startingPage === currentPage || numberOfPages === currentPage
          ? 0
          : currentPage;
      let nextPage = currentPage + 1 >= numberOfPages ? 0 : currentPage + 1;
      let rightDots = numberOfPages - currentPage > 2 ? "..." : "";
      let endingPage = numberOfPages;

      resultArr = [
        startingPage,
        leftDots,
        previousPage,
        selectedPage,
        nextPage,
        rightDots,
        endingPage
      ].filter((item) => item);
    }
    setDisplayResult([...resultArr]);
  }, [currentPage, numberOfPages]);

  const onClick = (page: string | number) => {
    page !== "..." && onPageClick(page);
  };

  return (
    <div className="pagination">
      <ul>
        {displayResult?.map((page, index) => {
          const classes =
            page !== "..."
              ? page === currentPage
                ? "cursor active"
                : "cursor"
              : "";
          return (
            <li
              onClick={() => onClick(page)}
              className={classes}
              key={`page-${page}-${index}`}
            >
              {" "}
              {page}{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
