import React, { useState, createContext } from "react";

export const ScoreComparisonContext = createContext();

export const ScoreComparisonContextProvider = (props) => {
  const [scoreComparison, setScoreComparison] = useState([]);
  return (
    <ScoreComparisonContext.Provider
      value={{ scoreComparison, setScoreComparison }}
    >
      {props.children}
    </ScoreComparisonContext.Provider>
  );
};
