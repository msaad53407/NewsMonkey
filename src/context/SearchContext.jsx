/* eslint-disable react/prop-types */
import React, { useState } from "react";

export const SearchContext = React.createContext();

const SearchState = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchState;
