import React, { useState, createContext } from "react";

export const MatchSummaryContext = createContext();

export const MatchSummaryContextProvider = (props) => {
  const [ matchSummary, setMatchSummary ] = useState([]);
  const [ extraRuns, setExtraRuns ] = useState([]);
  const [ matchSummaryTwo, setMatchSummaryTwo ] = useState([]);
  const [ extraRunsTwo, setExtraRunsTwo ] = useState([]);

  return (
    <MatchSummaryContext.Provider
      value={{
        MatchSummary: [matchSummary, setMatchSummary],
        ExtraRuns: [extraRuns, setExtraRuns],
        MatchSummaryTwo: [matchSummaryTwo, setMatchSummaryTwo],
        ExtraRunsTwo: [extraRunsTwo, setExtraRunsTwo],
      }}
    >
      {props.children}
    </MatchSummaryContext.Provider>
  );
};
