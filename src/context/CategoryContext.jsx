/* eslint-disable react/prop-types */
import React, { useState } from "react";

export const CategoryContext = React.createContext();

const CategoryState = ({ children }) => {
  const [category, setCategory] = useState("general");

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryState;
