/* eslint-disable react/prop-types */
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { CategoryContext } from "../context";

const Pagination = ({ totalResults, articlesLength }) => {
  const { category } = useContext(CategoryContext);
  const { page = "page1" } = useParams();
  const { query } = useParams();
  const pagesArray = [];
  const numberOfPages = Math.ceil(totalResults / 20);
  const pageNumber = parseInt(page.slice(page.length - 1, page.length));
  for (let i = 0; i < numberOfPages; i++) {
    pagesArray.push(i);
  }
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 overflow-x-auto scrollbar-hide">
      <div className="flex flex-1 justify-between items-center sm:hidden">
        <Link
          to={
            category === ""
              ? `/search/${query}/page${pageNumber - 1}`
              : category !== "general"
              ? `/top-headlines/${category}/page${pageNumber - 1}`
              : `/page${pageNumber - 1}`
          }
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-${
            pageNumber === 1 ? 200 : 700
          } hover:bg-gray-50 ${
            pageNumber === 1 ? "pointer-events-none" : "pointer-events-all"
          }`}
        >
          Previous
        </Link>
        <p className="text-xl font-medium text-gray-700">Total Pages {numberOfPages}</p>
        <Link
          to={
            category === ""
              ? `/search/${query}/page${pageNumber + 1}`
              : category !== "general"
              ? `/top-headlines/${category}/page${pageNumber + 1}`
              : `/page${pageNumber + 1}`
          }
          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-${
            pageNumber === numberOfPages ? 200 : 700
          } ${
            pageNumber === numberOfPages
              ? "pointer-events-none"
              : "pointer-events-all"
          } hover:bg-gray-50`}
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between mr-3">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {pageNumber === 1 ? 1 : totalResults - 20}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {pageNumber === 1
                ? totalResults > 20
                  ? totalResults - 20
                  : totalResults
                : 20 + articlesLength}
            </span>{" "}
            of <span className="font-medium">{totalResults}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm max-w-[60dvw]"
            aria-label="Pagination"
          >
            <Link
              to={
                category === ""
                  ? `/search/${query}/page${pageNumber - 1}`
                  : category !== "general"
                  ? `/top-headlines/${category}/page${pageNumber - 1}`
                  : `/page${pageNumber - 1}`
              }
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-${
                pageNumber === 1 ? 200 : 400
              } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                pageNumber === 1 ? "pointer-events-none" : "pointer-events-all"
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            {pagesArray.map((index) => (
              <Link
                to={
                  category === ""
                    ? `/search/${query}/page${index + 1}`
                    : category !== "general"
                    ? `/top-headlines/${category}/page${index + 1}`
                    : `/page${index + 1}`
                }
                key={index}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  pageNumber === index + 1
                    ? "text-white bg-orange-500 hover:bg-orange-400"
                    : "text-gray-900 bg-inherit hover:bg-gray-50"
                } ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0`}
              >
                {index + 1}
              </Link>
            ))}
            <Link
              to={
                category === ""
                  ? `/search/${query}/page${pageNumber + 1}`
                  : category !== "general"
                  ? `/top-headlines/${category}/page${pageNumber + 1}`
                  : `/page${pageNumber + 1}`
              }
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-${
                pageNumber === numberOfPages ? 200 : 400
              } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                pageNumber === numberOfPages
                  ? "pointer-events-none"
                  : "pointer-events-all"
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
