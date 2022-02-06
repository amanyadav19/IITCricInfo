import React, { useState, createContext } from "react";

export const ScoreComparisonContext = createContext();

export const ScoreComparisonContextProvider = (props) => {
  const [ scoreComparison, setScoreComparison ] = useState([]);
  const [ scoreComparisonTwo, setScoreComparisonTwo ] = useState([]);
  const [ inningOneWickets, setInningOneWickets ] = useState([]);
  const [ inningTwoWickets, setInningTwoWickets ] = useState([]);
  const [firstBattingBowling, setFirstBattingBowling] = useState([]);
  const [won, setWon] = useState([]);



  return (
    <ScoreComparisonContext.Provider
      value={{
        scoreComparison: [scoreComparison, setScoreComparison],
        scoreComparisonTwo: [scoreComparisonTwo, setScoreComparisonTwo],
        InningOneWickets: [inningOneWickets, setInningOneWickets],
        InningTwoWickets: [inningTwoWickets, setInningTwoWickets],
        FirstBattingBowling: [firstBattingBowling, setFirstBattingBowling],
        Won: [won, setWon],
      }}
    >
      {props.children}
    </ScoreComparisonContext.Provider>
  );
};
