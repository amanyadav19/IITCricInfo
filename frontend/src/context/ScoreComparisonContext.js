import React, { useState, createContext } from "react";

export const ScoreComparisonContext = createContext();

export const ScoreComparisonContextProvider = (props) => {
  const [ scoreComparison, setScoreComparison ] = useState([]);
  const [ scoreComparisonTwo, setScoreComparisonTwo ] = useState([]);
  return (
    <ScoreComparisonContext.Provider
      value={{
        scoreComparison: [scoreComparison, setScoreComparison],
        scoreComparisonTwo: [scoreComparisonTwo, setScoreComparisonTwo],
      }}
    >
      {props.children}
    </ScoreComparisonContext.Provider>
  );
};
