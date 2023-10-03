/* eslint-disable react/prop-types */
import React, { useState } from "react";

export const CountryContext = React.createContext();

const CountryState = ({ children }) => {
  const [country, setCountry] = useState("us");

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export default CountryState;
