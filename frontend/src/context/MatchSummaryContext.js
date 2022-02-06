import React, { useState, createContext } from "react";

export const MatchSummaryContext = createContext();

export const MatchSummaryContextProvider = (props) => {
  const [ matchSummary, setMatchSummary ] = useState([]);
  const [ extraRuns, setExtraRuns ] = useState([]);
  const [ matchSummaryTwo, setMatchSummaryTwo ] = useState([]);
  const [ extraRunsTwo, setExtraRunsTwo ] = useState([]);
  const [inningOneBatter, setInningOneBatter] = useState([]);
  const [inningTwoBatter, setInningTwoBatter] = useState([]);
  const [inningOneBowler, setInningOneBowler] = useState([]);
  const [inningTwoBowler, setInningTwoBowler] = useState([]);
  const [won, setWon] = useState([]);
  const [matchInfo, setMatchInfo] = useState([]);
  const [allOne, setAllOne] = useState([]);

  return (
    <MatchSummaryContext.Provider
      value={{
        MatchSummary: [matchSummary, setMatchSummary],
        ExtraRuns: [extraRuns, setExtraRuns],
        MatchSummaryTwo: [matchSummaryTwo, setMatchSummaryTwo],
        ExtraRunsTwo: [extraRunsTwo, setExtraRunsTwo],
        InningOneBatter: [inningOneBatter, setInningOneBatter],
        InningTwoBatter: [inningTwoBatter, setInningTwoBatter],
        InningOneBowler: [inningOneBowler, setInningOneBowler],
        InningTwoBowler: [inningTwoBowler, setInningTwoBowler],
        Won: [ won, setWon],
        MatchInfo: [ matchInfo, setMatchInfo ],
        AllOne: [ allOne, setAllOne ],
      }}
    >
      {props.children}
    </MatchSummaryContext.Provider>
  );
};
