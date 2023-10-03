import { Header } from "./components";
import { Search, TopHeadlines } from "./pages";
import { Routes, Route } from "react-router-dom";
import { CountryState, CategoryState, SearchState } from "./context";

function App() {
  return (
    <SearchState>
      <CategoryState>
        <CountryState>
          <div className="w-full h-full flex flex-col">
            <Header />
            <Routes>
              <Route path="/">
                <Route index element={<TopHeadlines />} />
                <Route path=":page" element={<TopHeadlines />} />
                <Route path="top-headlines/entertainment/">
                  <Route index element={<TopHeadlines />} />
                  <Route path=":page" element={<TopHeadlines />} />
                </Route>
                <Route path="top-headlines/politics/">
                  <Route index element={<TopHeadlines />} />
                  <Route path=":page" element={<TopHeadlines />} />
                </Route>
                <Route path="top-headlines/fashion/">
                  <Route index element={<TopHeadlines />} />
                  <Route path=":page" element={<TopHeadlines />} />
                </Route>
                <Route path="top-headlines/sports/">
                  <Route index element={<TopHeadlines />} />
                  <Route path=":page" element={<TopHeadlines />} />
                </Route>
                <Route path="top-headlines/music/">
                  <Route index element={<TopHeadlines />} />
                  <Route path=":page" element={<TopHeadlines />} />
                </Route>
                <Route path="search">
                  <Route
                    index
                    element={
                      <h1>
                        Nothing Found. Please Search for a specific query.
                      </h1>
                    }
                  />
                  <Route path=":query" element={<Search />}>
                    <Route path=":page" element={<Search />} />
                  </Route>
                </Route>
              </Route>
              <Route path="*" element={<h1>Page not Found</h1>} />
            </Routes>
          </div>
        </CountryState>
      </CategoryState>
    </SearchState>
  );
}

export default App;
