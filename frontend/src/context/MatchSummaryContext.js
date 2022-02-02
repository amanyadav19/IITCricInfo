import React, { useState, createContext } from "react";

export const MatchSummaryContext = createContext();

export const MatchSummaryContextProvider = (props) => {
  const [ matchSummary, setMatchSummary ] = useState([]);
  return (
    <MatchSummaryContext.Provider value={{ matchSummary, setMatchSummary }}>
      {props.children}
    </MatchSummaryContext.Provider>
  );
};
