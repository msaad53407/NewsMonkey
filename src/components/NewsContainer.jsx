/* eslint-disable react/prop-types */
import { NewsItem, Error, Pagination, Loader } from "./";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CategoryContext } from "../context";

const NewsContainer = ({
  newsItems,
  errorState,
  pageType,
  totalResults,
  isFetching,
}) => {
  const { query } = useParams();
  const navigate = useNavigate();
  const { category, setCategory } = useContext(CategoryContext);

  if (!errorState && totalResults !== 0 && newsItems.length !== 0) {
    return (
      <>
        <h2 className="max-sm:text-3xl text-4xl pl-6 pr-6 mt-2 mb-2 leading-snug text-gray-800 font-bold font-mono text-center">
          {`${pageType} ${
            query ? query.toUpperCase() : `${category.toUpperCase()} Headlines`
          }`}
        </h2>
        <main className="flex gap-5 flex-wrap xl:max-w-[80%] max-w-7xl justify-center m-auto">
          {newsItems.map((newsItems, index) => (
            <NewsItem key={index} newsItems={newsItems} />
          ))}
        </main>
        {isFetching && <Loader />}
        {/* <Pagination
          totalResults={totalResults}
          articlesLength={newsItems.length}
        /> */}
      </>
    );
  } else {
    if (newsItems.length === 0) {
      setTimeout(() => {
        navigate("/");
        setCategory("general");
      }, 1500);
      return (
        <Error
          errorMessage={{
            data: "This Page Does Not Exist. \n Navigating to Home",
          }}
        />
      );
    } else if (totalResults === 0) {
      return (
        <Error
          errorMessage={{
            data: "Could not Find any Articles for Selected Category. Try Selecting some other Category.",
          }}
        />
      );
    } else {
      return <Error errorMessage={errorState} />;
    }
  }
};

export default NewsContainer;
