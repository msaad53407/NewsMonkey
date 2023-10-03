import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { NewsContainer, TopLoadingBar } from "../components";
import { fetchFromApi } from "../utils/fetchFromApi";
import { SearchContext, CategoryContext } from "../context";

const Search = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(10);
  const { searchTerm } = useContext(SearchContext);
  const { setCategory } = useContext(CategoryContext);
  const [isFinished, setIsFinished] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const { query } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setCategory("");
    (async function () {
      setLoadingProgress(30);
      setIsLoading(true);
      const { error, data } = await fetchFromApi(
        "everything",
        null,
        searchTerm || query,
        null,
        pageNumber,
        signal
      );
      setIsLoading(70);
      if (!error) {
        setNewsItems(data.articles);
        setTotalResults(data.totalResults);
      } else {
        setErrorState({
          error: true,
          data,
        });
      }
      setLoadingProgress(100);
      setIsLoading(false);
    })();

    return () => abortController.abort();
  }, [searchTerm]);

  useEffect(() => {
    if (pageNumber !== 1 && !isFinished && pageNumber < 6) {
      setIsFetching(true);
      const abortController = new AbortController();
      const signal = abortController.signal;

      (async function () {
        const { error, data } = await fetchFromApi(
          "everything",
          null,
          searchTerm || query,
          null,
          pageNumber,
          signal
        );
        if (!error) {
          setNewsItems((prevData) => {
            return [...prevData, ...data.articles];
          });
          setTotalResults(data.totalResults);
          if (pageNumber === Math.ceil(totalResults / 20)) setIsFinished(true);
        } else {
          setErrorState({
            error: true,
            data,
          });
        }
        setIsFetching(false);
      })();

      return () => abortController.abort();
    } else return;
  }, [pageNumber]);

  useEffect(() => {
    const handleInfiniteScrolling = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        if (pageNumber === Math.ceil(totalResults / 20)) setIsFinished(true);
        if (!isFinished) {
          setPageNumber((prev) => prev + 1);
        } else return;
      }
    };
    window.addEventListener("scroll", handleInfiniteScrolling);
    return () => window.removeEventListener("scroll", handleInfiniteScrolling);
  }, [isFinished]);

  if (isLoading) {
    return <TopLoadingBar progress={loadingProgress} />;
  } else {
    return (
      <>
        <TopLoadingBar progress={loadingProgress} />
        <div className="w-full h-max min-h-screen">
          <NewsContainer
            newsItems={newsItems}
            errorState={errorState}
            pageType="All Articles related to"
            totalResults={totalResults}
            isFetching={isFetching}
          />
        </div>
      </>
    );
  }
};

export default Search;
