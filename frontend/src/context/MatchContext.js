import React, { useState, createContext } from "react";

export const MatchContext = createContext();

export const MatchContextProvider = (props) => {
  const [firstInningBat, setFirstInningBat] = useState([]);
  const [firstInningBowl, setFirstInningBowl] = useState([]);
  const [secondInningBat, setSecondInningBat] = useState([]);
  const [secondInningBowl, setSecondInningBowl] = useState([]);
  const [firstBattingBowling, setFirstBattingBowling] = useState([]);
  const [matchInfo, setMatchInfo] = useState([]);
  const [umpires, setUmpires] = useState([]);
  const [teamOnePlayers, setTeamOnePlayers] = useState([]);
  const [teamTwoPlayers, setTeamTwoPlayers] = useState([]);

  return (
    <MatchContext.Provider
      value={{
        FirstBat: [firstInningBat, setFirstInningBat],
        FirstBowl: [firstInningBowl, setFirstInningBowl],
        SecondBat: [secondInningBat, setSecondInningBat],
        SecondBowl: [secondInningBowl, setSecondInningBowl],
        FirstBattingBowling: [firstBattingBowling, setFirstBattingBowling],
        MatchInfo: [matchInfo, setMatchInfo],
        Umpires: [umpires, setUmpires],
        TeamOnePlayers: [teamOnePlayers, setTeamOnePlayers],
        TeamTwoPlayers: [teamTwoPlayers, setTeamTwoPlayers],
      }}
    >
      {props.children}
    </MatchContext.Provider>
  );
};
