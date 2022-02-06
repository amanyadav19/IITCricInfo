import React, { useState, createContext } from "react";

export const MatchSummaryContext = createContext();

export const MatchSummaryContextProvider = (props) => {
  const [ matchSummary, setMatchSummary ] = useState([]);
  const [ matchSummaryTwo, setMatchSummaryTwo ] = useState([]);
  const [inningOneBatter, setInningOneBatter] = useState([]);
  const [inningTwoBatter, setInningTwoBatter] = useState([]);
  const [inningOneBowler, setInningOneBowler] = useState([]);
  const [inningTwoBowler, setInningTwoBowler] = useState([]);
  const [won, setWon] = useState([]);
  const [matchInfo, setMatchInfo] = useState([]);

  return (
    <MatchSummaryContext.Provider
      value={{
        MatchSummary: [matchSummary, setMatchSummary],
        MatchSummaryTwo: [matchSummaryTwo, setMatchSummaryTwo],
        InningOneBatter: [inningOneBatter, setInningOneBatter],
        InningTwoBatter: [inningTwoBatter, setInningTwoBatter],
        InningOneBowler: [inningOneBowler, setInningOneBowler],
        InningTwoBowler: [inningTwoBowler, setInningTwoBowler],
        Won: [ won, setWon],
        MatchInfo: [ matchInfo, setMatchInfo ],
      }}
    >
      {props.children}
    </MatchSummaryContext.Provider>
  );
};
